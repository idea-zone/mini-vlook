# 引述块折叠机制变更说明

## 变更日期
2025年1月（根据代码修改时间）

## 变更概述
将引述块（BlockQuote）的折叠控制机制从使用 `custom-bqstyle` 属性中的 `fold open/close` 字符串改为使用 HTML 属性 `fold="1"` 来控制，使其与 Callout 块的折叠机制保持一致。

---

## 变更详情

### 1. **CSS 样式变更**

**文件**: `styles/v-block-bq-style.css`

#### 变更前：
```css
/* 使用 custom-bqstyle 属性中的 open/close 控制 */
.bq[custom-bqstyle~="open" i] > .p:first-child > div:after {
  content: "\2228"; /* ∨ 展开箭头 */
}

.bq[custom-bqstyle~="close" i] > .p:first-child > div:after {
  content: "\003E"; /* > 折叠箭头 */
}

.bq[custom-bqstyle~="close" i] > *:not(:first-child) {
  /* 隐藏内容 */
}
```

#### 变更后：
```css
/* 使用 fold="1" 属性控制 */
.bq[custom-bqstyle]:not([fold="1"]) > .p:first-child > div:after {
  content: "\2228"; /* ∨ 展开箭头 */
}

.bq[custom-bqstyle][fold="1"] > .p:first-child > div:after {
  content: "\003E"; /* > 折叠箭头 */
}

.bq[custom-bqstyle][fold="1"] > *:not(:first-child) {
  /* 隐藏内容 */
}
```

---

### 2. **JavaScript 逻辑变更**

**文件**: `script/theme-vlook-bqcolor-plugin.js`

#### 核心变更点：

##### a) `getVarsByAtts` 方法
- **变更前**: 返回 `{attr, foldable: '+/-'}`
- **变更后**: 返回 `{attr, hasFold: true/false}`
- **说明**: 不再解析 `open/close` 状态，只标识是否支持折叠

##### b) `GetBqCallout` 方法
- **变更前**: `attrValue = "NOTE fold open"` 或 `"NOTE fold close"`
- **变更后**: `attrValue = "NOTE fold"`（不包含 open/close）
- **说明**: 折叠状态由 DOM 的 `fold` 属性控制，不再存储在 `custom-bqstyle` 中

##### c) `WzLabelClick` 方法（折叠切换）
- **变更前**: 修改 `custom-bqstyle` 属性中的 `open/close` 字符串
  ```javascript
  attrs.splice(index, 1);
  attrs.push("open"); // 或 "close"
  bqColor.attrValue = attrs.join(" ");
  BqColorPluginEnter.SetBqColorStyle(bqColor, false);
  ```

- **变更后**: 直接设置/移除 DOM 的 `fold` 属性
  ```javascript
  let isFolded = bqDiv.getAttribute("fold") === "1";
  if (isFolded) {
    bqDiv.removeAttribute("fold");
  } else {
    bqDiv.setAttribute("fold", "1");
  }
  ```

##### d) `SetBqFirtP` 方法
- **变更前**: 根据 `foldable` 生成包含 `open/close` 的 `attrValue`
- **变更后**: 只生成 `"NOTE fold"`，不包含 `open/close`

---

## 数据迁移

### ⚠️ 重要提示

**现有数据影响**：
- 已存在的引述块，如果 `custom-bqstyle` 包含 `fold close`，将**无法自动迁移**
- 这些块会保持展开状态，因为新逻辑只识别 `fold="1"` 属性

### 迁移方案（可选）

如果需要迁移旧数据，可以运行以下脚本：

```javascript
// 查找所有包含 "fold close" 的引述块
const oldBlocks = document.querySelectorAll('.bq[custom-bqstyle*="close"]');

oldBlocks.forEach(block => {
  const attrValue = block.getAttribute('custom-bqstyle');
  
  // 设置 fold="1" 属性
  block.setAttribute('fold', '1');
  
  // 清理 custom-bqstyle 中的 open/close
  const newAttrValue = attrValue
    .replace(/\s+close\s*/gi, '')
    .replace(/\s+open\s*/gi, '')
    .trim();
  
  block.setAttribute('custom-bqstyle', newAttrValue);
  
  console.log(`已迁移块: ${block.getAttribute('data-node-id')}`);
});

console.log(`共迁移 ${oldBlocks.length} 个块`);
```

