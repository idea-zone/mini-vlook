export { BqColorPluginEnter,ColloutPluginEnter };
import { setBlockAttrs, transactions } from "./api.js";
import { InlineSpan } from "./domex.js";
import { mv } from "./mv-util.js";
import {
  CloaseCommonMenu,
  isZeroWidthCharacterOrNull,
} from "./theme-vlook-plugin.js";
/**
 * VLOOK 支持的
 * [!NOTE]
 * [!TIP]
 * [!IMPORTANT]
 * [!WARNING]
 * [!CAUTION]
 *
 * obsidian 支持的
 * [!note]
 * [!abstract]
 * [!info]
 * [!todo]
 * [!done]
 * [!tip]
 * [!success]
 * [!question]
 * [!warning]
 * [!failure]
 * [!danger]
 * [!bug]
 * [!example]
 * [!quote]
 */

class BqColorPluginEnter {
  static async WzLabelClick(e) {

    // 获取引用块的信息
    let bqColor = BqColorPluginEnter.GetBqCallout();

    if (
      bqColor === null ||
      bqColor === undefined ||
      mv.Empty(bqColor.attrValue)
    )
      return false;
    if (mv.Empty(bqColor.attrValue)) return false;
    let attrs = bqColor.attrValue.split(" ");
    // 使用 fold="1" 属性控制折叠，而不是 custom-bqstyle 中的 open/close
    var tmp ={
      id:bqColor.id,
      attrName:bqColor.attrName,
      attrValue:bqColor.attrValue,
      isFold:bqColor.isFold,
      callout:bqColor.bqDiv 
    };

    // 计算新的折叠状态
    let newIsFold = !tmp.isFold;

    // 先提交事务到内核（进入撤销栈），再根据结果更新 DOM
    try {
      // 优先通过块元素获取对应的 protyle，确保使用当前编辑器的会话信息
      let protyle = null;
      const blockElement = document.querySelector(
        `[data-node-id="${tmp.id}"]`
      );
      if (blockElement) {
        const protyleContainer = blockElement.closest(".protyle");
        if (protyleContainer && protyleContainer.__protyle) {
          protyle = protyleContainer.__protyle;
        }
      }

      // 兜底：退回到全局获取方式（主编辑器）
      if (!protyle && typeof mv.GetProtyle === "function") {
        protyle = mv.GetProtyle();
      }

      if (!protyle) return false;

      const newFoldValue = newIsFold ? "1" : "";
      const oldFoldValue = tmp.isFold ? "1" : "";

      const transaction = {
        doOperations: [
          {
            action: "setAttrs",
            id: tmp.id,
            data: JSON.stringify({ fold: newFoldValue }),
          },
        ],
        undoOperations: [
          {
            action: "setAttrs",
            id: tmp.id,
            data: JSON.stringify({ fold: oldFoldValue }),
          },
        ],
      };

      const result = await transactions(protyle, [transaction]);
      if (!result) return false;

      // 将事务添加到 undo 栈，确保可以撤销
      if (protyle.undo && protyle.undo.undoStack) {
        protyle.undo.undoStack.push(transaction);
        if (protyle.undo.hasUndo !== undefined) {
          protyle.undo.hasUndo = true;
        }
      }

      // 事务成功后，再同步一次前端 DOM，保证当前视图立即反映最新状态
      const callout = tmp.callout;
      if (callout) {
        if (newIsFold) {
          callout.setAttribute("fold", "1");
        } else {
          callout.removeAttribute("fold");
        }
      }
    } catch (error) {
      console.error("[BqColorPlugin] 保存 fold 状态失败:", error);
    }

    // 表示本次点击已被处理
    return true;
  }

