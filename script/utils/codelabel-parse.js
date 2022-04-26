import { deepCopy, empty } from "./b320comm.js";
import { getElement, rerenderColor, setStyleVariableValue } from "./codetag.js";

export {
    CodeLabelParse,
    // config1,
}

// var config1 = {
//     theme: {
//         codelabel: {
//             enable: true, // 是否启用自定义样式渲染
//             ptype: [       // 解析类型
//                 {   // 计数任务
//                     typeid: "todo",
//                     reg: '\\\+\\\[(\\d+)\\\]\\s*\\\((.*)\\\)',  // 正则表达式
//                     customf: 'todo',                        // 忽略解析的属性值 
//                     className: 'vk-todo',                   // 自定义的属性名称
//                     maps: { // 解析后-分组的别名，也是 parseInfo 中的字段
//                         '$0': 'value', // 占用，code 原始的 innerHTML 内容
//                         '$1': 'count',
//                         '$2': 'data',
//                         '$3': '',
//                         '$4': '',
//                         '$5': '',
//                         '$6': '',
//                         '$7': '',
//                         '$8': '',
//                         '$9': '',
//                     },

//                     emptys: ['count', 'data'],      // 不能为空的字段
//                     customAttr: { // 自定义属性
//                         'custom-codelabel-todo-count': "${count}",
//                         'custom-codelabel-todo-data': "${data}",
//                     },
//                     inlineStyle: {
//                     },
//                     innerHTML: '<button>+</button><span>[${count}]</span><span>(</span>${data}<span>)</span>',
//                     renderEnd: (parse, element,oldHTML) => {

//                         function bingOnClick(parse, e,oldHTML) {

//                             parse.reinitFormat(parse.ptypeItem)

//                             let parseInfo = parse.clacParseInfo(oldHTML);

//                             let c = 1 + +parseInfo.count;
//                             parseInfo.count = ""+c;

//                             parse.parseInfo = parseInfo;
//                             parse.renderSingle(e, parseInfo);

//                             // 这里已经更新了，所有旧的 oldHTML 和 parse.Value 就没用了。重新组合
//                             e.firstChild.onclick = bingOnClick.bind(e.firstChild, parse, e,`+[${parse.parseInfo.count}](${parse.parseInfo.data})`)

//                             e.firstChild.setAttribute(
//                                 "custom-codelabel-todo-count",
//                                 parse.parseInfo.count
//                             );

//                         }

//                         element.firstChild.onclick = bingOnClick.bind(element.firstChild, parse, element,oldHTML)
//                         element.firstChild.setAttribute(
//                             "custom-codelabel-todo-count",
//                             element.getAttribute("custom-codelabel-todo-count"),
//                         );

//                     },
//                 },
//                 {   // 刮刮乐
//                     typeid: "rb",
//                     reg: '^\\\*\\\{(.*)\\\}\\\((.*?)(\\s*\\\"(#?[\\d\\w]+)\\\")?\\\)$',  // 正则表达式
//                     customf: 'rb',                        // 忽略解析的属性值 
//                     className: 'v-rb-coat',                   // 自定义的属性名称
//                     maps: { // 解析后-分组的别名，也是 parseInfo 中的字段
//                         '$0': 'value', // 占用，code 原始的 innerHTML 内容
//                         '$1': 'coat_text',
//                         '$2': 'coat_data',
//                         '$3': '',
//                         '$4': 'color',
//                         '$5': '',
//                         '$6': '',
//                         '$7': '',
//                         '$8': '',
//                         '$9': '',
//                     },

