export { VLookPluginEnter, VlookItemBase, setWzLabel, CloaseCommonMenu,isZeroWidthCharacterOrNull };

import { InlineSpan, SiyuanSpan, VlookSpan } from "./domex.js";
import { isKey } from "./hotkey.js";
import { mv } from "./mv-util.js";

function AddWzLabel(e) {
  let wzitem = new VlookItemBase();
  wzitem.id = "wzLabel";
  wzitem.name = "wz-label";
  wzitem.customF = "wz";
  wzitem.showName = "微章";
  wzitem.tooltip = {
    icon: '<svg t="1734919902957" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14227" width="32" height="32"><path d="M537.6 204.8V102.4h-51.2v102.4H102.4v614.4h384v102.4h51.2v-102.4H921.6V204.8h-384zM870.4 768h-332.8V256H870.4v512z" fill="#677BA5" p-id="14228"></path></svg>',
    title: "微章 ALT+W",
    isShow: true,
  };
  wzitem.comMenu = {
    isShowEdit: true, // 编辑器
    isShowColor1: true, // 颜色1：常规
    isShowColor2: true, // 颜色2：强调
    isShowInsertBefore: true, // 插入空白到前面
    isShowInsertAfter: true, // 插入空白到后面
  };
  wzitem.mdtype1 = "em";
  wzitem.mdtype2 = "code";
  wzitem.subtype = "spanEmCodeList"; //  子类型

  /**  md1(P1) + md1 md2(P2) + md1(P1)
   *  P1Typ1+P2TYype2  || P1Type2+P2Type1
   */
  wzitem.MustCheckedP1Type = false;
  wzitem.MustCheckedP2Type = false;
  wzitem.P1Type1 = ""; // 类型1 的状态1
  wzitem.P1Type2 = ""; // 类型1 的状态2
  wzitem.P2Type2 = ""; // 类型2 的状态2

  wzitem.isMdType1Added = (node) => null;
  wzitem.isMdType2Added = (node) => null;

  wzitem.enableColor1 = true; // 支持颜色1
  wzitem.enableColor2 = true; // 支持颜色2
  wzitem.colorCondig1 = {
    // 色号
    emSub: null,
    // mdType1
    mdtyp1: {
      color: "nameColor",
      bgcolor: "nameBgColor",
      styleList: [],
      classList: [],
    },
    // mdType1 和 mdType1 的时候
    mdtyp1AND2: {
      color: "valueColor",
      bgcolor: "valueBgColor",
      styleList: [],
      classList: [],
    },
    // 只有 mdType1 和 mdType1 的时候
    onlyMdtyp1AND2: {
      color: "onlyValueColor",
      bgcolor: "onlyValueBgColor",
      styleList: [],
      classList: [],
    },
  };
  wzitem.colorCondig2 = {
    // 色号
    emSub: null,
    // mdType1
    mdtyp1: {
      color: "nameColor",
      bgcolor: "nameBgColor",
      styleList: [],
      classList: [],
    },
    // mdType1 和 mdType1 的时候
    mdtyp1AND2: {
      color: "valueColor",
      bgcolor: "valueBgColor",
      styleList: [],
      classList: [],
    },
    // 只有 mdType1 和 mdType1 的时候
    onlyMdtyp1AND2: {
      color: "nameColor",
      bgcolor: "nameBgColor",
      styleList: [],
      classList: [],
    },
  };

  wzitem.tgkey1 = "T2";
  wzitem.tgkey2 = "T2!";

  wzitem.setColor1 = (event) => {};
  wzitem.setColor2 = (event) => {};
  wzitem.enableTypy1No1 = true; // 允许出现开始的 mdType1
  wzitem.enableTypy1No2 = true; // 允许出现结束的 mdType1

  wzitem.OnClickMdTyp1 = null;
  wzitem.OnClickMdTyp1AndType2 = null;

  // 快捷键
  wzitem.hotkey = {
    enable: true, // 是否启用
    ctrlKey: true, // Ctrl
    metaKey: false, // Meta
    shiftKey: false, // Shift
    altKey: true, // Alt
    key: "w", // 快捷键
  };

  wzitem.onSetWzLabel = async (e) => {
    await setWzLabel(e, "em code");
  };

  wzitem.OnKeyUp = async (e, args) => {
    return;
    let spanList = args.dom;
    spanList.forEach((span) => {
      if (!span.HasDataType("wzlabel") && !span.dataType !== "em sub" && !span.dataType !== "sub em") {
        span.dataType = span.dataType + " wzlabel";
      }
    });
  };
  VLookPluginEnter.items.push(wzitem);
}

function AddWzLabelCHK(e) {
  let wzitem = new VlookItemBase();
  wzitem.id = "wzLabelChk";
  wzitem.name = "wz-label-chk";
  wzitem.customF = "wz-chk";
  wzitem.showName = "复选框";
  wzitem.tooltip = {
    icon: '<svg t="1736947727475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1456" width="200" height="200"><path d="M947.2 194.56l-20.48-40.96c-51.2 30.72-97.28 66.56-143.36 97.28-46.08-51.2-112.64-81.92-189.44-81.92h-204.8c-143.36 0-256 112.64-256 256v204.8c0 143.36 112.64 256 256 256h204.8c143.36 0 256-112.64 256-256v-204.8c0-40.96-10.24-76.8-25.6-107.52 40.96-46.08 81.92-87.04 122.88-122.88z m-148.48 225.28v204.8c0 112.64-92.16 204.8-204.8 204.8h-204.8c-112.64 0-204.8-92.16-204.8-204.8v-204.8c0-112.64 92.16-204.8 204.8-204.8h204.8c56.32 0 112.64 25.6 148.48 61.44-122.88 97.28-215.04 194.56-261.12 256L307.2 399.36 230.4 460.8l302.08 302.08c35.84-97.28 133.12-256 261.12-404.48 0 20.48 5.12 40.96 5.12 61.44z" fill="#1296db" p-id="1457"></path></svg>',
    title: "复选框",
    isShow: true,
  };
  wzitem.comMenu = {
    isShowEdit: true, // 编辑器
    isShowColor1: true, // 颜色1：常规
    isShowColor2: true, // 颜色2：强调
    isShowInsertBefore: true, // 插入空白到前面
    isShowInsertAfter: true, // 插入空白到后面
  };
  wzitem.mdtype1 = "em";
  wzitem.mdtype2 = "code";
  wzitem.subtype = "spanEmCHKCodeList"; // 子类型

  /**  md1(P1) + md1 md2(P2) + md1(P1)
   *  P1Typ1+P2TYype2  || P1Type2+P2Type1
   */
  wzitem.MustCheckedP1Type = true;
  wzitem.MustCheckedP2Type = true;
  wzitem.P1Type1 = "unchk"; // 类型1 的状态1
  wzitem.P1Type2 = "chked"; // 类型1 的状态2
  wzitem.P2Type1 = "chked"; // 类型2 的状态1
  wzitem.P2Type2 = "unchk"; // 类型2 的状态2

  wzitem.isMdType1Added = (node) => null;
  wzitem.isMdType2Added = (node) => null;

  wzitem.enableColor1 = true; // 支持颜色1
  wzitem.enableColor2 = true; // 支持颜色2

  wzitem.colorCondig1 = {
    // 色号
    emSub: null,
    // mdType1
    mdtyp1: {
      color: null,
      bgcolor: null,
      styleList: [
        {
          name: "--theme-wzline-chked-nameBgcolor",
          value: "nameBgColor",
        },
        {
          name: "--theme-wzline-chked-nameColor",
          value: "nameColor",
        },
      ],
      classList: [],
    },
    // mdType1 和 mdType1 的时候
    mdtyp1AND2: {
      color: null,
      bgcolor: null,
      styleList: [
        {
          name: "--theme-wzline-chked-nameBgcolor",
          value: "nameBgColor",
        },
        {
          name: "--theme-wzline-chked-nameColor",
          value: "nameColor",
        },
      ],
      classList: [],
    },
    // 只有 mdType1 和 mdType1 的时候
    onlyMdtyp1AND2: null,
  };
  wzitem.colorCondig2 = wzitem.colorCondig1;

  wzitem.tgkey1 = "T2";
  wzitem.tgkey2 = "T2!";

  wzitem.setColor1 = (e) => {};
  wzitem.setColor2 = (e) => {};
  wzitem.enableTypy1No1 = true; // 允许出现开始的 mdType1
  wzitem.enableTypy1No2 = false; // 允许出现结束的 mdType1

  wzitem.OnClickMdTyp1 = async (e, args) => {
    let currentNode = args.currentNode;
    let nextNode = args.nextNode;
    let item = args.item;
    let chk = currentNode.getAttribute("data-type");
    if (item.isWithP1Type1(currentNode)) {
      currentNode.setAttribute("data-type", "em chked");
      // 设置 currentNode 的 textContent 为 [ ]
      currentNode.textContent = "[x]";
      nextNode.setAttribute("data-type", "em code chked");

      let block = mv.GetSiyuanBlock(currentNode);
      let id = mv.GetSiyuanBlockId(currentNode);
      await mv.UpdateBlockByDom_API(id, block.outerHTML);
      return;
    }

    if (item.isWithP1Type2(currentNode)) {
      currentNode.setAttribute("data-type", "em unchk");
      currentNode.textContent = "[ ]";
      nextNode.setAttribute("data-type", "em code unchk");

      let block = mv.GetSiyuanBlock(currentNode);
      let id = mv.GetSiyuanBlockId(currentNode);
      await mv.UpdateBlockByDom_API(id, block.outerHTML);
      return;
    }
  };
  wzitem.OnClickMdTyp1AndType2 = null;
  // 快捷键
  wzitem.hotkey = {
    enable: false, // 是否启用
    ctrlKey: true, // Ctrl
    metaKey: false, // Meta
    shiftKey: false, // Shift
    altKey: true, // Alt
    key: "", // 快捷键
  };

  wzitem.onSetWzLabel = async (e) => {
    await setWzLabel(e, "em code unchk", null, (siyuanSpan) => {
      let span = siyuanSpan.InlineList[0];
      // 找到 siyuanSpan 中的 em unchk 或 em chked
      let emUnchk = siyuanSpan.InlineList.find(
        (item) => item.dataType === "em unchk"
      );
      let emChked = siyuanSpan.InlineList.find(
        (item) => item.dataType === "em chked"
      );

      // 找到 siyuanSpan 中的 em code chked 或 em code unchk
      let emCodeChked = siyuanSpan.InlineList.find(
        (item) => item.dataType === "em code chked"
      );
      let emCodeUnchk = siyuanSpan.InlineList.find(
        (item) => item.dataType === "em code unchk"
      );

      // 如果存在 em unchk 或 em chked ,移除 em code 样式
      if (emUnchk || emCodeChked) {
        emUnchk?.RemoveDataType("em code chked unchk");
        emChked?.RemoveDataType("em code chked unchk");
        emCodeUnchk?.RemoveDataType("em code chked unchk");
        emCodeChked?.RemoveDataType("em code chked unchk");

        // 如果 emUnchk 存在，从 siyuanSpan 中移除 emUnchk
        if (emUnchk) {
          siyuanSpan.InlineList.splice(
            siyuanSpan.InlineList.indexOf(emUnchk),
            1
          );
        }

        // 如果 emChked 存在，从 siyuanSpan 中移除 emChked
        if (emChked) {
          siyuanSpan.InlineList.splice(
            siyuanSpan.InlineList.indexOf(emChked),
            1
          );
        }

        return;
      }

      let span2 = InlineSpan.Init("em unchk", "[ ]");
      if (emCodeUnchk) {
        // 找到 emCodeUnchk 的位置, 在 emCodeUnchk 前面插入 em unchk
        let index = siyuanSpan.InlineList.indexOf(emCodeUnchk);
        siyuanSpan.InlineList.splice(index, 0, span2);
      }
    });
    
  };
  VLookPluginEnter.items.push(wzitem);
}

