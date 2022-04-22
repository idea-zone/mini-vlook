
/* 杂项工具 */

export {
    minus, // 计算两个数组的差集
    empty, // 判断字符串是否为空
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