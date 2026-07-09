/**
 * 在顶部导航栏添加按钮
 */
export{
    themeButton,
    applySavedThemeEffects
}

import { insertCreateBefore, addinsertCreateElement, AddEvent } from "./domex.js";
import { getItem,setItem} from "./config.js";
import { mv } from "./mv-util.js";


//#region ***********************  在顶部导航栏添加主题按钮  ***********************

const themeColorOptions = [
  {
    id: "mvButtonBug320",
    label: "Bug320 配色",
    styleId: "theme-color-style-MiniVook-bug320",
    href: "/appearance/themes/mini-vlook/styles/vlook/vlook-30-x-bug320.css",
    mode: "bug320",
  },
  {
    id: "mvButtonAurora",
    label: "Aurora 配色",
    styleId: "theme-color-style-MiniVook-Aurora",
    href: "/appearance/themes/mini-vlook/styles/vlook/vlook-30-x-aurora.css",
    mode: "Aurora",
  },
  {
    id: "mvButtonFrost",
    label: "Frost 配色",
    styleId: "theme-color-style-MiniVook-Frost",
    href: "/appearance/themes/mini-vlook/styles/vlook/vlook-30-x-frost.css",
    mode: "Frost",
  },
  {
    id: "mvButtonFancy",
    label: "Fancy 配色",
    styleId: "theme-color-style-MiniVook-fancy",
    href: "/appearance/themes/mini-vlook/styles/vlook/vlook-30-fancy.css",
    mode: "fancy",
  },
  {
    id: "mvButtonGeek",
    label: "Geek 配色",
    styleId: "theme-color-style-MiniVook-geek",
    href: "/appearance/themes/mini-vlook/styles/vlook/vlook-30-geek.css",
    mode: "geek",
  },
  {
    id: "mvButtonHope",
    label: "Hope 配色",
    styleId: "theme-color-style-MiniVook-hope",
    href: "/appearance/themes/mini-vlook/styles/vlook/vlook-30-hope.css",
    mode: "hope",
  },
  {
    id: "mvButtonJoint",
    label: "Joint 配色",
    styleId: "theme-color-style-MiniVook-joint",
    href: "/appearance/themes/mini-vlook/styles/vlook/vlook-30-joint.css",
    mode: "joint",
  },
  {
    id: "mvButtonOwl",
    label: "Owl 配色",
    styleId: "theme-color-style-MiniVook-owl",
    href: "/appearance/themes/mini-vlook/styles/vlook/vlook-30-owl.css",
    mode: "owl",
  },
  {
    id: "mvButtonSolaris",
    label: "Solaris 配色",
    styleId: "theme-color-style-MiniVook-solaris",
    href: "/appearance/themes/mini-vlook/styles/vlook/vlook-30-solaris.css",
    mode: "solaris",
  },
  {
    id: "mvButtonThinking",
    label: "Thinking 配色",
    styleId: "theme-color-style-MiniVook-thinking",
    href: "/appearance/themes/mini-vlook/styles/vlook/vlook-30-thinking.css",
    mode: "thinking",
  },
];

function canMountThemeToolbar() {
  return !!(
    document.getElementById("toolbarEdit") ||
    document.getElementById("windowControls")
  );
}

function loadThemeEffect(option) {
  loadStyle(option.href, option.styleId).setAttribute("topicfilter", option.id);
  document.body.setAttribute("mini-vlook-mode", option.mode);
}

function removeThemeEffect(option) {
  document.getElementById(option.styleId)?.remove();
  if (document.body.getAttribute("mini-vlook-mode") === option.mode) {
    document.body.removeAttribute("mini-vlook-mode");
  }
}

function clearThemeEffects() {
  themeColorOptions.forEach((option) => removeThemeEffect(option));
}

function setToolbarButtonState(activeId) {
  themeColorOptions.forEach((option) => {
    const button = document.getElementById(option.id);
    if (!button) return;
    button.setAttribute(
      "class",
      `toolbar__item b3-tooltips b3-tooltips__sw ${option.id === activeId ? "button_on" : "button_off"}`,
    );
  });
}

