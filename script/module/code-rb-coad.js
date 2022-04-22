
/**
 * 目标：刮刮卡
 */
 import { config } from './b320config.js';
 import { isKey } from '../utils/hotkey.js';
 import {
     minus, // 计算两个数组的差集
     empty, // 判断字符串是否为空
 } from  '../utils/b320comm.js';


// 未刮开
// <code class="v-rb-coat" data-v-rb-coat-data="这是刮刮卡的内容" data-v-rb-coat-showed="false" title="点击查看有效的原始内容" style="background: linear-gradient(45deg, var(--ac-gray-lg) 0%, var(--ac-gray-lg) 25%,var(--d-f-c) 25%, var(--d-f-c) 50%,var(--ac-gray-lg) 50%, var(--ac-gray-lg) 75%,var(--d-f-c) 75%, var(--d-f-c) 100%); border-color: var(--ac-gray-lg); color: var(--d-bc);"> 提示信息 </code>

// 刮开
// <code class="v-rb-coat opened" data-v-rb-coat-data=" 提示信息 " data-v-rb-coat-showed="true" title="点击查看有效的原始内容" style="background: linear-gradient(45deg, var(--ac-gray-lg) 0%, var(--ac-gray-lg) 25%,var(--d-f-c) 25%, var(--d-f-c) 50%,var(--ac-gray-lg) 50%, var(--ac-gray-lg) 75%,var(--d-f-c) 75%, var(--d-f-c) 100%); border-color: var(--ac-gray-lg); color: rgb(148, 152, 160);">这是刮刮卡的内容</code>


 // 获取不在 [custom-f~=rb] 范围内的 code 标签
 function getElementWithoutCustomf_wz(){
    let elementAll=document.querySelectorAll('div.fn__flex-1 .protyle-wysiwyg *[data-node-id] code')
    let elementNot=document.querySelectorAll('.protyle-wysiwyg *[data-node-id][custom-f~=rb] code')
    let rst = minus(Array.from(elementAll),Array.from(elementNot));
    console.warn(elementAll.length)
    return rst;
}

async function render(){
    // 获取符合条件的 code 标签
    let elements = getElementWithoutCustomf_wz();
    
    // 正则表达式
    let simplePatt = new RegExp(config.theme.regs.rb);
   
    for(let e of elements){
 
        let oldHTML =e.innerHTML;
        // 处理 `#微章标题|微章内容#(颜色名称!)` 其中 ()

        // "*{}(这是刮刮卡的内容)".match('\\\*\\\{(.*)\\\}\\\((.*)\\\)(\s+\\\"(#?[\\\d\\\w]+)\\\")?')
        // 0: "*{}(这是刮刮卡的内容)"
        // 1: ""
        // 2: "这是刮刮卡的内容"
        // 3: undefined
        // 4: undefined
        // groups: undefined
        // index: 0
        // input: "*{}(这是刮刮卡的内容)"
        // length: 5
        
        if (simplePatt.test(oldHTML)){
            console.log('dd-OK');
        }
    }

}

 
(() => {
    try {

        let body = document.body;
        window.onload=  setTimeout(render, 0);

        body.addEventListener('keyup',(e)=>{

            // 通过 Ctrl+Alt+0切换开关
            if (isKey(e,config.theme.hotkeys.codelabel.render)){
                config.theme.codelabel.render.enable=!config.theme.codelabel.render.enable;
                console.warn("bug320_3:",config.theme.codelabel.render.enable)
            }

            if(config.theme.codelabel.render.enable){
                setTimeout(render, 0);
            }
        })


    } catch (err) {
        console.error(err);
    }
})();