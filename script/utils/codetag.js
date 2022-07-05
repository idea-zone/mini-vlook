/**
 * code 解析
 */

 export {
    isLawColorNameOrValue,    // 判断颜色值是否是合法
    rerenderColor,            // 重新渲染颜色值是否是合法
};

/**
 * 给button等元素绑定事件的同时传入参数
button.onclick = clickbutton.bind(button,sg,parseInfo);
function clickbutton(sg,parseInfo) {…}

 * 在 元素后面插入新元素
var sg = document.createElement('strong');
e.parentNode.insertBefore(sg, e.nextElementSibling);
 *添加删除className
   e.classList.add('opened');
   e.classList.remove('opened');
 */

import {
    config
} from '../module/b320config.js';
import { mv } from '../commons/domex.js';

/**
 * 判断是否是合法的颜色值
 * @param {string} color
 * @returns
 */
function isLawColorNameOrValue(color,names){
    return !mv.Empty(color) &&
    (
        names.indexOf(color) >-1 ||
        new RegExp(config.theme.regs.colorvalue).test(color)     // 判断是否是 #颜色值
    );
}


/**
 * 重新渲染颜色值
 * @param {string} color 颜色值或者名称
 * @param {boolean} wzEndsuffix 是否让msgbcolor 和 bgcolor 一样。
 * @param {Array} colors 颜色值json列表，包含 value,titlecolor,msgbgcolor,msgcolor 四个字段。
 * @param {Array} names 颜色值名称列表，也是 colors 的 keys 列表。
 * @param {string} defaultName 缺省情况下的colorName。
 * @returns 
 */
function rerenderColor(color,wzEndsuffix,colors,names,defaultName){
    /**
     'red': {
        'value': '#CC3140',
        'titlecolor': '#f6eef3',
        'msgbgcolor':'rgba(255,255,255,0.6)',
        'msgcolor': '2b1c29',
      },
     */
      let rst = mv.deepCopy(colors[defaultName])
      if  (mv.Empty(color)){
          return mv.deepCopy(rst);
      }

    // 如果不是合法的颜色值，使用默认的值
    if (!isLawColorNameOrValue(color,names)) {
        return mv.deepCopy(rst);
    }

    if (names.indexOf(color) > -1){
        rst =  mv.deepCopy(colors[color]);
    }

    if(wzEndsuffix){
        rst.msgcolor = rst.value
    }

    return mv.deepCopy(rst);
}

