/**
 * 在顶部导航栏添加按钮
 */
export{
    themeButton
}

import { insertCreateBefore, addinsertCreateElement, AddEvent } from "./domex.js";
import { getItem,setItem} from "./config.js";
import { mv } from "./mv-util.js";


//#region ***********************  在顶部导航栏添加主题按钮  ***********************

// 1. 在顶部添加一个按钮

/**  savorThemeToolbarAddButton
 * 方便为主题功能添加开关按钮，并选择是否拥有记忆状态
 * @param {*} ButtonID 按钮ID。
 * @param {*} ButtonTitle 按钮作用提示文字。
 * @param {*} NoButtonSvg 按钮激活Svg图标路径
 * @param {*} OffButtonSvg 按钮未激活Svg图标路径
 * @param {*} NoClickRunFun 按钮开启执行函数
 * @param {*} OffClickRunFun 按钮关闭执行函数
 * @param {*} Memory 是否设置记忆状态 true为是留空或false为不设置记忆状态。
 */
function minivlookThemeToolbarAddButton(
    ButtonID,
    ButtonTitle,
    ButtonLabel,
    Mode,
    NoClickRunFun,
    OffClickRunFun,
    Memory
  ) {
    var savorToolbar = document.getElementById("minivlookToolbar");
    if (savorToolbar == null) {
      var toolbarEdit = document.getElementById("toolbarEdit");
      var windowControls = document.getElementById("windowControls");
  
      if (toolbarEdit == null && barBack != null) {
        savorToolbar = document.createElement("div");
        savorToolbar.id = "minivlookToolbar";
        windowControls.parentElement.insertBefore(savorToolbar, windowControls);
      } else if (toolbarEdit != null) {
        savorToolbar = insertCreateBefore(toolbarEdit, "div", "minivlookToolbar");
        savorToolbar.style.position = "relative";
      }
    }
  
    var addButton = addinsertCreateElement(savorToolbar, "div");
    addButton.style.float = "top";
  
    addButton.id = ButtonID;
    addButton.setAttribute("class", ButtonTitle + " button_off");
    addButton.setAttribute("aria-label", ButtonLabel);
  
    // 取消 Mode 的判断
    if (window.theme.themeMode == Mode || true) {
      var offNo = "0";
      // 如果主题是暗色主题，默认选中样式
      if (Mode == "dark") {
        if (Memory == true) {
          offNo = getItem(ButtonID);
          if (offNo == "1") {
            addButton.setAttribute("class", ButtonTitle + " button_on");
            setItem(ButtonID, "0");
            NoClickRunFun(addButton);
            setItem(ButtonID, "1");
          } else if (offNo != "0") {
            offNo = "0";
            setItem(ButtonID, "0");
          }
        }
  
        AddEvent(addButton, "click", () => {
          if (offNo == "0") {
            addButton.setAttribute("class", ButtonTitle + " button_on");
            NoClickRunFun(addButton);
            if (Memory != null) setItem(ButtonID, "1");
            offNo = "1";
            return;
          }
  
          if (offNo == "1") {
            addButton.setAttribute("class", ButtonTitle + " button_off");
            OffClickRunFun(addButton);
            if (Memory != null) setItem(ButtonID, "0");
            offNo = "0";
            return;
          }
        });
      } else {
        if (Memory == true) {
          offNo = getItem(ButtonID);
          if (offNo == "1") {
            addButton.setAttribute("class", ButtonTitle + " button_on");
            setItem(ButtonID, "0");
            NoClickRunFun(addButton);
            setItem(ButtonID, "1");
          } else if (offNo != "0") {
            offNo = "0";
            setItem(ButtonID, "0");
          }
        }
  
        AddEvent(addButton, "click", () => {
          if (offNo == "0") {
            addButton.setAttribute("class", ButtonTitle + " button_on");
            NoClickRunFun(addButton);
            if (Memory != null) setItem(ButtonID, "1");
            offNo = "1";
            return;
          }
  
          if (offNo == "1") {
            addButton.setAttribute("class", ButtonTitle + " button_off");
            OffClickRunFun(addButton);
            if (Memory != null) setItem(ButtonID, "0");
            offNo = "0";
            return;
          }
        });
      }
    }
}
  