function AddWzLabelCount(e) {
  let wzitem = new VlookItemBase();
  wzitem.id = "wzLabelCount";
  wzitem.name = "wz-label-count";
  wzitem.customF = "wz-count";
  wzitem.showName = "计数任务";
  wzitem.tooltip = {
    icon: '<svg t="1737818231142" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4727" width="200" height="200"><path d="M303.07 360.36v303.29h-34.81V402.78c-18.71 19.28-42.51 33.16-71.36 41.64v-34.81c13.27-3.7 27.41-9.92 42.47-18.71 13.88-8.49 26.02-18.71 36.55-30.59h27.15v0.05z m180.89-5.88c28.07 0 51.13 8.05 69.27 24.19 18.1 16.41 27.15 37.81 27.15 64.14 0 26.07-9.88 49.82-29.72 71.36-11.62 12.18-32.55 28.46-62.88 48.82-38.51 25.8-60.57 49-66.23 69.66h159.26v31.02H378.65c0-28.02 10.01-53.09 30.16-75.19 13.01-14.71 34.94-32.72 65.83-53.96 24.06-17.28 39.9-29.85 47.56-37.77 15.58-16.97 23.37-35.12 23.37-54.39 0-18.41-5.53-32.72-16.54-42.9-11.09-10.18-26.54-15.27-46.34-15.27-21.24 0-37.25 7.05-48 21.23-12.18 13.88-18.41 34.11-18.71 60.74h-34.81c0-33.72 9.49-60.74 28.46-81.15 18.72-20.35 43.52-30.53 74.33-30.53z m239.93 0c29.46 0 52.96 7.35 70.49 22.06 17.58 15.01 26.37 35.12 26.37 60.31 0 34.29-16.58 56.92-49.74 67.97 18.14 5.66 31.76 14.32 40.82 25.89 10.18 11.92 15.27 26.76 15.27 44.6 0 27.5-9.62 50-28.89 67.53-19.54 17.84-44.99 26.76-76.45 26.76-28.28 0-51.78-7.35-70.49-22.06-21.54-17.84-33.55-43.77-36.12-77.71h35.25c0.87 23.76 8.79 41.9 23.8 54.35 13.05 10.44 28.89 15.71 47.56 15.71 21.54 0 38.94-6.22 52.22-18.71 12.18-12.19 18.28-26.98 18.28-44.56 0-18.15-5.92-32.29-17.84-42.47-11.57-9.92-28.02-14.88-49.26-14.88h-24.63v-27.28h23.37c20.1 0 35.55-4.53 46.3-13.58 10.75-9.36 16.1-22.54 16.1-39.51 0-16.71-5.22-29.89-15.67-39.51-10.79-9.92-26.19-14.84-46.3-14.84-20.67 0-36.55 5.35-47.6 16.1-11.57 10.79-18.54 26.5-20.8 47.17h-34.37c2.52-29.16 13.27-52.09 32.24-68.8 17.58-16.45 40.9-24.63 70.1-24.63v0.09z m0 0" p-id="4728"></path><path d="M794.17 147.91c45.16 0.2 81.71 36.76 81.92 81.92v564.34c-0.2 45.16-36.76 81.71-81.92 81.92H229.83c-45.16-0.2-81.71-36.76-81.92-81.92V229.83c0.2-45.16 36.76-81.71 81.92-81.92h564.34m0-45.51H229.83c-70.09 0-127.43 57.34-127.43 127.43v564.34c0 70.08 57.34 127.43 127.43 127.43h564.34c70.08 0 127.43-57.34 127.43-127.43V229.83c0-70.09-57.34-127.43-127.43-127.43z m0 0" p-id="4729"></path></svg>',
    title: "计数任务",
    isShow: true,
  };
  wzitem.comMenu = {
    isShowEdit: true, // 编辑器
    isShowColor1: true, // 颜色1：常规
    isShowColor2: true, // 颜色2：强调
    isShowInsertBefore: true, // 插入空白到前面
    isShowInsertAfter: true, // 插入空白到后面
  };
  wzitem.mdtype1 = "em";
  wzitem.mdtype2 = "code";
  wzitem.subtype = "spanEmCountCodeList"; // 子类型

  /**  md1(P1) + md1 md2(P2) + md1(P1)
   *  P1Typ1+P2TYype2  || P1Type2+P2Type1
   */
  wzitem.MustCheckedP1Type = true;
  wzitem.MustCheckedP2Type = true;
  wzitem.P1Type1 = "count"; // 类型1 的状态1
  wzitem.P1Type2 = "count"; // 类型1 的状态2
  wzitem.P2Type1 = "count"; // 类型2 的状态1
  wzitem.P2Type2 = "count"; // 类型2 的状态2

  wzitem.isMdType1Added = (node) => null;
  wzitem.isMdType2Added = (node) => null;

  wzitem.enableColor1 = true; // 支持颜色1
  wzitem.enableColor2 = true; // 支持颜色2

  wzitem.colorCondig1 = {
    // 色号
    emSub: null,
    // mdType1
    mdtyp1: {
      color: null,
      bgcolor: null,
      styleList: [
        {
          name: "--theme-wzline-count-nameBgcolor",
          value: "nameBgColor",
        },
        {
          name: "--theme-wzline-count-nameColor",
          value: "nameColor",
        },
      ],
      classList: [],
    },
    // mdType1 和 mdType1 的时候
    mdtyp1AND2: {
      color: null,
      bgcolor: null,
      styleList: [
        {
          name: "--theme-wzline-count-nameBgcolor",
          value: "nameBgColor",
        },
        {
          name: "--theme-wzline-count-nameColor",
          value: "nameColor",
        },
      ],
      classList: [],
    },
    // 只有 mdType1 和 mdType1 的时候
    onlyMdtyp1AND2: null,
  };
  wzitem.colorCondig2 = wzitem.colorCondig1;

  wzitem.tgkey1 = "T2";
  wzitem.tgkey2 = "T2!";

  wzitem.setColor1 = (e) => {};
  wzitem.setColor2 = (e) => {};
  wzitem.enableTypy1No1 = true; // 允许出现开始的 mdType1
  wzitem.enableTypy1No2 = false; // 允许出现结束的 mdType1

  wzitem.OnClickMdTyp1 = async (e, args) => {

    let getNewText = (text) => {
      let num = parseInt(text);
      const regex = /\+(\[(\d+)\])/;  // 匹配 "+[数字]" 格式
      const match = text.match(regex);
      if (match)
      {
        let num = parseInt(match[2]);
        num++;
        return `+[${num}]`;
      }
      return text;
    }
    let currentNode = args.currentNode;
    let nextNode = args.nextNode;
    let item = args.item;
    let chk = currentNode.getAttribute("data-type");
    if (item.isWithP1Type1(currentNode)) {
      currentNode.setAttribute("data-type", "em count");
      
      currentNode.textContent = getNewText(currentNode.textContent);
      nextNode.setAttribute("data-type", "em code count");

      let block = mv.GetSiyuanBlock(currentNode);
      let id = mv.GetSiyuanBlockId(currentNode);
      await mv.UpdateBlockByDom_API(id, block.outerHTML);
      return;
    }

    if (item.isWithP1Type2(currentNode)) {
      currentNode.setAttribute("data-type", "em count");
      currentNode.textContent = getNewText(currentNode.textContent);
      nextNode.setAttribute("data-type", "em code count");

      let block = mv.GetSiyuanBlock(currentNode);
      let id = mv.GetSiyuanBlockId(currentNode);
      await mv.UpdateBlockByDom_API(id, block.outerHTML);
      return;
    }
  };
  wzitem.OnClickMdTyp1AndType2 = null;
  // 快捷键
  wzitem.hotkey = {
    enable: false, // 是否启用
    ctrlKey: true, // Ctrl
    metaKey: false, // Meta
    shiftKey: false, // Shift
    altKey: true, // Alt
    key: "", // 快捷键
  };

  wzitem.onSetWzLabel = async (e) => {
    await setWzLabel(e, "em code count", null, (siyuanSpan) => {
      let span = siyuanSpan.InlineList[0];
      // 找到 siyuanSpan 中的 em unchk 或 em chked
      let em = siyuanSpan.InlineList.find(
        (item) => item.dataType === "em count"
      );
      // 找到 siyuanSpan 中的 em code chked 或 em code unchk
      let emCode = siyuanSpan.InlineList.find(
        (item) => item.dataType === "em code count"
      );
      // 如果存在 em unchk 或 em chked ,移除 em code 样式
      if (em) {
        em?.RemoveDataType("em");
        // 如果 emUnchk 存在，从 siyuanSpan 中移除 emUnchk
        if (em) {
          siyuanSpan.InlineList.splice(
            siyuanSpan.InlineList.indexOf(em),
            1
          );
        }
        return;
      }

      let span2 = InlineSpan.Init("em count", "+[0]");
      if (emCode) {
        // 找到 emCodeUnchk 的位置, 在 emCodeUnchk 前面插入 em unchk
        let index = siyuanSpan.InlineList.indexOf(emCode);
        siyuanSpan.InlineList.splice(index, 0, span2);
      }
    });
    
  };
  VLookPluginEnter.items.push(wzitem);
}

