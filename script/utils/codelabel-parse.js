import { config } from "../module/b320config.js";
import { deepCopy, empty } from "./b320comm.js";
import { getElement, rerenderColor, setStyleVariableValue } from "./codetag.js";

export {
    CodeLabelParse,
}

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


/**
 * Tag解析帮助类
 */
class CodeLabelParse {

    constructor(ptypeItem,domNode) {

        this.ptypeItem = deepCopy(ptypeItem);
        this.domNode = domNode;

        this.tagName = ptypeItem.tagName;
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

    /**
     * 重新初始化变量值
     * @param {object} ptypeItem 
     */
    reinitFormat(ptypeItem) {

        this.ptypeItem = deepCopy(ptypeItem);

        this.tagName=ptypeItem.tagName;
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
    getElementWithoutCustomf(customf,tagName,domNode) {
        let rst = getElement(
            `div.fn__flex-1 .protyle-wysiwyg *[data-node-id] ${tagName}`,
            `.protyle-wysiwyg *[data-node-id][custom-f~=${customf}] ${tagName}`,
            domNode
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

            customAttr["custom-codelabel-value"] = parseInfo.value;
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

        // 添加事件
        if (e.tagName.toLowerCase() === "code"){

            e.addEventListener('dblclick',(event)=>{

                config.theme.codelabel.render.enable = false;
                
                e.innerHTML = parseInfo["value"];
    
                while(e.attributes.length > 0)
                    e.removeAttribute(e.attributes[0].name);

                e.focus();

            });

        }
    }

    /**
     * 计算 ParseInfo 的字段和对应值
     * @param {string} oldHTML 
     * @returns 
     */
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
        let elements = this.getElementWithoutCustomf(this.customf,this.tagName,this.domNode);

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

                    // e.addEventListener('focus',(event)=>{
                    //     event.target.style.background = 'pink';
                    //     console.warn("1");
                    // });

                    // e.addEventListener('blur', (event) => {
                    //     event.target.style.background = '';
                    //     console.warn("2");
                    // });

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