//去除主题所有滤镜还原按钮状态
function qucuFiiter() {
var Topicfilters = document.querySelectorAll("head [topicfilter]");
Topicfilters.forEach((element) => {
    var offNo = getItem(element.getAttribute("topicfilter"));
    if (offNo == "1") {
    document.getElementById(element.getAttribute("topicfilter")).click();
    element.remove();
    }
});
}


function themeButton() {

  minivlookThemeToolbarAddButton(
    "mvButtonBug320",
    "toolbar__item b3-tooltips b3-tooltips__sw",
    "Bug320 配色",
    "light",
    (btn) => {
    loadStyle(
        "/appearance/themes/mini-vlook/styles/vlook/vlook-30-x-bug320.css",
        "theme-color-style-MiniVook-bug320"
    ).setAttribute("topicfilter", "mvButtonBug320");
    document.body.setAttribute("mini-vlook-mode", "bug320");
    qucuFiiter();
    },
    (btn) => {
    document.getElementById("theme-color-style-MiniVook-bug320")?.remove();
    document.body.removeAttribute("mini-vlook-mode");
  },
    true
);

minivlookThemeToolbarAddButton(
  "mvButtonAurora",
  "toolbar__item b3-tooltips b3-tooltips__sw",
  "Aurora 配色",
  "light",
  () => {
  loadStyle(
      "/appearance/themes/mini-vlook/styles/vlook/vlook-30-x-aurora.css",
      "theme-color-style-MiniVook-Aurora"
  ).setAttribute("topicfilter", "mvButtonAurora");
  qucuFiiter();
  document.body.setAttribute("mini-vlook-mode", "Aurora");
  },
  (btn) => {
  document.getElementById("theme-color-style-MiniVook-Aurora")?.remove();
  document.body.removeAttribute("mini-vlook-mode");
  },
  true
);

minivlookThemeToolbarAddButton(
  "mvButtonFrost",
  "toolbar__item b3-tooltips b3-tooltips__sw",
  "Frost 配色",
  "light",
  () => {
  loadStyle(
      "/appearance/themes/mini-vlook/styles/vlook/vlook-30-x-frost.css",
      "theme-color-style-MiniVook-Frost"
  ).setAttribute("topicfilter", "mvButtonFrost");
  qucuFiiter();
  document.body.setAttribute("mini-vlook-mode", "Frost");
  },
  (btn) => {
  document.getElementById("theme-color-style-MiniVook-Frost")?.remove();
  document.body.removeAttribute("mini-vlook-mode");
  },
  true
);

minivlookThemeToolbarAddButton(
    "mvButtonFancy",
    "toolbar__item b3-tooltips b3-tooltips__sw",
    "Fancy 配色",
    "light",
    () => {
    loadStyle(
        "/appearance/themes/mini-vlook/styles/vlook/vlook-30-fancy.css",
        "theme-color-style-MiniVook-fancy"
    ).setAttribute("topicfilter", "mvButtonFancy");
    qucuFiiter();
    document.body.setAttribute("mini-vlook-mode", "fancy");
    },
    (btn) => {
    document.getElementById("theme-color-style-MiniVook-fancy")?.remove();
    document.body.removeAttribute("mini-vlook-mode");
    },
    true
);

minivlookThemeToolbarAddButton(
    "mvButtonGeek",
    "toolbar__item b3-tooltips b3-tooltips__sw",
    "Geek 配色",
    "light",
    () => {
    loadStyle(
        "/appearance/themes/mini-vlook/styles/vlook/vlook-30-geek.css",
        "theme-color-style-MiniVook-geek"
    ).setAttribute("topicfilter", "mvButtonGeek");
    qucuFiiter();
    document.body.setAttribute("mini-vlook-mode", "geek");
    },
    (btn) => {
    document.getElementById("theme-color-style-MiniVook-geek")?.remove();
    document.body.removeAttribute("mini-vlook-mode");
    },
    true
);

minivlookThemeToolbarAddButton(
    "mvButtonHope",
    "toolbar__item b3-tooltips b3-tooltips__sw",
    "Hope 配色",
    "light",
    () => {
    loadStyle(
        "/appearance/themes/mini-vlook/styles/vlook/vlook-30-hope.css",
        "theme-color-style-MiniVook-hope"
    ).setAttribute("topicfilter", "mvButtonHope");
    qucuFiiter();
    document.body.setAttribute("mini-vlook-mode", "hope");
    },
    (btn) => {
    document.getElementById("theme-color-style-MiniVook-hope")?.remove();
    document.body.removeAttribute("mini-vlook-mode");
    },
    true
);

minivlookThemeToolbarAddButton(
    "mvButtonJoint",
    "toolbar__item b3-tooltips b3-tooltips__sw",
    "Joint 配色",
    "light",
    () => {
    loadStyle(
        "/appearance/themes/mini-vlook/styles/vlook/vlook-30-joint.css",
        "theme-color-style-MiniVook-joint"
    ).setAttribute("topicfilter", "mvButtonJoint");
    qucuFiiter();
    document.body.setAttribute("mini-vlook-mode", "joint");
    },
    (btn) => {
    document.getElementById("theme-color-style-MiniVook-joint")?.remove();
    document.body.removeAttribute("mini-vlook-mode");
    },
    true
);

minivlookThemeToolbarAddButton(
    "mvButtonOwl",
    "toolbar__item b3-tooltips b3-tooltips__sw",
    "Owl 配色",
    "light",
    () => {
    loadStyle(
        "/appearance/themes/mini-vlook/styles/vlook/vlook-30-owl.css",
        "theme-color-style-MiniVook-owl"
    ).setAttribute("topicfilter", "mvButtonOwl");
    qucuFiiter();
    document.body.setAttribute("mini-vlook-mode", "owl");
    },
    (btn) => {
    document.getElementById("theme-color-style-MiniVook-owl")?.remove();
    document.body.removeAttribute("mini-vlook-mode");
    },
    true
);

minivlookThemeToolbarAddButton(
    "mvButtonSolaris",
    "toolbar__item b3-tooltips b3-tooltips__sw",
    "Solaris 配色",
    "light",
    () => {
    loadStyle(
        "/appearance/themes/mini-vlook/styles/vlook/vlook-30-solaris.css",
        "theme-color-style-MiniVook-solaris"
    ).setAttribute("topicfilter", "mvButtonSolaris");
    qucuFiiter();
    document.body.setAttribute("mini-vlook-mode", "solaris");
    },
    (btn) => {
    document.getElementById("theme-color-style-MiniVook-solaris")?.remove();
    document.body.removeAttribute("mini-vlook-mode");
    },
    true
);


minivlookThemeToolbarAddButton(
    "mvButtonThinking",
    "toolbar__item b3-tooltips b3-tooltips__sw",
    "Thinking 配色",
    "light",
    () => {
    loadStyle(
        "/appearance/themes/mini-vlook/styles/vlook/vlook-30-thinking.css",
        "theme-color-style-MiniVook-thinking"
    ).setAttribute("topicfilter", "mvButtonThinking");
    qucuFiiter();
    document.body.setAttribute("mini-vlook-mode", "thinking");
    },
    (btn) => {
    document.getElementById("theme-color-style-MiniVook-thinking")?.remove();
    document.body.removeAttribute("mini-vlook-mode");
    },
    true
);


}
  //#endregion ***********************  在顶部导航栏添加主题按钮
  