function AddCoatingLabel(e) {
  let wzitem = new VlookItemBase();
  wzitem.id = "wzCoating";
  wzitem.name = "wz-coating";
  wzitem.customF = "rb";
  wzitem.showName = "刮刮卡";
  wzitem.tooltip = {
    icon: '<svg t="1735097432879" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5810" id="mx_n_1735097432880" width="32" height="32"><path d="M879.158 196.113 147.444 196.113c-43.11 0-78.278 35.109-78.278 78.22L69.166 745.67c0 43.105 35.168 78.166 78.278 78.166l731.714 0c43.11 0 78.221-35.061 78.221-78.166L957.379 274.333C957.379 231.222 922.269 196.113 879.158 196.113L879.158 196.113 879.158 196.113zM895.315 347.572 273.188 347.572c0.054 0.397 0.113 0.9 0.113 1.345l0 73.695c0.728-0.954 1.843-1.677 3.353-2.072 2.405-0.61 4.697-1.281 7.043-2.014l1.509-0.498c1.51-0.444 3.021-0.954 4.477-1.397 0.954-0.787 2.18-1.232 3.636-1.344l0.723 0c5.817-1.676 11.745-2.903 18.064-2.453 1.226 0.054 2.288 0.498 3.182 1.06 9.168-6.602 22.588-8.279 33.047-9.676 13.641-1.79 28.288-2.908 41.878 0 4.976 1.118 5.532 6.207 3.24 9.452 4.14 0.669 8.279 1.729 12.243 3.293 0.504-0.777 1.173-1.505 2.243-2.067 10.562-6.089 23.758-1.172 33.209 4.922 9.672 6.265 20.018 14.989 23.538 26.391 0.674 1.956 0.279 3.632-0.562 4.922 4.926 9.5 7.55 20.296 8.332 31.591l422.859 0 0 262.955c0 8.833-7.267 16.157-16.157 16.157L147.444 761.834c-8.948 0-16.216-7.324-16.216-16.157L131.228 482.72l0.558 0L131.786 347.572l-0.558 0 0-73.24c0-8.889 7.268-16.157 16.216-16.157l731.714 0c8.891 0 16.157 7.214 16.157 16.157L895.315 347.572 895.315 347.572 895.315 347.572zM176.738 389.843c10.401-5.64 18.9 0 25.386 9.618 0 0 67.654 108.805 68.436 110.095 3.356 5.366 13.083 3.743 16.891 1.73 5.136-2.795 8.043-11.407 1.392-22.139l-11.798-17.448c-7.042-9.5-0.112-17.501 10.009-24.045 1.398-0.948 2.743-1.73 4.14-2.453 8.553-4.643 16.544-5.591 22.644 2.628l13.419 19.677c4.863 4.921 8.216 5.425 10.455 4.193 3.577-1.955 4.359-8.445 4.359-8.445l-3.802-9.95c-3.299-8.387-0.445-13.474 6.374-17.164 2.072-1.061 4.364-2.014 7.046-2.909 11.631-3.968 24.491-5.087 28.629 5.816l3.015 7.776-0.057 0c0 0 4.979 23.981 10.458 20.965 0.728-0.336 1.452-1.231 2.18-2.682l0 0 1.902-8.387c0.224-4.98 2.233-8.001 5.482-9.731 4.302-2.404 10.675-2.57 17.723-2.292 12.355 0.392 14.871 11.739 21.528 34.216l29.406 132.899 27.006 44.955L388.42 716.541l-28.683-45.854c0 0-28.287 0.675-66.813-21.076l-95.776-16.211c-12.189-2.074-20.238-12.974-18.059-24.378 1.227-6.316 5.366-11.46 10.85-14.539 4.415-2.292 9.727-3.301 15.152-2.406l55.123 6.321c4.032 0.555 7.047 0.391 9.06-0.782 7.83-4.247-0.169-22.256-26.225-64.521L170.59 418.253c-6.597-9.79-4.975-21.866 5.479-28.014C176.29 390.126 176.52 389.96 176.738 389.843M162.145 366.086c-0.556 0.273-1.118 0.558-1.621 0.835-11.681 6.935-19.848 17.614-22.922 30.247-3.02 12.468 2.405 23.543 9.501 34.445l72.355 114.558c4.692 7.664 6.989 15.102 10.122 20.461l-19.911-1.618c-11.793-1.84-23.987 0.228-34.329 5.818-13.196 7.212-22.311 19.349-24.987 33.437-5.035 26.334 13.64 51.436 41.654 56.186l90.683 15.327c24.323 12.912 45.235 18.337 59.321 20.683l20.243 32.49 14.76 23.483 25.159-13.587 110.541-59.832 25.104-13.584-14.202-23.708-23.986-39.862-28.459-128.934L471 472.203l-0.22-0.724-1.226-3.973c-3.363-11.348-5.988-20.351-10.513-28.126-10.737-18.557-27.848-21.802-37.017-22.134-6.763-0.226-13.698-0.172-20.575 1.28-10.512-12.912-30.193-21.186-59.771-11.123-4.418 1.456-8.215 3.132-11.684 4.979-3.241 1.784-6.207 3.743-8.778 5.924-11.686-5.596-27.12-6.545-44.728 3.02-1.954 1.114-8.894 4.916-10.962 6.314-3.015 1.96-5.756 3.973-8.215 6.036-13.924-22.3-26.895-43.213-29.861-48.027l-0.279-0.387-0.279-0.336C212.08 362.67 186.304 353.002 162.145 366.086L162.145 366.086 162.145 366.086 162.145 366.086 162.145 366.086zM162.145 366.086" fill="#13227a" p-id="5811"></path></svg>',
    title: "刮刮卡 CTRL+ALT+C",
    isShow: true,
  };
  wzitem.comMenu = {
    isShowEdit: true, // 编辑器
    isShowColor1: true, // 颜色1：常规
    isShowColor2: true, // 颜色2：强调
    isShowInsertBefore: true, // 插入空白到前面
    isShowInsertAfter: true, // 插入空白到后面
  };
  wzitem.mdtype1 = "em";
  wzitem.mdtype2 = "strong";
  wzitem.subtype = "spanEmStrongList"; //  子类型

  /**  md1(P1) + md1 md2(P2) + md1(P1)
   *  P1Typ1+P2TYype2  || P1Type2+P2Type1
   */
  wzitem.MustCheckedP1Type = false;
  wzitem.MustCheckedP2Type = false;
  wzitem.P1Type1 = "wzCoatShow"; // 类型1 的状态1
  wzitem.P1Type2 = "wzCoatHide"; // 类型1 的状态2
  wzitem.P2Type1 = "wzCoatShow"; // 类型2 的状态1
  wzitem.P2Type2 = "wzCoatHide"; // 类型2 的状态2

  wzitem.isMdType1Added = (node) => null;
  wzitem.isMdType2Added = (node) => null;

  wzitem.enableColor1 = true; // 支持颜色1
  wzitem.enableColor2 = true; // 支持颜色2
  wzitem.colorCondig1 = {
    // 色号
    emSub: null,
    // mdType1
    mdtyp1: {
      color: null,
      bgcolor: null,
      styleList: [
        {
          name: "--theme-wzline-coating-nameBgColor",
          value: "nameBgColor",
        },
      ],
      classList: [],
    },
    // mdType1 和 mdType1 的时候
    mdtyp1AND2: {
      color: null,
      bgcolor: null,
      styleList: [
        {
          name: "--theme-wzline-coating-nameBgColor",
          value: "nameBgColor",
        },
      ],
      classList: [],
    },
    // 只有 mdType1 和 mdType1 的时候
    onlyMdtyp1AND2: null,
  };
  wzitem.colorCondig2 = wzitem.colorCondig1;

  wzitem.tgkey1 = "Gy";
  wzitem.tgkey2 = "Gy!";

  wzitem.setColor1 = (event) => {};
  wzitem.setColor2 = (event) => {};
  wzitem.enableTypy1No1 = true; // 允许出现开始的 mdType1
  wzitem.enableTypy1No2 = false; // 允许出现结束的 mdType1

  wzitem.OnClickMdTyp1 = async (e, args) => {
    let currentNode = args.currentNode;
    let nextNode = args.nextNode;
    currentNode.setAttribute("data-type", "em wzCoatHide");
    nextNode.setAttribute("data-type", "em strong wzCoatShow");
  };

  wzitem.OnClickMdTyp1AndType2 = async (e, args) => {
    let currentNode = args.currentNode;
    let previousNode = args.previousNode;
    currentNode.setAttribute("data-type", "em strong wzCoatHide");
    previousNode.setAttribute("data-type", "em wzCoatShow");
  };

  wzitem.onSetWzLabel = async (e) => {
    await setWzLabel(e, "em strong wzCoatHide", null, (siyuanSpan) => {

      let emShow = siyuanSpan.InlineList.find(
        (item) => item.dataType == "em wzCoatShow"
      );
      let emHide = siyuanSpan.InlineList.find(
        (item) => item.dataType == "em wzCoatHide"
      );
      let emNo1 = emShow?emShow:emHide;

      let emStrongShow = siyuanSpan.InlineList.find(
        (item) =>
          item.dom.nodeType !== Node.TEXT_NODE &&
          item.dom.getAttribute("data-type") == "em strong wzCoatShow"
      );
      let emStrongHide = siyuanSpan.InlineList.find(
        (item) =>
          item.dom.nodeType !== Node.TEXT_NODE &&
          item.dom.getAttribute("data-type") == "em strong wzCoatHide"
      );

      let emStrong = emStrongShow?emStrongShow:emStrongHide;
      let emNo1Dom = null;
      let emStrongDom = null;

      if (emStrong){
        emNo1Dom = getPreviousSibling(emStrong.outDom);
        emNo1 = new InlineSpan(emNo1Dom);
        emStrongDom = emStrong.outDom;
      }else{
        emNo1Dom = emNo1?.outDom;
        emStrongDom = getNextSibling(emNo1Dom);
        emStrong = new InlineSpan(emStrongDom);
      }

      if (emNo1?.text == "••••"){
        // siyuanSpan.InlineList.splice(siyuanSpan.InlineList.indexOf(emShow), 1);
        emNo1Dom?.remove();
        emStrong.RemoveDataType("em strong wzCoatHide wzCoatShow",emStrongDom);
        return;
      }

      if (emNo1?.HasDataType("em wzCoatHide") || emNo1?.HasDataType("em wzCoatShow")){
        emNo1.RemoveDataType("em wzCoatHide wzCoatShow",emNo1Dom);
        emStrong.RemoveDataType("em strong wzCoatHide wzCoatShow",emStrongDom);
        return;
      }

      let span2 = InlineSpan.Init("em wzCoatShow", "••••");
      if (emStrong) {
        // 找到 emCodeUnchk 的位置, 在 emCodeUnchk 前面插入 em unchk
        let index = siyuanSpan.InlineList.indexOf(emStrong);
        emStrong.dataType = "em strong wzCoatHide";
        siyuanSpan.InlineList.splice(index, 0, span2);
      }

      return;

    });
  };
  // 快捷键
  wzitem.hotkey = {
    enable: true, // 是否启用
    ctrlKey: true, // Ctrl
    metaKey: false, // Meta
    shiftKey: false, // Shift
    altKey: true, // Alt
    key: "c", // 快捷键
  };
  VLookPluginEnter.items.push(wzitem);
}

function AddWzPgbar(e) {
  let wzitem = new VlookItemBase();
  wzitem.id = "wzPgbar";
  wzitem.name = "wz-pgbar";
  wzitem.customF = "pg";
  wzitem.showName = "进度条";
  wzitem.tooltip = {
    icon: '<svg t="1735531168675" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2700" width="32" height="32"><path d="M768 896H256a160 160 0 0 1 0-320h512a160 160 0 0 1 0 320zM256 640a96 96 0 0 0 0 192h512a96 96 0 0 0 0-192z" fill="#4A8BFE" p-id="2701"></path><path d="M128 608m128 0l128 0q128 0 128 128l0 0q0 128-128 128l-128 0q-128 0-128-128l0 0q0-128 128-128Z" fill="#4A8BFE" p-id="2702"></path><path d="M384 896H256a160 160 0 0 1 0-320h128a160 160 0 0 1 0 320z m-128-256a96 96 0 0 0 0 192h128a96 96 0 0 0 0-192zM384 320a96 96 0 1 1 96-96 96 96 0 0 1-96 96z m0-128a32 32 0 1 0 32 32 32 32 0 0 0-32-32zM640 512a96 96 0 1 1 96-96 96 96 0 0 1-96 96z m0-128a32 32 0 1 0 32 32 32 32 0 0 0-32-32zM320 544a32 32 0 0 1-22.72-9.28 32 32 0 0 1 0-45.44l384-384a32 32 0 1 1 45.44 45.44l-384 384A32 32 0 0 1 320 544z" fill="#4A8BFE" p-id="2703"></path></svg>',
    title: "进度条 CTRL+ALT+B",
    isShow: true,
  };
  wzitem.comMenu = {
    isShowEdit: true, // 编辑器
    isShowColor1: true, // 颜色1：常规
    isShowColor2: true, // 颜色2：强调
    isShowInsertBefore: true, // 插入空白到前面
    isShowInsertAfter: true, // 插入空白到后面
  };
  wzitem.mdtype1 = "strong";
  wzitem.mdtype2 = "mark";
  wzitem.subtype = "spanStrongMarkList"; //  子类型

  /**  md1(P1) + md1 md2(P2) + md1(P1)
   *  P1Typ1+P2TYype2  || P1Type2+P2Type1
   */
  wzitem.MustCheckedP1Type = false;
  wzitem.MustCheckedP2Type = false;
  wzitem.P1Type1 = ""; // 类型1 的状态1
  wzitem.P1Type2 = ""; // 类型1 的状态2
  wzitem.P2Type1 = ""; // 类型2 的状态1
  wzitem.P2Type2 = ""; // 类型2 的状态2

  wzitem.isMdType1Added = (node) => null;
  wzitem.isMdType2Added = (node) => null;

  wzitem.enableColor1 = true; // 支持颜色1
  wzitem.enableColor2 = true; // 支持颜色2
  wzitem.colorCondig1 = {
    // 色号
    emSub: null,
    // mdType1
    mdtyp1: null,
    // mdType1 和 mdType1 的时候
    mdtyp1AND2: {
      color: null,
      bgcolor: null,
      styleList: [
        {
          name: "--theme-wzline-pgbar-nameBgColor",
          value: "nameBgColor",
        },
      ],
      classList: [],
    },
    // 只有 mdType1 和 mdType1 的时候
    onlyMdtyp1AND2: null,
  };

  wzitem.colorCondig2 = wzitem.colorCondig1;

  wzitem.tgkey1 = "T1";
  wzitem.tgkey2 = "T1!";

  wzitem.setColor1 = (event) => {};
  wzitem.setColor2 = (event) => {};
  wzitem.enableTypy1No1 = false; // 允许出现开始的 mdType1
  wzitem.enableTypy1No2 = false; // 允许出现结束的 mdType1

  wzitem.OnClickMdTyp1 = null;
  wzitem.OnClickMdTyp1AndType2 = null;

  wzitem.onEditMdTyp1AndType2 = (e, span) => {
    VlookSpan.ClacAndSetPgBarValue(span.dom);
  };

  wzitem.onSetWzLabel = async (e) => {
    await setWzLabel(e, "strong mark", (span, dataType) => {
      VlookSpan.ClacAndSetPgBarValue(span.dom);
    });
  };
  // 快捷键
  wzitem.hotkey = {
    enable: true, // 是否启用
    ctrlKey: true, // Ctrl
    metaKey: false, // Meta
    shiftKey: false, // Shift
    altKey: true, // Alt
    key: "b", // 快捷键
  };

  VLookPluginEnter.items.push(wzitem);
}

