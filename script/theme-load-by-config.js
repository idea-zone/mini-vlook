import { render, 获取文件Savor,写入文件Savor } from "./api.js";
import { isKey } from "./hotkey.js";
import { applySavedThemeEffects, themeButton } from "./theme-load-switchbutton.js";
import { appendToolbarBtn} from "./theme-load-tooltipbutton.js";
import { ClickMonitor } from "./theme-load-menubutton.js";
import { VLookPluginEnter, setWzLabel } from "./theme-vlook-plugin.js";
import {RenderVLook13} from "./vlook13/codelabel-custom.js"
import { ThemeDialog } from "./ThemeDialog.js";

export var config = {
  theme:{
    hotkeys:{
      wz:{
        render:{
          // 渲染(Ctrl + Alt + 0)
          ctrlKey: false,
          metaKey: false,
          shiftKey: false,
          altKey: true,
          key: "w",
        }
      },
      ct:{
        render:{
          ctrlKey: true,
          metaKey: false,
          shiftKey: false,
          altKey: false,
          key: "b",
        }
      }
    }
  }
}

function safeInit(name, init) {
  try {
    return init();
  } catch (error) {
    console.warn(`[Mini-VLOOK] ${name} init failed`, error);
    return null;
  }
}


/**
 * 根据配置文件加载相关功能
 */
获取文件Savor("/data/snippets/MiniVlook.config.json", async (v) => {
  let funs = () => {
    setTimeout(() => {
      const env = window.theme?.env;
      if (env?.isMobileLike || isPhone()) {
        window.theme?.log?.("skip desktop init on mobile", env);
        return;
      }

      safeInit("applySavedThemeEffects", () => applySavedThemeEffects());
      safeInit("themeButton", () => themeButton({ applySaved: false }));
      safeInit("appendToolbarBtn", () => appendToolbarBtn());

      safeInit("selectionchange.appendToolbarBtn", () => {
        window.theme?.addEventListener?.(document, "selectionchange", async () => {
          safeInit("appendToolbarBtn.selectionchange", () => appendToolbarBtn());
        });
      });

      safeInit("VLookPluginEnter.HandleShortcutKey", () => {
        if (!document.body) return;
        window.theme?.addEventListener?.(document.body, "keydown", async(e)=>{
          await VLookPluginEnter.HandleShortcutKey(e);
        });
      });

      safeInit("VLookPluginEnter.Init", () => VLookPluginEnter.Init());
      safeInit("ClickMonitor", () => setTimeout(() => safeInit("ClickMonitor.delayed", () => ClickMonitor()), 3000));
      safeInit("RenderVLook13", () => RenderVLook13());

      window.theme?.log?.("附加CSS和特性JS_已经执行", env);
    }, 100);
  };
  if (v == null) {
    window.theme.config = { Savor: 1 };
    写入文件Savor("/data/snippets/MiniVlook.config.json", JSON.stringify(window.theme.config, undefined, 4), funs);
  } else {
    window.theme.config = v;
    funs();
  }
});




// #region **********  给 window 注入额外的函数  **********

// 窗口相关
window.DialogButtonStyleEnum = {
  Yes: "Yes",
  No: "No",
  Cancel: "Cancel",
  YesOrCancel: "YesCancel",
  YesOrNo: "YesNo",
  YesNoOrCancel: "YesNoCancel",
};

window.DialogResultEnum = {
  OK: "OK",
  No: "No",
  Cancel: "Cancel",
  None: "None",
};

/** 仿 alert 弹窗，只显示一个按钮，支持回调
 * 如果传入只传入一个字符串，作为消息内容
 * 如果传入只传入两个字符串，第一个作为标题，第二个作为消息内容
 * 如果第一个参数是字符串，第二个参数是函数，则第一个作为消息内容，第二个作为确定按钮的回调
 * 如果传入参数大于 2 个，第一个作为标题，第二个作为消息内容，第三个作为确定按钮的回调
 * @param {*} tilte 标题
 * @param {*} msg 消息内容
 * @param {*} yesCallBack 确定按钮的回调
 */
