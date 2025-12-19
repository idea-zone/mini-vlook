export {
  insertCreateBefore,
  addinsertCreateElement,
  AddEvent,
  myRemoveEvent,
  InlineSpan,
  SiyuanSpan,
  VlookSpan,
  mv,
};

import { mv } from "./mv-util.js";

//#region  *********************** DOM 操作相关 ***********************
/**
 * 向指定元素前创建插入一个元素，可选添加ID
 * @param {*} targetElement 目标元素
 * @param {*} addElementTxt 要创建添加的元素标签
 * @param {*} setId 为创建元素设置ID
 */
function insertCreateBefore(targetElement, addElementTxt, setId = null) {
  if (!targetElement) console.error("指定元素对象不存在！");
  if (!addElementTxt) console.error("未指定字符串！");

  var element = document.createElement(addElementTxt);

  if (setId) element.id = setId;

  targetElement.parentElement.insertBefore(element, targetElement);

  return element;
}

/**
 * 向指定父级创建追加一个子元素，并可选添加ID,
 * @param {Element} fatherElement
 * @param {string} addElementTxt 要创建添加的元素标签
 * @param {string} setId
 * @returns addElementObject
 */
function addinsertCreateElement(fatherElement, addElementTxt, setId = null) {
  if (!fatherElement) console.error("指定元素对象不存在！");
  if (!addElementTxt) console.error("未指定字符串！");

  var element = document.createElement(addElementTxt);

  if (setId) element.id = setId;

  fatherElement.appendChild(element);

  return element;
}

/**
 * 为元素注册监听事件
 * @param {Element} element
 * @param {string} strType
 * @param {Fun} fun
 */
function AddEvent(element, strType, fun) {
  //判断浏览器有没有addEventListener方法
  if (element.addEventListener) {
    element.addEventListener(strType, fun, false);
    //判断浏览器有没 有attachEvent IE8的方法
  } else if (element.attachEvent) {
    element.attachEvent("on" + strType, fun);
    //如果都没有则使用 元素.事件属性这个基本方法
  } else {
    element["on" + strType] = fun;
  }
}

/**
 * 为元素解绑监听事件
 * @param {Element}  element ---注册事件元素对象
 * @param {String}   strType ---注册事件名(不加on 如"click")
 * @param {Function} fun	 ---回调函数
 *
 */
function myRemoveEvent(element, strType, fun) {
  //判断浏览器有没有addEventListener方法
  if (element.addEventListener) {
    // addEventListener方法专用删除方法
    element.removeEventListener(strType, fun, false);
    //判断浏览器有没有attachEvent IE8的方法
  } else if (element.attachEvent) {
    // attachEvent方法专用删除事件方法
    element.detachEvent("on" + strType, fun);
    //如果都没有则使用 元素.事件属性这个基本方法
  } else {
    //删除事件用null
    element["on" + strType] = null;
  }
}

//Returns true if it is a DOM node
function isNode(o) {
  return typeof Node === "object"
    ? o instanceof Node
    : o &&
        typeof o === "object" &&
        typeof o.nodeType === "number" &&
        typeof o.nodeName === "string";
}

//Returns true if it is a DOM element
function isElement(o) {
  return typeof HTMLElement === "object"
    ? o instanceof HTMLElement //DOM2
    : o &&
        typeof o === "object" &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === "string";
}

//#endregion *********************** DOM 操作相关

/**
 * 对 Span 的封装
 */
class InlineSpan {
  constructor(span) {
    if (span === null || span === undefined) {
      this._spanNode = document.createElement("span");
    } else {
      this._spanNode = span;
    }
    this._textNode = document.createTextNode(this._spanNode.textContent);
  }

  static Init(dataType, text, styles = null, selected = false,dom = null) {
    let span = new InlineSpan();
    span.dataType = dataType;
    span.text = text;
    span.styles = styles;
    span.selected = selected;
    span.outDom = dom;
    return span;
  }

  
  get dataType() {
    if (this._spanNode.hasAttribute("data-type")) {
      let tmp = this._spanNode.getAttribute("data-type");
      if (mv.Empty(tmp)) {
        return null;
      }
      return tmp;
    }
    
    return null;
  }