---

## 优势

### 1. **一致性**
- 与 Callout 块使用相同的折叠机制（`fold="1"`）
- 代码逻辑统一，易于维护

### 2. **性能**
- 不需要字符串解析和拼接
- DOM 属性操作更快

### 3. **可扩展性**
- 折叠状态与样式配置分离
- 未来可以独立扩展折叠功能

### 4. **数据简洁**
- `custom-bqstyle` 只存储类型信息（如 `"NOTE fold"`）
- 状态信息存储在 DOM 属性中，不持久化到数据库

---

## 注意事项

### ⚠️ 兼容性问题

1. **旧数据不会自动迁移**
   - 包含 `fold close` 的旧引述块将保持展开状态
   - 需要手动点击折叠图标重新设置折叠状态

2. **不影响新创建的块**
   - 新创建的引述块会自动使用新机制

3. **CSS 选择器优先级**
   - 新选择器 `.bq[custom-bqstyle][fold="1"]` 优先级高于旧的 `.bq[custom-bqstyle~="close"]`
   - 如果同时存在，`fold="1"` 会生效

### 🔍 调试建议

如果折叠功能异常，检查：

1. **DOM 属性**
   ```javascript
   // 折叠状态的块应该有 fold="1" 属性
   console.log(block.getAttribute('fold')); // 应该是 "1"
   ```

2. **custom-bqstyle 属性**
   ```javascript
   // 应该是 "NOTE fold"，不包含 open/close
   console.log(block.getAttribute('custom-bqstyle'));
   ```

3. **CSS 应用**
   ```javascript
   // 检查 CSS 规则是否正确应用
   const computedStyle = window.getComputedStyle(block.querySelector('.p:not(:first-child)'));
   console.log(computedStyle.display); // 折叠时应该是 "none"
   ```

---

## 测试清单

- [ ] 新创建的引述块可以正常折叠/展开
- [ ] 点击标题行的折叠图标可以切换状态
- [ ] 折叠时内容正确隐藏
- [ ] 展开时内容正确显示
- [ ] 折叠状态的箭头图标正确显示（> vs ∨）
- [ ] 不影响非折叠类型的引述块
- [ ] 不影响 Callout 块的折叠功能

---

## 相关文件

- `styles/v-block-bq-style.css` - CSS 样式定义
- `styles/custom-f-callout.css` - Callout 块样式（参考实现）
- `script/theme-vlook-bqcolor-plugin.js` - 折叠逻辑实现
- `doc/transactions-api-guide.md` - Transactions API 文档（可参考 Callout 折叠实现）

---

## 回滚方案

如果需要回滚到旧版本，需要：

1. 恢复 CSS 选择器（使用 `[custom-bqstyle~="close"]`）
2. 恢复 JavaScript 逻辑（在 `custom-bqstyle` 中添加/移除 `open/close`）
3. 运行数据迁移脚本（将 `fold="1"` 转换回 `custom-bqstyle` 中的 `close`）

---

## 后续工作建议

1. **添加键盘快捷键**
   - 例如：Alt+F 快速折叠/展开当前引述块

2. **批量操作**
   - 折叠/展开文档中所有引述块

3. **持久化折叠状态**（可选）
   - 如需持久化，可以通过 Transactions API 同步 `fold` 状态到块属性

4. **动画效果**
   - 添加 CSS transition 使折叠/展开更平滑

---

## 版本信息

- **修改前版本**: 使用 `custom-bqstyle` 属性中的 `open/close` 控制
- **修改后版本**: 使用 `fold="1"` 属性控制
- **兼容性**: 向前兼容（旧数据需手动迁移）