  static getVars(text) {
    if (text === null || text === undefined || text.length === 0) return null;
    // 匹配以下情况
    //  `[!note]`,  `[!note] 标题`
    //  `[!note]-`, `[!note]- 标题`  ,
    //  `[!note]+`, `[!note]+ 标题`,
    var reg = /^\[!(?<type>\w+)\](?<foldable>[-+]){0,1}(\s(?<title>.*)){0,1}$/;
    var reg =
      /^\[!(?<type>\w+)\]((?<foldable>[-+]){0,1}(\s(?<title>.*)){0,1}){0,1}$/;
    var vars = reg.exec(text);
    return vars;
  }

  /**
   * 从 custom-bqstyle 属性中获取 callout 类型
   * @returns {string|null} 返回找到的 callout({attr:"NOTE",foldable:true/false}) 类型，如果没有找到则返回 null
   */
  static getVarsByAtts(attrValue){
    if (mv.Empty(attrValue)) return null;
    // 按空格分组
    let attrs = attrValue.split(" ").filter(attr => attr.trim() !== "");
    
    // 定义所有支持的 callout 类型
    const calloutTypes = [
      "NOTE", "TIP", "IMPORTANT", "WARNING", "CAUTION",
      "note", "abstract", "info", "todo", "success", "question", 
      "warning", "failure", "danger", "bug", "example", "quote"
    ];
    
    let rest={
      attr:"NOTE",
      hasFold: false, // 是否支持折叠
    }

    // 判断是否有对应的 callout 类型
    for (let attr of attrs) {
      var attrWrap = attr.trim().toUpperCase();
      if (calloutTypes.includes(attrWrap)) {
        rest.attr = attr;
        // 检查是否包含 fold 关键字（支持折叠）
        rest.hasFold = attrs.includes('fold');
       return rest;
      }
    }
    return null;
  }

  /**
   * 获取引用块的信息:
   * @param {string} bqstyle 引用块的样式
   * @returns {object} 引用块的信息
   * @returns {
   *     id: string, // 块 ID
   *     attrName: string, // 块属性名
   *     attrValue: string, // 块属性值（不再包含 open/close）
   *     bqDiv: Element, // 引用块的 div 元素
   *     pDiv: Element, // 引用块的 p 元素
   * }
   */
  static GetBqCallout(bqstyle = "NOTE") {
    // 获取光标所在位置的元素
    let focus = window.getSelection().anchorNode;
    let pDiv = BqColorPluginEnter.getP_DIV(focus);
    let bqDiv = BqColorPluginEnter.getBq_DIV(pDiv);
    if (bqDiv === null) return null;
    if (pDiv !== bqDiv.firstChild) return null;
    if (focus.nodeType !== Node.TEXT_NODE) return null;

    let attrText = bqDiv.getAttribute("custom-bqstyle");
    let vars = BqColorPluginEnter.getVarsByAtts(attrText);

    let id = bqDiv.getAttribute("data-node-id");
    let attrName = "custom-bqstyle";
    let attrValue = bqstyle;

    if (vars===null||vars===undefined||mv.Empty(vars.attr)) {
      attrValue = "";
    } else {
      var type = vars?.attr;
      bqstyle = BqColorPluginEnter.Type2BqStyle(type);
      // 构建 attrValue：只包含类型和 fold 标识，不包含 open/close
      attrValue = bqstyle;
    }

     // 判断 bqDiv 是否包含 fold=1
     let isFold = (bqDiv.getAttribute("fold") || "0") === "1";

    return {
      id: id,
      isFold:isFold,
      attrName: attrName,
      attrValue: attrValue,
      bqDiv: bqDiv,
      pDiv: pDiv,
    };
  }