  set dataType(value) {
    if (value !== null && value !== undefined && value !== "") {
      this._spanNode.setAttribute("data-type", value);
    } else if (this._spanNode.hasAttribute("data-type")) {
      this._spanNode.removeAttribute("data-type");
    }
  }

  get text() {
    return this._spanNode.textContent;
  }
  set text(value) {
    this._spanNode.textContent = value;
    this._textNode.data = value;
  }

  // 生成 styles 的属性，在 set 方法中，如果 dataType 为空，就设置为 text,如果 dataType 不包含 text，就添加空格+text附加到 dataType 中
  /**
   * styles 属性的 getter 和 setter
   * 在设置 styles 时:
   * 1. 如果 dataType 为空,设置为 text
   * 2. 如果 dataType 不包含 text,添加空格+text
   */
  get styles() {
    return this._spanNode.getAttribute("style");
  }

  set styles(value) {
    if (value !== null && value !== undefined && value !== "") {
      this._spanNode.setAttribute("style", value);
    } else if (this._spanNode.hasAttribute("style")) {
      this._spanNode.removeAttribute("style");
    }
  }

  get dom() {
    if (this.dataType !== null && this.dataType !== undefined) {
      return this._spanNode;
    } else {
      return this._textNode;
    }
  }

  Merge(span) {
    if (span === null || span === undefined) return [this];
    if (span.dataType === null || this.dataType === null) return [this, span];
    if (span.dataType === this.dataType) {
      this.text = this.text + span.text;
      return [this];
    }
    return [this, sapn];
  }

  /**
   *  判断是否包含 dataType 的值，如果 dataType 有多个判断是否有交叉，如果包含或者交叉返回 true, 否则返回 false
   * @param {*} dataType
   * @returns
   */
  HasDataType(dataType) {
    let arry = this.SameDataType(dataType);
    return arry !== null && arry !== undefined && arry.length > 0;
  }

  RemoveDataType(dataType,outDom=null){
    let arr = dataType.split(" ");
    let thisarr = this.dataType.split(" ");
    // 如果 thisarr 中包含 arr 中的任何一个值，则删除 thisarr 中对应的值
    let newarr = thisarr.filter(t=>arr.indexOf(t) === -1);
    this.dataType = newarr.join(" ");
    if (this.outDom !== null && this.outDom !== undefined){
      if (newarr.length > 0){
        this.outDom.setAttribute("data-type",newarr.join(" "));
        outDom?.setAttribute("data-type",newarr.join(" "));
      }else{
        this.outDom.removeAttribute("data-type");
        outDom?.removeAttribute("data-type");
      }
    }
  }

  /**
   * 获取 dataType 和 this.dataType 重叠的部分
   * @param {*} dataType
   * @returns
   */
  SameDataType(dataType) {
    if (
      this.dataType === null ||
      this.dataType === undefined ||
      dataType === null ||
      dataType === undefined
    )
      return null;
    var types = dataType.split(" ");
    var thistypes = this.dataType.split(" ");
    var arry = thistypes.filter(function (v) {
      return types.indexOf(v) > -1;
    });

    return arry;
  }
}

class VlookSpan {

  static ClacAndSetWzStepsValue(dom){
        // 根据下面字符串拆分为数组 > / \ -> → ▸ ▶︎ 
        let spantext =dom.textContent;
        let setps = spantext.split(/[>\\\/→▸▶︎]+/);      
        let newText = setps.join('>');
        dom.style.setProperty("--wz-stepwise-text","'"+newText+"'");
        let span = document.createElement("span");
        span.textContent = '';
        span.setAttribute("data-type","text");
  }