window.palert = function () 
{
  var args = Array.prototype.slice.call(arguments); 

  let tilte="提示", msg="", yesCallBack=(dlg,btn)=>{};
  if (args !== null && args !== undefined && args.length>0)
  {
    if (args.length === 1){
      msg=args[0];
    }
    else if (args.length === 2)
    {
      if (typeof args[1] !== "function"){
        tilte=args[0];
        msg=args[1];
      }
      else
      {
        msg=args[0];
        yesCallBack=args[1];
      }
    }else if (args.length>2){
      tilte=args[0];
      msg=args[1];
      yesCallBack=args[2];
    }
  }

  var dialog = window.pshow(
    tilte,
    msg,
    "info",
    (options = {
      dialogButtonStyleEnum: window.DialogButtonStyleEnum.Yes,
      yesCallBack: yesCallBack,
    })
  );
  return dialog;
};

/** 仿 confirm 弹窗，显示两个按钮，支持对 yes 和 cancel 回调；
 * 如果传入只传入一个字符串，作为消息内容；
 * 如果传入只传入两个字符串，第一个作为标题，第二个作为消息内容；
 * 如果传入三个参数，如果第一个是 string，第二是 function: 第一个作为消息内容，第二个作为确定按钮的回调，第三个作为取消按钮的回；
 * 如果传入三个参数，如果第一个是 string，第二也是 string: 第一个作为标题，第二个作为消息内容，第三个作为确定按钮的回调；
 * 如果传入参数大于 3 个，第一个作为标题，第二个作为消息内容，第三个作为确定按钮的回调，第四个作为取消按钮的回调；
 * @param {*} tilte 标题
 * @param {*} msg  消息
 * @param {*} yesCallBack 确定按钮的回调
 * @param {*} cancelCallBack 取消按钮的回调
 * @returns 
 */
window.pconfirm =  function () {
  
  var args = Array.prototype.slice.call(arguments); 
  let tilte="提示", msg="", yesCallBack=(dlg,btn)=>{}, cancelCallBack=(dlg,btn)=>{};


  if (args !== null && args !== undefined && args.length>0)
  {
    if (args.length === 1){
      msg=args[0];
    }
    else if (args.length === 2)
    {
      tilte=args[0];
      msg=args[1];
    }
    else if (args.length==3)
    {
      if (typeof args[0] === "string" && typeof args[1] === "function"){
        msg=args[0];
        yesCallBack=args[1];
        cancelCallBack=args[2];
      }
      else
      {
        tilte=args[0];
        msg=args[1];
        yesCallBack=args[2];
      }
    }
    else if (args.length >3)
    {
      tilte=args[0];
      msg=args[1];
      yesCallBack=args[2];
      cancelCallBack=args[3];
    }
  }
  
  
  var dialog =  window.pshow(
    tilte,
    msg,
    "info",
    (options = {
      dialogButtonStyleEnum: window.DialogButtonStyleEnum.YesOrCancel,
      yesCallBack: yesCallBack,
      cancelCallBack: cancelCallBack,
    })
  );
  return  dialog;
};

