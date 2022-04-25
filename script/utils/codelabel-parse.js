import { deepClone, empty } from "./b320comm.js";
import { getElement, setStyleVariableValue } from "./codetag.js";

export {
    CodeLabelParse,
    config1,
}

var config1 = {
    theme: {
        codelabel: {
            enable: true, // 是否启用自定义样式渲染
            ptype: [       // 解析类型
                {
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
            ],
        },
    },
}



class CodeLabelParse {

    constructor(ptypeItem) {

        this.ptypeItem = deepClone(ptypeItem);

        this.className = ptypeItem.className;         // 属性名称
        this.customf = ptypeItem.customf;                        // 忽略解析的属性值 
        this.reg = ptypeItem.reg;  // 正则表达式
        this.parseInfo = {};                          // 解析后内容
        this.maps = ptypeItem.maps;                   // 映射关系
        this.emptys = ptypeItem.emptys;               // 不能为空的字段
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

    reinitFormat(ptypeItem){

        this.innerHTML = deepClone(ptypeItem.innerHTML);         // 内置html
        this.customAttr = deepClone(ptypeItem.customAttr);       // 自定义属性
        this.inlineStyle = deepClone(ptypeItem.inlineStyle);     // 内敛样式

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
            innerHTML = innerHTML.replace(`\$\{${k}\}`, parseInfo[k]);
        }

        // 替换 $1~$9
        for (let k in maps) {
            innerHTML = innerHTML.replace(`\$\{${k}\}`, parseInfo[maps[k]]);
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
                customAttr[ca] = customAttr[ca].replace(`\$\{${k}\}`, parseInfo[k]);
            }

            // 替换 $1~$9
            for (let k in maps) {
                customAttr[ca] = customAttr[ca].replace(`\$\{${k}\}`, parseInfo[maps[k]]);
            }

        }

        
        return deepClone(customAttr);
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
                inlineStyle[ca] = inlineStyle[ca].replace(`\$\{${k}\}`, parseInfo[k]);
            }

            // 替换 $1~$9
            for (let k in maps) {
                inlineStyle[ca] = inlineStyle[ca].replace(`\$\{${k}\}`, parseInfo[maps[k]]);
            }

        }

        return deepClone(inlineStyle);

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
            setStyleVariableValue(e, k, this.inlineStyle[k]);
        }
    }

    clacParseInfo(oldHTML) {

        let parseInfo ={};
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

        }
        
        return deepClone(parseInfo);

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
                    this.renderEnd(this, e,oldHTML);

                }

            }

        }

    }


}


