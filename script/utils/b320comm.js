
/* 杂项工具 */

export {
    minus, // 计算两个数组的差集
    empty, // 判断字符串是否为空
    deepCopy, // 深copy
}

function minus(a,b){
    return a.filter(function(v){ return b.indexOf(v) == -1 });
}

function empty(str) {
    if (str == 'undefined' || !str || !/[^\s]/.test(str)) {
        return true;
    } else {
        return false;
    }
}


function deepCopy (obj, cache = []) {

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
        copy[key] = deepCopy(obj[key], cache)
    })
    
    return copy
}
    