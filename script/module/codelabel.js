/**
 *  @author: bug320
 *  微章
 *  1. 读取所有<code>字段
 *  2. 判断是hi否有 ## 包括的内容
 *  3. 添加新的特性
 */

 import { config } from './b320config.js';
 import { isKey } from '../utils/hotkey.js';
 import {
     minus, // 计算两个数组的差集
     empty, // 判断字符串是否为空
 } from  '../utils/b320comm.js';
 
 /**
  * 存储正则匹配后的-分组信息
  */
 class ParseInfo {
 constructor(title, msg,colorTag,color,endsuffix) {
     this.wzTitle = title         // 微章标题
     this.wzMsg = msg             // 微章内容
     this.wzColorTag = colorTag   // 颜色标记-带括号
     this.wzColor  = color        // 仅颜色名称
     this.wzEndsuffix = endsuffix // 颜色名称后面的后缀
     }
 }
 
 /**
  * 微章-样式信息和处理
  */
 class WzStyleInfo{
     constructor(){
         this.bgcolor=config.theme.common.colors.wz.bgcolor         // 背景色
         this.titlecolor=config.theme.common.colors.wz.title_color  // 标题字体色
         this.msgcolor=config.theme.common.colors.wz.msg_color      // 内容字体色
         this.msgbgcolor=config.theme.common.colors.wz.msg_bgcolor  // 内容背景色
     }
 
     /**
      * 判断是否是合法的颜色值
      * @param {*} color
      * @returns
      */
      isLawColorNameOrValue(color){
         return !empty(color) &&
         (
             config.theme.common.colors.names.indexOf(color) >-1 ||
             new RegExp(config.theme.regs.colorvalue).test(color)     // 判断是否是 #颜色值
         );
     }
 
     /**
      * 根据颜色代码计算颜色
      * @param {*} color
      * @param {*} wzEndsuffix
      * @returns
      */
    async rerender(color,wzEndsuffix){
 
         if  (empty(color)){
             color = config.theme.common.colors.default
         }
         // 如果不是合法的颜色值，使用默认的值
         if (!this.isLawColorNameOrValue(color)) return;
 
         let tmpbgcolor = this.bgcolor;
         let tmptitlecolor =  this.titlecolor;
         let tmpmsgcolor =this.msgcolor;
         let tmpmsgbgcolor = this.msgbgcolor;
 
         if (config.theme.common.colors.names.indexOf(color) > -1) {

            let vcolor =  config.theme.common.colors.values[color];

            if (vcolor !== undefined){
                tmpbgcolor = vcolor.value
                tmptitlecolor = vcolor.titlecolor
                tmpmsgcolor = vcolor.msgcolor
                tmpmsgbgcolor = vcolor.msgbgcolor
            }

         }

         // 设置颜色
         this.bgcolor = tmpbgcolor;;
         this.titlecolor = tmptitlecolor;
         this.msgcolor = tmpmsgcolor;;
         this.msgbgcolor = tmpmsgbgcolor;;
 
         if (wzEndsuffix=='!') {
             this.msgcolor = tmpbgcolor;    // 和背景色一个值
         }
     }
 
 }
 
 /**
  * 渲染解析书签
  */
 async function render() {
     console.log("[bug320]:wz render")
     // 获取符合条件的 code 标签
     let elements = getElementWithoutCustomf_wz();
 
     // 正则表达式
     let simplePatt = new RegExp(config.theme.regs.wz);
 
 
     for(let e of elements){
 
         let oldHTML =e.innerHTML;
         // 处理 `#微章标题|微章内容#(颜色名称!)` 其中 ()
         if (simplePatt.test(oldHTML)){
 
             // let parseInfo = new ParseInfo(
             //     RegExp.$1,  // 微章标题
             //     RegExp.$2,  // 微章内容
             //     RegExp.$3,  // (颜色名称!) <可为空>, 这个不需要，主要用于调试和测试
             //     RegExp.$4,  // 颜色名称 <可为空>
             //     RegExp.$5   // ! <可为空>
             // )
 
             // #测试|efabcd#(#efabcd!)
             let parseInfo = new ParseInfo(
                 // RegExp.$1, // #微章标题|微章内容#
                 RegExp.$2,    // 微章标题
                 RegExp.$3,    // 微章内容
                 RegExp.$4,    // (颜色名称!) <可为空>, 这个不需要，主要用于调试和测试
                 RegExp.$5,    // 颜色名称 <可为空>
                 RegExp.$6     // ! <可为空>
             )
 
             if (!empty(parseInfo.wzTitle+parseInfo.wzMsg) && e.className!=='custom-codelabel-wz'){
 
                 let wz = new WzStyleInfo();
 
                 e.className += 'custom-codelabel-wz'
                 e.innerHTML = '<span>'+oldHTML +'</span>'
                 e.setAttribute("custom-codelabel-wz-title",parseInfo.wzTitle)
                 e.setAttribute("custom-codelabel-wz-msg",parseInfo.wzMsg)
 
                 wz.rerender(parseInfo.wzColor,parseInfo.wzEndsuffix)
 
                 e.style ="--theme-wz-bgcolor: "+wz.bgcolor
                        +";--theme-wz-title-color:"+wz.titlecolor+";"
                        +";--theme-wz-msg-color:"+wz.msgcolor+";"
                        +";--theme-wz-msg-bgcolor:"+wz.msgbgcolor+";"
             }
 
         }
     }
 
 }
 
 // 获取不在 [custom-f~=wz] 范围内的 code 标签
 function getElementWithoutCustomf_wz(){
     let elementAll=document.querySelectorAll('div.fn__flex-1 .protyle-wysiwyg *[data-node-id] code')
     let elementNot=document.querySelectorAll('.protyle-wysiwyg *[data-node-id][custom-f~=wz] code')
     let rst = minus(Array.from(elementAll),Array.from(elementNot));
     console.warn(elementAll.length)
     return rst;
 }
 
 (() => {
     try {
 
         let body = document.body;
         window.onload=  setTimeout(render, 0);
 
         body.addEventListener('keyup',(e)=>{
 
             // 通过 Ctrl+Alt+0切换开关
             if (isKey(e,config.theme.hotkeys.codelabel.render)){
                 config.theme.codelabel.render.enable=!config.theme.codelabel.render.enable;
                 console.warn("bug320_2:",config.theme.codelabel.render.enable)
             }
 
             if(config.theme.codelabel.render.enable){
                 setTimeout(render, 0);
             }
         })
 
 
     } catch (err) {
         console.error(err);
     }
 })();