  /** 设置属性，并添加第一行的信息 */
  static async SetBqFirtP(id, attrName, bqstyle) {
    if (id === null || id === undefined) return bqstyle;
    let divDiv = document.querySelector(`[data-node-id="${id}"]`);
    if (divDiv === null || divDiv === undefined) return;
    let pDiv = divDiv.firstChild;
    if (pDiv === null || pDiv === undefined) return;

    let attrValue = bqstyle;
    let pDataType = pDiv.getAttribute("data-type");
    if (pDataType === "NodeParagraph") {
      let text = pDiv.firstChild.textContent;
      // let vars = BqColorPluginEnter.getVars(text);

      let attrText = divDiv.getAttribute("custom-bqstyle");
      let vars = BqColorPluginEnter.getVarsByAtts(attrText);

      // callout({attr:"NOTE",hasFold:true/false})
      if (vars == null || vars == undefined || vars.length == 0) {

        // 设置第一行的值
        var title = text;
        if (mv.Empty(title)) title = bqstyle;
        await mv.InsertPrependBlockByMd_API(
          id,
          `${title}`
        );

        // 更新属性
        let blocks = document.querySelectorAll(
          `.protyle-wysiwyg [data-node-id="${id}"]`
        );
        if (blocks) {
          blocks.forEach((block) =>
            block.setAttribute("custom-" + attrName, attrValue)
          );
        }
        let attrs = {};
        attrs["custom-" + attrName] = attrValue;
        await setBlockAttrs(id, attrs);

      } else {
        // 设置第一行的值
        var hasFold = vars?.hasFold;
        var title = text;
        if (mv.Empty(title)) title = bqstyle;
      
        // 构建 attrValue：只包含类型和 fold 标识
        if (hasFold) {
          attrValue = bqstyle + " fold";
        } else {
          attrValue = bqstyle;
        }
        
        let pid = mv.GetSiyuanBlockId(pDiv);
        if (pid !== null && pid !== undefined) {
          await mv.UpdateBlockByMd_API(pid, `${title}`);

          // 更新属性
          let blocks = document.querySelectorAll(
            `.protyle-wysiwyg [data-node-id="${id}"]`
          );
          if (blocks) {
            blocks.forEach((block) =>
              block.setAttribute("custom-" + attrName, attrValue)
            );
          }

          let attrs = {};
          attrs["custom-" + attrName] = attrValue;
          await setBlockAttrs(id, attrs);
        }
      }
    }
  }
  /**
   * 判断是否是 em sub
   * @param {*} node
   * @returns
   */
  static isEmSub(node) {
    if (node === null || node === undefined || node.nodeType === Node.TEXT_NODE)
      return null;
    let value = node.getAttribute("data-type")?.trim() ?? "";
    if (value === "sub em") {
      node.setAttribute("data-type", "em sub");
      return node;
    }
    return value === "em sub" ? node : null;
  }

  static GetOnlyColorP(pDiv) {
    if (pDiv === null || pDiv === undefined) return null;

    // 判断第一行是否只有一个孩子
    let child = BqColorPluginEnter.GetNextNoZeroChild(
      pDiv?.firstChild?.firstChild
    );

    // 判断第一行是否需要更新
    let emSub = null;
    let insertNewLine = true;
    if (child === null || child === undefined) {
      return null;
    } else {
      // 找到第一个不是领宽字符的 孩子节点
      child = BqColorPluginEnter.GetNextNoZeroChild(child);
      if (child === null || child === undefined) {
        return null;
      } else if (child.nodeType === Node.TEXT_NODE) {
        return null;
      } else {
        emSub = BqColorPluginEnter.isEmSub(child);
        // emSub.textContent 满足正则表达式 /^\s*$/
        if (emSub && emSub.textContent?.trim()?.match(/^[a-zA-Z]{2}!?$/)) {
          // 判断后面是否为空
          child = BqColorPluginEnter.GetNextNoZeroChild(child.nextSibling);
          if (child === null || child === undefined) return emSub;
          else return null;
        }
      }
    }

    // 插入新行表示不是只有 color 的 p
    return null;
  }

