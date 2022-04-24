
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
function getElementWithoutCustomf_todo() {
    let rst = getElement(
        'div.fn__flex-1 .protyle-wysiwyg *[data-node-id] code',
        '.protyle-wysiwyg *[data-node-id][custom-f~=todo] code'
    );
    return rst;
}

class TodoParseInfo {
    /**
     * 构造函数
     * @param {string} value   原始内容的值
     * @param {string} count    文本 
     * @param {string} data  注音
     */
    constructor(value, count, data, color) {
        this.value = value;
        this.count = count;
        this.data = data;
    }

    log() {
        console.log(`原始内容:'${this.value}', 内容:'${this.count}', 注音:'${this.data}'`)
    }
}


async function render() {
    // 获取符合条件的 code 标签
    let elements = getElementWithoutCustomf_todo();

    // document.querySelectorAll(".vk-todo-button").forEach(e => e.parentNode.removeChild(e));

    // 正则表达式
    let simplePatt = new RegExp(config.theme.regs.todo);

    for (let e of elements) {

        let oldHTML = e.innerHTML;
        // 处理 `[0]{内容}` 其中 ()
        if (simplePatt.test(oldHTML)) {

            let parseInfo = new TodoParseInfo(
                oldHTML,
                RegExp.$1,
                RegExp.$2,
            )

            // parseInfo.log()

            if (!empty(`${parseInfo.count}`+ parseInfo.data) && e.className!=='vk-todo'){
                // e.parentElement.setAttribute('contenteditable',false)
                e.className += 'vk-todo'
                e.innerHTML = `<button>+</button><span>[${parseInfo.count}]</span><span>(</span>${parseInfo.data}<span>)</span>`
                e.setAttribute("custom-codelabel-todo-count",parseInfo.count)
                e.setAttribute("custom-codelabel-todo-data",parseInfo.data)
            }

            // let btn = document.createElement('button');
            // btn.className ="vk-todo-button";
            // btn.innerHTML = '+';
            // btn.onclick = bingOnClick.bind(btn,e);
            // e.parentNode.insertBefore(btn, e);
            e.firstChild.onclick = bingOnClick.bind(e.firstChild,e);
            e.firstChild.setAttribute("custom-codelabel-todo-count",parseInfo.count);
            
        }
    }
}


function bingOnClick(e){
    console.log("input e")
    let count = 1+ +e.getAttribute('custom-codelabel-todo-count');
    let value = e.getAttribute("custom-codelabel-todo-data");
    // 注意 + + 之间的空格不能省略，
    e.innerHTML = `<button>+</button><span>[${count}]</span><span>(</span>${value}<span>)</span>`
    e.setAttribute("custom-codelabel-todo-count",count)
    // e.setAttribute("custom-codelabel-todo-data",count)
    e.firstChild.onclick = bingOnClick.bind(e.firstChild,e);
    e.firstChild.setAttribute("custom-codelabel-todo-count",count);
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