# 思源笔记 Transactions API 封装指南

## 目录

1. [Transactions API 概述](#transactions-api-概述)
2. [API 结构解析](#api-结构解析)
3. [封装思路](#封装思路)
4. [基础封装实现](#基础封装实现)
5. [Callout 折叠状态切换封装](#callout-折叠状态切换封装)
6. [完整示例代码](#完整示例代码)
7. [使用示例](#使用示例)

---

## Transactions API 概述

`/api/transactions` 是思源笔记中一个核心且功能强大的 API 端点，用于批量执行一系列数据修改操作（称为"事务"）。几乎所有对块、属性、文档结构等的修改都会通过此接口进行。

### 特点

- **原子性操作**：每个请求可以包含一个或多个事务 (`transactions`)，每个事务又包含一个或多个具体的操作 (`doOperations`)
- **批量处理**：允许将多个相关的修改原子化处理或批量提交
- **撤销支持**：每个事务可以包含 `undoOperations`，用于支持撤销操作
- **实时同步**：操作完成后，内核会通过 WebSocket 将处理后的事务推送给客户端

### 相关文档

- [思源笔记官方 API 文档](https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md)
- [Transactions API 源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/transaction.go)
- [Transactions API 详细文档](https://leolee9086.github.io/siyuan-kernelApi-docs/transactions/transactions.html)

---

## API 结构解析

### 请求结构

```json
{
    "transactions": [
        {
            "timestamp": 0,              // 后端会使用外层的 reqId 覆盖此值
            "doOperations": [             // 执行的操作列表
                {
                    "action": "string",   // 必需，具体的操作名称
                    "id": "string",       // 操作目标块的 ID (大多数操作需要)
                    "parentID": "string",  // 父块 ID
                    "previousID": "string",// 前一个同级块 ID
                    "nextID": "string",   // 后一个同级块 ID
                    "data": "any",        // 操作的具体数据，结构随 action 不同而变化
                    "dataType": "string", // 数据类型，例如 "markdown", "dom"
                    "isDetached": false,  // 是否为分离的操作
                    "retData": null       // (仅用于后端返回)
                }
            ],
            "undoOperations": []          // 可选，用于撤销的操作列表
        }
    ],
    "reqId": 1678886400000,              // 必需，请求的唯一ID (通常是客户端生成的时间戳)
    "app": "string",                      // 必需，发起请求的应用标识 (例如 "SiYuan")
    "session": "string"                   // 必需，当前会话ID (例如前端的 wsClientId)
}
```

### 响应结构

```json
{
    "code": 0,                            // 0 表示成功，-1 表示失败
    "msg": "",                            // 错误消息（如果有）
    "data": [                             // 处理后的 transactions 数组
        {
            "timestamp": 1678886400000,
            "doOperations": [
                {
                    "action": "setAttrs",
                    "id": "20251217120107-083tbvn",
                    "retData": null,      // 操作的返回数据
                    // ... 其他字段
                }
            ],
            "undoOperations": []
        }
    ]
}
```

### 常见 Action 类型

- `setAttrs` - 设置块属性
- `updateBlock` - 更新块内容
- `insertBlock` - 插入块
- `deleteBlock` - 删除块
- `moveBlock` - 移动块
- `foldBlock` - 折叠块
- `unfoldBlock` - 展开块
- 等等...

---

## 封装思路

### 1. 获取会话信息

要调用 transactions API，我们需要获取以下信息：

- **app**: 应用标识，从 WebSocket URL 的查询参数中获取
- **session**: 会话 ID，从 WebSocket URL 的查询参数中获取
- **reqId**: 请求 ID，通常使用当前时间戳

### 2. 获取 protyle 对象

在思源笔记中，可以通过以下方式获取 protyle 对象：

```javascript
// 方式1: 从全局对象获取（如果可用）
const protyle = siyuan.layout.centerLayout.children[0]
    .children[0].model.editor.protyle;

// 方式2: 从当前活动的编辑器获取
const activeEditor = document.querySelector('.layout__wnd--active .protyle');
const protyle = activeEditor?.__protyle;

// 方式3: 通过块元素查找对应的编辑器
function getProtyleByBlockId(blockId) {
    const blockElement = document.querySelector(`[data-node-id="${blockId}"]`);
    if (!blockElement) return null;
    
    // 向上查找 protyle 容器
    let parent = blockElement.closest('.protyle');
    return parent?.__protyle || null;
}
```

### 3. 封装通用函数

创建一个通用的 transactions 函数，可以：
- 自动获取 app 和 session
- 自动生成 reqId
- 处理错误和响应解析
- 支持传入 protyle 对象或自动查找

---

## 基础封装实现

### 方案一：需要传入 protyle 对象（推荐用于已有 protyle 的场景）

```javascript
/**
 * 执行事务操作（需要传入 protyle 对象）
 * @param {Object} protyle - Protyle 编辑器对象
 * @param {Array} transactions - 事务数组
 * @returns {Promise<Object|null>} 返回处理后的数据，失败返回 null
 */
async function 执行事务(protyle, transactions = []) {
    if (!protyle || !protyle.ws || !protyle.ws.ws || !protyle.ws.ws.url) {
        console.error('[Transactions API] 无法获取 protyle 对象或 WebSocket URL');
        return null;
    }

    const url = "/api/transactions";
    const ws_url = new URL(protyle.ws.ws.url);
    
    const data = {
        app: ws_url.searchParams.get("app"),
        session: ws_url.searchParams.get("id"),
        reqId: Date.now(),
        transactions: transactions,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${apiconfig.token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (result.code === 0) {
            return result.data;
        } else {
            console.error('[Transactions API] 请求失败:', result.msg);
            return null;
        }
    } catch (error) {
        console.error('[Transactions API] 请求异常:', error);
        return null;
    }
}
```

### 方案二：自动查找 protyle 对象（推荐用于通用场景）

```javascript
/**
 * 获取当前活动的 protyle 对象
 * @returns {Object|null} Protyle 对象或 null
 */
function 获取当前Protyle() {
    // 优先从活动的编辑器获取
    const activeEditor = document.querySelector('.layout__wnd--active .protyle');
    if (activeEditor?.__protyle) {
        return activeEditor.__protyle;
    }

    // 从全局对象获取
    if (window.siyuan?.layout?.centerLayout?.children?.[0]?.children?.[0]?.model?.editor?.protyle) {
        return window.siyuan.layout.centerLayout.children[0]
            .children[0].model.editor.protyle;
    }

    // 尝试从所有编辑器中获取第一个
    const editors = document.querySelectorAll('.protyle');
    for (const editor of editors) {
        if (editor.__protyle) {
            return editor.__protyle;
        }
    }

    return null;
}

/**
 * 执行事务操作（自动查找 protyle 对象）
 * @param {Array} transactions - 事务数组
 * @param {Object} options - 可选参数
 * @param {Object} options.protyle - 可选的 protyle 对象，如果不提供则自动查找
 * @returns {Promise<Object|null>} 返回处理后的数据，失败返回 null
 */
async function 执行事务_自动查找(transactions = [], options = {}) {
    const protyle = options.protyle || 获取当前Protyle();
    
    if (!protyle) {
        console.error('[Transactions API] 无法找到 protyle 对象');
        return null;
    }

    return await 执行事务(protyle, transactions);
}
```

### 方案三：通过块 ID 查找对应的 protyle（推荐用于已知块 ID 的场景）

```javascript
/**
 * 通过块 ID 查找对应的 protyle 对象
 * @param {string} blockId - 块 ID
 * @returns {Object|null} Protyle 对象或 null
 */
function 通过块ID获取Protyle(blockId) {
    const blockElement = document.querySelector(`[data-node-id="${blockId}"]`);
    if (!blockElement) {
        console.warn(`[Transactions API] 未找到块 ID: ${blockId}`);
        return null;
    }

    // 向上查找 protyle 容器
    let parent = blockElement.closest('.protyle');
    if (parent?.__protyle) {
        return parent.__protyle;
    }

    // 如果找不到，尝试获取当前活动的 protyle
    return 获取当前Protyle();
}

/**
 * 执行事务操作（通过块 ID 查找 protyle）
 * @param {string} blockId - 块 ID（用于查找对应的 protyle）
 * @param {Array} transactions - 事务数组
 * @returns {Promise<Object|null>} 返回处理后的数据，失败返回 null
 */
async function 执行事务_通过块ID(blockId, transactions = []) {
    const protyle = 通过块ID获取Protyle(blockId);
    
    if (!protyle) {
        console.error(`[Transactions API] 无法找到块 ${blockId} 对应的 protyle 对象`);
        return null;
    }

    return await 执行事务(protyle, transactions);
}
```

---

## Callout 折叠状态切换封装

### Callout 折叠状态说明

- **展开状态**: `fold` 属性不存在或为空字符串 `""`
- **折叠状态**: `fold` 属性值为 `"1"`

### HTML 结构对比

**展开状态（没有 `fold="1"`）:**
```html
<div data-type="NodeCallout" class="callout" data-node-id="20251217120107-083tbvn">
    <div class="callout-info">...</div>
    <div class="callout-content">...</div>
</div>
```

**折叠状态（有 `fold="1"`）:**
```html
<div data-type="NodeCallout" class="callout" data-node-id="20251217120107-083tbvn" fold="1">
    <div class="callout-info">...</div>
    <div class="callout-content">...</div>
</div>
```

### 切换操作分析

根据用户提供的 API 请求示例，切换折叠状态需要：

1. **展开操作**（从折叠到展开）:
   - `doOperations`: `{ action: "setAttrs", id: "块ID", data: '{"fold":""}' }`
   - `undoOperations`: `{ action: "setAttrs", id: "块ID", data: '{"fold":"1"}' }`

2. **折叠操作**（从展开到折叠）:
   - `doOperations`: `{ action: "setAttrs", id: "块ID", data: '{"fold":"1"}' }`
   - `undoOperations`: `{ action: "setAttrs", id: "块ID", data: '{"fold":""}' }`

### 封装实现

```javascript
/**
 * 获取 Callout 块的当前折叠状态
 * @param {string} blockId - Callout 块的 ID
 * @returns {boolean} true 表示折叠，false 表示展开
 */
function 获取Callout折叠状态(blockId) {
    const blockElement = document.querySelector(`[data-node-id="${blockId}"][data-type="NodeCallout"]`);
    if (!blockElement) {
        console.warn(`[Callout 折叠] 未找到 Callout 块: ${blockId}`);
        return false; // 默认返回展开状态
    }

    // 检查是否有 fold="1" 属性
    return blockElement.getAttribute("fold") === "1";
}

/**
 * 切换 Callout 块的折叠状态
 * @param {string} blockId - Callout 块的 ID
 * @param {Object} options - 可选参数
 * @param {boolean} options.forceFold - 强制设置为折叠（true）或展开（false），如果不提供则自动切换
 * @param {Object} options.protyle - 可选的 protyle 对象
 * @returns {Promise<boolean>} 返回操作是否成功
 */
async function 切换Callout折叠状态(blockId, options = {}) {
    const { forceFold, protyle } = options;

    // 获取当前状态
    const 当前是否折叠 = forceFold !== undefined ? forceFold : 获取Callout折叠状态(blockId);
    const 目标是否折叠 = forceFold !== undefined ? forceFold : !当前是否折叠;

    // 构建事务操作
    const 新状态数据 = 目标是否折叠 ? '{"fold":"1"}' : '{"fold":""}';
    const 旧状态数据 = 当前是否折叠 ? '{"fold":"1"}' : '{"fold":""}';

    const transaction = {
        doOperations: [
            {
                action: "setAttrs",
                id: blockId,
                data: 新状态数据
            }
        ],
        undoOperations: [
            {
                action: "setAttrs",
                id: blockId,
                data: 旧状态数据
            }
        ]
    };

    // 执行事务
    let result;
    if (protyle) {
        result = await 执行事务(protyle, [transaction]);
    } else {
        result = await 执行事务_通过块ID(blockId, [transaction]);
    }

    if (result) {
        console.log(`[Callout 折叠] 块 ${blockId} 已${目标是否折叠 ? '折叠' : '展开'}`);
        return true;
    } else {
        console.error(`[Callout 折叠] 块 ${blockId} 状态切换失败`);
        return false;
    }
}

/**
 * 折叠 Callout 块
 * @param {string} blockId - Callout 块的 ID
 * @param {Object} options - 可选参数
 * @returns {Promise<boolean>} 返回操作是否成功
 */
async function 折叠Callout(blockId, options = {}) {
    return await 切换Callout折叠状态(blockId, { ...options, forceFold: true });
}

/**
 * 展开 Callout 块
 * @param {string} blockId - Callout 块的 ID
 * @param {Object} options - 可选参数
 * @returns {Promise<boolean>} 返回操作是否成功
 */
async function 展开Callout(blockId, options = {}) {
    return await 切换Callout折叠状态(blockId, { ...options, forceFold: false });
}
```

---

## 完整示例代码

以下是一个完整的、可以直接使用的封装代码：

```javascript
/* ============================================
 * 思源笔记 Transactions API 封装
 * ============================================ */

// API 配置
const apiconfig = {
    token: "" // 如果需要，可以从 window.siyuan?.ws?.token 获取
};

/**
 * 获取当前活动的 protyle 对象
 * @returns {Object|null} Protyle 对象或 null
 */
function 获取当前Protyle() {
    // 优先从活动的编辑器获取
    const activeEditor = document.querySelector('.layout__wnd--active .protyle');
    if (activeEditor?.__protyle) {
        return activeEditor.__protyle;
    }

    // 从全局对象获取
    if (window.siyuan?.layout?.centerLayout?.children?.[0]?.children?.[0]?.model?.editor?.protyle) {
        return window.siyuan.layout.centerLayout.children[0]
            .children[0].model.editor.protyle;
    }

    // 尝试从所有编辑器中获取第一个
    const editors = document.querySelectorAll('.protyle');
    for (const editor of editors) {
        if (editor.__protyle) {
            return editor.__protyle;
        }
    }

    return null;
}

/**
 * 通过块 ID 查找对应的 protyle 对象
 * @param {string} blockId - 块 ID
 * @returns {Object|null} Protyle 对象或 null
 */
function 通过块ID获取Protyle(blockId) {
    const blockElement = document.querySelector(`[data-node-id="${blockId}"]`);
    if (!blockElement) {
        console.warn(`[Transactions API] 未找到块 ID: ${blockId}`);
        return null;
    }

    // 向上查找 protyle 容器
    let parent = blockElement.closest('.protyle');
    if (parent?.__protyle) {
        return parent.__protyle;
    }

    // 如果找不到，尝试获取当前活动的 protyle
    return 获取当前Protyle();
}

/**
 * 执行事务操作（需要传入 protyle 对象）
 * @param {Object} protyle - Protyle 编辑器对象
 * @param {Array} transactions - 事务数组
 * @returns {Promise<Object|null>} 返回处理后的数据，失败返回 null
 */
async function 执行事务(protyle, transactions = []) {
    if (!protyle || !protyle.ws || !protyle.ws.ws || !protyle.ws.ws.url) {
        console.error('[Transactions API] 无法获取 protyle 对象或 WebSocket URL');
        return null;
    }

    const url = "/api/transactions";
    const ws_url = new URL(protyle.ws.ws.url);
    
    // 获取 token（如果 apiconfig.token 为空，尝试从全局获取）
    const token = apiconfig.token || window.siyuan?.ws?.token || "";
    
    const data = {
        app: ws_url.searchParams.get("app"),
        session: ws_url.searchParams.get("id"),
        reqId: Date.now(),
        transactions: transactions,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (result.code === 0) {
            return result.data;
        } else {
            console.error('[Transactions API] 请求失败:', result.msg);
            return null;
        }
    } catch (error) {
        console.error('[Transactions API] 请求异常:', error);
        return null;
    }
}

/**
 * 执行事务操作（自动查找 protyle 对象）
 * @param {Array} transactions - 事务数组
 * @param {Object} options - 可选参数
 * @param {Object} options.protyle - 可选的 protyle 对象，如果不提供则自动查找
 * @returns {Promise<Object|null>} 返回处理后的数据，失败返回 null
 */
async function 执行事务_自动查找(transactions = [], options = {}) {
    const protyle = options.protyle || 获取当前Protyle();
    
    if (!protyle) {
        console.error('[Transactions API] 无法找到 protyle 对象');
        return null;
    }

    return await 执行事务(protyle, transactions);
}

/**
 * 执行事务操作（通过块 ID 查找 protyle）
 * @param {string} blockId - 块 ID（用于查找对应的 protyle）
 * @param {Array} transactions - 事务数组
 * @returns {Promise<Object|null>} 返回处理后的数据，失败返回 null
 */
async function 执行事务_通过块ID(blockId, transactions = []) {
    const protyle = 通过块ID获取Protyle(blockId);
    
    if (!protyle) {
        console.error(`[Transactions API] 无法找到块 ${blockId} 对应的 protyle 对象`);
        return null;
    }

    return await 执行事务(protyle, transactions);
}

/**
 * 获取 Callout 块的当前折叠状态
 * @param {string} blockId - Callout 块的 ID
 * @returns {boolean} true 表示折叠，false 表示展开
 */
function 获取Callout折叠状态(blockId) {
    const blockElement = document.querySelector(`[data-node-id="${blockId}"][data-type="NodeCallout"]`);
    if (!blockElement) {
        console.warn(`[Callout 折叠] 未找到 Callout 块: ${blockId}`);
        return false; // 默认返回展开状态
    }

    // 检查是否有 fold="1" 属性
    return blockElement.getAttribute("fold") === "1";
}

/**
 * 切换 Callout 块的折叠状态
 * @param {string} blockId - Callout 块的 ID
 * @param {Object} options - 可选参数
 * @param {boolean} options.forceFold - 强制设置为折叠（true）或展开（false），如果不提供则自动切换
 * @param {Object} options.protyle - 可选的 protyle 对象
 * @returns {Promise<boolean>} 返回操作是否成功
 */
async function 切换Callout折叠状态(blockId, options = {}) {
    const { forceFold, protyle } = options;

    // 获取当前状态
    const 当前是否折叠 = forceFold !== undefined ? forceFold : 获取Callout折叠状态(blockId);
    const 目标是否折叠 = forceFold !== undefined ? forceFold : !当前是否折叠;

    // 构建事务操作
    const 新状态数据 = 目标是否折叠 ? '{"fold":"1"}' : '{"fold":""}';
    const 旧状态数据 = 当前是否折叠 ? '{"fold":"1"}' : '{"fold":""}';

    const transaction = {
        doOperations: [
            {
                action: "setAttrs",
                id: blockId,
                data: 新状态数据
            }
        ],
        undoOperations: [
            {
                action: "setAttrs",
                id: blockId,
                data: 旧状态数据
            }
        ]
    };

    // 执行事务
    let result;
    if (protyle) {
        result = await 执行事务(protyle, [transaction]);
    } else {
        result = await 执行事务_通过块ID(blockId, [transaction]);
    }

    if (result) {
        console.log(`[Callout 折叠] 块 ${blockId} 已${目标是否折叠 ? '折叠' : '展开'}`);
        return true;
    } else {
        console.error(`[Callout 折叠] 块 ${blockId} 状态切换失败`);
        return false;
    }
}

/**
 * 折叠 Callout 块
 * @param {string} blockId - Callout 块的 ID
 * @param {Object} options - 可选参数
 * @returns {Promise<boolean>} 返回操作是否成功
 */
async function 折叠Callout(blockId, options = {}) {
    return await 切换Callout折叠状态(blockId, { ...options, forceFold: true });
}

/**
 * 展开 Callout 块
 * @param {string} blockId - Callout 块的 ID
 * @param {Object} options - 可选参数
 * @returns {Promise<boolean>} 返回操作是否成功
 */
async function 展开Callout(blockId, options = {}) {
    return await 切换Callout折叠状态(blockId, { ...options, forceFold: false });
}

// 导出函数（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        执行事务,
        执行事务_自动查找,
        执行事务_通过块ID,
        切换Callout折叠状态,
        折叠Callout,
        展开Callout,
        获取Callout折叠状态,
    };
}
```

---

## 使用示例

### 示例 1: 切换 Callout 折叠状态（自动切换）

```javascript
// 获取 Callout 块的 ID（例如从点击事件中获取）
const calloutBlockId = "20251217120107-083tbvn";

// 切换折叠状态（自动判断当前状态并切换）
await 切换Callout折叠状态(calloutBlockId);
```

### 示例 2: 强制折叠 Callout

```javascript
const calloutBlockId = "20251217120107-083tbvn";

// 强制折叠
await 折叠Callout(calloutBlockId);
```

### 示例 3: 强制展开 Callout

```javascript
const calloutBlockId = "20251217120107-083tbvn";

// 强制展开
await 展开Callout(calloutBlockId);
```

### 示例 4: 在点击事件中使用

```javascript
// 为所有 Callout 添加点击切换功能
document.addEventListener('click', async (e) => {
    // 检查是否点击了 callout-info 区域
    const calloutInfo = e.target.closest('.callout-info');
    if (calloutInfo) {
        const calloutBlock = calloutInfo.closest('[data-type="NodeCallout"]');
        if (calloutBlock) {
            const blockId = calloutBlock.getAttribute('data-node-id');
            
            // 切换折叠状态
            await 切换Callout折叠状态(blockId);
            
            // 阻止默认行为（如果需要）
            e.preventDefault();
            e.stopPropagation();
        }
    }
});
```

### 示例 5: 使用自定义的 protyle 对象

```javascript
// 如果你已经有 protyle 对象
const protyle = 获取当前Protyle();
const calloutBlockId = "20251217120107-083tbvn";

// 使用指定的 protyle 对象
await 切换Callout折叠状态(calloutBlockId, { protyle });
```

### 示例 6: 执行其他类型的事务操作

```javascript
// 示例：设置块的自定义属性
const blockId = "20251217120107-083tbvn";

const transaction = {
    doOperations: [
        {
            action: "setAttrs",
            id: blockId,
            data: '{"custom-attr-name":"属性值"}'
        }
    ],
    undoOperations: [
        {
            action: "setAttrs",
            id: blockId,
            data: '{"custom-attr-name":""}'
        }
    ]
};

// 执行事务
await 执行事务_通过块ID(blockId, [transaction]);
```

### 示例 7: 批量操作多个块

```javascript
const blockIds = ["block-id-1", "block-id-2", "block-id-3"];

// 为每个块创建事务
const transactions = blockIds.map(blockId => ({
    doOperations: [
        {
            action: "setAttrs",
            id: blockId,
            data: '{"custom-tag":"批量标记"}'
        }
    ],
    undoOperations: []
}));

// 批量执行（需要同一个 protyle）
const protyle = 获取当前Protyle();
if (protyle) {
    await 执行事务(protyle, transactions);
}
```

---

## 注意事项

1. **Token 认证**: 确保 `apiconfig.token` 已正确设置，或者代码能够从全局对象获取 token

2. **Protyle 对象获取**: 在某些场景下（如页面刚加载时），可能无法立即获取到 protyle 对象，需要等待编辑器初始化完成

3. **异步操作**: 所有函数都是异步的，需要使用 `await` 或 `.then()` 来处理结果

4. **错误处理**: 建议在实际使用中添加适当的错误处理和用户提示

5. **性能考虑**: 批量操作时，尽量将多个操作合并到一个事务中，而不是分别执行多个事务

6. **撤销支持**: 如果操作需要支持撤销，务必正确设置 `undoOperations`

---

## 总结

通过以上封装，我们可以：

1. ✅ 灵活地执行各种事务操作
2. ✅ 自动处理 protyle 对象的查找
3. ✅ 方便地切换 Callout 的折叠状态
4. ✅ 支持批量操作和错误处理
5. ✅ 代码结构清晰，易于维护和扩展

这些封装函数可以直接集成到你的主题或插件代码中，实现丰富的交互功能。