function AddWzSteps(e) {
  let wzitem = new VlookItemBase();
  wzitem.id = "wzStepwise";
  wzitem.name = "wz-stepwise";
  wzitem.customF = "wz";
  wzitem.showName = "步骤条";
  wzitem.tooltip = {
    icon: '<svg t="1735606519321" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2685" width="32" height="32"><path d="M407.466667 725.333333H106.666667c-12.8 0-21.333333-8.533333-21.333334-21.333333V320c0-12.8 8.533333-21.333333 21.333334-21.333333h300.8l132.266666 215.466666-132.266666 211.2zM170.666667 640h189.866666l78.933334-128-81.066667-128H170.666667v256z" fill="#297AFF" p-id="2686"></path><path d="M814.933333 725.333333H458.666667l134.4-213.333333-134.4-213.333333h356.266666l125.866667 202.666666c4.266667 6.4 4.266667 14.933333 0 23.466667L814.933333 725.333333z m-202.666666-85.333333H768l78.933333-128-78.933333-128h-155.733333l81.066666 128-81.066666 128z" fill="#297AFF" p-id="2687"></path></svg>',
    title: "步骤条 CTRL+ALT+S",
    isShow: true,
  };
  wzitem.comMenu = {
    isShowEdit: true, // 编辑器
    isShowColor1: false, // 颜色1：常规
    isShowColor2: false, // 颜色2：强调
    isShowInsertBefore: true, // 插入空白到前面
    isShowInsertAfter: true, // 插入空白到后面
  };
  wzitem.mdtype1 = "em";
  wzitem.mdtype2 = "mark";
  wzitem.subtype = "spanEmMarkList"; //  子类型

  /**  md1(P1) + md1 md2(P2) + md1(P1)
   *  P1Typ1+P2TYype2  || P1Type2+P2Type1
   */
  wzitem.MustCheckedP1Type = false;
  wzitem.MustCheckedP2Type = false;
  wzitem.P1Type1 = ""; // 类型1 的状态1
  wzitem.P1Type2 = ""; // 类型1 的状态2
  wzitem.P2Type1 = ""; // 类型2 的状态1
  wzitem.P2Type2 = ""; // 类型2 的状态2

  wzitem.isMdType1Added = (node) => null;
  wzitem.isMdType2Added = (node) => null;

  wzitem.enableColor1 = false; // 支持颜色1
  wzitem.enableColor2 = false; // 支持颜色2

  wzitem.colorCondig1 = null;
  wzitem.colorCondig2 = wzitem.colorCondig1;
  wzitem.tgkey1 = "";
  wzitem.tgkey2 = "";

  wzitem.setColor1 = (event) => {};
  wzitem.setColor2 = (event) => {};
  wzitem.enableTypy1No1 = false; // 允许出现开始的 mdType1
  wzitem.enableTypy1No2 = false; // 允许出现结束的 mdType1
  wzitem.OnClickMdTyp1 = null;
  wzitem.OnClickMdTyp1AndType2 = null;

  wzitem.onEditMdTyp1AndType2 = (e, span) => {
    VlookSpan.ClacAndSetWzStepsValue(span.dom);
  };

  wzitem.onSetWzLabel = async (e) => {
    await setWzLabel(e, "em mark", (span, dataType) => {
      VlookSpan.ClacAndSetWzStepsValue(span.dom);
    });
  };

  // 快捷键
  wzitem.hotkey = {
    enable: true, // 是否启用
    ctrlKey: true, // Ctrl
    metaKey: false, // Meta
    shiftKey: false, // Shift
    altKey: true, // Alt
    key: "s", // 快捷键
  };

  VLookPluginEnter.items.push(wzitem);
}

class VlookItemBase {
  constructor() {
    this.id = "id";
    this.name = "ToolBar名称";
    this.customF = "自定义属性";
    this.showName = "显示名称";
    this.tooltip = {
      icon: "图标",
      title: "标题",
      isShow: true,
    };
    this.comMenu = {
      isShowEdit: false, // 编辑器
      isShowColor1: false, // 颜色1：常规
      isShowColor2: false, // 颜色2：强调
      isShowInsertBefore: false, // 插入空白到前面
      isShowInsertAfter: false, // 插入空白到后面
    };
    this.mdtype1 = "类型1";
    this.mdtype2 = "类型2";
    this.subtype = "spanEmCodeList、spanEmStrongList、spanMarkList"; //  子类型

    /**  md1(P1) + md1 md2(P2) + md1(P1)
     *  P1Typ1+P2TYype2  || P1Type2+P2Type1
     */
    this.MustCheckedP1Type = false;
    this.MustCheckedP2Type = false;
    this.P1Type1 = "类型1显示"; // 类型1 的状态1
    this.P1Type2 = "类型1隐藏"; // 类型1 的状态2
    this.P2Type1 = "类型2显示"; // 类型2 的状态1
    this.P2Type2 = "类型2隐藏"; // 类型2 的状态2

    this.isMdType1Added = (node) => null;
    this.isMdType2Added = (node) => null;

    this.enableColor1 = true; // 支持颜色1
    this.enableColor2 = true; // 支持颜色2
    /**
       *    
       color: "nameColor",
        bgcolor: "nameBgColor",
        styleList: [
          {
            name:"",
            value:""
          },
        ],
        classList: [],
       */
    this.colorCondig1 = {
      // 色号
      emSub: null,
      // mdType1
      mdtyp1: null,
      // mdType1 和 mdType1 的时候
      mdtyp1AND2: null,
      // 只有 mdType1 和 mdType1 的时候
      onlyMdtyp1AND2: null,
    };
    this.colorCondig2 = {
      // 色号
      emSub: null,
      // mdType1
      mdtyp1: null,
      // mdType1 和 mdType1 的时候
      mdtyp1AND2: null,
      // 只有 mdType1 和 mdType1 的时候
      onlyMdtyp1AND2: null,
    };
    this.setColor1 = (event) => {};
    this.setColor2 = (event) => {};

    /** 组成部分
     * Part1: "md1 md2" (最基本的)
     * Part2："md1" + "md1 md2" （允许出现开始的 md1）
     * Part3："md1 md2" + "md1"
     * Part4："md1"  +  "md1 md2"+ "md1"
     */
    //this.enablePart1 = true;
    this.enableTypy1No1 = true; // 允许出现开始的 mdType1
    this.enableTypy1No2 = true; // 允许出现结束的 mdType1

    this.tgkey1 = "Gy";
    this.tgkey2 = "Gy!";

    this.OnClickMdTyp1 = null;
    this.OnClickMdTyp1AndType2 = null;

    this.onEditMdTyp1AndType2 = null;
    this.onSetWzLabel = null;
    /*
    this.OnKeyUp = async (e, args) => {
      let args = {
        selectid,
        selecttype,
        dom,
        item,
      };*/
    this.OnKeyUp = null;

    // 快捷键
    this.hotkey = {
      enable: false, // 是否启用
      ctrlKey: false, // Ctrl
      metaKey: false, // Meta
      shiftKey: false, // Shift
      altKey: false, // Alt
      key: "小写字母", // 快捷键
    };
  }

  /**
   * 获取选中列表
   */
  getBlockSelected(e) {
    let anchorNode = getSelectionDom(e);
    let spanMd1Md2List = this.getVlookSelectedSpanList(anchorNode);
    if (
      spanMd1Md2List !== null &&
      spanMd1Md2List !== undefined &&
      spanMd1Md2List.length > 0
    ) {
      return {
        id: mv.GetSiyuanBlockId(anchorNode),
        type: `${this.mdtype1} ${this.mdtype2}`,
        subtype: `${this.subtype}`,
        dom: spanMd1Md2List,
      };
    }

    return null;
  }

  /**
   * 获取选中的 span 列表(不仅包含自己还包含符合条件的前后兄弟元素)
   * @param {*} node
   */
  getVlookSelectedSpanList(node) {
    if (node === null || node === undefined || node.nodeType === Node.TEXT_NODE)
      return null;

    let spanList = []; // 返回的span列表
    let currentNode = node; // 当前节点
    let previousNode = getPreviousSibling(node); // 前一个节点
    let nextNode = getNextSibling(node); // 下一个节点

    let emNo1 = null;
    let emCodeNo2 = null;
    let emNo3 = null;
    let emSub3 = null;
    let emSubNo4 = null;
    let emCode1 = null;
    let emNo2 = null;
    let emSubNo3 = null;
    let emSubNo2 = null;
    let enableColor = this.enableColor1 || this.enableColor2;
    let emSub0 = null;

    // 如果当前node是em，假设是第一个 em
    emNo1 = this.isMdType1(currentNode); // 是否允许出现开始的 mdType1
    emCodeNo2 = this.isMdType1AndType2(nextNode);
    emNo3 = this.isMdType1(getNextSibling(emCodeNo2)); // 是否允许出现结束的 mdType1
    emSub3 = enableColor ? this.isEmSub(getNextSibling(emCodeNo2)) : null;
    emSubNo4 = enableColor ? this.isEmSub(getNextSibling(emNo3)) : null;

    // Case1:当选中的是 em,且当前 em 是 第一个 emcode 的时候
    /**
     * 情况1： *emNo1`emCodeNo2`*
     * 标题2`  *emNo1`emCodeNo2`*_~emSub3~_
     * 情况3： *emNo1`emCodeNo2`emNo3*
     * 情况4： *emNo1`emCodeNo2`emNo3*_~emSubNo4~_
     */
    if (emNo1 && emCodeNo2 && this.enableTypy1No1) {
      if (!emNo3 || (emNo3 && this.enableTypy1No2)) {
        spanList.push(new InlineSpan(emNo1));
        spanList.push(new InlineSpan(emCodeNo2));

        // 如果允许设置颜色，则包含颜色
        if (emSub3 && enableColor) spanList.push(new InlineSpan(emSub3));

        if (emNo3) spanList.push(new InlineSpan(emNo3));

        // 如果允许设置颜色，则包含颜色
        if (emSubNo4 && enableColor) spanList.push(new InlineSpan(emSubNo4));
        return spanList;
      }
    }

    // Case2:如果当前node是em，假设是第二个 em
    /**
     * 情况1： *`emCodeNo2`emNo3*
     * 情况2： *emNo1`emCodeNo2`emNo3*
     * 情况3:  *`emCodeNo2`emNo3*_~emSub3~_
     * 情况4： *emNo1`emCodeNo2`emNo3*_~emSub3~_
     */
    emNo1 = this.isMdType1(getPreviousSibling(previousNode));
    emCodeNo2 = this.isMdType1AndType2(previousNode);
    emNo3 = this.isMdType1(currentNode);
    emSub3 = null; /// 这种情况下只有 emSub4
    emSubNo4 = enableColor ? this.isEmSub(getNextSibling(emNo3)) : null;

    if (emNo3 && emCodeNo2 && this.enableTypy1No2) {
      if (!emNo1 || (emNo1 && this.enableTypy1No1)) {
        spanList.push(new InlineSpan(emNo1));
        spanList.push(new InlineSpan(emCodeNo2));
        spanList.push(new InlineSpan(emNo3));
        if (emSubNo4 && enableColor) spanList.push(new InlineSpan(emSubNo4));
        return spanList;
      }
    }

    // Case3:如果选中的 em code 的时候
    /**
     * 情况1： *`emCodeNo2`emNo1*
     * 标题2:  *`emCodeNo2`emNo1*_~emSub3~_
     */
    if (!emNo1 && emCodeNo2 && emNo3 && this.enableTypy1No2) {
      spanList.push(new InlineSpan(emCodeNo2));
      spanList.push(new InlineSpan(emNo3));
      if (emSub3 && enableColor) spanList.push(new InlineSpan(emSub3));
      return spanList;
    }

    // Case4: 当选中的是 em code,假设是中间或者最后的 em code
    /**
     * 情况1： *emNo1`emCodeNo2`*
     * 标题2`  *emNo1`emCodeNo2`*_~emSub3~_
     * 情况3： *emNo1`emCodeNo2`emNo3*
     * 情况4： *emNo1`emCodeNo2`emNo3*_~emSubNo4~_
     */
    emNo1 = this.isMdType1(previousNode);
    emCodeNo2 = this.isMdType1AndType2(currentNode);
    emNo3 = this.isMdType1(getNextSibling(emCodeNo2));
    emSub3 = enableColor ? this.isEmSub(getNextSibling(emCodeNo2)) : null;
    emSubNo4 = enableColor ? this.isEmSub(getNextSibling(emNo3)) : null;
    // 当选中的是 em,且是 em+em code 组合的时候，
    if (emNo1 && emCodeNo2 && this.enableTypy1No1) {
      if (!emNo3 || (emNo3 && this.enableTypy1No2)) {
        spanList.push(new InlineSpan(emNo1));
        spanList.push(new InlineSpan(emCodeNo2));
        if (emSub3 && enableColor) spanList.push(new InlineSpan(emSub3));
        // 如果是 em + em code + em + em sub
        if (emNo3) spanList.push(new InlineSpan(emNo3));
        if (emSubNo4 && enableColor) spanList.push(new InlineSpan(emSubNo4));
        return spanList;
      }
    }

    // Case5: 当选中的是 em code,假设是第一个不是 em, 因为是强调的情况，所以不能通过 enableTypy1No2 来屏蔽
    /**
     * 情况1： *`emCodeNo2`emNo1*
     * 标题2:  *`emCodeNo2`emNo1*_~emSub3~_
     */
    emNo1 = this.isMdType1(previousNode);
    emCode1 = this.isMdType1AndType2(currentNode);
    emNo2 = this.isMdType1(nextNode);
    emSubNo3 = enableColor ? this.isEmSub(getNextSibling(emNo2)) : null;
    if (!emNo1 && emCode1 && emNo2) {
      spanList.push(new InlineSpan(emCode1));
      spanList.push(new InlineSpan(emNo2));
      if (emSubNo3 && enableColor) spanList.push(new InlineSpan(emSubNo3));
      return spanList;
    }

    // Case6: 当选中的是 em code,假设只有一个 em code,这个必须是这种情况，所以不能通过enableTypy1No1屏蔽代替
    /**
     * 情况1： *`emCodeNo2`*
     * 标题2:  *`emCodeNo2`*_~emSubNo2~_
     */
    emNo1 = this.isMdType1(previousNode);
    emCode1 = this.isMdType1AndType2(currentNode);
    emNo2 = this.isMdType1(nextNode);
    emSubNo2 = enableColor ? this.isEmSub(nextNode) : null;
    if (!emNo1 && emCode1 && !emNo2) {
      spanList.push(new InlineSpan(emCode1));
      if (emSubNo2 && enableColor) spanList.push(new InlineSpan(emSubNo2));
      return spanList;
    }

    return null;
  }