  static ClacAndSetPgBarValue(dom) {
    let value = VlookSpan.CalacPgBarValueByText(dom);
    let boxShadowValue = 0;
    // 如果 value > 100 则设置为 100
    if (value > 100) {
      /**
       * style="box-shadow: 7.68px 0 0 0 var(--ac-ro);
       *  margin-right: 12.68px;
       *  background: linear-gradient(90deg, var(--ac-ro) 100%, var(--d-bc) 100%, var(--d-bc) 100%);
       * outline-style: solid;"
       */
      boxShadowValue = (40 * (value - 100)) / 100;
      value = 100;
    }
    if (value < 0) {
      /**
     box-shadow: -13.44px 0 0 0 var(--ac-rd);
     margin-left: 13.44px; 
     background: linear-gradient(90deg, var(--ac-rd-a-lg) 0%, var(--d-bc) 0%, var(--d-bc) 100%); 
     outline-style: var(--theme-wzline-pgbar-outline-style);
      */
      boxShadowValue = -40 * (1-(value+100) / 100);
      value = 0;
    }


    dom.style.setProperty("--theme-wzline-pgbar-setpValue", value + "%");

    if (
      boxShadowValue !== null &&
      boxShadowValue !== undefined &&
      boxShadowValue !== 0
    ) {
      dom.style.setProperty(
        "--theme-wzline-pgbar-box-shadow",
        boxShadowValue + "px 0 0 0 var(--theme-wzline-pgbar-nameBgColor)"
      );

      if (boxShadowValue > 0) {
        dom.style.setProperty(
          "--theme-wzline-pgbar-margin-right",
          boxShadowValue + "px"
        );
      } else {
        dom.style.removeProperty("--theme-wzline-pgbar-margin-right");
      }

      if (boxShadowValue < 0) {
        dom.style.setProperty(
          "--theme-wzline-pgbar-margin-left",
          0 - boxShadowValue + "px"
        );
        dom.style.setProperty("--theme-wzline-pgbar-outline-style", "dashed");
      } else {
        dom.style.removeProperty("--theme-wzline-pgbar-margin-left");
        dom.style.removeProperty("--theme-wzline-pgbar-outline-style");
      }
    } else {
      dom.style.removeProperty("--theme-wzline-pgbar-box-shadow");
      dom.style.removeProperty("--theme-wzline-pgbar-margin-right");
      dom.style.removeProperty("--theme-wzline-pgbar-margin-left");
      dom.style.removeProperty("--theme-wzline-pgbar-outline-style");
    }
  }

  static GetPgBarValueByStyle(dom) {
    return dom.style.getPropertyValue("--theme-wzline-pgbar-setpValue");
  }

  static SetPgBarValueByStyle(dom, value) {
    dom.style.setProperty("--theme-wzline-pgbar-setpValue", value);
  }

  static CalacPgBarValueByText(dom) {
    let value = dom.textContent;

    const zeroWidthRegex = /^[\u200B\u200C\u200D\uFEFF]+$/;
    // 替换所有领宽字符
    value = value.replace(zeroWidthRegex, "");
    // 替换所有空格
    value = value.replace(/\s+/g, "");
    value = value.replace("%", "");

    // 判断是否数字：允许小数点，允许负数
    if (!/^-?\d*\.?\d+$/.test(value)) {
      return 0;
    }

    value = parseFloat(value);
    return value;
  }
}

class SiyuanSpan {
  static InitBySelection() {
    const selection = window.getSelection(); // 获取选区
    if (
      selection !== null &&
      selection !== undefined &&
      selection.rangeCount > 0 &&
      !selection.isCollapsed
    ) {
      let siyuanSpan = new SiyuanSpan();

      siyuanSpan.block = mv.GetSiyuanBlock(selection.focusNode.parentElement);
      siyuanSpan.blockId = mv.GetSiyuanBlockId(
        selection.focusNode.parentElement
      );
      siyuanSpan.parentElement = selection.focusNode.parentElement;
      siyuanSpan.selectedText = selection.toString(); // 获取选中的文本
      siyuanSpan.startOffset = siyuanSpan.selectedText.indexOf(
        siyuanSpan.selectedText
      ); // 开始位置
      siyuanSpan.endOffset =
        siyuanSpan.startOffset + siyuanSpan.selectedText.length; // 结束位置

      // 起点和终点信息,
      const range = selection.getRangeAt(0);
      const selectedNodes = siyuanSpan.getSelectedNodes(range, selection);

      // 转换选中的 selectedNodes 为 InlineSpan 对象
      siyuanSpan.InlineList = selectedNodes.select((t) => {
        return InlineSpan.Init(t.dataType, t.text, t.style, t.selected,t.dom);
      });

      // 清除选区
      selection.removeAllRanges();

      return siyuanSpan;
    }
    return null;
  }