//                     emptys: ['coat_data'],      // 不能为空的字段
//                     customAttr: { // 自定义属性
//                         'custom-codelabel-rb-coat-text': "${coat_text}",
//                         'custom-codelabel-rb-coat-data': "${coat_data}",
//                     },
//                     styleinfo:{ // 样式映射信息
//                         color: 'color',  // 主颜色字段
//                     },
//                     inlineStyle: {
//                         '--theme-rb-bgcolor':"${bgcolor}",
//                         '--theme-rb-title-color':"${titlecolor}",
//                         '--theme-rb-msg-color':"${msgcolor}",
//                         '--theme-rb-msg-bgcolor':"${msgbgcolor}",
//                     },
//                     innerHTML: '<span>${value}</span>',
//                     renderEnd: (parse, element,oldHTML) => { // 渲染完单个元素的回调.
//                     },
//                 },
//             ],
//         },
//     },
// }




/**
 * 微章解析帮助类
 */
class CodeLabelParse {

    constructor(ptypeItem) {

        this.ptypeItem = deepCopy(ptypeItem);
        this.styleConfig = deepCopy(ptypeItem.style);

        this.className = ptypeItem.className;         // 属性名称
        this.customf = ptypeItem.customf;                        // 忽略解析的属性值 
        this.reg = ptypeItem.reg;  // 正则表达式
        this.parseInfo = {};                          // 解析后内容
        this.maps = ptypeItem.maps;                   // 映射关系
        this.emptys = ptypeItem.emptys;               // 不能为空的字段
        this.emptysValues = ptypeItem.emptysValues;   // 为空字段的默认值

        this.innerHTML = ptypeItem.innerHTML;         // 内置html
        this.customAttr = ptypeItem.customAttr;       // 自定义属性
        this.inlineStyle = ptypeItem.inlineStyle;     // 内敛样式

        this.renderEnd = ptypeItem.renderEnd;

        /**
         * 解决无法在 class 内调用的问题
         */

        this.renderEnd = this.renderEnd.bind(this);
        this.getElementWithoutCustomf = this.getElementWithoutCustomf.bind(this)
        this.isEmptyParse = this.isEmptyParse.bind(this)
        this.formatInlineHtml = this.formatInlineHtml.bind(this)
        this.formatInlineHtml = this.formatInlineHtml.bind(this)
        this.formatCustomAttr = this.formatCustomAttr.bind(this)
        this.formatInlineStyle = this.formatInlineStyle.bind(this)
        this.render = this.render.bind(this)
        this.renderSingle = this.renderSingle.bind(this)
        this.clacParseInfo = this.clacParseInfo.bind(this)
        this.reinitFormat = this.reinitFormat.bind(this)
    }

    reinitFormat(ptypeItem) {

        this.ptypeItem = deepCopy(ptypeItem);
        this.styleConfig = deepCopy(ptypeItem.style);

        this.className = ptypeItem.className;         // 属性名称
        this.customf = ptypeItem.customf;             // 忽略解析的属性值 
        this.reg = ptypeItem.reg;  // 正则表达式
        this.parseInfo = {};                          // 解析后内容
        this.maps = ptypeItem.maps;                   // 映射关系
        this.emptys = ptypeItem.emptys;               // 不能为空的字段
        this.emptysValues = ptypeItem.emptysValues;   // 为空字段的默认值

        this.innerHTML = ptypeItem.innerHTML;         // 内置html
        this.customAttr = ptypeItem.customAttr;       // 自定义属性
        this.inlineStyle = ptypeItem.inlineStyle;     // 内敛样式
        
        this.innerHTML = deepCopy(ptypeItem.innerHTML);         // 内置html
        this.customAttr = deepCopy(ptypeItem.customAttr);       // 自定义属性
        this.inlineStyle = deepCopy(ptypeItem.inlineStyle);     // 内敛样式
    }

    /**
     * 获取不在 customf 属性影响范围内的所有 code 标签
     * @param {string} customf 
     * @returns 
     */
    getElementWithoutCustomf(customf) {
        let rst = getElement(
            'div.fn__flex-1 .protyle-wysiwyg *[data-node-id] code',
            `.protyle-wysiwyg *[data-node-id][custom-f~=${customf}] code`
        );
        return rst;
    }