  //#region ************ 类型判断 ************
  /**
   * 判断是否是 em sub
   * @param {*} node
   * @returns
   */
  isEmSub(node) {
    if (node === null || node === undefined || node.nodeType === Node.TEXT_NODE)
      return null;
    let value = node.getAttribute("data-type")?.trim() ?? "";
    if (value === "sub em") {
      node.setAttribute("data-type", "em sub");
      return node;
    }
    return value === "em sub" ? node : null;
  }

  isWithP1Type1(node) {
    if (node === null || node === undefined || node.nodeType === Node.TEXT_NODE)
      return null;

    let leftType = node.getAttribute("data-type")?.trim() ?? "";
    if (leftType === "") return null;

    let type1 = `${this.mdtype1}`?.trim() ?? "";
    if (type1 === "") return null;

    let p1Type = `${this.P1Type1}`?.trim() ?? "";

    if (leftType === `${type1} ${p1Type}`.trim()) return node;
    if (leftType === `${p1Type} ${type1}`.trim()) return node;

    if (leftType === `${type1} text ${p1Type}`.trim()) return node;
    if (leftType === `${p1Type} text ${type1}`.trim()) return node;

    if (leftType === `${type1} ${p1Type} text`.trim()) return node;
    if (leftType === `${p1Type} ${type1} text`.trim()) return node;

    if (leftType === `text ${type1} ${p1Type}`.trim()) return node;
    if (leftType === `text ${p1Type} ${type1}`.trim()) return node;
    return null;
  }

  isWithP1Type2(node) {
    if (node === null || node === undefined || node.nodeType === Node.TEXT_NODE)
      return null;

    let leftType = node.getAttribute("data-type")?.trim() ?? "";
    if (leftType === "") return null;

    let type1 = `${this.mdtype1}`?.trim() ?? "";
    if (type1 === "") return null;

    let p1Type2 = `${this.P1Type2}`?.trim() ?? "";
    if (leftType === `${type1} ${p1Type2}`.trim()) return node;
    if (leftType === `${p1Type2} ${type1}`.trim()) return node;

    if (leftType === `${type1} text ${p1Type2}`.trim()) return node;
    if (leftType === `${p1Type2} text ${type1}`.trim()) return node;

    if (leftType === `text ${type1} ${p1Type2}`.trim()) return node;
    if (leftType === `text ${p1Type2} ${type1}`.trim()) return node;
    return null;
  }

  /**
   * 判断是否是 mdType1
   * @param {*} node
   * @returns
   */
  isMdType1(node) {
    if (node === null || node === undefined || node.nodeType === Node.TEXT_NODE)
      return null;

    let leftType = node.getAttribute("data-type")?.trim() ?? "";
    if (leftType === "") return null;

    let type1 = `${this.mdtype1}`?.trim() ?? "";
    if (type1 === "") return null;

    let isWithP1Type1 = () => {
      let p1Type = `${this.P1Type1}`?.trim() ?? "";

      if (leftType === `${type1} ${p1Type}`.trim()) return node;
      if (leftType === `${p1Type} ${type1}`.trim()) return node;

      if (leftType === `${type1} text ${p1Type}`.trim()) return node;
      if (leftType === `${p1Type} text ${type1}`.trim()) return node;

      if (leftType === `${type1} ${p1Type} text`.trim()) return node;
      if (leftType === `${p1Type} ${type1} text`.trim()) return node;

      if (leftType === `text ${type1} ${p1Type}`.trim()) return node;
      if (leftType === `text ${p1Type} ${type1}`.trim()) return node;
      return null;
    };

    let isWithP1Type2 = () => {
      let p1Type2 = `${this.P1Type2}`?.trim() ?? "";

      if (leftType === `${type1} ${p1Type2}`.trim()) return node;
      if (leftType === `${p1Type2} ${type1}`.trim()) return node;

      if (leftType === `${type1} text ${p1Type2}`.trim()) return node;
      if (leftType === `${p1Type2} text ${type1}`.trim()) return node;

      if (leftType === `text ${type1} ${p1Type2}`.trim()) return node;
      if (leftType === `text ${p1Type2} ${type1}`.trim()) return node;
      return null;
    };

    if (this.MustCheckedP1Type) {
      let p1 = isWithP1Type1();
      if (p1 !== null) return p1;
      p1 = isWithP1Type2();
      return p1;
    }

    if (leftType === type1) return node;
    if (leftType === `${type1} text`) return node;
    if (leftType === `text ${type1}`) return node;

    if (
      this.P1Type1 !== "" &&
      this.P1Type1 !== null &&
      this.P1Type1 !== undefined
    ) {
      let p1 = isWithP1Type1();
      if (p1 !== null) return p1;
    }

    if (
      this.P1Type2 !== "" &&
      this.P1Type2 !== null &&
      this.P1Type2 !== undefined
    ) {
      let p2 = isWithP1Type2();
      if (p2 !== null) return p2;
    }

    return this.isMdType1Added(node);
  }

  /**
   * 判断是否是 mdType2
   * @param {*} node
   * @returns
   */
  isMdType2(node) {
    if (node === null || node === undefined || node.nodeType === Node.TEXT_NODE)
      return null;
    let leftType = node.getAttribute("data-type")?.trim() ?? "";
    if (leftType === "") return null;

    let type2 = `${this.mdtype2}`?.trim() ?? "";
    if (type2 === "") return null;

    if (leftType === type2) return node;
    if (leftType === `${type2} text`) return node;
    if (leftType === `text ${type2}`) return node;

    return this.isMdType2Added(node);
  }

  /**
   * 判断是否是 mdType1 和 mdType2
   * @param {*} node
   * @returns
   */
  isMdType1AndType2(node) {
    if (node === null || node === undefined || node.nodeType === Node.TEXT_NODE)
      return null;

    let type1 = `${this.mdtype1}`?.trim() ?? "";
    let type2 = `${this.mdtype2}`?.trim() ?? "";
    if (type1 === "" || type2 === "") return null;

    let leftType = node.getAttribute("data-type")?.trim() ?? "";
    if (leftType === "") return null;
    let leftTypes = leftType.split(" ");

    let isWithP2Type1 = () => {
      let p2Type1 = `${this.P2Type1}`?.trim() ?? "";
      // 如果 leftTypes 包含 type1,type2,p2Type1 且数量等于3 则返回 node
      if (
        leftTypes.length === 3 &&
        leftTypes.includes(type1) &&
        leftTypes.includes(type2) &&
        leftTypes.includes(p2Type1)
      ) {
        node.setAttribute("data-type", `${type1} ${type2} ${p2Type1}`);
        return node;
      }
      // 如果 leftTypes 包含 type1,type2,p2Type1,text 且数量等于4 则返回 node
      if (
        leftTypes.length === 4 &&
        leftTypes.includes(type1) &&
        leftTypes.includes(type2) &&
        leftTypes.includes(p2Type1) &&
        leftTypes.includes("text")
      ) {
        node.setAttribute("data-type", `${type1} ${type2} text ${p2Type1}`);
        return node;
      }
      return null;
    };

    let isWithP2Type2 = () => {
      let p2Type2 = `${this.P2Type2}`?.trim() ?? "";
      // 如果 leftTypes 包含 type1,type2,p2Type2 且数量等于3 则返回 node
      if (
        leftTypes.length === 3 &&
        leftTypes.includes(type1) &&
        leftTypes.includes(type2) &&
        leftTypes.includes(p2Type2)
      ) {
        node.setAttribute("data-type", `${type1} ${type2} ${p2Type2}`);
        return node;
      }

      // 如果 leftTypes 包含 type1,type2,p2Type2,text 且数量等于4 则返回 node
      if (
        leftTypes.length === 4 &&
        leftTypes.includes(type1) &&
        leftTypes.includes(type2) &&
        leftTypes.includes(p2Type2) &&
        leftTypes.includes("text")
      ) {
        node.setAttribute("data-type", `${type1} ${type2} text ${p2Type2}`);
        return node;
      }
      return null;
    };

    if (this.MustCheckedP2Type) {
      let p1 = isWithP2Type1();
      if (p1 !== null) return p1;
      p1 = isWithP2Type2();
      return p1;
    }

    // 如果只有两个的情况下：
    if (leftType === `${type1} ${type2}`) return node;
    if (leftType === `${type2} ${type1}`) {
      node.setAttribute("data-type", `${type1} ${type2}`);
      return node;
    }

    // 如果 leftTypes 包含 type1,type2,text 且数量等于3 则返回 node
    if (
      leftTypes.length === 3 &&
      leftTypes.includes(type1) &&
      leftTypes.includes(type2) &&
      leftTypes.includes("text")
    ) {
      node.setAttribute("data-type", `${type1} ${type2} text`);
      return node;
    }

    // 判断如果有 p2Type1 的情况
    if (
      this.P2Type1 !== "" &&
      this.P2Type1 !== null &&
      this.P2Type1 !== undefined
    ) {
      let p2 = isWithP2Type1();
      if (p2 !== null) return p2;
    }

    if (
      this.P2Type2 !== "" &&
      this.P2Type2 !== null &&
      this.P2Type2 !== undefined
    ) {
      let p2 = isWithP2Type2();
      if (p2 !== null) return p2;
    }

    return null;
  }

