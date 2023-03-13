import { appendBlock, deleteBlock, exportMdContent, getBlockAttrs, insertBlock, setBlockAttrs, updateBlock } from "../utils/api.js";

export const mv = {}

mv.config={
    theme:{
        regs:{
            url: /^siyuan:\/\/blocks\/(\d{14}\-[0-9a-z]{7})\/*(?:(?:\?)(\w+=\w+)(?:(?:\&)(\w+=\w+))+)?$/, // 思源 URL Scheme 正则表达式
            time: /^(\d+)(:[0-5]?[0-9]){0,2}(\.\d*)?$/, // 时间戳正则表达式
            id: /^\d{14}\-[0-9a-z]{7}$/, // 块 ID 正则表达式

            colorvalue: '^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$',            // 匹配#开头的颜色
        }
    }
}

/**
 * 判断 txt 是否为空或者NULL
 * @param {String} txt 
 * @returns 
 */
mv.Empty = (str)=>{
    if (str == 'undefined' || !str || !/[^\s]/.test(str)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 求数组 a 和 数组 b 的差集
 * @param {Array} a 
 * @param {Array} b 
 * @returns 
 */
mv.Minus = (a,b)=>{
    return a.filter(function(v){ return b.indexOf(v) == -1 });
}

/**
 * 对象深 copy
 * @param {对象} obj 
 * @param {缓存} cache 
 * @returns 
 */
mv.deepCopy= (obj, cache = [])=>{

    function find (list, f) {
        return list.filter(f)[0]
    }
    
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    
    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }
    
    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })
    
    Object.keys(obj).forEach(key => {
        copy[key] = mv.deepCopy(obj[key], cache)
    })
    
    return copy
}

/**
 * 获取父对象
 * @param {HTMLElement} dom 
 * @returns 
 */
mv.GetParentNode = (dom) =>{
   return dom.parentNode;
}

/**
 * 获取孩子节点
 * @param {HTMLElement} dom 
 * @returns 
 */
mv.GetChildNodes =(dom) =>{
    return dom.childNodes;
}

/**
 * 根据 tagName 创建对象
 * @param {*} id 新设置的id，如果为空，则不设置。 
 * @param {*} cls  新设置的cls，如果为空，则不设置。
 * @param {*} text 新设置的text，如果为空，则不设置。
 * @param {*} tagName 要创建的 tag 名字
 * @returns 
 */
mv.CreateByTagName = (id,cls,text,tagName)=>{
    let div = document.createElement(tagName);
    if (id!==null && id!==undefined && mv.Empty(id)===false){
        div.id=id;   
    }
    if (cls!==null && cls!==undefined && mv.Empty(cls)===false){
        var clsex = cls.trim().split(/\s+/);
        for(let c1 of clsex){
            div.classList.add(c1);  
        }
        // div.classList.add(cls);   
    }
    if (text!==null && text!==undefined && mv.Empty(text)===false){
        let txt = document.createTextNode(text);
        div.appendChild(txt);
    }
    return div;
}

/**
 * 创建 DIV
 * @param {*} id 新设置的id，如果为空，则不设置。 
 * @param {*} cls  新设置的cls，如果为空，则不设置。
 * @param {*} text 新设置的text，如果为空，则不设置。
 * @returns 
 */
mv.CreateDiv =  (id,cls,text)=>{
    return mv.CreateByTagName(id,cls,text,'div');
}

/**
 * 创建 UL, 并且绑定  creteLI 方法。
 * @param {*} id 新设置的id，如果为空，则不设置。 
 * @param {*} cls  新设置的cls，如果为空，则不设置。
 * @param {*} text 新设置的text，如果为空，则不设置。
 */
mv.CreateUL = (id,cls,text) =>{
    let ul = mv.CreateByTagName(id,cls,text,'ul');
    
    ul.CreateLI=(id1,cls1,text1)=>{
        let li =  mv.CreateByTagName(id1,cls1,text1,'li');
        ul.appendChild(li);
        return li;
    }
}


/**
 * 创建 SPAN
 * @param {*} id 新设置的id，如果为空，则不设置。 
 * @param {*} cls  新设置的cls，如果为空，则不设置。
 * @param {*} text 新设置的text，如果为空，则不设置。
 * @returns 
 */
mv.CreateSpan = (id,cls,text) =>{
    return mv.CreateByTagName(id,cls,text,'span');
}

/**
 * 设置新属性
 * @param {HTMLElement} dom  
 * @param {*} attrs 属性名
 * @param {*} value 属性值
 */
mv.SetAttrs =(dom,attrs,value)=>{
    dom.setAttribute(attrs,value)
}

/**
 * 获取属性值
 * @param {HTMLElement} dom 
 * @param {*} attrs attrs 属性名
 * @returns 
 */
mv.GetAttrs =(dom,attrs)=>{
    return dom.getAttribute(attrs)
}

/**
 * 循环判断包括 parentElement 在内是否包含某个属性，并且对应某个值
 * @param {*} dom 
 * @param {*} attrs 
 * @param {*} attvalue 
 * @returns 
 */
mv.DeepHasAttrs =(dom,attrs,attvalue,endclass=null)=>{
    if (dom === null|| dom === undefined) return false;
    if (dom.getAttribute(attrs) === attvalue) return true;
    if (!mv.Empty(endclass)){
        if (dom.hasAttribute(endclass)){
            console.log("检测到重点")
            return false;
        }
    }
    return mv.DeepHasAttrs(dom.parentElement,attrs,attvalue);
}


/**
 * 删除属性值
 * @param {HTMLElement} dom 
 * @param {*} attrs attrs 属性名
 * @returns 
 */
mv.DelAttrs =(dom,attrs)=>{
    return dom.removeAttribute(attrs)
}

/**
 * 获取 dom 下 tagName 标签中，所有 attrs属性值为 value 的元素集合。
 * @param HTMLElement dom 
 * @param {*} attrs 属性名
 * @param {*} value 属性值
 * @param {*} tagName  Tag 值
 * @returns 
 */
mv.GetDomByAtrrs = (dom,attrs,value,tagName)=>{
    var selectDom = [];
    var node = dom.getElementsByTagName(tagName);
    for (var i = 0; i < node.length; i++) {
        if (value === node[i].getAttribute(attrs)) {
            selectDom.push(node[i]);
        }
    }
    return selectDom;
}

/**
 * 设置 style 中的 css 变量attrName 的值
 * @param {object} elementStyle DOM 元素的 style 对象
 * @param {string} attrName 属性名称
 * @param {string} value    属性值
 */
mv.SetStyleValue = (elementStyle,attrName,value)=>{
    if (elementStyle === null || elementStyle === undefined) {
        console.warn(" function mv.SetStyleValue(): param elementStyle cannot be null or undefined." )
        return false;
    }
    
    if (mv.Empty(attrName)){
        console.warn(" function mv.SetStyleValue(): param attrName cannot be empty." )
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
mv.CheckStyleValue =(elementStyle,attrName,value)=>{
    if (elementStyle === null || elementStyle === undefined) {
        console.warn(" function mv.CheckStyleValu(): param elementStyle cannot be null or undefined." )
        return false;
    }
    
    if (mv.Empty(attrName)){
        console.warn(" function mv.CheckStyleValu(): param attrName cannot be empty." )
        return false;
    }

    return elementStyle.getPropertyValue(attrName).indexOf(value) > -1
}

/**
 * 获取 style 中的 css 变量
 * @param {object} elementStyle DOM 元素的 style 对象
 * @param {string} attrName 属性名称
 */
mv.GetStyleValue = (elementStyle,attrName)=>{
    if (elementStyle === null || elementStyle === undefined) {
        console.warn(" function mv.GetStyleValue(): param elementStyle cannot be null or undefined." )
        return null;
    }

    return elementStyle.getPropertyValue(attrName)
}

/**
 * 获取满足 selector1 且不满足 selector2 的所有元素集合
 * @param {*} selector1 主css选择器，用于获取
 * @param {*} selector2 次css选择器，用于排除
 * @param {HTMLElement} dom 
 * @returns 
 */
mv.GetDomBySelectors = (selector1,selector2,dom)=>{
    
    if (mv.Empty(selector1)){
        console.warn(" function mv.GetDomBySelectors(): param selector1 cannot be empty." )
        return null;
    }

    if (dom === null|| dom === undefined) return null;

    let elementAll=dom.querySelectorAll(selector1)
    
    if (mv.Empty(selector2)) return elementAll;

    let elementNot=dom.querySelectorAll(selector2)
    let rst = mv.Minus(Array.from(elementAll),Array.from(elementNot));
    
    return rst;
}

/**
 * 获取目标所在的块
 * @param {*} dom 
 * @returns 
 */
mv.GetSiyuanBlock = (dom)=>{
    // REF Dark+
    let element = dom;
    let config = mv.config;
    while (element != null
        && !(
            config.theme.regs.id.test(element.dataset.nodeId)
            || config.theme.regs.id.test(element.dataset.id)
            || element.dataset.href
        )) element = element.parentElement;

    if (element != null) {
        if (config.theme.regs.id.test(element.dataset.nodeId)) return element;
        if (config.theme.regs.id.test(element.dataset.id)) return element;
        if (config.theme.regs.url.test(element.dataset.href)) return element;
    }
    else return null;
}

/**
 * 获得目标的块 ID
 * @param {*} dom 
 * @returns 
 */
mv.GetSiyuanBlockId = (dom) =>{
    let element = dom;
    let config = mv.config;
    while (element != null
        && !(
            config.theme.regs.id.test(element.dataset.nodeId)
            || config.theme.regs.id.test(element.dataset.id)
            || element.dataset.href
        )) element = element.parentElement;

    if (element != null) {
        if (config.theme.regs.id.test(element.dataset.nodeId)) return element.dataset.nodeId;
        if (config.theme.regs.id.test(element.dataset.id)) return element.dataset.id;
        if (config.theme.regs.url.test(element.dataset.href)) return url2id(element.dataset.href);
    }
    else return null;
}

/**
 * 获取 lute 属性
 */
mv.GetLute= ()=>{
    
    return window.Lute.New();
    // return siyuan.layout.centerLayout.children[0]
    //                                     .children[0].model.editor
    //                                     .protyle.lute;
}

/**
 * 获取 protyle 属性
 */
 mv.GetProtyle = ()=>{
    return siyuan.layout.centerLayout.children[0]
                                        .children[0].model.editor
                                        .protyle;
}

/**
 * 根据 id 获取 markdown 内容,返回结果 .content 属性即可获取对应的内容
 * @param {*} id 
 * @returns id
 */
mv.GetMdByBlock_API = async(id)=> 
{
    if (mv.Empty(id)) return null;
    let rt = await exportMdContent(id);
    return rt.content;
}

/**
 * 用 md 更新 id 对应块的内容
 * @param {*} id 
 * @param {*} md 
 * @returns 
 */
mv.UpdateBlockByMd_API = async(id,md)=>{
    if (mv.Empty(id)) return null;
    let rt =await updateBlock(
        id,
        'markdown',
        md
    );

    return rt[0].doOperations[0].id;
}

/**
 * 用 md 在 pid 对应块中插入孩子节点
 * @param {*} pid 
 * @param {*} md 
 * @returns 
 */
mv.AppendBlockByMd_API = async(pid,md)=>{
    if (mv.Empty(pid)) return null;
    let rt =await appendBlock(
        pid,
        'markdown',
        md
    );
    return rt[0].doOperations[0].id;
}



/**
 * 用 md 在 id 后对应块中插入新块
 * @param {*} id 
 * @param {*} md 
 * @returns 
 */
 mv.InsertBlockByMd_API = async(id,md)=>{
    if (mv.Empty(id)) return null;
    let rt =await insertBlock(
        id,
        'markdown',
        md
    );
    return rt[0].doOperations[0].id;
}

mv.DeleteBlockById_API = async(id)=>{
    if (mv.Empty(id)) return null;
    return await deleteBlock(id);
}

/**
 * 设置属性
 * @param {*} id 块id
 * @param {*} customf 属性名，必须是 custom-xxx
 * @param {*} value 属性值
 * @returns 
 */
mv.SetAttrs_API = async(id,customf,value)=>{
    if (mv.Empty(id) || mv.Empty(customf)) return null;
    let data={}
    data[customf] = value;
    let rt = await setBlockAttrs(
        id,
        data
    );
    return id;
}

/**
 * 获取id对应内容快的属性,直接 .custom-xxx 就能返回对应的值,如果
 * @param {*} id 
 * @returns 
 */
mv.GetAttrs_API = async(id)=>{
    if (mv.Empty(id)) return null;
    let rt = await getBlockAttrs(id);
    return rt;
}