    /**
     * 判断是否为空
     * @param {Array} emptys 空字符 
     * @returns 
     */
    isEmptyParse(emptys) {

        let isEmpty = false;
        let count = emptys.length;
        for (let i = 0; i < count; i++) {
            let s = emptys[i];
            if (empty(s)) {
                isEmpty = true;
                break;
            }
        }

        return isEmpty;
    }

    /**
     * 格式化 inlinehtml
     * @param {string} innerHTML  自定义书属性信息
     * @param {object} parseInfo  解析信息
     * @param {Array}  maps       映射信息
     * @returns 返回格式化的信息
     */
    formatInlineHtml(innerHTML, parseInfo, maps) {

        // 替换 $1~$9 的别名
        for (let k in parseInfo) {
            let tv = parseInfo[k];
            if (tv === undefined || tv === null || empty(tv)) {
                tv = this.emptysValues[k];
            }
            innerHTML = innerHTML.replace(`\$\{${k}\}`, tv);
        }

        // 替换 $1~$9
        for (let k in maps) {
            let tv = parseInfo[maps[k]];
            if (tv === undefined || tv === null || empty(tv)) {
                tv = this.maps[k];
            }
            innerHTML = innerHTML.replace(`\$\{${k}\}`, tv);
        }

        return innerHTML;
    }

    /**
     * 格式化 自定义属性
     * @param {object} customAttr 自定义属性信息
     * @param {object} parseInfo  解析信息
     * @param {Array}  maps       映射信息
     * @returns 返回格式化的信息
     */
    formatCustomAttr(customAttr, parseInfo, maps) {

        for (let ca in customAttr) {

            // 替换 $1~$9 的别名
            for (let k in parseInfo) {

                let tv = parseInfo[k];
                if (tv === undefined || tv === null || empty(tv)) {
                    tv = this.emptysValues[k];
                }

                customAttr[ca] = customAttr[ca].replace(`\$\{${k}\}`, tv);
            }

            // 替换 $1~$9
            for (let k in maps) {

                let tv = parseInfo[maps[k]];
                if (tv === undefined || tv === null || empty(tv)) {
                    tv = this.maps[k];
                }

                customAttr[ca] = customAttr[ca].replace(`\$\{${k}\}`, tv);
            }

        }


        return deepCopy(customAttr);
    }



    /**
     * 格式化 内敛样式
     * @param {object} inlineStyle  自定义样式信息
     * @param {object} parseInfo    解析信息
     * @param {object} maps         映射信息
     * @returns 返回格式化的信息
     */
    formatInlineStyle(inlineStyle, parseInfo, maps) {

        for (let ca in this.inlineStyle) {

            // 替换 $1~$9 的别名
            for (let k in parseInfo) {

                let tv = parseInfo[k];
                if (tv === undefined || tv === null || empty(tv)) {
                    tv = this.emptysValues[k];
                }

                inlineStyle[ca] = inlineStyle[ca].replace(`\$\{${k}\}`, tv);
            }

            // 替换 $1~$9
            for (let k in maps) {

                let tv = parseInfo[maps[k]];
                if (tv === undefined || tv === null || empty(tv)) {
                    tv = this.maps[k];
                }

                inlineStyle[ca] = inlineStyle[ca].replace(`\$\{${k}\}`, tv);
            }

        }

        return deepCopy(inlineStyle);

    }


    /**
     * 渲染单个
     * @param {元素} e 
     * @param {*} oldHTML 
     * @param {*} isReParseInfo 
     */
    renderSingle(e, parseInfo) {

        // 添加lclassName
        e.classList.add(this.className)

        // 重新计算 html
        this.innerHTML = this.formatInlineHtml(this.innerHTML, parseInfo, this.maps);
        e.innerHTML = this.innerHTML;


        // 设置属性
        this.customAttr = this.formatCustomAttr(this.customAttr, parseInfo, this.maps);
        for (let k in this.customAttr) {
            e.setAttribute(k, this.customAttr[k]);
        }


        // 设置 inline style
        this.inlineStyle = this.formatInlineStyle(this.inlineStyle, parseInfo, this.maps);
        for (let k in this.inlineStyle) {
            setStyleVariableValue(e.style, k, this.inlineStyle[k]);
        }
    }