  //#endregion ************ 类型判断

  //#region ************ 事件 ************

  /**
   * 工具栏加载事件
   */
  onToolBarLoad(e) {}

  /**
   * 菜单加载事件
   */
  onMenuLoad(e) {}

  /**
   * 工具栏点击事件
   * @param {*} e
   */
  onToolBarClick(e) {}

  /**
   * 菜单点击事件
   * @param {*} e
   */
  onMenuClick(e) {}
  //#endregion ************ 事件
}

class VLookPluginEnter {
  static items = [];
  constructor(e) {}

  static Init(e) {
    AddWzLabelCHK(e);
    AddWzLabelCount(e);
    AddWzLabel(e);
    AddCoatingLabel(e);
    AddWzPgbar(e);
    AddWzSteps(e);
  }

  // 处理快捷键
  static async HandleShortcutKey(e) {
    for (let item of VLookPluginEnter.items) {
      if (item.hotkey.enable !== true) continue;
      if (isKey(e, item.hotkey)) {
        await item.onSetWzLabel(e);
        return;
      }
    }
  }

  /**
   * 显示工具栏
   * @param {*} e
   */
  static ToolBarShow(e) {
    let fragment = document.createDocumentFragment();

    let divider = document.createElement("div");
    divider.className = "protyle-toolbar__divider";
    fragment.appendChild(divider);

    for (let item of VLookPluginEnter.items) {
      if (item.tooltip.isShow !== true) continue;

      let btn = document.createElement("button");
      btn.className = "protyle-toolbar__item b3-tooltips b3-tooltips__n";
      btn.setAttribute("data-type", item.name);
      btn.setAttribute("aria-label", item.tooltip.title);
      btn.innerHTML = item.tooltip.icon;
      btn.addEventListener("click", async (e) => {
        btn.parentElement.classList.add("fn__none"); //关闭 toolbar
        if (item?.onSetWzLabel !== null && item?.onSetWzLabel !== undefined) {
          item.onSetWzLabel(e);
        }
      });
      fragment.appendChild(btn);
    }
    fragment.id = "btnWzLabel";
    return fragment;
  }

  /**
   * 点击 wzlabel 事件
   * @param {*} e
   */
  static async WzLabelClick(e) {
    let focusNode = window.getSelection().focusNode;
    if (focusNode === null || focusNode === undefined) return;

    if (focusNode.nodeType === Node.TEXT_NODE) {
      let currentNode = focusNode.parentNode;
      let nextNode = getNextSibling(currentNode);
      let previousNode = getPreviousSibling(currentNode);
      let args = {
        currentNode,
        nextNode,
        previousNode,
      };

      for (let item of VLookPluginEnter.items) {
        if (item === null || item === undefined) continue;

        args.item = item;

        if (item.OnClickMdTyp1 !== null && item.OnClickMdTyp1 !== undefined) {
          if (item.isMdType1(currentNode) && item.isMdType1AndType2(nextNode)) {
            await item.OnClickMdTyp1(e, args);
            return;
          }
        }

        if (
          item.OnClickMdTyp1AndType2 !== null &&
          item.OnClickMdTyp1 !== undefined
        ) {
          if (
            item.isMdType1(previousNode) &&
            item.isMdType1AndType2(currentNode)
          ) {
            await item.OnClickMdTyp1AndType2(e, args);
            return;
          }
        }
      }
    }
  }

  /**
   * 显示右键菜单
   * @param {*} e
   */
  static MenuShow(e) {
    for (let item of VLookPluginEnter.items) {
      if (item === null || item === undefined) continue;
      let selectinfo = item.getBlockSelected(e);
      if (selectinfo) {
        let selecttype = selectinfo.type;
        let selectid = selectinfo.id;
        let dom = selectinfo.dom;
        setTimeout(
          () =>
            VLookPluginEnter.InsertCommonMenuItem(
              selectid,
              selecttype,
              dom,
              item
            ),
          0
        );
        return;
      }
    }
  }

  static OnWzLabelKeyUp(e) {
    for (let item of VLookPluginEnter.items) {
      if (item === null || item === undefined) continue;
      let selectinfo = item.getBlockSelected(e);
      if (selectinfo) {
        let selecttype = selectinfo.type;
        let selectid = selectinfo.id;
        let dom = selectinfo.dom;
        let args = {
          selectid,
          selecttype,
          dom,
          item,
        };
        setTimeout(() => item.OnKeyUp(e, args), 0);
        return;
      }
    }
  }

  /**
   * 插入右键菜单
   * @param {*} selectid
   * @param {*} selecttype
   * @param {*} dom
   * @param {*} item
   */
  static InsertCommonMenuItem(selectid, selecttype, dom, item) {
    // TODO: 插入菜单
    let commonMenu = document.querySelector("#commonMenu .b3-menu__items");
    //let readonly = commonMenu.querySelector('[data-id="updateAndCreatedAt"]');
    let readonly = document.querySelector('[data-readonly="true"]');
    let selectview = commonMenu.querySelector('[id="wzselect"]');
    if (!readonly) {
      if (!selectview) {
        commonMenu.appendChild(VLookPluginEnter.MenuSeparator());
        if (item.comMenu.isShowColor1) {
          commonMenu.appendChild(
            VLookPluginEnter.WzLabelColor1Select(
              selectid,
              selecttype,
              dom,
              item
            )
          );
        }
        if (item.comMenu.isShowColor2) {
          commonMenu.appendChild(
            VLookPluginEnter.WzLabelColor2Select(
              selectid,
              selecttype,
              dom,
              item
            )
          );
        }
        if (item.comMenu.isShowEdit) {
          commonMenu.appendChild(
            VLookPluginEnter.WzOpenEditDialog(selectid, selecttype, dom, item)
          );
        }
        if (item.comMenu.isShowInsertBefore) {
          // todo: 添加向前插入空格的菜单
          commonMenu.appendChild(
            VLookPluginEnter.WzInsertSpaceBefore(
              selectid,
              selecttype,
              dom,
              item
            )
          );
        }
        if (item.comMenu.isShowInsertAfter) {
          // todo: 添加向后插入空格的菜单
          commonMenu.appendChild(
            VLookPluginEnter.WzInsertSpaceAfter(selectid, selecttype, dom, item)
          );
        }
        window.theme.elements.add(selectview);
      }
    }
  }

  static MenuSeparator(className = "b3-menu__separator") {
    let node = document.createElement("button");
    node.className = className;
    return node;
  }

  static WzInsertSpaceBefore(selectid, selecttype, dom, item) {
    let node = document.createElement("button");
    node.className = "b3-menu__item";
    node.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">向前插入空格</span>`;
    node.onclick = async (e) => {
      CloaseCommonMenu();

      if (dom === null || dom === undefined || dom.length === 0) return;
      // dom 数组中的第一个
      let first = dom[0];
      if (first) {
        first.dom.insertAdjacentHTML(
          "beforebegin",
          document.createTextNode(" ").data
        );
      }

      let block = mv.GetSiyuanBlock(first.dom);
      await mv.UpdateBlockByDom_API(selectid, block.outerHTML);
    };
    window.theme.elements.add(node);
    return node;
  }

  static WzInsertSpaceAfter(selectid, selecttype, dom, item) {
    let node = document.createElement("button");
    node.className = "b3-menu__item";
    node.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">向后插入空格</span>`;
    node.onclick = async (e) => {
      CloaseCommonMenu();

      if (dom === null || dom === undefined || dom.length === 0) return;
      // dom 数组中的最后一个
      let last = dom[dom.length - 1];
      if (last) {
        last.dom.insertAdjacentHTML(
          "afterend",
          document.createTextNode(" ").data
        );
      }
      let block = mv.GetSiyuanBlock(last.dom);
      await mv.UpdateBlockByDom_API(selectid, block.outerHTML);
    };
    window.theme.elements.add(node);
    return node;
  }

  //#region ************ 打开编辑对话框 ************
  static WzOpenEditDialog(selectid, selecttype, dom, item) {
    /**
     
    <button class="b3-menu__item">
      <svg class="b3-menu__icon " style=""><use xlink:href="#iconSelect"></use></svg>
      <span class="b3-menu__label">全选</span>
      <span class="b3-menu__accelerator">Ctrl+A</span>
    </button>
      
     */

    let button = document.createElement("button");
    button.id = `vlook${item.id}Edit`;
    button.className = "b3-menu__item";
    button.innerHTML = `<svg class="b3-menu__icon " style=""><use xlink:href="#iconSelect"></use></svg><span class="b3-menu__label">编辑${item.showName}</span><span class="b3-menu__accelerator"></span>`;
    button.onclick = async (e) => {
      let content = document.createElement("div");

      // 在 content 中插入文字节点

      let em = dom.find((t) => item.isMdType1(t.dom));
      let emStrong = dom.find((t) => item.isMdType1AndType2(t.dom));
      // 计算有几个 em
      let emCount = dom.filter((t) => item.isMdType1(t.dom)).length;
      let em2 = null;
      if (emCount > 1) {
        // 反转 dom 获取 em
        em2 = dom.reverse().find((t) => item.isMdType1(t.dom));
      } else {
        let index = dom.indexOf(em);
        let index2 = dom.indexOf(emStrong);
        if (index2 < index) {
          em2 = em;
          em = null;
        }
      }

      // todo: 根据 item 动态调整 div 的内容
      let contentHtml = `
         <div>
            <input id="wzCoatName" type="text" placeholder="请输入提示" value="${
              em?.text ?? ""
            }" class="b3-text-field fn__flex-center fn__size200">
            <span class="fn__space fn__size50"> </span>
            <input id="wzCoatValue" type="text" placeholder="请输入内容" value="${
              emStrong?.text ?? ""
            }" class="b3-text-field fn__flex-center fn__size200">
         </div>
        `;

      if (
        item.enableTypy1No1 === null ||
        item.enableTypy1No1 === undefined ||
        item.enableTypy1No1 === false
      ) {
        contentHtml = `
           <div>
              <input id="wzCoatValue" type="text" placeholder="请输入内容" value="${
                emStrong?.text ?? ""
              }" class="b3-text-field fn__flex-center fn__size200">
           </div>
          `;
      }

      if (item.enableTypy1No1 === true && item.enableTypy1No2 === true) {
        contentHtml = `
         <div>
            <input id="wzCoatName" type="text" placeholder="请输入提示" value="${
              em?.text ?? ""
            }" class="b3-text-field fn__flex-center fn__size200">
            <span class="fn__space fn__size50"> </span>
            <input id="wzCoatValue" type="text" placeholder="请输入内容" value="${
              emStrong?.text ?? ""
            }" class="b3-text-field fn__flex-center fn__size200">
            <span class="fn__space fn__size50"> </span>
            <input id="wzCoatName2" type="text" placeholder="请输入提示" value="${
              em2?.text ?? ""
            }" class="b3-text-field fn__flex-center fn__size200">
         </div>
        `;
      }

      window.pshow(`编辑${item.showName}`, contentHtml, null, {
        dialogButtonStyleEnum: window.DialogButtonStyleEnum.YesOrCancel,
        yesCallBack: async (dlg, btn) => {
          let wzCoatName = document.getElementById("wzCoatName");
          let wzCoatValue = document.getElementById("wzCoatValue");
          let wzCoatName2 = document.getElementById("wzCoatName2");
          if (mv.Empty(wzCoatName?.value) && em) {
            em.dom.remove();
            // 找到第一个元素并删除
            let index = dom.indexOf(em);
            if (index !== -1) {
              dom.splice(index, 1);
            }
          } else {
            let type1 = `${item.mdtype1} ${item.P1Type1}`?.trim() ?? "";
            let type1AndType2 =
              `${item.mdtype1} ${item.mdtype2} ${item.P2Type2}`?.trim() ?? "";

            if (item.enableTypy1No1) {
              if (em === null || em === undefined) {
                em = InlineSpan.Init(type1, wzCoatName.value);
                dom.unshift(em);
                emStrong.dom.insertAdjacentHTML(
                  "beforebegin",
                  em.dom.outerHTML
                );
              } else {
                em.text = wzCoatName.value;
              }
              em.dataType = type1;
            }
            emStrong.dataType = type1AndType2;
          }
          if (mv.Empty(wzCoatName2?.value) && em2) {
            em2.dom.remove();
            let index = dom.indexOf(em2);
            if (index !== -1) {
              dom.splice(index, 1);
            }
          } else {
            let type1 = `${item.mdtype1} ${item.P1Type1}`?.trim() ?? "";
            let type1AndType2 =
              `${item.mdtype1} ${item.mdtype2} ${item.P2Type2}`?.trim() ?? "";

            if (item.enableTypy1No2) {
              if (em2 === null || em2 === undefined) {
                em2 = InlineSpan.Init(type1, wzCoatName2.value);
                dom.push(em2);
                emStrong.dom.parentNode.insertBefore(
                  em2.dom,
                  emStrong.dom.nextSibling
                );
              } else {
                em2.text = wzCoatName2.value;
              }
              em2.dataType = type1;
            }
            emStrong.dataType = type1AndType2;
          }

          emStrong.text = wzCoatValue.value;
          if (
            item?.onEditMdTyp1AndType2 !== null &&
            item?.onEditMdTyp1AndType2 !== undefined
          ) {
            item?.onEditMdTyp1AndType2(e, emStrong);
          }
          let block = mv.GetSiyuanBlock(emStrong.dom);
          await mv.UpdateBlockByDom_API(selectid, block.outerHTML);
        },
        noCallBack: (dlg, btn) => {},
        cancelCallBack: (dlg, btn) => {},
        yesCaption: "确定",
        noCaption: "",
        cancelCaption: "取消",
      });
    };
    window.theme.elements.add(button);
    return button;
  }
  //#endregion ************ 打开编辑对话框