  static async SetBqFirstColor(id, bqcolor) {
    if (id === null || id === undefined) return bqcolor;
    let divDiv = document.querySelector(`[data-node-id="${id}"]`);
    if (divDiv === null || divDiv === undefined) return;

    let pDivs = divDiv.querySelectorAll(".p");
    let pDiv = pDivs[0];
    let emSub = BqColorPluginEnter.GetOnlyColorP(pDiv);
    if (emSub === null || emSub === undefined) {
      pDiv = pDivs[pDivs.length - 1];
      emSub = BqColorPluginEnter.GetOnlyColorP(pDiv);
    }

    let pid = mv.GetSiyuanBlockId(pDiv);
    if (mv.Empty(pid)) return;
    if (emSub) {
      emSub.textContent = `${bqcolor}`;
      await mv.UpdateBlockByDom_API(pid, pDiv.outerHTML);
    } else {
      if (pDivs.length === 1) {
        await mv.AppendBlockByMd_API(pid, `\n*<sub>${bqcolor}</sub>*`);
      } else {
        await mv.AppendBlockByMd_API(pid, `*<sub>${bqcolor}</sub>*`);
      }
    }
  }

  static GetNextNoZeroChild(node) {
    let child = node;
    if (child === null || child === undefined) return null;
    if (
      child.nodeType !== Node.TEXT_NODE ||
      !isZeroWidthCharacterOrNull(child?.textContent)
    )
      return child;

    do {
      child = child?.nextSibling;
      if (child === null || child === undefined) break;
    } while (
      child.nodeType === Node.TEXT_NODE &&
      isZeroWidthCharacterOrNull(child.textContent)
    );
    return child;
  }

  static HasNoZeroChildAfter(node) {
    let child = BqColorPluginEnter.GetNextNoZeroChild(node);
    do {
      child = child?.nextSibling;
      if (child === null || child === undefined) return false;
    } while (
      child.nodeType === Node.TEXT_NODE &&
      isZeroWidthCharacterOrNull(child.textContent)
    );
    return true;
  }

  /**
   * 将 VLOOK 或 obsidian 的引用类型转换为 bqstyle
   * @param {string} bqtype 引用类型
   * @returns {string} bqstyle
   */
  static Type2BqStyle(bqtype) {
    /**
     * VLOOK 支持的
     * [!NOTE]
     * [!TIP]
     * [!IMPORTANT]
     * [!WARNING]
     * [!CAUTION]
     */
    let bqtypeUP = bqtype.toUpperCase();
    switch (bqtypeUP) {
      case "NOTE":
        return "NOTE";
      case "TIP":
        return "TIP";
      case "IMPORTANT":
        return "IMPORTANT";
      case "WARNING":
        return "WARNING";
      case "CAUTION":
        return "CAUTION";
    }

    /**
     * obsidian 支持的
     * [!note]
     * [!abstract]
     * [!info]
     * [!todo]
     * [!done]
     * [!tip]
     * [!success]
     * [!question]
     * [!warning]
     * [!failure]
     * [!danger]
     * [!bug]
     * [!example]
     * [!quote]
     */
    let bqTypeUp = bqtype.toLowerCase();
    switch (bqTypeUp) {
      case "note":
        return "note";
      case "abstract":
        return "abstract";
      case "info":
        return "info";
      case "todo":
        return "todo";
      case "success":
        return "success";
      case "question":
        return "question";
      case "warning":
        return "warning";
      case "failure":
        return "failure";
      case "danger":
        return "danger";
      case "bug":
        return "bug";
      case "example":
        return "example";
      case "quote":
        return "quote";
    }

    return "note";
  }

  /**
   * 设置引用块的样式
   * @param {*} bqColor
   * @returns
   */
  static SetBqColorStyle(bqColor, updateApi = true) {
    if (bqColor === null || bqColor === undefined) return;
    if (bqColor.attrName === null || bqColor.attrName === undefined) return;
    let { id, attrName, attrValue, bqDiv, pDiv } = bqColor;

    let blocks = document.querySelectorAll(
      `.protyle-wysiwyg [data-node-id="${id}"]`
    );
    if (blocks) {
      blocks.forEach((block) => block.setAttribute(attrName, attrValue));
    }
    if (updateApi) {
      let attrs = {};
      attrs[attrName] = attrValue;
      setBlockAttrs(id, attrs);
    }
  }