    clacParseInfo(oldHTML) {

        let parseInfo = {};
        let simplePatt = new RegExp(this.reg);

        if (simplePatt.test(oldHTML)) {
            // 缓存 Regex.$1~Regex.$9 的值
            let vmap = {
                '$1': RegExp.$1,
                '$2': RegExp.$2,
                '$3': RegExp.$3,
                '$4': RegExp.$4,
                '$5': RegExp.$5,
                '$6': RegExp.$6,
                '$7': RegExp.$7,
                '$8': RegExp.$8,
                '$9': RegExp.$9,
            }

            // 设置 parseInfo 对象
            for (let k in this.maps) {
                let v = this.maps[k];
                if (empty(v) === false) {
                    parseInfo[v] = vmap[k];
                }
            }

            parseInfo['value'] = oldHTML;

            // 如果需要计算配色
            if (this.styleConfig.rerender === true) {
                let styleinfo = new StyleColorInfo(this.styleConfig);
                styleinfo.rerender(
                    parseInfo[this.styleConfig.color.value],  // 颜色值
                    parseInfo[this.styleConfig.color.suffix]  // 颜色后缀
                );

                // 添加计算结果到 parseInfo
                for (let k in styleinfo) {
                    parseInfo[k] = styleinfo[k];
                }
            }
        }

        return deepCopy(parseInfo);

    }

    /**
     * 渲染
     * @param {html} params 
     */
    render() {
        // 获取符合条件的 code 标签
        let elements = this.getElementWithoutCustomf(this.customf);

        // 正则表达式
        let simplePatt = new RegExp(this.reg);

        for (let e of elements) {

            // 重新获取模板
            this.reinitFormat(this.ptypeItem);

            // 获取 code 标签 中的原始内容。
            let oldHTML = e.innerHTML;

            if (simplePatt.test(oldHTML)) {

                // 计算 ParseInfo
                this.parseInfo = this.clacParseInfo(oldHTML)

                // 判断关键解析结构是否为空，不为空的时候，设置
                let isEmpty = this.isEmptyParse(this.emptys);
                if (isEmpty === false && e.className !== this.className) {

                    // 渲染当个节点
                    this.renderSingle(e, this.parseInfo);

                    // 渲染结束事件
                    this.renderEnd(this, e, oldHTML);

                }

            }

        }

    }


}


/**
 * 样式-颜色信息转换类
 */
class StyleColorInfo {
    constructor(styleConfig, colorEndsuffix) {

        this.styleConfig = deepCopy(styleConfig)
        this.colorEndsuffix = colorEndsuffix
        let gcolor = deepCopy(this.styleConfig.colors.values()[this.styleConfig.default]);
        this.bgcolor1 = gcolor.value
        this.color1 = gcolor.titlecolor
        this.bgcolor2 = gcolor.msgbgcolor
        this.color2 = gcolor.msgcolor
    }


    /**
     * 
     * @param {string} color  主颜色
     * @param {string} suffix 主颜色后缀
     */
    async rerender(color, suffix) {

        let vsuffix = false;

        if (suffix !== undefined && suffix !== null && this.styleConfig.colors.suffixs.hasOwnProperty(suffix)) {
            vsuffix = this.styleConfig.colors.suffixs[suffix];
        }
        else {
            vsuffix = this.styleConfig.defaultSuffix
        }

        let vlook = rerenderColor(color, vsuffix,
            this.styleConfig.colors.values(),
            this.styleConfig.colors.names(),
            this.styleConfig.default)

        this.bgcolor1 = vlook.value
        this.color1 = vlook.titlecolor
        this.bgcolor2 = vlook.msgbgcolor
        this.color2 = vlook.msgcolor

        // this.bgcolor1 = vlook.value
        // this.color1 = vlook.titlecolor
        // this.bgcolor2 = vlook.msgcolor 
        // this.color2 = vlook.msgbgcolor
    }

}