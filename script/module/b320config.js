
export var config = {
    token: '', // API token, 无需填写
    theme: {
        regs: {
            
            // 正则表达式
            url: /^siyuan:\/\/blocks\/(\d{14}\-[0-9a-z]{7})\/*(?:(?:\?)(\w+=\w+)(?:(?:\&)(\w+=\w+))+)?$/, // 思源 URL Scheme 正则表达式
            time: /^(\d+)(:[0-5]?[0-9]){0,2}(\.\d*)?$/, // 时间戳正则表达式
            id: /^\d{14}\-[0-9a-z]{7}$/, // 块 ID 正则表达式
            
            // 正则表达式
            // wz:'#(.*)?[|](.*)?#([\(](#?[\\d\\w]+)(!)?[\)])?',
            wz: '(#(.*?)[|](.*?)#){1,1}?([\(](#?[\\d\\w]+)(!)?[\)])?',   // 非贪婪匹配#号，允许用#开头的颜色
            colorvalue: '^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$',            // 匹配#开头的颜色
            // `*{ 提示信息 }(这是刮刮卡的内容)`
            rb:'^\\\*\\\{(.*)\\\}\\\((.*?)(\\s*\\\"(#?[\\d\\w]+)\\\")?\\\)$',           // 匹配刮刮卡内容
            pg:'^\\\{(.*)\\\}\\s*\\\((.*)\\\)$',           // 匹配注音内容
            todo:'^\\\+\\\[(.*)\\\]\\\((.*)\\\)$',           // 带计数功能的任务项
        },

        common: {
            // 通用的配置
            colors: {
                names: [
                    // 支持的颜色名称
                    'red', 'orange', 'yellow', 'lime', 'green',
                    'aqua', 'cyan', 'blue', 'sea', 'steel', 'purple',
                    'magenta', 'pink', 'gold', 'brown', 'gray', 'black',
                    'theme1', 'theme2'
                ],
                values: {
                    'red': {
                        'value': '#CC3140',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },

                    'orange': {
                        'value': '#F87000',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },

                    'yellow': {
                        'value': '#FDC000',
                        'titlecolor': '#2b1c29',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },

                    'lime': {
                        'value': '#B2D115',
                        'titlecolor': '#2b1c29',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },

                    'green': {
                        'value': '#30A830',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },

                    'aqua': {
                        'value': '#2DE0C8',
                        'titlecolor': '#2b1c29',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },

                    'cyan': {
                        'value': '#17B1C2',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },

                    'blue': {
                        'value': '#2290F0',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },

                    'sea': {
                        'value': '#2D51E0',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },
                    'steel': {
                        'value': '#7073D6',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },
                    'purple': {
                        'value': '#954ECC',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },
                    'magenta': {
                        'value': '#E64ED6',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },
                    'pink': {
                        'value': '#FAB9D1',
                        'titlecolor': '#2b1c29',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },
                    'gold': {
                        'value': '#E0BF9D',
                        'titlecolor': '#2b1c29',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },
                    'brown': {
                        'value': '#855F3A',
                        'titlecolor': '#2b1c29',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },
                    'gray': {
                        'value': '#9498A0',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },
                    'black':{
                        'value': '#16192a',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.9)',
                        'msgcolor': '2b1c29',
                    },
                    'theme1': {
                        'value': '#8064A9',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    },
                    'theme2': {
                        'value': '#2AA899',
                        'titlecolor': '#f6eef3',
                        'msgbgcolor':'rgba(255,255,255,0.6)',
                        'msgcolor': '2b1c29',
                    }
                },
                default: "theme2",      // 默认的颜色值
                wz: {
                    bgcolor: '#2aa899',    // 微章背景色
                    title_color: '#eaf6f5', // 微章标题字体色
                    msg_color: '#1f2e3b',   // 微章内容字体色
                    msg_bgcolor: 'rgba(255,255,255,0.6)', // 微章内容背景色
                }
            },
        },
        codelabel: {
            enable: true, // 是否启用自定义样式渲染
            render: {     // 渲染信息
                enable: true, // 是否启用自定义样式渲染
                toolbar: { // 菜单栏
                    enable: true,
                    id: 'toolbar-theme-style-codelabel',
                    hotkey: () => config.theme.hotkeys.codelabel.render,
                    label: {
                        zh_CN: '标签解析增强',
                        zh_CNT: null,
                        fr_FR: null,
                        en_US: null,
                        other: 'Inline Code Parse',
                    },
                    icon: '#iconSuper',
                    index: -3,
                },
            },
            ptype: [       // 解析类型
                {   // 计数任务
                    typeid: "todo",
                    reg: '\\\+\\\[(\\d+)\\\]\\s*\\\((.*)\\\)',  // 正则表达式
                    customf: 'todo',                        // 忽略解析的属性值 
                    className: 'vk-todo',                   // 自定义的属性名称
                    maps: { // 解析后-分组的别名，也是 parseInfo 中的字段
                        '$0': 'value', // 占用，code 原始的 innerHTML 内容
                        '$1': 'count',
                        '$2': 'data',
                        '$3': '',
                        '$4': '',
                        '$5': '',
                        '$6': '',
                        '$7': '',
                        '$8': '',
                        '$9': '',
                    },

                    emptys: ['count', 'data'],      // 不能为空的字段
                    emptysValues:{              // 当值为空值的值
                    },
                    style:{ // 样式映射信息
                        rerender:false,             // 是否计算配色
                        // color: {
                        //     value:'color',            // 主颜色字段
                        //     suffix:'',                // 颜色后缀对应的字段
                        // },         
                        // default:'gray',               // 缺省颜色值
                        // defaultSuffix:false, // 缺省时,颜色后缀,对应的值.
                        // colors:{
                        //     suffixs:{
                        //         '!':true,
                        //     },
                        //     names: ()=>config.theme.common.colors.names,   // 颜色名称-列表
                        //     values: ()=>config.theme.common.colors.values, // 适配配色-列表
                        // }
                    },
                    customAttr: { // 自定义属性
                        'custom-codelabel-todo-count': "${count}",
                        'custom-codelabel-todo-data': "${data}",
                    },
                    inlineStyle: {
                    },
                    innerHTML: '<button>+</button><span>[${count}]</span><span>(</span>${data}<span>)</span>',
                    renderEnd: (parse, element,oldHTML) => {

                        function bingOnClick(parse, e,oldHTML) {

                            parse.reinitFormat(parse.ptypeItem)
                            
                            let parseInfo = parse.clacParseInfo(oldHTML);

                            let c = 1 + +parseInfo.count;
                            parseInfo.count = ""+c;

                            parse.parseInfo = parseInfo;
                            parse.renderSingle(e, parseInfo);

                            // 这里已经更新了，所有旧的 oldHTML 和 parse.Value 就没用了。重新组合
                            e.firstChild.onclick = bingOnClick.bind(e.firstChild, parse, e,`+[${parse.parseInfo.count}](${parse.parseInfo.data})`)

                            e.firstChild.setAttribute(
                                "custom-codelabel-todo-count",
                                parse.parseInfo.count
                            );

                        }

                        element.firstChild.onclick = bingOnClick.bind(element.firstChild, parse, element,oldHTML)
                        element.firstChild.setAttribute(
                            "custom-codelabel-todo-count",
                            element.getAttribute("custom-codelabel-todo-count"),
                        );

                    },
                },
                {   // 刮刮乐
                    typeid: "rb",
                    reg: '^\\\*\\\{(.*)\\\}\\\((.*?)(\\s*\\\"(#?[\\d\\w]+)\\\")?\\\)$',  // 正则表达式
                    customf: 'rb',                        // 忽略解析的属性值 
                    className: 'v-rb-coat',                   // 自定义的属性名称
                    maps: { // 解析后-分组的别名，也是 parseInfo 中的字段
                        /**
                         * 以下字段名称被占用,不要用于下面列表的值中.
                         * value,             // code 标签的 InnerHTML
                         * color1,bgcolor1,   // 主颜色计算结果和适配背景色
                         * color2,bgcolor2,   // 次颜色计算结果和适配背景色
                         * $0~$9 也不要用.  
                         */
                        '$0': 'value', // 占用，code 原始的 innerHTML 内容
                        '$1': 'coat_text',
                        '$2': 'coat_data',
                        '$3': '',
                        '$4': 'color',
                        '$5': '',
                        '$6': '',
                        '$7': '',
                        '$8': '',
                        '$9': '',
                    },

                    emptys: ['coat_data'],      // 不能为空的字段
                    emptysValues:{              // 当值为空值的值
                        'coat_text':'****'
                    },
                    style:{ // 样式映射信息
                        rerender:true,             // 是否计算配色
                        color: {
                            value:'color',            // 主颜色字段
                            suffix:'',                // 颜色后缀对应的字段
                        },         
                        default:'gray',               // 缺省颜色值
                        defaultSuffix:false, // 缺省时,颜色后缀,对应的值.
                        colors:{
                            suffixs:{
                                '!':true,
                            },
                            names: ()=>config.theme.common.colors.names,   // 颜色名称-列表
                            values: ()=>config.theme.common.colors.values, // 适配配色-列表
                        }
                    },
                    customAttr: { // 自定义属性
                        'custom-codelabel-rb-coat-text': "${coat_text}",
                        'custom-codelabel-rb-coat-data': "${coat_data}",
                        'custom-codelabel-rb-coat-showe':'false',
                    },
                    inlineStyle: {
                        '--theme-rb-bgcolor':"${bgcolor1}",
                        '--theme-rb-title-color':"${color1}",
                        '--theme-rb-msg-color':"${color2}",
                        '--theme-rb-msg-bgcolor':"${bgcolor2}",
                    },
                    innerHTML: '<span>${value}</span>',
                    renderEnd: (parse, element,oldHTML) => { // 渲染完单个元素的回调.
                        function bingOnClick(button){
                            let value = button.getAttribute('custom-codelabel-rb-coat-showe') === false ||
                            button.getAttribute('custom-codelabel-rb-coat-showe') === 'false' ?
                            'true' : 'false';
                            button.setAttribute('custom-codelabel-rb-coat-showe',value)
                        }
                        element.onclick = bingOnClick.bind(element,element);
                    },
                },
                {   // 注音
                    typeid: "pg",
                    reg: '^\\\{(.*)\\\}\\s*\\\((.*)\\\)$',  // 正则表达式
                    customf: 'pg',                        // 忽略解析的属性值 
                    className: 'vk-pg',                   // 自定义的属性名称
                    maps: { // 解析后-分组的别名，也是 parseInfo 中的字段
                        /**
                         * 以下字段名称被占用,不要用于下面列表的值中.
                         * value,             // code 标签的 InnerHTML
                         * color1,bgcolor1,   // 主颜色计算结果和适配背景色
                         * color2,bgcolor2,   // 次颜色计算结果和适配背景色
                         * $0~$9 也不要用.  
                         */
                        '$0': 'value', // 占用，code 原始的 innerHTML 内容
                        '$1': 'text',
                        '$2': 'pgdata',
                        '$3': '',
                        '$4': '',
                        '$5': '',
                        '$6': '',
                        '$7': '',
                        '$8': '',
                        '$9': '',
                    },

                    emptys: ['text','pgdata'],      // 不能为空的字段
                    emptysValues:{              // 当值为空值的值
                    },
                    style:{ // 样式映射信息
                        rerender:false,             // 是否计算配色
                        // color: {
                        //     value:'color',            // 主颜色字段
                        //     suffix:'',                // 颜色后缀对应的字段
                        // },         
                        // default:'gray',               // 缺省颜色值
                        // defaultSuffix:false, // 缺省时,颜色后缀,对应的值.
                        // colors:{
                        //     suffixs:{
                        //         '!':true,
                        //     },
                        //     names: ()=>config.theme.common.colors.names,   // 颜色名称-列表
                        //     values: ()=>config.theme.common.colors.values, // 适配配色-列表
                        // }
                    },
                    customAttr: { // 自定义属性
                        'custom-codelabel-pg-text': "${text}",
                        'custom-codelabel-pg-data': "${pgdata}",
                    },
                    inlineStyle: {
                    },
                    innerHTML: '<ruby><span>{</span>${text}<span>}</span><rp>(</rp><rt>${pgdata}</rt><rp>)</rp></ruby>',
                    renderEnd: (parse, element,oldHTML) => { // 渲染完单个元素的回调.
                    },
                },
                {   // 微章
                    typeid: "wz",
                    reg: '(#(.*?)[|](.*?)#){1,1}?([\(](#?[\\d\\w]+)(!)?[\)])?',  // 正则表达式
                    customf: 'wz',                        // 忽略解析的属性值 
                    className: 'custom-codelabel-wz',                   // 自定义的属性名称
                    maps: { // 解析后-分组的别名，也是 parseInfo 中的字段
                        /**
                         * 以下字段名称被占用,不要用于下面列表的值中.
                         * value,             // code 标签的 InnerHTML
                         * color1,bgcolor1,   // 主颜色计算结果和适配背景色
                         * color2,bgcolor2,   // 次颜色计算结果和适配背景色
                         * $0~$9 也不要用.  
                         */
                        '$0': 'value', // 占用，code 原始的 innerHTML 内容
                        '$1': '',
                        '$2': 'title',
                        '$3': 'msg',
                        '$4': '',
                        '$5': 'color',
                        '$6': 'endsuffix',
                        '$7': '',
                        '$8': '',
                        '$9': '',
                    },

                    emptys: ['title','msg'],      // 不能为空的字段
                    emptysValues:{              // 当值为空值的值
                    },
                    style:{ // 样式映射信息
                        rerender:true,             // 是否计算配色
                        color: {
                            value:'color',            // 主颜色字段
                            suffix:'endsuffix',                // 颜色后缀对应的字段
                        },         
                        default:'theme2',               // 缺省颜色值
                        defaultSuffix:false, // 缺省时,颜色后缀,对应的值.
                        colors:{
                            suffixs:{
                                '!':true,
                            },
                            names: ()=>config.theme.common.colors.names,   // 颜色名称-列表
                            values: ()=>config.theme.common.colors.values, // 适配配色-列表
                        }
                    },
                    customAttr: { // 自定义属性
                        'custom-codelabel-wz-title': "${title}",
                        'custom-codelabel-wz-msg': "${msg}",
                    },
                    inlineStyle: {
                        "--theme-wz-bgcolor":"${bgcolor1}",
                        "--theme-wz-title-color":"${color1}",
                        "--theme-wz-msg-color":"${color2}",
                        "--theme-wz-msg-bgcolor":"${bgcolor2}",
                    },
                    innerHTML:  '<span>${value}</span>',
                    renderEnd: (parse, element,oldHTML) => { // 渲染完单个元素的回调.
                    },
                },
            ],
        },

        hotkeys: {
            // 快捷键
            codelabel: {
                render: {
                    // 渲染(Ctrl + Alt + 0)
                    ctrlKey: true,
                    metaKey: true,
                    shiftKey: false,
                    altKey: true,
                    key: '0',
                },
            },

            codequote: {
                render: {
                    // 渲染(Ctrl + Alt + 0)
                    ctrlKey: true,
                    metaKey: true,
                    shiftKey: false,
                    altKey: true,
                    key: '9',
                },
            },
            
            menu: {
                block: {
                    // 块菜单开关(Shift + Alt + M)
                    ctrlKey: false,
                    metaKey: false,
                    shiftKey: true,
                    altKey: true,
                    key: 'M',
                },
            },

        },

    },
};
