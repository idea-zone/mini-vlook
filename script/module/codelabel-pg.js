
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

// 获取不在 [custom-f~=rb] 范围内的 code 标签
function getElementWithoutCustomf_pg() {
    let rst = getElement(
        'div.fn__flex-1 .protyle-wysiwyg *[data-node-id] code',
        '.protyle-wysiwyg *[data-node-id][custom-f~=pg] code'
    );
    return rst;
}

class PgParseInfo {
    /**
     * 构造函数
     * @param {string} value   原始内容的值
     * @param {string} text    文本 
     * @param {string} pgdata  注音
     */
    constructor(value, text, pgdata, color) {
        this.value = value;
        this.text = text;
        this.pgdata = pgdata;
    }

    log() {
        console.log(`原始内容:'${this.value}', 内容:'${this.text}', 注音:'${this.pgdata}'`)
    }
}


async function render() {
    // 获取符合条件的 code 标签
    let elements = getElementWithoutCustomf_pg();

    // 正则表达式
    let simplePatt = new RegExp(config.theme.regs.pg);

    for (let e of elements) {

        let oldHTML = e.innerHTML;
        // 处理 `{ 道德经 }(dou däk gïng)` 其中 ()
        if (simplePatt.test(oldHTML)) {

            let parseInfo = new PgParseInfo(
                oldHTML,
                RegExp.$1,
                RegExp.$2,
            )

            parseInfo.log()

            if (!empty(parseInfo.text+parseInfo.pgdata) && e.className!=='vk-pg'){
                // e.parentElement.setAttribute('contenteditable',false)
                e.className += 'vk-pg'
                e.innerHTML = '<span>'+oldHTML +'</span>'
                // e.innerHTML = `<ruby><span>{</span>${parseInfo.text}<span>}</span><rp>(</rp><rt><span>(</span>${parseInfo.pgdata}<span>)</span></rt><rp>)&nbsp;</rp></ruby>`
                e.innerHTML = `<ruby><span>{</span>${parseInfo.text}<span>}</span><rp>(</rp><rt>${parseInfo.pgdata}</rt><rp>)</rp></ruby>`
                e.setAttribute("custom-codelabel-pg-text",parseInfo.text)
                e.setAttribute("custom-codelabel-pg-data",parseInfo.pgdata)

            }

        }


    }

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