  // 对 this.InlineList 进行微章设置
  /**
   * 对 this.InlineList 进行微章设置
   * @param {*} dataType 微章类型
   * @param {*} dofunc 处理函数, 参数1 SpanList, 参数2，位置类型
   * @returns
   */
  setWZ(dataType, dofunc = null) {
    if (dataType === null || dataType === undefined || dataType === "") return;

    var dataTypeList = dataType.split(" ");
    var dataType_reverse = dataTypeList.reverse().join(" ");

    // 格式清洗
    this.InlineList.forEach((t) => {
      if (t.dataType === dataType_reverse) {
        t.dataType = dataType;
      }
    });

    // 选择 this.InlineList 中 selected 为 true 的对象
    let selectedNodes = this.InlineList.filter((item) => item.selected);
    if (selectedNodes.length === 0) return;

    // S1. 如果 this.InlineList 中只要有一个对象的 dataType 和 dataType 相等，就对this.InlineList中所有满足该条件的对象的 dataType 设置为 null 并退出函数
    // 检查是否有对象的 dataType 与传入的 dataType 相等
    const hasMatchingDataType = selectedNodes.some(
      (item) =>
        item.dataType === dataType || item.dataType === "text " + dataType
    );

    // 如果有匹配的对象,将所有匹配对象的 dataType 设置为 null 并退出
    if (hasMatchingDataType) {
      selectedNodes.forEach((item) => {
        if (item.dataType === dataType) {
          item.dataType = null;
        } else if (item.dataType === "text " + dataType) {
          item.dataType = "text";
        }
      });
      return;
    }

    // S2. 如果 this.InlineList 中没有对象的 dataType 和 dataType 相等，则进行循环处理：
    // 如果 this.dataType 包含 dataType 时, 不做任何处理,跳过本轮循环
    // 如果 this.dataType 为空、em 或者 code 时, 设置为 em code,否则不做任何处理,跳过本轮循环
    selectedNodes.forEach((item) => {
      // 如果 dataType 包含传入的 dataType 的一部分,跳过本轮循环

      if (item.dataType && item.dataType.includes(dataType)) {
        return;
      }

      // 如果 dataType 为空、em 或 code  || item.dataType === 'em' || item.dataType === 'code'
      // 如果 dataType ，或者 dataTypeList 中任何一个值和 item.dataType 相等，则设置为 dataType
      if (!item.dataType || dataTypeList.some((t) => t === item.dataType)) {
        item.dataType = dataType;
        if (
          dofunc !== null &&
          dofunc !== undefined &&
          typeof dofunc === "function"
        )
          dofunc(item, dataType);
      }

      // 如果是 text 类型则设置为 text dataType
      if (item.dataType === "text") item.dataType = "text " + dataType;

      // 其他情况跳过
    });
  }

  isSpan(node) {
    return node.nodeType === Node.ELEMENT_NODE && node.tagName === "SPAN";
  }