  /**
   * 处理键盘事件, 当符合规则的时候渲染页面
   * @param {KeyboardEvent} e 键盘事件
   */
  static async WzKeyUpCallout(e) {

    return false;
    // 获取 GetBqCallout
    let bqColor = BqColorPluginEnter.GetBqCallout();
    
    // 设置 bqColor
    BqColorPluginEnter.SetBqColorStyle(bqColor);
  }

  static async WzKeyUpBqcolor(e) {
    let bqColor = BqColorPluginEnter.GetBqColor();
    if (bqColor === null) return;
    BqColorPluginEnter.SetBqColorStyle(bqColor);
  }

  static BqColorTexts = [
    "T1",
    "T2",
    "Gd",
    "Pk",
    "Ye",
    "Lm",
    "Aq",
    "La",
    "Bn",
    "Ro",
    "Rd",
    "Og",
    "Gn",
    "Cy",
    "Bu",
    "Vn",
    "Gy",
    "Pu",
    "Wn",
    "Ol",
    "Mn",
    "Se",
    "Bk",
  ];

  static GetBqColor() {
    let focus = window.getSelection()?.anchorNode;
    if (focus?.nodeType !== Node.TEXT_NODE) return null;
    let pDiv = BqColorPluginEnter.getP_DIV(focus);
    let bqDiv = BqColorPluginEnter.getBq_DIV(pDiv);
    if (bqDiv === null) return null;

    // 获取 custom-bqcolor 的值
    let defaultBqcolor = null;
    let id = bqDiv.getAttribute("data-node-id");
    let attrName = "custom-bqcolor";
    let attrValue = "";
    let customBqcolor = bqDiv.getAttribute("custom-bqcolor");

    let isColorP = (div) => {
      // 如果 pDiv 的第一个孩子的第一个孩子是  em sub 元素
      let cpDiv = BqColorPluginEnter.GetNextNoZeroChild(
        div.firstChild.firstChild
      );
      if (cpDiv === null || cpDiv === undefined) return null;
      if (cpDiv.nodeType === Node.TEXT_NODE) return null;
      // 如果还有不为空的下一个元素
      let cpNext = BqColorPluginEnter.GetNextNoZeroChild(cpDiv.nextSibling);
      if (cpNext !== null && cpNext !== undefined) return null;

      let dataType = cpDiv.getAttribute("data-type");
      let text = cpDiv.textContent;

      if (dataType === "em sub" || dataType === "sub em") {
        // 首字母大小，后面小写
        let first = text.charAt(0).toUpperCase();
        let last = text.slice(1).toLowerCase();
        let hasEnd = false;
        // 如果最后一个是 ! 则去掉
        if (last.charAt(last.length - 1) === "!") {
          last = last.slice(0, -1);
          hasEnd = true;
        }
        let color = first + last;
        if (BqColorPluginEnter.BqColorTexts.includes(color)) {
          attrValue = color + (hasEnd ? "!" : "");
          return {
            id: id,
            attrName: attrName,
            attrValue: attrValue,
            bqDiv: bqDiv,
            pDiv: div,
          };
        }
      }
      return null;
    };

    // 获取 bqDiv 倒数第二个 .p
    let pLast = bqDiv.lastElementChild.previousElementSibling;
    if (pLast === null) return null;
    // 如果是第一个行
    if (pDiv === bqDiv.firstChild) {

      // 判断第一行是否是 color 的 p
      let pColor = isColorP(pDiv);
      if (pColor !== null) return pColor;

      // 如果最后一行已经是 color , 则返回
      pColor = isColorP(pLast);
      if (pColor !== null) return pColor;

      // 如果目前已经是 bqcolor 但是，pDiv 不是 color 的 p
      if (customBqcolor !== null && customBqcolor !== undefined)
        return {
          id: id,
          attrName: attrName,
          attrValue: "",
          bqDiv: bqDiv,
          pDiv: pDiv,
        };
    } else if (pDiv === pLast) {

      let pColor = isColorP(pDiv);
      if (pColor !== null) return pColor;
      
      // 如果是最后一个行,且第一行已经是 color 的p
      pColor = isColorP(bqDiv.firstChild);
      if (pColor !== null) return pColor;

      if (customBqcolor !== null && customBqcolor !== undefined)
        return {
          id: id,
          attrName: attrName,
          attrValue: "",
          bqDiv: bqDiv,
          pDiv: pDiv,
        };
    }

    return null;
  }

