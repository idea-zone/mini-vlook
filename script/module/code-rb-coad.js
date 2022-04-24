
/**
 * 目标：刮刮卡
 */
import { config } from './b320config.js';
import { isKey } from '../utils/hotkey.js';
import{
    getElement,               //  获取满足 selector 但不满足 exclude 的所有元素。
    getStyleVariable,         // 获取 style 中的 css 变量
    setStyleVariableValue,    // 设置 style 中的 css 变量
    checkStyleVariableValue,  // 判断 style 中的 css 变量
    isLawColorNameOrValue,    // 判断颜色值是否是合法
    rerenderColor,            // 重新渲染颜色值是否是合法
} from '../utils/codetag.js';
import {
    minus, // 计算两个数组的差集
    empty, // 判断字符串是否为空
} from '../utils/b320comm.js';


// 未刮开
// <code class="v-rb-coat" data-v-rb-coat-data="这是刮刮卡的内容" data-v-rb-coat-showed="false" title="点击查看有效的原始内容" style="background: linear-gradient(45deg, var(--ac-gray-lg) 0%, var(--ac-gray-lg) 25%,var(--d-f-c) 25%, var(--d-f-c) 50%,var(--ac-gray-lg) 50%, var(--ac-gray-lg) 75%,var(--d-f-c) 75%, var(--d-f-c) 100%); border-color: var(--ac-gray-lg); color: var(--d-bc);"> 提示信息 </code>

// 刮开
// <code class="v-rb-coat opened" data-v-rb-coat-data=" 提示信息 " data-v-rb-coat-showed="true" title="点击查看有效的原始内容" style="background: linear-gradient(45deg, var(--ac-gray-lg) 0%, var(--ac-gray-lg) 25%,var(--d-f-c) 25%, var(--d-f-c) 50%,var(--ac-gray-lg) 50%, var(--ac-gray-lg) 75%,var(--d-f-c) 75%, var(--d-f-c) 100%); border-color: var(--ac-gray-lg); color: rgb(148, 152, 160);">这是刮刮卡的内容</code>


// 获取不在 [custom-f~=rb] 范围内的 code 标签
function getElementWithoutCustomf_rb() {
    // let elementAll = document.querySelectorAll('div.fn__flex-1 .protyle-wysiwyg *[data-node-id] code')
    // let elementNot = document.querySelectorAll('.protyle-wysiwyg *[data-node-id] code.v-rb-coat')
    // let rst = minus(Array.from(elementAll), Array.from(elementNot));
    // console.warn(elementAll.length)
    let rst = getElement(
        'div.fn__flex-1 .protyle-wysiwyg *[data-node-id] code',
        '.protyle-wysiwyg *[data-node-id][custom-f~=rb] code'
    );
    return rst;
}

class RbParseInfo {
    /**
     * 构造函数
     * @param {string} value        原始内容的值
     * @param {string} coat_text    显示的标题 
     * @param {string} coat_data    隐藏的内容
     * @param {string} color        颜色
     */
    constructor(value, coat_text, coat_data, color) {
        this._value = value;
        this._coat_text = coat_text;
        this._coat_data = coat_data;
        this._color = color;
    }

    set value(value) {
        this._value = value;
    }
    get value() {
        return this._value;
        // return "'"+this._value+"'";
    }

    set coat_text(value) {
        this._coat_text = value;
    }
    get coat_text() {
        if (this._coat_text === "" || this._coat_text === undefined)
            return "****"
        return this._coat_text;
    }

    set coat_data(value) {
        this._coat_data = value;
    }
    get coat_data() {
        return this._coat_data;
    }

    set color(value) {
        this._color = value;
    }

    get color() {

        let tcolor = this.rerender(this._color);
        return tcolor
        // return this._color;
    }

    rerender(tcolor) {

        // if (empty(tcolor)) {
        //     tcolor = 'gray'
        // }

        // // 如果不是合法的颜色值，使用默认的值
        // if (!this.isLawColorNameOrValue(tcolor)) {
        //     tcolor = 'gray'
        // }

        // if (config.theme.common.colors.names.indexOf(tcolor) > -1) {
        //     // let vcolor =  config.theme.common.colors.values[color];
        //     tcolor = `var(--ac-${tcolor}-lg)`;
        // }

        return tcolor;
    }