  // 通过 this.InlineList 更新选区
  async UpdateSelection(alsoStyles=true) {
    // 将 item.text 为 '' 的项移除
    this.InlineList = this.InlineList.filter((item) => item.text !== "");

    // 获取 this.selectedDoms 中第一个元素对应的 dom, document.body 前插入上面 InlineList 中的 dom,并删除所有 this.selectedDoms 中的元素
    let firstDom = this.selectedDoms[0];
    this.InlineList2Dom(firstDom);

    this.selectedDoms.forEach((item) => {
      item.remove();
    });

    // 获取 this.block 的孩子节点，对于连续的 span 对象，如果 dataType 和 style 相同，则合并为一项
    // 如果 dataType
    // let children = this.block.children[0].children;
    let children = this.block.childNodes[0].childNodes;
    //this.block.childNodes[0].childNodes.forEach(t=>children.push(t));
    children.forEach((node) => {
      node.textContent === "" && node.remove();
    });

    // 获取对应的 span 或者 textNode
    for (let i = 0; i < children.length; i++) {
      let item = children[i];
      let nextItem = i + 1 < children.length ? children[i + 1] : null;
      let beforeItem = i > 0 ? children[i - 1] : null;

      if (
        beforeItem !== null &&
        beforeItem !== undefined &&
        this.isSpan(beforeItem) &&
        this.isSpan(item)
      ) {
        let isOK = beforeItem.getAttribute("data-type") === item.getAttribute("data-type");
        if (alsoStyles===true){
          isOK = isOK && beforeItem.getAttribute("style") === item.getAttribute("style");
        }
        if (isOK) {
          item.textContent = beforeItem.textContent + item.textContent;
          beforeItem.remove();
          i--;
        }
      }

      if (
        nextItem !== null &&
        nextItem !== undefined &&
        this.isSpan(item) &&
        this.isSpan(nextItem)
      ) {
        if (
          item.getAttribute("data-type") ===
            nextItem.getAttribute("data-type") &&
          item.getAttribute("style") === nextItem.getAttribute("style")
        ) {
          item.textContent = item.textContent + nextItem.textContent;
          nextItem.remove();
          i--;
        }
      }
    }

    await mv.UpdateBlockByDom_API(this.blockId, this.block.outerHTML);
  }

  InlineList2Dom(firstDom) {
    // 将 this.InlineList 中的 dom 插入到 document.body 中
    this.InlineList.forEach((item) => {
      // 如果 firstDom 和 item.dom 是 textNode 的时候，如何插入
      if (
        firstDom.nodeType === Node.TEXT_NODE &&
        item.dom.nodeType === Node.TEXT_NODE
      ) {
        firstDom.parentNode?.insertBefore(item.dom, firstDom);
      } else {
        firstDom.parentNode?.insertBefore(item.dom, firstDom);
      }
    });
  }