  /**
   * 获取 p 元素
   * @param {Node} node 节点
   * @returns {Element} p 元素
   */
  static getP_DIV(node) {
    // 第一层是否是 p 元素
    let p1Div = node?.parentElement;
    if (p1Div === null || p1Div === undefined) return null;
    if (p1Div.dataset.type === "NodeParagraph") return p1Div;

    // 第二层是否是 p 元素
    let pDiv = p1Div?.parentElement;
    if (pDiv === null || pDiv === undefined) return null;
    if (pDiv.dataset.type === "NodeParagraph") return pDiv;

    // 第三层是否是 p 元素
    let pDiv2 = pDiv?.parentElement;
    if (pDiv2 === null || pDiv2 === undefined) return null;
    if (pDiv2.dataset.type === "NodeParagraph") return pDiv2;

    return null;
  }

  /**
   * 获取引用块的 div 元素
   * @param {Node} node 节点
   * @returns {Element} 引用块的 div 元素
   */
  static getBq_DIV(node) {
    let pDiv = node?.parentElement;
    if (pDiv === null || pDiv === undefined) return null;
    return pDiv.dataset.type === "NodeBlockquote" ? pDiv : null;
  }
}

/**
 * 获得所选择的块对应的块 ID
 * @returns {string} 块 ID
 * @returns {
 *     id: string, // 块 ID
 *     type: string, // 块类型
 *     subtype: string, // 块子类型(若没有则为 null)
 * }
 * @returns {null} 没有找到块 ID */
function getBlockSelected(e) {
  let node_list = document.querySelectorAll(".protyle-wysiwyg--select");
  if (node_list.length === 1 && node_list[0].dataset.nodeId != null)
    return {
      id: node_list[0].dataset.nodeId,
      type: node_list[0].dataset.type,
      subtype: node_list[0].dataset.subtype,
    };

  return null;
}