    /**
     * 判断是否是合法的颜色值
     * @param {*} color
     * @returns
     */
    isLawColorNameOrValue(color) {
        return !empty(color) &&
            (
                config.theme.common.colors.names.indexOf(color) > -1 ||
                new RegExp(config.theme.regs.colorvalue).test(color)     // 判断是否是 #颜色值
            );
    }

    log() {
        console.log(`原始内容:'${this._value}', 标题:'${this._coat_text}', 内容:'${this._coat_data}', 颜色:'${this._color}'`)
    }
}




class RbStyleInfo{

    constructor(){
        let gcolor= config.theme.common.colors.values['gray'];
        this.bgcolor = gcolor.value 
        this.titlecolor =gcolor.titlecolor 
        this.msgcolor = gcolor.msgbgcolor 
        this.msgbgcolor =gcolor.msgcolor 
    }

    async rerender(color){

        let vlook= rerenderColor(color,false,
            config.theme.common.colors.values,
            config.theme.common.colors.names,
            'gray')

        this.bgcolor = vlook.value 
        this.titlecolor =vlook.titlecolor 
        this.msgcolor = vlook.msgbgcolor 
        this.msgbgcolo =vlook.msgcolor 
    }
}

async function render() {
    // 获取符合条件的 code 标签
    let elements = getElementWithoutCustomf_rb();

    // 正则表达式
    let simplePatt = new RegExp(config.theme.regs.rb);

    for (let e of elements) {

        let oldHTML = e.innerHTML;
        // 处理 `*{ 提示信息 }(这是刮刮卡的内容 "red")` 其中 ()

        // (5) ['*{提示信息}(这是刮刮卡的内容 "red")', '提示信息', '这是刮刮卡的内容', ' "red"', 'red', index: 0, input: '*{提示信息}(这是刮刮卡的内容 "red")', groups: undefined]
        // 0: "*{提示信息}(这是刮刮卡的内容 \"red\")" -- text
        // 1: "提示信息"                             -- data-text
        // 2: "这是刮刮卡的内容"                      -- data-v-rb-coat-data
        // 3: " \"red\""                             --    
        // 4: "red"                                  -- color
        // groups: undefined
        // index: 0
        // input: "*{提示信息}(这是刮刮卡的内容 \"red\")"
        // length: 5
        // [[Prototype]]: Array(0)

        if (simplePatt.test(oldHTML)) {

            let parseInfo = new RbParseInfo(
                oldHTML,
                RegExp.$1,
                RegExp.$2,
                RegExp.$4,
            )

            // parseInfo.log()

            if (!empty(parseInfo.coat_text+parseInfo.coat_data) && e.className!=='v-rb-coat'){
                
                e.className += 'v-rb-coat'
                e.innerHTML = '<span>'+oldHTML +'</span>'
                e.setAttribute("custom-codelabel-rb-coat-text",parseInfo.coat_text)
                e.setAttribute("custom-codelabel-rb-coat-data",parseInfo.coat_data)
                e.setAttribute("custom-codelabel-rb-coat-showe",false)

                let rb = new RbStyleInfo();
                rb.rerender(parseInfo.color);

                setStyleVariableValue(e.style,'--theme-rb-bgcolor',rb.bgcolor)
                setStyleVariableValue(e.style,'--theme-rb-title-color',rb.titlecolor)
                setStyleVariableValue(e.style,'--theme-rb-msg-color',rb.msgcolor)
                setStyleVariableValue(e.style,'--theme-rb-msg-bgcolor',rb.msgbgcolor)

                e.onclick = bingOnClick.bind(e,e);
            }

        }


    }

}


function bingOnClick(button){
    let value = button.getAttribute('custom-codelabel-rb-coat-showe') === false ||
    button.getAttribute('custom-codelabel-rb-coat-showe') === 'false' ?
    'true' : 'false';
    button.setAttribute('custom-codelabel-rb-coat-showe',value)
}

(() => {
    try {

        let body = document.body;
        window.onload = setTimeout(render, 0);

        body.addEventListener('keyup', (e) => {

            // // 通过 Ctrl+Alt+0切换开关
            // if (isKey(e, config.theme.hotkeys.codelabel.render)) {
            //     config.theme.codelabel.render.enable = !config.theme.codelabel.render.enable;
            //     console.warn("bug320_3:", config.theme.codelabel.render.enable)
            // }

            if (config.theme.codelabel.render.enable) {
                setTimeout(render, 0);
            }
        })


    } catch (err) {
        console.error(err);
    }
})();