window.pshow=  function (
  title,
  content,
  icon,
  options = {
    dialogButtonStyleEnum: window.DialogButtonStyleEnum.YesOrCancel,
    yesCallBack: (dlg) => {},
    noCallBack: (dlg) => {},
    cancelCallBack: (dlg) => {},
    yesCaption: "",
    noCaption: "",
    cancelCaption: "",
    width: "0px",
    height: "0px",
  }
) {
  let ele = ""; // 显示内容
  let yesTxt = options.yesCaption;
  let noTxt = options.noCaption;
  let cancelTxt = options.cancelCaption;
  let dialogButtonStyleEnum = options.dialogButtonStyleEnum;

  // 按钮是否显示
  let yesShow = "block";
  let noShow = "block";
  let cancelShow = "block";
  if (dialogButtonStyleEnum.indexOf(window.DialogButtonStyleEnum.Yes) === -1) {
    yesShow = "none";
  }
  if (dialogButtonStyleEnum.indexOf(window.DialogButtonStyleEnum.No) === -1) {
    noShow = "none";
  }
  if (
    dialogButtonStyleEnum.indexOf(window.DialogButtonStyleEnum.Cancel) === -1
  ) {
    cancelShow = "none";
  }

  // 按钮显示文本
  if (dialogButtonStyleEnum === window.DialogButtonStyleEnum.Yes) {
    if (empty(yesTxt) === true) yesTxt = "确定";
  }
  if (dialogButtonStyleEnum === window.DialogButtonStyleEnum.YesOrNo) {
    if (empty(yesTxt) === true) yesTxt = "是";
    if (empty(noTxt) === true) noTxt = "否";
  }
  if (dialogButtonStyleEnum === window.DialogButtonStyleEnum.YesOrCancel) {
    if (empty(yesTxt) === true) yesTxt = "确定";
    if (empty(cancelTxt) === true) cancelTxt = "取消";
  }
  if (dialogButtonStyleEnum === window.DialogButtonStyleEnum.YesNoOrCancel) {
    if (empty(yesTxt) === true) yesTxt = "是";
    if (empty(noTxt) === true) noTxt = "否";
    if (empty(cancelTxt) === true) cancelTxt = "取消";
  }

  // 如果是文本，直接通过 ele 插入
  if (typeof content === "string") {
    ele = content;
  }


/*
  // 定义窗口  style="display:flex; flex-direction: row-reverse;padding:5px;border-top:1px solid #e0e0e0;"
  const dialog =  new Dialog({
    title: title,
    content: `<div>
                <div class="devtools-dialog-content ft__breakword" style="width:520px;height:auto;left:undefined;top:undefined;padding:20px;">
                  ${ele}
                </div>
                <div class="b3-dialog__action" >
                  <button class="devtools-dialog-content-yes b3-button b3-button--text"  style="display:${yesShow};" >${yesTxt}</button>
                  <button class="devtools-dialog-content-no  b3-button b3-button--cancel"   style="display:${noShow};" >${noTxt}</button>
                  <button class="devtools-dialog-content-cancel b3-button b3-button--cancel"  style="display:${cancelShow};" >${cancelTxt}</button>
                </div>
             </div>`,
    // width: options.width,
    // height: options.height,
    destroyCallback: options.callback,
  });
*/

const dialog =  new ThemeDialog({
  title: title,
  content: `<div>
              <div class="devtools-dialog-content ft__breakword" style="width:520px;height:auto;left:undefined;top:undefined;padding:20px;">
                ${ele}
              </div>
              <div class="b3-dialog__action" >
                <button class="devtools-dialog-content-yes b3-button b3-button--text"  style="display:${yesShow};" >${yesTxt}</button>
                <button class="devtools-dialog-content-no  b3-button b3-button--cancel"   style="display:${noShow};" >${noTxt}</button>
                <button class="devtools-dialog-content-cancel b3-button b3-button--cancel"  style="display:${cancelShow};" >${cancelTxt}</button>
              </div>
           </div>`,

  // width: options.width,
  // height: options.height,
  destroyCallback: options.callback,
});



  // 如果不是文本，直接通过 document 插入
  if (
    typeof content !== "string" &&
    ele !== null &&
    ele !== undefined &&
    ele.length > 0
  ) {
    dialog.element
      .querySelector(".devtools-dialog-content")
      .appendChild(content);
  }

  // 定义按钮触发事件
  dialog.element.querySelector(".devtools-dialog-content-yes").onclick =
     function () {
      options.yesCallBack(dialog,dialog.element.querySelector(".devtools-dialog-content-yes"));
      dialog.destroy();
  };
  dialog.element.querySelector(".devtools-dialog-content-no").onclick =
     function () {
       options.noCallBack(dialog,dialog.element.querySelector(".devtools-dialog-content-no"));
       dialog.destroy();
  };
  dialog.element.querySelector(".devtools-dialog-content-cancel").onclick =
     function () {
       options.cancelCallBack(dialog,dialog.element.querySelector(".devtools-dialog-content-cancel"));
       dialog.destroy();
  };
  return  dialog;
};


/** 判断传入的字符串是否为空串 或者 未定义
 * @param {*} str 传入的字符
 * @returns 
 */
function empty(str) {
  if (str == "undefined" || !str || !/[^\s]/.test(str)) {
    return true;
  } else {
    return false;
  }
}


// #endregion **********  给 window 注入额外的函数  

