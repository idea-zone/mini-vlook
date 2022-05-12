
export var config = {
    token: '', // API token, 无需填写
    theme: {
        regs: {
            
            // 正则表达式
            url: /^siyuan:\/\/blocks\/(\d{14}\-[0-9a-z]{7})\/*(?:(?:\?)(\w+=\w+)(?:(?:\&)(\w+=\w+))+)?$/, // 思源 URL Scheme 正则表达式
            time: /^(\d+)(:[0-5]?[0-9]){0,2}(\.\d*)?$/, // 时间戳正则表达式
            id: /^\d{14}\-[0-9a-z]{7}$/, // 块 ID 正则表达式
            
            colorvalue: '^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$',            // 匹配#开头的颜色
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
            },
        },

        codelabel: {   // 标签增强解析
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

                // ptypeItem 对应的值
                // {   // 解析配置项
                //     typeid: "唯一ID",
                //     reg: '正则表达式',  // 针对 innerHTML
                //     tagName: "标签名称，如 code、strong",
                //     customf: '禁止渲染的块属性值,如 wz',   // 自定义属性 f=wz 即可。
                //     className: 'css类属性名称', 
                //     maps: { // 解析后-分组的别名，也是 parseInfo 中的字段
                //         /**
                //          * 以下字段名称被占用,不要用于下面列表的值中.
                //          * value,             // code 标签的 InnerHTML
                //          * color1,bgcolor1,   // 主颜色计算结果和适配背景色
                //          * color2,bgcolor2,   // 次颜色计算结果和适配背景色
                //          * $0~$9 也不要用.  
                //          */
                //         '$0': 'value', // 占用，code 原始的 innerHTML 内容
                //         '$1': '',
                //         '$2': 'title',
                //         '$3': 'msg',
                //         '$4': '',
                //         '$5': 'color',
                //         '$6': 'endsuffix',
                //         '$7': '',
                //         '$8': '',
                //         '$9': '',
                //     },
                //     emptys: ['title','msg'],    // 不能为null，undefined或者空值的字段，用 '$0'-'$9' 对应的别名
                //     emptysValues:{              // 当值为null，undefined或者空值时，要设置的值，用 'key 用：$0'-'$9' 对应的别名,value 是对应的值。
                //          'title':'ke',
                //     },
                //     style:{ // 样式映射信息
                //         rerender:true,                // 是否计算颜色
                //         color: {
                //             value:'color',            // 主颜色对应的字段，用 $0'-'$9' 对应的别名
                //             suffix:'endsuffix',       // 颜色后缀对应的字段，用 $0'-'$9' 对应的别名
                //         },         
                //         default:'theme2',             // 主颜色缺省时，默认的颜色值
                //         defaultSuffix:false,          // 颜色后缀缺省时,默认的后缀内容，表示的值（suffixs中value）
                //         colors:{
                //             suffixs:{                 // 颜色后缀内容，表示的值
                //                 '!':true,
                //             },
                //             names: ()=>config.theme.common.colors.names,     // 主颜色，支持的颜色名称-列表，
                //             values: ()=>config.theme.common.colors.values,   // 主颜色，对应的适配配色-列表
                //         }
                //     },
                //     customAttr: {   // 自定义属性，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
                //         'custom-codelabel-wz-title': "${title}",
                //         'custom-codelabel-wz-msg': "${msg}",
                //     },
                //     inlineStyle: {  // 自定义内联样式，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
                //         "--theme-wz-bgcolor":"${bgcolor1}",
                //         "--theme-wz-title-color":"${color1}",
                //         "--theme-wz-msg-color":"${color2}",
                //         "--theme-wz-msg-bgcolor":"${bgcolor2}",
                //     },
                //     innerHTML:  '<span>${value}</span>',  // 解析后 code 标签的 innerHTML 内容，支持类似js的模板语法，${别名}, 会被实际的值替换
                //     renderEnd: (parse, element,oldHTML) => { //在每个元素渲染解析完成后的回调函数
                //            // parse是解析信息，$0~$9 的别名，如果开启 style.rerender为true，还有 color1,bgcolor1,color2,bgcolor2 (主颜色和适配颜色)
                //            // element 当前元素（解析后的）
                //            // oldHTML （解析前的 innerHTML 内容）
                //     },
                // },


                {   // 微章
                    typeid: "wz",
                    // reg: '(#(.*?)[|](.*?)#){1,1}?([\(](#?[\\d\\w]+)(!)?[\)])?',  // 正则表达式
                    reg: '(#(.*?)([|](.*?))?#){1,1}?([\(](#?[\\d\\w]+)(!)?[\)])?',  // 正则表达式
                    tagName: "code",
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
                        '$3': 'msgG',   // 是否有消息
                        '$4': 'msg',
                        '$5': '',
                        '$6': 'color',
                        '$7': 'endsuffix',
                        '$8': '',
                        '$9': '',
                    },

                    emptys: ['title'],      // 不能为空的字段
                    emptysValues:{              // 当值为空值的值
                        'msg':''
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
                        // 'custom-codelabel-value':'${value}',
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
                {   // 刮刮乐
                    typeid: "rb",
                    reg: '^\\\*\\\{(.*)\\\}\\\((.*?)(\\s*\\\"(#?[\\d\\w]+)\\\")?\\\)$',  // 正则表达式
                    tagName: "code",
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
                        // 'custom-codelabel-value':'${value}',
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
                    tagName: "code",
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
                        // 'custom-codelabel-value':'${value}',
                        'custom-codelabel-pg-text': "${text}",
                        'custom-codelabel-pg-data': "${pgdata}",
                    },
                    inlineStyle: {
                    },
                    innerHTML: '<ruby><span>{</span>${text}<span>}</span><rp>(</rp><rt>${pgdata}</rt><rp>)</rp></ruby>',
                    renderEnd: (parse, element,oldHTML) => { // 渲染完单个元素的回调.
                    },
                },
                {   // 计数任务
                    typeid: "todo",
                    reg: '^\\\+\\\[(\\d+)\\\]\\s*\\\((.*?)(\\s*\\\"([\\d\\w]+)\\\")?\\\)$',  // 正则表达式
                    tagName: "code",
                    customf: 'todo',                        // 忽略解析的属性值 
                    className: 'vk-todo',                   // 自定义的属性名称
                    maps: { // 解析后-分组的别名，也是 parseInfo 中的字段
                        '$0': 'value', // 占用，code 原始的 innerHTML 内容
                        '$1': 'count',
                        '$2': 'data',
                        '$3': 'colorTag',
                        '$4': 'color',
                        '$5': '',
                        '$6': '',
                        '$7': '',
                        '$8': '',
                        '$9': '',
                    },

                    emptys: ['count', 'data'],      // 不能为空的字段
                    emptysValues:{                  // 当值为空值的值
                        'colorTag':''
                    },
                    style:{ // 样式映射信息
                        rerender:true,             // 是否计算配色
                        color: {
                            value:'color',            // 主颜色字段
                            suffix:'',                // 颜色后缀对应的字段
                        },         
                        default:'black',               // 缺省颜色值
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
                        'custom-codelabel-value':'${value}',
                        'custom-codelabel-todo-count': "${count}",
                        'custom-codelabel-todo-data': "${data}",
                        'custom-codelabel-todo-colorTag': "${colorTag}",
                    },
                    inlineStyle: {
                        'color': "${color}",
                    },
                    innerHTML: '<button>+</button><span>[${count}]</span><span>(</span>${data}<span>${colorTag})</span>',
                    renderEnd: (parse, element,oldHTML) => {

                        function bingOnClick(parse, e,oldHTML) {

                            parse.reinitFormat(parse.ptypeItem)
                            
                            let parseInfo = parse.clacParseInfo(oldHTML);

                            let c = 1 + +parseInfo.count;
                            parseInfo.count = ""+c;

                            parse.parseInfo = parseInfo;
                            parse.renderSingle(e, parseInfo);

                            // 这里已经更新了，所有旧的 oldHTML 和 parse.Value 就没用了。重新组合
                            let newInnerHtml =`+[${parse.parseInfo.count}](${parse.parseInfo.data}${parse.parseInfo.colorTag})`
                            e.firstChild.onclick = bingOnClick.bind(e.firstChild, parse, e, newInnerHtml)

                            // 设置新的 自定义的value
                            e.setAttribute("custom-codelabel-value",newInnerHtml);

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
                {   // 多级标签
                    typeid: "mtag",
                    reg: '^(.*)/(.*)$',  // 针对 innerHTML
                    tagName: 'span[data-type="tag"]',
                    customf: 'mtag',   // 自定义属性 f=mtag 即可。
                    className: 'mult-tag', 
                    maps: { // 解析后-分组的别名，也是 parseInfo 中的字段
                        /**
                         * 以下字段名称被占用,不要用于下面列表的值中.
                         * value,             // code 标签的 InnerHTML
                         * color1,bgcolor1,   // 主颜色计算结果和适配背景色
                         * color2,bgcolor2,   // 次颜色计算结果和适配背景色
                         * $0~$9 也不要用.  
                         */
                        '$0': 'value', // 占用，code 原始的 innerHTML 内容
                        '$1': 'lv1',
                        '$2': 'lv2',
                        '$3': '',
                        '$4': '',
                        '$5': '',
                        '$6': '',
                        '$7': '',
                        '$8': '',
                        '$9': '',
                    },
                    emptys: ['lv1','lv2'],    // 不能为null，undefined或者空值的字段，用 '$0'-'$9' 对应的别名
                    emptysValues:{              // 当值为null，undefined或者空值时，要设置的值，用 'key 用：$0'-'$9' 对应的别名,value 是对应的值。
                        //  'title':'ke',
                    },
                    style:{ // 样式映射信息
                        rerender:false,                // 是否计算颜色
                        // color: {
                        //     value:'color',            // 主颜色对应的字段，用 $0'-'$9' 对应的别名
                        //     suffix:'endsuffix',       // 颜色后缀对应的字段，用 $0'-'$9' 对应的别名
                        // },         
                        // default:'theme2',             // 主颜色缺省时，默认的颜色值
                        // defaultSuffix:false,          // 颜色后缀缺省时,默认的后缀内容，表示的值（suffixs中value）
                        // colors:{
                        //     suffixs:{                 // 颜色后缀内容，表示的值
                        //         '!':true,
                        //     },
                        //     names: ()=>config.theme.common.colors.names,     // 主颜色，支持的颜色名称-列表，
                        //     values: ()=>config.theme.common.colors.values,   // 主颜色，对应的适配配色-列表
                        // }
                    },
                    customAttr: {   // 自定义属性，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
                        // 'mult-tag-lv1': "${lv1}",
                        // 'mult-tag-lv2': "${lv2}",
                    },
                    inlineStyle: {  // 自定义内联样式，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
                        // "--theme-wz-bgcolor":"${bgcolor1}",
                        // "--theme-wz-title-color":"${color1}",
                        // "--theme-wz-msg-color":"${color2}",
                        // "--theme-wz-msg-bgcolor":"${bgcolor2}",
                    },
                    // 解析后 code 标签的 innerHTML 内容，支持类似js的模板语法，${别名}, 会被实际的值替换
                    innerHTML:  "<span class='mult-tag-lv1'>${lv1}</span>"   
                                +"<span class='mult-tag-none'>/</span>"
                                +"<span class='mult-tag-lv2'>${lv2}</span>",
                    renderEnd: (parse, element,oldHTML) => { //在每个元素渲染解析完成后的回调函数
                        // parse是解析信息，$0~$9 的别名，如果开启 style.rerender为true，还有 color1,bgcolor1,color2,bgcolor2 (主颜色和适配颜色)
                        // element 当前元素（解析后的）
                        // oldHTML （解析前的 innerHTML 内容）
                        // let innerHTML = '';
                        // if (parse['lv1'] !==undefined && parse['lv1'] !==null && parse['lv1'] !==''){
                        //     innerHTML += `<span class="mult-tag-lv1">${parse['lv1']}<span>`
                        // }
                        // if (parse['lv2'] !==undefined && parse['lv2'] !==null && parse['lv2'] !==''){
                        //     innerHTML += `<span class="mult-tag-lv2">${parse['lv2']}<span>`
                        // }

                        // element.innerHTML = innerHTML
                    },
                },
                {   // 下拉框
                    typeid: "cx",
                    reg: '\\\^\\\[(\\d+)\\\](&gt;\\\(.+\\\))',  // 针对 innerHTML
                    tagName: "code",
                    customf: 'cx',   // 自定义属性 f=wz 即可。
                    className: 'cw-cbox', 
                    maps: { // 解析后-分组的别名，也是 parseInfo 中的字段
                        /**
                         * 以下字段名称被占用,不要用于下面列表的值中.
                         * value,             // code 标签的 InnerHTML
                         * color1,bgcolor1,   // 主颜色计算结果和适配背景色
                         * color2,bgcolor2,   // 次颜色计算结果和适配背景色
                         * $0~$9 也不要用.  
                         */
                        '$0': 'value', // 占用，code 原始的 innerHTML 内容
                        '$1': 'index',
                        '$2': 'itms',
                        '$3': '',
                        '$4': '',
                        '$5': '',
                        '$6': '',
                        '$7': '',
                        '$8': '',
                        '$9': '',
                    },
                    // reg2mapts:{
                    //     // key: 上一轮匹配的地方 ; value: 对应的解析规则
                    //     '$0':{ 
                    //         reg:'\\\$\\\{(.*?)\\\}',  
                    //         isMatchAll:true,   // 是否是匹配所有
                    //         type:'array',      // 类型
                    //     },
                    // },
                    emptys: ['index','itms'],    // 不能为null，undefined或者空值的字段，用 '$0'-'$9' 对应的别名
                    emptysValues:{              // 当值为null，undefined或者空值时，要设置的值，用 'key 用：$0'-'$9' 对应的别名,value 是对应的值。
                    },
                    style:{ // 样式映射信息
                        rerender:false,                // 是否计算颜色
                        // color: {
                        //     value:'color',            // 主颜色对应的字段，用 $0'-'$9' 对应的别名
                        //     suffix:'endsuffix',       // 颜色后缀对应的字段，用 $0'-'$9' 对应的别名
                        // },         
                        // default:'theme2',             // 主颜色缺省时，默认的颜色值
                        // defaultSuffix:false,          // 颜色后缀缺省时,默认的后缀内容，表示的值（suffixs中value）
                        // colors:{
                        //     suffixs:{                 // 颜色后缀内容，表示的值
                        //         '!':true,
                        //     },
                        //     names: ()=>config.theme.common.colors.names,     // 主颜色，支持的颜色名称-列表，
                        //     values: ()=>config.theme.common.colors.values,   // 主颜色，对应的适配配色-列表
                        // }
                    },
                    customAttr: {   // 自定义属性，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
                        'custom-codelabel-cx-index': "${index}",
                        'custom-codelabel-cx-itmes': "${itms}",
                    },
                    inlineStyle: {  // 自定义内联样式，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
                        // "--theme-wz-bgcolor":"${bgcolor1}",
                        // "--theme-wz-title-color":"${color1}",
                        // "--theme-wz-msg-color":"${color2}",
                        // "--theme-wz-msg-bgcolor":"${bgcolor2}",
                    },
                    innerHTML:  '<span>${value}</span>',  // 解析后 code 标签的 innerHTML 内容，支持类似js的模板语法，${别名}, 会被实际的值替换
                    renderEnd: (parse, element,oldHTML) => { //在每个元素渲染解析完成后的回调函数
                        // parse是解析信息，$0~$9 的别名，如果开启 style.rerender为true，还有 color1,bgcolor1,color2,bgcolor2 (主颜色和适配颜色)
                        // element 当前元素（解析后的）
                        // oldHTML （解析前的 innerHTML 内容）

                        let createUL = (e)=>{
                            let ul = document.createElement('ul');
                            e.parentNode.insertBefore(ul, e.nextElementSibling);
                            e.appendChild(ul);

                            // 创建
                            ul.createli = (text,dataValue,indexValue)=>{
                                let li = document.createElement('li');
                                li.setAttribute('custom-li-data',dataValue);
                                li.setAttribute('custom-li-index',indexValue);
                                li.innerHTML =text;
                                ul.appendChild(li);

                                return li;
                            };

                            return ul;
                        };

                        let tIndex = parse.parseInfo['index'];
                        let tItms =parse.parseInfo['itms'];

                        let setHtml =(index,tItms)=>{

                            console.log("index:"+index);
                            console.log("items:"+tItms);
                            let itmes = [...tItms.matchAll('\\\((.*?)\\\)')]

                            element.innerHTML = `<span>^[${index}]${tItms}</span>`
                            console.log("innerHTML:"+element.innerHTML);

                            
                            let slt =itmes[index][1];
                            element.setAttribute('custom-select-data',slt)
                            
                            element.setAttribute('custom-codelabel-cx-index',index)

                            let mUl = createUL(element);
                            let i=0;
                            for(let item of itmes){
                                let itext = item[1];
                                let eli =mUl.createli("",itext,i++);
                                eli.onclick = (e)=>{
                                    // let idx=e.target.getAttribute('custom-li-data');
                                    let idx=e.target.getAttribute('custom-li-index');
                                    let tms = element.getAttribute('custom-codelabel-cx-itmes')
                                    setHtml(idx,tms);
                                };
                            }

                        };

                        setHtml(tIndex,tItms);
                    },
                },
            ],
        },

        menu:{
            enable:true, // 行内代码编辑增强
            codelabel:{
                enable:true, // 行内代码编辑增强
                toolbar:{   // 菜单栏
                    enable: true,  //
                    id: 'toolbar-theme-menu-codelabel',
                    hotkey: () => config.theme.hotkeys.menu.codelabel,
                    label: {
                        zh_CN: '行内代码编辑增强',
                        zh_CNT: null,
                        fr_FR:  null,
                        en_US:  null,
                        other: 'codelabel Menu Enhancements',
                    },
                    icon: '#iconMenu',
                    index: -4,
                },
                items: [
                    {
                        enable: true, // 是否启用菜单项
                        prefixSeparator: true, // 是否添加前缀分隔线
                        suffixSeparator: false, // 是否添加后缀分隔线
                        type: null, // 哪些类型的块启用, 值 null 则全部启用
                        id: 'theme-menu-codelabel-common-editor', // 菜单项 ID
                        mode: "button",  // 菜单项类型
                        icon: "#iconEdit",  // 菜单项图标
                        label: {  // 菜单项标签
                            zh_CN: "编辑行内代码块",
                            other: "Edit Inline Code",
                        },
                        accelerator: "",  // 菜单项快捷键
                        click: {          // 菜单项点击事件
                            enable: true,
                            callback: null,
                            tasks: [
                                {
                                    type: 'codelabel-editor',
                                    params: {
                                        'style': null,
                                        'custom-font-family': null,
                                    },
                                },
                            ],
                        },
                        itemsLoad: false,        // 是否加载子菜单
                        // itemsIcon: "#iconRight", 
                        items: null,
                    },
                ],
            },
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
            
            menu: {
                codelabel: {
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
