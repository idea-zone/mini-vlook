

window.theme = {
  element: {
    editorFontSize: document.getElementById('editorFontSize'),
    pdfjsScript: document.getElementById('pdfjsScript'),
    protyleWcHtmlScript: document.getElementById('protyleWcHtmlScript'),
    baseURL: document.getElementById('baseURL'),
    emojiScript: document.getElementById('emojiScript'),
    themeDefaultStyle: document.getElementById('themeDefaultStyle'),
    themeStyle: document.getElementById('themeStyle'),
    protyleHljsStyle: document.getElementById('protyleHljsStyle'),
    themeScript: document.getElementById('themeScript') ?? document.currentScript,
    iconDefaultScript: document.getElementById('iconDefaultScript'),
    iconScript: document.getElementById('iconScript'),
  },
  elements: new Set(), // 需要移除的 HTML 元素集合
  eventTarget: new EventTarget(), // 事件总线目标
  addEventListener: function (target, ...args) {
    target.addEventListener(...args);
    this.eventTarget.addEventListener("destroy", () => {
        target.removeEventListener(...args);
    });
  }, // 添加在主题销毁时自动移除的监听器
};

/** 清除样式 **/
window.destroyTheme = () => {
  // 删除主题加载的额外样式
  var Sremove = document.querySelectorAll('[id^="theme-color-style"]');
  Sremove.forEach(function (Sremove) {
    Sremove.parentNode.removeChild(Sremove);
  });

  // 删除切换按钮
  document.querySelector("#minivlookToolbar")?.remove();
  document.querySelector("#btnWzLabel")?.remove();
  // // 删除空白
  // document.querySelector("#savordrag").remove();
  // // 删除插件展开按钮
  // document.querySelector("#savorPlugins").remove();
  // // 删除列表转导图功能
  // window.removeEventListener('mouseup', MenuShow);

  window.theme?.elements.forEach(element => {
    element?.remove();
  });
  window.theme?.eventTarget.dispatchEvent(new Event("destroy"));
  window[Symbol.for("Dark+destroy")] = true;
  delete window.theme;
  delete window.destroyTheme;
};

//#region  *********************** Savor 相关 ***********************
window.theme.ID_COLOR_STYLE = "theme-color-style";
/**
 * 获取主题模式
 * @return {string} light 或 dark
 */
window.theme.themeMode = (() => {
  /* 根据浏览器主题判断颜色模式 */
  // switch (true) {
  //     case window.matchMedia('(prefers-color-scheme: light)').matches:
  //         return 'light';
  //     case window.matchMedia('(prefers-color-scheme: dark)').matches:
  //         return 'dark';
  //     default:
  //         return null;
  // }
  /* 根据配置选项判断主题 */
  switch (window.siyuan.config.appearance.mode) {
    case 0:
      return "light";
    case 1:
      return "dark";
    default:
      return null;
  }
})();

/**
 * 加载样式文件
 * @param {string} url 样式地址
 * @param {string} id 样式 ID
 */
function loadStyle(url, id, cssName) {
  var headElement = document.head;

  let style = document.getElementById(id);
  if (id != null) {
    if (style) headElement.removeChild(style);
  }

  style = document.createElement("link");
  if (id != null) style.id = id;

  style.setAttribute("type", "text/css");
  style.setAttribute("rel", "stylesheet");
  style.setAttribute("href", url);
  if (cssName != null) style.setAttribute("class", cssName);
  headElement.appendChild(style);
  return style;
}

/**简单判断目前思源是否是手机模式 */
function isPhone() {
  return document.getElementById("editor");
}

window.isMobile = function(){
  return window.siyuan.config.appearance.isMobile;
}

//#endregion  *********************** Savor 相关 

//#region  *********************** Dark+相关 ***********************

/**
 * 静态资源请求 URL 添加参数
 * @param {string} url 资源请求 URL
 * @returns {string} 返回添加参数后的 URL
 */
window.theme.addURLParam = function (
  url,
  param = {
      t: window[Symbol.for("Dark+destroy")]
          ? Date.now().toString()
          : undefined,
      v: window.siyuan.config.appearance.themeVer,
  },
) {
  let new_url;
  switch (true) {
      case url.startsWith('//'):
          new_url = new URL(`https:${url}`);
          break;
      case url.startsWith('http://'):
      case url.startsWith('https://'):
          new_url = new URL(url);
          break;
      case url.startsWith('/'):
          new_url = new URL(url, window.location.origin);
          break;
      default:
          new_url = new URL(url, window.location.origin + window.location.pathname);
          break;
  }
  for (let [key, value] of Object.entries(param)) {
      new_url.searchParams.set(key, value);
  }
  switch (true) {
      case url.startsWith('//'):
          return new_url.href.substring(new_url.protocol.length);
      case url.startsWith('http://'):
      case url.startsWith('https://'):
          return new_url.href;
      case url.startsWith('/'):
          return new_url.href.substring(new_url.origin.length);
      default:
          return new_url.href.substring((window.location.origin + window.location.pathname).length);
  }
}

/**
 * 获取客户端模式
 * @returns {string} 'app' 或 'desktop' 或 'mobile'
 */
window.theme.clientMode = (() => {
  const url = new URL(window.location.href);
  switch (true) {
      case url.pathname.startsWith('/stage/build/app/window.html'):
          return 'window';
      case url.pathname.startsWith('/stage/build/app'):
          return 'app';
      case url.pathname.startsWith('/stage/build/desktop'):
          return 'desktop';
      case url.pathname.startsWith('/stage/build/mobile'):
          return 'mobile';
      default:
          return null;
  }
})();

/**
 * 获取语言模式
 * @returns {string} 'zh_CN', 'zh_CNT', 'fr_FR', 'en_US'
 */
window.theme.languageMode = window.siyuan.config.lang;

/**
 * 获取思源版本号
 * @returns {string} 思源版本号
 */
window.theme.kernelVersion = window.siyuan.config.system.kernelVersion;


/**
 * 获取操作系统
 */
window.theme.OS = window.siyuan.config.system.os;

/**
 * 获得主题根目录
 */
window.theme.root = (() => {
  const src = document.currentScript.getAttribute('src');
  return src.substring(0, src.lastIndexOf('/'));
})();


//#endregion *********************** 主题相关相关 
import(window.theme.addURLParam(`${window.theme.root}/script/api.js`));
import(window.theme.addURLParam(`${window.theme.root}/script/theme-load-by-config.js`));
