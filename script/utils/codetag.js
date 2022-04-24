/**
 * code 解析
 */

 export {
    getElement,               //  获取满足 selector 但不满足 exclude 的所有元素。
    getStyleVariable,         // 获取 style 中的 css 变量
    setStyleVariableValue,    // 设置 style 中的 css 变量
    checkStyleVariableValue,  // 判断 style 中的 css 变量
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
    minus, // 计算两个数组的差集
    empty, // 判断字符串是否为空
} from  '../utils/b320comm.js';

/**
 * 获取满足 selector 但不满足 exclude 的所有元素。
 * @param {string} selector 要获取元素的 selector  
 * @param {string} exclude  从获取元素中排除的元素的 selector
 * @returns 
 */
function getElement(selector,exclude){

    if (empty(selector)){
        console.warn(" function getElement(): param selector cannot be empty." )
        return null;
    }
    let elementAll=document.querySelectorAll(selector)
    
    if (empty(exclude)) return elementAll;

    let elementNot=document.querySelectorAll(exclude)
    let rst = minus(Array.from(elementAll),Array.from(elementNot));
    
    return rst;
}

/**
 * 获取 style 中的 css 变量
 * @param {object} elementStyle DOM 元素的 style 对象
 * @param {string} attrName 属性名称
 */
function getStyleVariable(elementStyle,attrName){
    if (elementStyle === null || elementStyle === undefined) {
        console.warn(" function getStyleVariable(): param elementStyle cannot be null or undefined." )
        return null;
    }

    return elementStyle.getPropertyValue(attrName)
}

/**
 * 设置 style 中的 css 变量attrName 的值
 * @param {object} elementStyle DOM 元素的 style 对象
 * @param {string} attrName 属性名称
 * @param {string} value    属性值
 */
 function setStyleVariableValue(elementStyle,attrName,value){
    if (elementStyle === null || elementStyle === undefined) {
        console.warn(" function setStyleVariableValue(): param elementStyle cannot be null or undefined." )
        return false;
    }
    
    if (empty(attrName)){
        console.warn(" function setStyleVariableValue(): param attrName cannot be empty." )
        return false;
    }

    elementStyle.setProperty(attrName, value);
}

/**
 * 判断 style 中的 css 变量attrName 是否是对应的值
 * @param {object} elementStyle DOM 元素的 style 对象
 * @param {string} attrName 属性名称
 * @param {string} value    属性值
 */
 function checkStyleVariableValue(elementStyle,attrName,value){
    if (elementStyle === null || elementStyle === undefined) {
        console.warn(" function checkStyleVariableValue(): param elementStyle cannot be null or undefined." )
        return false;
    }
    
    if (empty(attrName)){
        console.warn(" function checkStyleVariableValue(): param attrName cannot be empty." )
        return false;
    }

    return elementStyle.getPropertyValue(attrName).indexOf(value) > -1
}


/**
 * 判断是否是合法的颜色值
 * @param {string} color
 * @returns
 */
function isLawColorNameOrValue(color,names){
    return !empty(color) &&
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
      let rst = colors[defaultName]
      if  (empty(color)){
          return rst;
      }

    // 如果不是合法的颜色值，使用默认的值
    if (!isLawColorNameOrValue(color,names)) {
        return rst;
    }

    if (names.indexOf(color) > -1){
        rst =  colors[color];
    }

    if(wzEndsuffix){
        rst.msgbgcolor = rst.value
    }

    return rst;
}