  //#region ************ 颜色选择 ************

  static WzLabelColor2Select(selectid, selecttype, dom, item) {
    let button = document.createElement("button");
    button.id = "wzselect";
    button.className = "b3-menu__item";
    button.innerHTML =
      '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">颜色选择2[强调]</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>';
    button.appendChild(
      VLookPluginEnter.WzColorSubMenu(selectid, selecttype, dom, item, false)
    );

    window.theme.elements.add(button);
    return button;
  }

  static WzLabelColor1Select(selectid, selecttype, dom, item) {
    let button = document.createElement("button");
    button.id = "wzselect";
    button.className = "b3-menu__item";
    button.innerHTML =
      '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">颜色选择1[常规]</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>';
    button.appendChild(
      VLookPluginEnter.WzColorSubMenu(selectid, selecttype, dom, item, true)
    );

    window.theme.elements.add(button);
    return button;
  }

  static WzColorSubMenu(selectid, selecttype, dom, item, isColor1) {
    let button = document.createElement("butCloaseCommonMenuton");
    button.id = "viewselectSub2";
    button.className = "b3-menu__submenu";
    button.appendChild(
      VLookPluginEnter.ColorItems(selectid, selecttype, dom, item, isColor1)
    );
    return button;
  }

  static ColorItems(
    selectid,
    selecttype,
    dom,
    item,
    isColor1,
    className = "b3-menu__items"
  ) {
    let node = document.createElement("div");
    node.className = className;

    let func = isColor1 ? item.setColor1 : item.setColor2;
    let appendColor = isColor1 ? "" : "!";

    if (func !== null && func !== undefined && typeof func === "function") {
      // todo: 实现不同的颜色选择
      //node.appendChild(ColorView(selectid, selecttype, dom, "rd","设置为Red"));
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "T1" + appendColor,
          "设置为[T1|ThemePrimary]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "T2" + appendColor,
          "设置为[T2|THemeSecondary]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Gd" + appendColor,
          "设置为[Gd|Gold]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Pk" + appendColor,
          "设置为[Pk|Pink]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Ye" + appendColor,
          "设置为[Ye|Yellow]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Lm" + appendColor,
          "设置为[Lm|Lime]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Aq" + appendColor,
          "设置为[Aq|Aqua]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "La" + appendColor,
          "设置为[La|Lavender]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Bn" + appendColor,
          "设置为[Bn|Brown]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Ro" + appendColor,
          "设置为[Ro|Rose]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Rd" + appendColor,
          "设置为[Rd|Red]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Og" + appendColor,
          "设置为[Og|Orange]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Gn" + appendColor,
          "设置为[Gn|Green]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Cy" + appendColor,
          "设置为[Cy|Cyan]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Bu" + appendColor,
          "设置为[Bu|Blue]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Vn" + appendColor,
          "设置为[Vn|Vine]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Gy" + appendColor,
          "设置为[Gy|Gray]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Pu" + appendColor,
          "设置为[Pu|Purple]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Wn" + appendColor,
          "设置为[Wn|Wine]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Ol" + appendColor,
          "设置为[Ol|Olives]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Mn" + appendColor,
          "设置为[Mn|Mineral]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Se" + appendColor,
          "设置为[Se|Sea]",
          item,
          func,
          isColor1
        )
      );
      node.appendChild(
        VLookPluginEnter.ColorView(
          selectid,
          selecttype,
          dom,
          "Bk" + appendColor,
          "设置为[Bk|Black]",
          item,
          func,
          isColor1
        )
      );
    }

    return node;
  }

  static ColorView(
    selectid,
    selecttype,
    dom,
    color,
    label,
    item,
    func,
    isColor1
  ) {
    let button = document.createElement("button");
    button.className = "b3-menu__item";
    button.setAttribute("data-node-id", selectid);
    button.setAttribute("custom-attr-name", "f");
    button.setAttribute("custom-attr-value", `${color}`);
    button.tgDom = dom;
    button.tgColor = color;
    button.tgSelecttype = selecttype;
    button.item = item;

    button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">${label}</span>`;
    //button.onclick = func;
    button.onclick = async (event) => {
      //// 获取 id 为 commonMenu 的元素
      //let commonMenu = document.getElementById("commonMenu");
      //// class 添加 fn__none
      //commonMenu.classList.add("fn__none");
      //// style 设置为 null
      //commonMenu.style = null;
      CloaseCommonMenu();

      let id = event.currentTarget.getAttribute("data-node-id");
      // dom
      let spanList = event.currentTarget.tgDom;
      if (id === null || id === undefined) return;
      if (spanList === null || spanList === undefined || spanList.length === 0)
        return;

      let emSub = spanList.find((span) => item.isEmSub(span.dom));
      if (emSub) {
        emSub.text = event.currentTarget.tgColor;
        await VLookPluginEnter.SetColorBase(id, item, spanList, func, isColor1);
      } else {
        // 如果不存在色号，则需要重新添加一个色号
        let span = InlineSpan.Init("em sub", event.currentTarget.tgColor);
        spanList[spanList.length - 1].dom.insertAdjacentHTML(
          "afterend",
          span.dom.outerHTML
        );
        spanList.push(span);
        await VLookPluginEnter.SetColorBase(id, item, spanList, func, isColor1);
      }
    };
    return button;
  }

  static async SetColorBase(id, item, spanList, func, isColor1) {
    if (
      mv.Empty(id) ||
      spanList === null ||
      spanList === undefined ||
      spanList.length === 0
    ) {
      return;
    }

    let tgKey = item.tgkey1;
    let colorInfo = item.colorCondig1;
    let colorTg = colorTg1;

    if (isColor1 === false) {
      tgKey = item.tgkey2;
      colorInfo = item.colorCondig2;
      colorTg = colorTg2;
    }

    let mdtyp1 = colorInfo?.mdtyp1 ?? null;
    let mdtyp1and2 = colorInfo?.mdtyp1AND2 ?? null;
    let onlyMdtyp1and2 = colorInfo?.onlyMdtyp1AND2 ?? null;
    let emSubCfg = colorInfo?.emSub ?? null;

    let emSub = spanList.find((span) => item.isEmSub(span.dom));

    if (emSub) {
      tgKey = emSub.text;
    }
    // 从 colorTg 中找到 tgKey 的配置
    let colorConfig = colorTg[tgKey];
    /**
       color: "nameColor",
        bgcolor: "nameBgColor",
        styleList: [],
        classList: [],
    
      this.colorCondig1 = {
        // 色号
        emSub: null,
        // mdType1
        mdtyp1: null,
        // mdType1 和 mdType1 的时候
        mdtyp1AND2: null,
        // 只有 mdType1 和 mdType1 的时候
        onlyMdtyp1AND2: null,
      };
    */

    function setStyleVar(element, config, item) {
      //  预留对设置样式后的统一操作
      return;
    }

    if (colorConfig) {
      // 对所有 span 所有的 em 设置为 nameColor 和 nameBgColor
      spanList.forEach((span) => {
        if (item.isMdType1(span.dom) && mdtyp1) {
          if (!mv.Empty(mdtyp1.color))
            span.dom.style.color = colorConfig[mdtyp1.color];
          if (!mv.Empty(mdtyp1.bgcolor))
            span.dom.style.backgroundColor = colorConfig[mdtyp1.bgcolor];
          let styleList = mdtyp1.styleList;
          // 通过 styleList 设置样式
          if (
            styleList !== null &&
            styleList !== undefined &&
            styleList.length !== 0
          ) {
            styleList.forEach((element) => {
              mv.SetStyleValue(
                span.dom.style,
                element.name,
                colorConfig[element.value]
              );
            });
          }
          setStyleVar(span.dom, colorConfig, item);
        }
      });

      // 对所有 span 所有的 em code 设置为 valueColor 和 valueBgColor
      spanList.forEach((span) => {
        if (item.isMdType1AndType2(span.dom) && mdtyp1and2) {
          if (!mv.Empty(mdtyp1and2.color))
            span.dom.style.color = colorConfig[mdtyp1and2.color];
          if (!mv.Empty(mdtyp1and2.bgcolor))
            span.dom.style.backgroundColor = colorConfig[mdtyp1and2.bgcolor];
          let styleList = mdtyp1and2.styleList;
          // 通过 styleList 设置样式
          if (
            styleList !== null &&
            styleList !== undefined &&
            styleList.length !== 0
          ) {
            styleList.forEach((element) => {
              mv.SetStyleValue(
                span.dom.style,
                element.name,
                colorConfig[element.value]
              );
            });
          }
          setStyleVar(span.dom, colorConfig, item);
        }
      });

      // 如果只存在  mdtyp1And2 的情况下
      if (spanList.length === 1 || (spanList.length === 2 && emSub)) {
        spanList.forEach((span) => {
          if (item.isMdType1AndType2(span.dom) && onlyMdtyp1and2) {
            if (!mv.Empty(onlyMdtyp1and2.color))
              span.dom.style.color = colorConfig[onlyMdtyp1and2.color];
            if (!mv.Empty(onlyMdtyp1and2.bgcolor))
              span.dom.style.backgroundColor =
                colorConfig[onlyMdtyp1and2.bgcolor];
            let styleList = onlyMdtyp1and2.styleList;
            // 通过 styleList 设置样式
            if (
              styleList !== null &&
              styleList !== undefined &&
              styleList.length !== 0
            ) {
              styleList.forEach((element) => {
                mv.SetStyleValue(
                  span.dom.style,
                  element.name,
                  colorConfig[element.value]
                );
              });
            }
            setStyleVar(span.dom, colorConfig, item);
          }
        });
      }

      // 设置 emsub
      if (emSub && emSubCfg) {
        if (!mv.Empty(emSubCfg.color))
          emSub.dom.style.color = colorConfig[emSubCfg.color];
        if (!mv.Empty(emSubCfg.bgcolor))
          emSub.dom.style.backgroundColor = colorConfig[emSubCfg.bgcolor];
        let styleList = emSubCfg.styleList;
        // 通过 styleList 设置样式
        if (
          styleList !== null &&
          styleList !== undefined &&
          styleList.length !== 0
        ) {
          styleList.forEach((element) => {
            mv.SetStyleValue(
              emSub.dom.style,
              element.name,
              colorConfig[element.value]
            );
          });
        }
        setStyleVar(emSub.dom, colorConfig, item);
      }
    }

    func(item, spanList);

    let block = mv.GetSiyuanBlock(spanList[0].dom);
    return await mv.UpdateBlockByDom_API(id, block.outerHTML);
  }

  //#endregion ************ 颜色选择
}

