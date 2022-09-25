

const 主题 = {};
主题.根目录 = "/appearance/themes/mini-vlook";
//来自dark+主题
主题.加载程序 = function ( option = { src, type: "module", async: false, defer: false }){
let { src, type, async, defer } = option;
    let script = document.createElement("script");
    if (type) script.ribute("type", type);
    if (async) script.setAttribute("async", true);
    if (defer) script.setAttribute("defer", true);
    script.setAttribute("src", src);
    document.head.appendChild(script);
};

主题.加载程序body = function ( option = { src, type: "module", async: false, defer: false }){
    let { src, type, async, defer } = option;
        let script = document.createElement("script");
        if (type) script.setAttribute("type", type);
        if (async) script.setAttribute("async", true);
        if (defer) script.setAttribute("defer", true);
        script.setAttribute("src", src);
        document.body.appendChild(script);
};


// const naive= {
//     竖线菜单设置:[],
//     footerWidget:"cc-template"
// }

// 主题.加载程序({ src: `${主题.根目录}/script/util/siYuanApi.js` });
// 主题.加载程序({ src: `${主题.根目录}/script/main.js`, type: "module" });

// window.theme.loadScript("/appearance/themes/mini-vlook/script/static/dom-to-image.min.js", "text/javascript");
// window.theme.loadScript("/appearance/themes/mini-vlook/script/static/moment.min.js", "text/javascript");


window.theme = {};


