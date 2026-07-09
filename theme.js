

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

function getMiniVlookEnvironment() {
  const htmlDataset = document.documentElement.dataset;
  const pathname = window.location.pathname;
  let frontend = htmlDataset.frontend || null;
  const backend = htmlDataset.backend || window.siyuan?.config?.system?.os || null;

  if (!frontend) {
    switch (true) {
      case pathname.startsWith('/stage/build/app/window.html'):
        frontend = 'desktop-window';
        break;
      case pathname.startsWith('/stage/build/desktop'):
      case pathname.startsWith('/stage/build/app'):
        frontend = 'desktop';
        break;
      case pathname.startsWith('/stage/build/mobile'):
        frontend = 'mobile';
        break;
      default:
        frontend = window.siyuan?.config?.appearance?.isMobile ? 'browser-mobile' : 'browser-desktop';
        break;
    }
  }

  const isDetachedWindow = frontend === 'desktop-window' || pathname.startsWith('/stage/build/app/window.html');
  const isDesktopLike = ['desktop', 'desktop-window', 'browser-desktop'].includes(frontend) || isDetachedWindow;
  const isMobileLike = ['mobile', 'browser-mobile'].includes(frontend) || window.siyuan?.config?.appearance?.isMobile === true;

  return {
    frontend,
    backend,
    pathname,
    isDesktopLike,
    isDetachedWindow,
    isMobileLike,
    isBrowser: frontend === 'browser-desktop' || frontend === 'browser-mobile',
  };
}

window.theme.env = getMiniVlookEnvironment();
window.theme.isDesktopLike = window.theme.env.isDesktopLike;
window.theme.isDetachedWindow = window.theme.env.isDetachedWindow;
window.theme.debug = (() => {
  const params = new URLSearchParams(window.location.search);
  return params.get('mini-vlook-debug') === '1'
    || params.get('minivlookDebug') === '1'
    || localStorage.getItem('MiniVLOOK.debug') === '1'
    || localStorage.getItem('minivlookDebug') === '1'
    || window.MiniVLOOK_DEBUG === true;
})();
window.theme.log = (...args) => {
  if (window.theme?.debug) console.log('[Mini-VLOOK]', ...args);
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

/**简单判断目前思源是否是移动端模式 */
function isPhone() {
  return window.theme?.env?.isMobileLike === true;
}

window.isMobile = function(){
  return window.theme?.env?.isMobileLike === true;
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
 * @returns {string} desktop-window、desktop、mobile、browser-desktop 或 browser-mobile
 */
window.theme.clientMode = window.theme.env.frontend;

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

window.theme.log('init', {
  frontend: window.theme.env.frontend,
  backend: window.theme.env.backend,
  pathname: window.theme.env.pathname,
  themeStyle: Boolean(window.theme.element.themeStyle),
  themeScript: Boolean(window.theme.element.themeScript),
  toolbarEdit: Boolean(document.getElementById('toolbarEdit')),
  windowControls: Boolean(document.getElementById('windowControls')),
  protyleWysiwygCount: document.querySelectorAll('.protyle-wysiwyg').length,
  protyleToolbarCount: document.querySelectorAll('.protyle-toolbar').length,
});


//#endregion *********************** 主题相关相关
import(window.theme.addURLParam(`${window.theme.root}/script/api.js`));
import(window.theme.addURLParam(`${window.theme.root}/script/theme-load-by-config.js`));