function CloaseCommonMenu() {
  // 获取 id 为 commonMenu 的元素
  let commonMenu = document.getElementById("commonMenu");
  // class 添加 fn__none
  commonMenu.classList.add("fn__none");
  // style 设置为 null
  commonMenu.style = null;
}

/*
 * 获取光标处的 DOM
 * @returns
 */
function getSelectionDom(e) {
  let selection = window.getSelection();
  let anchorNode = selection.anchorNode;

  // 如果 anchorNode 是 textnode 且 父元素是 span，返回父元素
  if (
    selection?.anchorNode?.nodeType === Node.TEXT_NODE &&
    selection?.anchorNode?.parentNode?.tagName === "SPAN"
  ) {
    anchorNode = selection.anchorNode.parentNode;
  }
  // 当点击的是 em mark 的时候，并且 selection.anchorNode 为 Null，选中 e.target
  // if (e.target.tagName == "SPAN" && e.target.getAttribute("data-type") == "em mark"  && selection.anchorNode == null)
  if (e.target.tagName == "SPAN" && selection.anchorNode == null) {
    anchorNode = e.target;
    let range = new Range();
    range.setStart(anchorNode, 0);
    range.setEnd(anchorNode, anchorNode.length - 1);
    selection.addRange(range);
  }

  // 如果 selection.anchorNode 是 TextNode
  if (
    selection.anchorNode === null ||
    selection.anchorNode.nodeType === Node.TEXT_NODE
  ) {

    if (e.clientX === undefined || e.clientY === undefined) {
      return anchorNode;
    }

    const targetElement = document.elementFromPoint(e.clientX, e.clientY);
    if (targetElement && targetElement.nodeType === Node.TEXT_NODE) {
      anchorNode = targetElement.parentElement;
    } else if (targetElement && targetElement.nodeType === Node.ELEMENT_NODE) {
      anchorNode = targetElement;
    }
  }

  return anchorNode;
}

/**
 * 判断字符是否为零宽字符或 null
 * @param {*} char
 * @returns
 */
function isZeroWidthCharacterOrNull(char) {
  if (char === null || char === undefined) return true;
  const zeroWidthChars = [
    "\u200B", // Zero Width Space
    "\u200C", // Zero Width Non-Joiner
    "\u200D", // Zero Width Joiner
    "\u2060", // Word Joiner
    "\uFEFF", // Zero Width No-Break Space (deprecated but still exists)
  ];

  const zeroWidthRegex = /^[\u200B\u200C\u200D\uFEFF]+$/;
  //return zeroWidthRegex.test(str);
  return (
    zeroWidthRegex.test(char) ||
    char === null ||
    char === undefined ||
    char === ""
  );
}
/**
 * 获取上一个兄弟节点，如果该节点是 textnode,且是零宽字符或null,继续获取上一个兄弟节点，直到不是零宽字符或null
 * @param {*} node
 * @returns
 */
function getPreviousSibling(node) {
  if (node === null || node === undefined) return null;
  let previousSibling = node.previousSibling;
  if (previousSibling === null || previousSibling === undefined) return null;
  while (
    previousSibling.nodeType === Node.TEXT_NODE &&
    isZeroWidthCharacterOrNull(previousSibling.nodeValue)
  ) {
    previousSibling = previousSibling.previousSibling;
    if (previousSibling === null || previousSibling === undefined) return null;
  }
  return previousSibling;
}

/**
 * 获取下一个兄弟节点，如果该节点是 textnode,且是零宽字符或null,继续获取下一个兄弟节点，直到不是零宽字符或null
 * @param {*} node
 * @returns
 */
function getNextSibling(node) {
  if (node === null || node === undefined) return null;
  let nextSibling = node.nextSibling;
  if (nextSibling === null || nextSibling === undefined) return null;
  while (
    nextSibling.nodeType === Node.TEXT_NODE &&
    isZeroWidthCharacterOrNull(nextSibling.nodeValue)
  ) {
    nextSibling = nextSibling.nextSibling;
    if (nextSibling === null || nextSibling === undefined) return null;
  }
  return nextSibling;
}

async function setWzLabel(e, dataType, dofunc = null, dofunc2 = null) {
  // 1. 获取选区的块，并拆分为 SiyuanSpan 和 InlineList
  let siyuanSpan = SiyuanSpan.InitBySelection();

  if (siyuanSpan === null || siyuanSpan === undefined) {
    return;
  }

  // 2. 判断  siyuanSpan.InlineList 是否为空
  if (siyuanSpan.InlineList.length === 0) {
    return;
  }

  // 3. 设置 siyuanSpan.InlineList 为微章
  siyuanSpan.setWZ(dataType, dofunc);
  if (dofunc2) {
    dofunc2(siyuanSpan);
  }

  // 4. 根据 siyuanSpan.InlineList 更新选区
  await siyuanSpan.UpdateSelection(false);
}

const colorTg1 = {
  Rd: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-rd)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-rd)",
    onlyValueBgColor: "var(--m-ac-rd-a)",
  },
  Ye: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-ye)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-ye)",
    onlyValueBgColor: "var(--m-ac-ye-a)",
  },
  Og: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-og)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-og)",
    onlyValueBgColor: "var(--m-ac-og-a)",
  },
  T1: {
    nameColor: "var(--m-theme1-on-background)",
    nameBgColor: "var(--m-ac-t1)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-t1)",
    onlyValueBgColor: "var(--m-ac-t1-a)",
  },
  T2: {
    nameColor: "var(--m-theme2-on-background)",
    nameBgColor: "var(--m-ac-t2)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-t2)",
    onlyValueBgColor: "var(--m-ac-t2-a)",
  },
  Gd: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-gd)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-gd)",
    onlyValueBgColor: "var(--m-ac-gd-a)",
  },
  Pk: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-pk)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-pk)",
    onlyValueBgColor: "var(--m-ac-pk-a)",
  },
  Lm: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-lm)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-lm)",
    onlyValueBgColor: "var(--m-ac-lm-a)",
  },
  Aq: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-aq)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-aq)",
    onlyValueBgColor: "var(--m-ac-aq-a)",
  },
  La: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-la)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-la)",
    onlyValueBgColor: "var(--m-ac-la-a)",
  },
  Bn: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-bn)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-bn)",
    onlyValueBgColor: "var(--m-ac-bn-a)",
  },
  Ro: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-ro)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-ro)",
    onlyValueBgColor: "var(--m-ac-ro-a)",
  },
  Gn: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-gn)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-gn)",
    onlyValueBgColor: "var(--m-ac-gn-a)",
  },
  Cy: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-cy)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-cy)",
    onlyValueBgColor: "var(--m-ac-cy-a)",
  },
  Bu: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-bu)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-bu)",
    onlyValueBgColor: "var(--m-ac-bu-a)",
  },
  Vn: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-vn)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-vn)",
    onlyValueBgColor: "var(--m-ac-vn-a)",
  },
  Gy: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-gy)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-gy)",
    onlyValueBgColor: "var(--m-ac-gy-a)",
  },
  Pu: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-pu)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-pu)",
    onlyValueBgColor: "var(--m-ac-pu-a)",
  },
  Wn: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-wn)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-wn)",
    onlyValueBgColor: "var(--m-ac-wn-a)",
  },
  Ol: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-ol)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-ol)",
    onlyValueBgColor: "var(--m-ac-ol-a)",
  },
  Mn: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-mn)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-mn)",
    onlyValueBgColor: "var(--m-ac-mn-a)",
  },
  Se: {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-se)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-se)",
    onlyValueBgColor: "var(--m-ac-se-a)",
  },
  Bk: {
    // todo: 代办，看看 bk 怎么设计才好看
    nameColor: "var(--theme-wzline-valueColor)",
    nameBgColor: "var(--m-ac-bk)",
    valueColor: "#fff",
    valueBgColor: "var(--m-ac-gy)",
    onlyValueColor: "var(--m-ac-bk)",
    onlyValueBgColor: "var(--m-ac-bk-a)",
  },
};

const colorTg2 = {
  "Rd!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-rd)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-rd)",
    onlyValueBgColor: "var(--m-ac-rd-a)",
  },
  "Ye!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-ye)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-ye)",
    onlyValueBgColor: "var(--m-ac-ye-a)",
  },
  "Og!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-og)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-og)",
    onlyValueBgColor: "var(--m-ac-og-a)",
  },
  "T1!": {
    nameColor: "var(--m-theme1-on-background)",
    nameBgColor: "var(--m-ac-t1)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-t1)",
    onlyValueBgColor: "var(--m-ac-t1-a)",
  },
  "T2!": {
    nameColor: "var(--m-theme2-on-background)",
    nameBgColor: "var(--m-ac-t2)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-t2)",
    onlyValueBgColor: "var(--m-ac-t2-a)",
  },
  "Gd!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-gd)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-gd)",
    onlyValueBgColor: "var(--m-ac-gd-a)",
  },
  "Pk!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-pk)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-pk)",
    onlyValueBgColor: "var(--m-ac-pk-a)",
  },
  "Lm!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-lm)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-lm)",
    onlyValueBgColor: "var(--m-ac-lm-a)",
  },
  "Aq!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-aq)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-aq)",
    onlyValueBgColor: "var(--m-ac-aq-a)",
  },
  "La!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-la)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-la)",
    onlyValueBgColor: "var(--m-ac-la-a)",
  },
  "Bn!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-bn)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-bn)",
    onlyValueBgColor: "var(--m-ac-bn-a)",
  },
  "Ro!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-ro)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-ro)",
    onlyValueBgColor: "var(--m-ac-ro-a)",
  },
  "Gn!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-gn)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-gn)",
    onlyValueBgColor: "var(--m-ac-gn-a)",
  },
  "Cy!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-cy)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-cy)",
    onlyValueBgColor: "var(--m-ac-cy-a)",
  },
  "Bu!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-bu)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-bu)",
    onlyValueBgColor: "var(--m-ac-bu-a)",
  },
  "Vn!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-vn)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-vn)",
    onlyValueBgColor: "var(--m-ac-vn-a)",
  },
  "Gy!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-gy)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-gy)",
    onlyValueBgColor: "var(--m-ac-gy-a)",
  },
  "Pu!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-pu)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-pu)",
    onlyValueBgColor: "var(--m-ac-pu-a)",
  },
  "Wn!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-wn)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-wn)",
    onlyValueBgColor: "var(--m-ac-wn-a)",
  },
  "Ol!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-ol)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-ol)",
    onlyValueBgColor: "var(--m-ac-ol-a)",
  },
  "Mn!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-mn)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-mn)",
    onlyValueBgColor: "var(--m-ac-mn-a)",
  },
  "Se!": {
    nameColor: "#fff",
    nameBgColor: "var(--m-ac-se)",
    valueColor: "var(--theme-wzline-valueColor)",
    valueBgColor: "var(--theme-wzline-valueBgColor)",
    onlyValueColor: "var(--m-ac-se)",
    onlyValueBgColor: "var(--m-ac-se-a)",
  },
  "Bk!": {
    // todo: 代办，看看 bk 怎么设计才好看
    nameColor: "var(--theme-wzline-valueColor)",
    nameBgColor: "var(--m-ac-bk)",
    valueColor: "#fff",
    valueBgColor: "var(--m-ac-gy)",
    onlyValueColor: "var(--m-ac-bk)",
    onlyValueBgColor: "var(--m-ac-bk-a)",
  },
};