class ColloutPluginEnter{
  static async WzLabelClick(e) {
    // 获取引用块的信息
    let bqColor = ColloutPluginEnter.GetBqCallout();
   
    if (bqColor === null || bqColor === undefined || mv.Empty(bqColor.id)) return false;

    var tmp = {
      id: bqColor.id,
      attrName: bqColor.attrName,
      attrValue: bqColor.attrValue,
      isFold: bqColor.isFold,
      callout: bqColor.bqDiv 
    };

    // 计算新的折叠状态
    let newIsFold = !tmp.isFold;

    try {
      // 封装一个通用的 protyle 获取方法，兼容不同挂载字段
      const _getProtyleFromContainer = (container) => {
        if (!container) return null;
        if (container.__protyle) return container.__protyle;
        if (container.protyle) return container.protyle;
        return null;
      };

      let protyle = null;

      // 1. 优先通过事件源向上寻找当前 protyle（当前点击所在编辑器）
      if (e && e.target && e.target.closest) {
        const fromEventProtyle = e.target.closest(".protyle");
        protyle = _getProtyleFromContainer(fromEventProtyle);
      }

      // 2. 通过块元素获取对应的 protyle（根据块 ID 在各编辑器中查找）
      if (!protyle && tmp.id) {
        const blockElement = document.querySelector(
          `[data-node-id="${tmp.id}"]`
        );
        if (blockElement) {
          const protyleContainer = blockElement.closest(".protyle");
          protyle = _getProtyleFromContainer(protyleContainer);
        }
      }

      // 3. 兜底：退回到全局获取方式（主编辑器 / 当前活动文档）
      if (!protyle && typeof mv.GetProtyle === "function") {
        protyle = mv.GetProtyle();
      }

      // 依然没有拿到则直接返回，避免后续报错
      if (!protyle) {
        console.error("[ColloutPlugin] 无法获取 protyle 对象");
        return false;
      }

      const newFoldValue = newIsFold ? "1" : "";
      const oldFoldValue = tmp.isFold ? "1" : "";

      // 构建事务：使用 setAttrs action
      const transaction = {
        doOperations: [
          {
            action: "setAttrs",
            id: tmp.id,
            data: JSON.stringify({ fold: newFoldValue }),
          },
        ],
        undoOperations: [
          {
            action: "setAttrs",
            id: tmp.id,
            data: JSON.stringify({ fold: oldFoldValue }),
          },
        ],
      };

      // 提交事务
      const result = await transactions(protyle, [transaction]);
      if (!result) {
        console.error("[ColloutPlugin] 事务提交失败");
        return false;
      }

      // 将事务添加到 undo 栈，确保可以撤销
      if (protyle.undo && protyle.undo.undoStack) {
        protyle.undo.undoStack.push(transaction);
        if (protyle.undo.hasUndo !== undefined) {
          protyle.undo.hasUndo = true;
        }
      }

      // 事务成功后，再同步一次前端 DOM，保证当前视图立即反映最新状态
      const callout = tmp.callout;
      if (callout) {
        if (newIsFold) {
          callout.setAttribute("fold", "1");
        } else {
          callout.removeAttribute("fold");
        }
      }

      // 表示本次点击已被处理
      return true;
    } catch (error) {
      console.error("[ColloutPlugin] 保存 fold 状态失败:", error);
      return false;
    }
  } 

  static GetBqCallout(){
    let focus = window.getSelection().anchorNode;
    let pDiv = ColloutPluginEnter.getP_DIV(focus); // .callinfo
    let bqDiv = ColloutPluginEnter.getCallout_DIV(pDiv); // callout

    if (bqDiv === null) return null;
    if (pDiv !== bqDiv.firstChild) return null;
    if (focus.nodeType !== Node.TEXT_NODE) return null;

    
    let id = bqDiv.getAttribute("data-node-id");
    let attrName ="data-subtype";
    let attrValue= bqDiv.getAttribute(attrName);
    // 判断 bqDiv 是否包含 fold=1
    let isFold = (bqDiv.getAttribute("fold") || "0") === "1";


    return {
      id: id,
      attrName: attrName,
      attrValue: attrValue,
      bqDiv: bqDiv,
      pDiv: pDiv,
      isFold:isFold
    };
  }

  
  /**
   * 获取引用块的 div 元素
   * @param {Node} node 节点
   * @returns {Element} 引用块的 div 元素
   */
  static getCallout_DIV(node) {
    let pDiv = node?.parentElement;
    if (pDiv === null || pDiv === undefined) return null;
    return pDiv.dataset.type === "NodeCallout" ? pDiv : null;
  }

  
  /**
   * 获取 p 元素
   * @param {Node} node 节点
   * @returns {Element} p 元素
   */
  static getP_DIV(node) {
    node = node?.parentElement?.parentElement;
    // 获取 node 的 class 属性，并判断是否包含 'callout-info'
    if (node && node.classList && node.classList.contains('callout-info')) {
      // 如果是 callout-info，则返回该节点
      return node;
    }
    return null;
  }
}
