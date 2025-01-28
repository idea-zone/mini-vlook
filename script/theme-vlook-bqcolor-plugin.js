export { BqColorPluginEnter };
import { setBlockAttrs } from "./api.js";
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
  static WzLabelClick(e) {
    // 获取引用块的信息
    let bqColor = BqColorPluginEnter.GetBqCallout();
    if (
      bqColor === null ||
      bqColor === undefined ||
      mv.Empty(bqColor.attrValue)
    )
      return;
    let attrValue = bqColor.bqDiv.getAttribute("custom-bqstyle");
    if (mv.Empty(bqColor.attrValue) || mv.Empty(attrValue)) return;

    let attrs = attrValue.split(" ");

    if (attrs.includes("fold")) {
      // 判断点击位置是否是在 pDiv
      let pDiv = bqColor.pDiv;
      let click = e.target;
      if (click === pDiv || BqColorPluginEnter.getP_DIV(click) === pDiv) {
        if (bqColor.bqDiv.getAttribute("custom-bqstyle").includes("close")) {
          // 移除数组 attrs 中的 close
          const index = attrs.indexOf("close");
          if (index > -1) {
            attrs.splice(index, 1);
          }
          attrs.push("open");
        } else if (
          bqColor.bqDiv.getAttribute("custom-bqstyle").includes("open")
        ) {
          // 移除数组 attrs 中的 open
          const index = attrs.indexOf("open");
          if (index > -1) {
            attrs.splice(index, 1);
          }
          attrs.push("close");
        }
      }
      bqColor.attrValue = attrs.join(" ");
      // 不更新API
      BqColorPluginEnter.SetBqColorStyle(bqColor, false);
    }
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
   * 获取引用块的信息:
   * @param {string} bqstyle 引用块的样式
   * @returns {object} 引用块的信息
   * @returns {
   *     id: string, // 块 ID
   *     attrName: string, // 块属性名
   *     attrValue: string, // 块属性值
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

    var text = focus.data?.replace(/[\u200B-\u200D\uFEFF]/g, "");
    let vars = BqColorPluginEnter.getVars(text);

    let id = bqDiv.getAttribute("data-node-id");
    let attrName = "custom-bqstyle";
    let attrValue = bqstyle;

    if (vars === null || vars === undefined || vars.length === 0) {
      attrValue = "";
    } else {
      var type = vars?.groups?.type;
      var foldable = vars?.groups?.foldable;
      var title = vars?.groups?.title;
      title = title?.replace(/[\u200B-\u200D\uFEFF]/g, "");

      bqstyle = BqColorPluginEnter.Type2BqStyle(type);

      if (foldable === "-") {
        attrValue = bqstyle + " fold close";
      } else if (foldable === "+") {
        attrValue = bqstyle + " fold open";
      } else {
        attrValue = bqstyle;
      }
    }

    return {
      id: id,
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
      let vars = BqColorPluginEnter.getVars(text);
      if (vars == null || vars == undefined || vars.length == 0) {
        // 设置第一行的值
        var foldable = vars?.groups?.foldable;
        if (mv.Empty(foldable)) foldable = "";
        var title = vars?.groups?.title;
        if (mv.Empty(title)) title = "";
        await mv.InsertPrependBlockByMd_API(
          id,
          `[!${bqstyle}]${foldable}${title}`
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
        var foldable = vars?.groups?.foldable;
        if (mv.Empty(foldable)) foldable = "";
        var title = vars?.groups?.title;
        if (mv.Empty(title)) title = "";
        else title = " " + title;
        if (foldable === "-") {
          attrValue = bqstyle + " fold close";
        } else if (foldable === "+") {
          attrValue = bqstyle + " fold open";
        } else {
          attrValue = bqstyle;
        }
        let pid = mv.GetSiyuanBlockId(pDiv);
        if (pid !== null && pid !== undefined) {
          await mv.UpdateBlockByMd_API(pid, `[!${bqstyle}]${foldable}${title}`);

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
    // 获取 bqColor
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