function activateThemeEffect(option, persist = false) {
  clearThemeEffects();
  loadThemeEffect(option);
  setToolbarButtonState(option.id);
  if (persist) {
    themeColorOptions.forEach((item) => setItem(item.id, item.id === option.id ? "1" : "0"));
  }
}

function deactivateThemeEffect(option, persist = false) {
  removeThemeEffect(option);
  setToolbarButtonState(null);
  if (persist) setItem(option.id, "0");
}

function logSavedThemeEffectsApplied() {
  if (document.documentElement.dataset.frontend !== "desktop-window") return;
  console.log("[Mini-VLOOK] saved theme effects applied", {
    frontend: document.documentElement.dataset.frontend,
    config: window.theme?.config,
    dynamicColorStyles: [...document.querySelectorAll('[id^="theme-color-style"]')].map(x => x.id),
    miniVlookMode: document.body.getAttribute("mini-vlook-mode"),
    toolbarEdit: !!document.getElementById("toolbarEdit"),
    windowControls: !!document.getElementById("windowControls"),
    minivlookToolbar: !!document.getElementById("minivlookToolbar"),
  });
}

function applySavedThemeEffects() {
  const activeOption = themeColorOptions.find((option) => getItem(option.id) === "1");
  clearThemeEffects();
  if (activeOption) loadThemeEffect(activeOption);
  logSavedThemeEffectsApplied();
}

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

      if (toolbarEdit?.parentElement) {
        savorToolbar = insertCreateBefore(toolbarEdit, "div", "minivlookToolbar");
        savorToolbar.style.position = "relative";
      } else if (windowControls?.parentElement) {
        savorToolbar = document.createElement("div");
        savorToolbar.id = "minivlookToolbar";
        windowControls.parentElement.insertBefore(savorToolbar, windowControls);
      } else {
        return null;
      }
    }

    if (!savorToolbar) return null;

    var addButton = addinsertCreateElement(savorToolbar, "div");
    if (!addButton) return null;

    addButton.style.float = "top";
    addButton.id = ButtonID;
    addButton.setAttribute("class", ButtonTitle + " button_off");
    addButton.setAttribute("aria-label", ButtonLabel);

    var offNo = Memory == true ? getItem(ButtonID) : "0";
    if (offNo == "1") {
      addButton.setAttribute("class", ButtonTitle + " button_on");
    } else if (Memory == true && offNo != "0") {
      setItem(ButtonID, "0");
    }

    AddEvent(addButton, "click", () => {
      const isActive = Memory == true && getItem(ButtonID) == "1";
      if (!isActive) {
        addButton.setAttribute("class", ButtonTitle + " button_on");
        NoClickRunFun(addButton);
        if (Memory != null) setItem(ButtonID, "1");
        return;
      }

      addButton.setAttribute("class", ButtonTitle + " button_off");
      OffClickRunFun(addButton);
      if (Memory != null) setItem(ButtonID, "0");
    });

    return addButton;
}

//去除主题所有滤镜还原按钮状态
function qucuFiiter() {
var Topicfilters = document.querySelectorAll("head [topicfilter]");
Topicfilters.forEach((element) => {
    var offNo = getItem(element.getAttribute("topicfilter"));
    if (offNo == "1") {
    document.getElementById(element.getAttribute("topicfilter"))?.click();
    element.remove();
    }
});
}

function mountThemeToolbarButtons() {
  themeColorOptions.forEach((option) => {
    minivlookThemeToolbarAddButton(
      option.id,
      "toolbar__item b3-tooltips b3-tooltips__sw",
      option.label,
      "light",
      () => activateThemeEffect(option, true),
      () => deactivateThemeEffect(option, true),
      true,
    );
  });
}

function themeButton(options = {}) {
  const shouldApplySaved = options.applySaved !== false;
  if (shouldApplySaved) applySavedThemeEffects();

  if (!canMountThemeToolbar()) {
    window.theme?.log?.("toolbar unavailable, skip toolbar buttons only");
    return;
  }

  mountThemeToolbarButtons();
}
  //#endregion ***********************  在顶部导航栏添加主题按钮