/**
 * 静态资源请求 URL 添加参数
 * @params {string} url 资源请求 URL
 * @return {string} 返回添加参数后的 URL
 */
 window.theme.addURLParam = function (
    url,
    param = {
        // t: Date.now().toString(),
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
 * 加载 meta 标签
 * @params {object} attributes 属性键值对
 */
 window.theme.loadMeta = function (attributes) {
    let meta = document.createElement('meta');
    for (let [key, value] of Object.entries(attributes)) {
        meta.setAttribute(key, value);
    }
    document.head.insertBefore(meta, document.head.firstChild);
}

/**
 * 加载脚本文件
 * @param {string} url 脚本地址
 * @param {string} type 脚本类型
 */
window.theme.loadScript = function (src, type = 'module', async = false, defer = false) {
    // let script = document.createElement('script');
    // if (type) script.setAttribute('type', type);
    // if (async) script.setAttribute('async', true);
    // if (defer) script.setAttribute('defer', true);
    // script.setAttribute('src', src);
    // document.head.appendChild(script);
    const script = document.createElement('script');
    if (type) script.type = type;
    if (async) script.async = true;
    if (defer) script.defer = true;
    script.src = src;
    document.head.appendChild(script);
}

/**
 * 加载脚本文件
 * @params {string} url 脚本地址
 * @params {string} type 脚本类型
 */
 window.theme.loadScript = function (src, type = 'module', async = false, defer = false) {
    const script = document.createElement('script');
    if (type) script.type = type;
    if (async) script.async = true;
    if (defer) script.defer = true;
    script.src = src;
    document.head.appendChild(script);
}

/**
 * 加载样式文件
 * @param {string} url 样式地址
 * @param {string} id 样式 ID
 */
window.theme.loadStyle = function (url, id = null) {
    let style = document.createElement('link');
    if (id) style.setAttribute('id', id);
    style.setAttribute('type', 'text/css');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', url);
    document.head.appendChild(style);
}

/**
 * 更新样式文件
 * @param {string} id 样式文件 ID
 * @param {string} href 样式文件地址
 */
window.theme.updateStyle = function (id, href) {
    let style = document.getElementById(id);
    if (style) {
        style.setAttribute('href', href);
    }
    else {
        window.theme.loadStyle(href, id);

    }
}

window.theme.ID_COLOR_STYLE = 'colorStyle';
window.theme.ID_CONFIG_STYLE = 'configStyle';
window.theme.ID_CUSTOM_STYLE = 'customStyle';

/**
 * 获取主题模式
 * @returns {string} light 或 dark
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
            return 'light';
        case 1:
            return 'dark';
        default:
            return null;
    }
})();

/**
 * 获取客户端模式
 * @returns {string} 'app' 或 'desktop' 或 'mobile'
 */
window.theme.clientMode = (() => {
    let url = new URL(window.location.href);
    switch (true) {
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
// window.theme.languageMode = (() => window.siyuan.config.lang)();
window.theme.languageMode = window.siyuan.config.lang;

/**
 * 获取思源版本号
 * @return {string} 思源版本号
 */
 window.theme.kernelVersion = window.siyuan.config.system.kernelVersion;

/**
 * 获取操作系统
 */
// window.theme.OS = (() => window.siyuan.config.system.os)();
// window.theme.kernelVersion = window.siyuan.config.system.kernelVersion;
window.theme.OS = window.siyuan.config.system.os;

/**
 * 获取一个 Lute 对象
 * @return {Lute} Lute 对象
 */
 window.theme.lute = Lute.New();

/**
 * 更换主题模式
 * @param {string} lightStyle 浅色主题配置文件路径
 * @param {string} darkStyle 深色主题配置文件路径
 * @param {string} customLightStyle 浅色主题自定义配置文件路径
 * @param {string} customDarkStyle 深色主题自定义配置文件路径
 */
window.theme.changeThemeMode = function (
    lightStyle,
    darkStyle,
    configLightStyle,
    configDarkStyle,
    customLightStyle,
    customDarkStyle,
) {
    let href_color = null;
    let href_config = null;
    let href_custom = null;

    switch (window.theme.themeMode) {
        case 'dark':
            href_color  = darkStyle;
            href_config = configDarkStyle;
            href_custom = customDarkStyle;
            break;
        case 'light':
        default: 
            href_color  = lightStyle;
            href_config = configLightStyle;
            href_custom = customLightStyle;
            break;
    }

    
    window.theme.updateStyle(window.theme.ID_COLOR_STYLE, href_color);
    window.theme.updateStyle(window.theme.ID_CONFIG_STYLE, href_config);
    window.theme.updateStyle(window.theme.ID_CUSTOM_STYLE, href_custom);

}

/* 根据当前主题模式加载样式配置文件 */
window.theme.changeThemeMode(

    `/appearance/themes/mini-vlook/style/vlook/vlook-v0.css`,
    `/appearance/themes/mini-vlook/style/vlook/vlook-v1.css`,

    `/appearance/themes/mini-vlook/style/config/vlook-config.css`,
    `/appearance/themes/mini-vlook/style/config/vlook-config-dark.css`,

    `/widgets/custom-light.css`,
    `/widgets/custom-dark.css`,
);

/* 加载 HTML 块中使用的小工具 */
// window.theme.loadScript("/appearance/themes/mini-vlook/script/module/html.js", "text/javascript");
window.theme.loadScript(window.theme.addURLParam("/appearance/themes/mini-vlook/script/module/html.js"), "text/javascript", undefined, true);

// 主题.加载程序({ src: `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.3/moment.min.js`});
// 主题.加载程序({ src: `https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js`});

/* 加载主题功能 */
// window.theme.loadScript("/appearance/themes/mini-vlook/script/module/codelabel-custom.js");
window.theme.loadScript(window.theme.addURLParam("/appearance/themes/mini-vlook/script/module/codelabel-custom.js"), undefined, true);

// window.theme.loadScript("/appearance/themes/mini-vlook/script/module/rightmenu.js");
window.theme.loadScript(window.theme.addURLParam("/appearance/themes/mini-vlook/script/module/rightmenu.js"), undefined, true);

// window.theme.loadScript("/appearance/themes/mini-vlook/script/module/wordcount.js");
window.theme.loadScript(window.theme.addURLParam("/appearance/themes/mini-vlook/script/module/wordcount.js"), undefined, true);

// window.theme.loadScript("/appearance/themes/mini-vlook/script/module/tabctl.js");
// window.theme.loadScript("/appearance/themes/mini-vlook/script/module/window.js");
window.theme.loadScript(window.theme.addURLParam("/appearance/themes/mini-vlook/script/module/window.js"), undefined, true);


// 主题.加载程序({ src: `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.3/moment.min.js`});
// 主题.加载程序({ src: `https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js`});
// window.theme.loadScript("/appearance/themes/mini-vlook/script/module/dateicon.js");


// window.theme.loadScript("/appearance/themes/mini-vlook/script/module/codelabel.js");
// window.theme.loadScript("/appearance/themes/mini-vlook/script/module/code-rb-coad.js");
// window.theme.loadScript("/appearance/themes/mini-vlook/script/module/codelabel-pg.js");
// window.theme.loadScript("/appearance/themes/mini-vlook/script/module/codelabel-todo.js");

// window.theme.loadScript("/appearance/themes/Dark+/script/module/background.js");
// window.theme.loadScript("/appearance/themes/Dark+/script/module/blockattrs.js");
// window.theme.loadScript("/appearance/themes/Dark+/script/module/doc.js");
// window.theme.loadScript("/appearance/themes/Dark+/script/module/goto.js");
// window.theme.loadScript("/appearance/themes/Dark+/script/module/invert.js");
// window.theme.loadScript("/appearance/themes/Dark+/script/module/menu.js");
// window.theme.loadScript("/appearance/themes/Dark+/script/module/reload.js");
// window.theme.loadScript("/appearance/themes/Dark+/script/module/style.js");
// window.theme.loadScript("/appearance/themes/Dark+/script/module/timestamp.js");
// window.theme.loadScript("/appearance/themes/Dark+/script/module/typewriter.js");
// window.theme.loadScript("/appearance/themes/Dark+/script/module/window.js");

/* 加载独立应用 */
// window.theme.loadScript("/appearance/themes/mini-vlook/app/comment/index.js");
window.theme.loadScript(window.theme.addURLParam("/appearance/themes/mini-vlook/app/comment/index.js"), undefined, true);

/* 加载自定义配置文件 */
// window.theme.loadScript("/widgets/custom.js");

/* 加载测试模块 */
// window.theme.loadScript("/appearance/themes/Dark+/script/test/listener.js");


// document.body.onclick = function(){
//     const element = document.activeElement.tagName
//     console.log("当前选中"+element);
//     console.log(document.activeElement);
// }