  getSelectedNodes(range, selection) {
    const result = []; // 最终结果数组
    this.selectedDoms = []; // 最终需要删除的 span 和内容

    /** 获取起始节点和结束节点: 如果节点本身是 textNode 则判断父节点是否是 spanNode，如果是则取父节点，否则取本身 */
    const startNode =
      range.startContainer.nodeType === 3
        ? range.startContainer.parentElement?.hasAttribute("data-type")
          ? range.startContainer.parentElement
          : range.startContainer
        : range.startContainer;

    const endNode =
      range.endContainer.nodeType === 3
        ? range.endContainer.parentElement?.hasAttribute("data-type")
          ? range.endContainer.parentElement
          : range.endContainer
        : range.endContainer;

    let currentNode = startNode; // 当前节点从 `startNode` 开始

    while (currentNode) {
      this.selectedDoms.push(currentNode);
      // 获取 node 的类型
      const nodeType =
        currentNode.nodeType === Node.TEXT_NODE ? "textNode" : "spanNode";
        
      // 获取 node 对应的问题：如果是 TEXT 获取 nodeValue,否则获取 textContent
      const currentText =
        currentNode.nodeType === Node.TEXT_NODE
          ? currentNode.nodeValue
          : currentNode.textContent;
      // 如果是 spanNode 获取 style 信息
      const styleInfo =
        currentNode.nodeType === Node.ELEMENT_NODE
          ? currentNode.getAttribute("style")
          : null;
      // 如果是 spanNode 获取 dataType 信息
      const dataType =
        currentNode.nodeType === Node.ELEMENT_NODE
          ? currentNode.getAttribute("data-type")
          : null;

      // 根据各个部分拆分
      // 修改下面各部分的 result 的 push 方法, 添加 styleInfo 信息, 添加 dataType 信息
      if (currentNode === startNode && currentNode === endNode) {
        if (selection.selectedText === currentText) {
          /* 选中部分 */
          result.push({
            type: nodeType,
            text: currentText,
            selected: true,
            style: styleInfo,
            dataType: dataType,
            dom: currentNode,
          });
        } else {
          /* 选中部分 */
          const beforeText = currentText.substring(0, range.startOffset); // 未选中部分
          const selectedText = currentText.substring(
            range.startOffset,
            range.endOffset
          );
          // 未选中部分
          const afterText = currentText.substring(range.endOffset); // 未选中部分
          if (beforeText) {
            // 注意: dataType 为 null 时直接传入 null 值,不要转为字符串 "null"
            result.push({
              type: nodeType,
              text: beforeText,
              selected: false,
              style: styleInfo,
              dataType: dataType,
              dom: currentNode,
            });
          }
          if (selectedText) {
            result.push({
              type: nodeType,
              text: selectedText,
              selected: true,
              style: styleInfo,
              dataType: dataType,
              dom: currentNode,
            });
          }
          if (afterText) {
            result.push({
              type: nodeType,
              text: afterText,
              selected: false,
              style: styleInfo,
              dataType: dataType,
              dom: currentNode,
            });
          }
        }
        break; // 结束处理，退出循环
      } else if (currentNode === startNode) {
        // 起始节点，可能需要拆分
        const beforeText = currentText.substring(0, range.startOffset); // 未选中部分
        const selectedText = currentText.substring(range.startOffset); // 选中部分
        if (beforeText) {
          result.push({
            type: nodeType,
            text: beforeText,
            selected: false,
            style: styleInfo,
            dataType: dataType,
            dom: currentNode,
          });
        }
        if (selectedText) {
          result.push({
            type: nodeType,
            text: selectedText,
            selected: true,
            style: styleInfo,
            dataType: dataType,
            dom: currentNode,
          });
        }
      } else if (currentNode === endNode) {
        // 结束节点，可能需要拆分
        const selectedText = currentText.substring(0, range.endOffset); // 选中部分
        const afterText = currentText.substring(range.endOffset); // 未选中部分
        if (selectedText) {
          result.push({
            type: nodeType,
            text: selectedText,
            selected: true,
            style: styleInfo,
            dataType: dataType,
            dom: currentNode,
          });
        }
        if (afterText) {
          result.push({
            type: nodeType,
            text: afterText,
            selected: false,
            style: styleInfo,
            dataType: dataType,
            dom: currentNode,
          });
        }
        break; // 结束处理，退出循环
      } else {
        // 中间节点全部选中
        result.push({
          type: nodeType,
          text:
            currentNode.nodeType === Node.TEXT_NODE
              ? currentText
              : currentNode.textContent,
          selected: true,
          style: styleInfo,
          dataType: dataType,
          dom: currentNode,
        });
      }

      currentNode = currentNode.nextSibling; // 移动到下一个节点
    }

    // 当 result 中 dataType 或者 style 为 null 时，设置为 null ，而非 "null"
    result.forEach((item) => {
      if (item.dataType === "null") {
        item.dataType = null;
      }
      if (item.style === "null") {
        item.style = null;
      }
    });

    return result;
  }
}

//#region

//#endregion

Array.prototype.select = function (expr) {
  var arr = this;
  //do custom stuff
  return arr.map(expr); //or $.map(expr);
};

Array.prototype.where = function (filter) {
  var collection = this;

  switch (typeof filter) {
    case "function":
      return $.grep(collection, filter);

    case "object":
      for (var property in filter) {
        if (!filter.hasOwnProperty(property)) continue; // ignore inherited properties

        collection = $.grep(collection, function (item) {
          return item[property] === filter[property];
        });
      }
      return collection.slice(0); // copy the array
    // (in case of empty object filter)

    default:
      throw new TypeError(
        "func must be either a" +
          "function or an object of properties and values to filter by"
      );
  }
};

Array.prototype.firstOrDefault = function (func) {
  return this.where(func)[0] || null;
};
