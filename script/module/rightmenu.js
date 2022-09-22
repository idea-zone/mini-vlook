

import { config } from './b320config.js';
import { isKey } from './../utils/hotkey.js';

document.addEventListener('mousemove', e => {
    // console.clear()
    // console.log( document.elementFromPoint(e.clientX, e.clientY))
}, {passive: true})

import {
    getBlockMark, // 获得块标记 ID
    getBlockSelected, // 获得块选中 ID
} from './../utils/dom.js';
import {
    toolbarItemInit,
    toolbarItemChangeStatu,
    CommonMenuObserver, // 右键菜单管理
} from './../utils/ui.js';

import {
    
    codelabelMenuInit,   // 自定义右键菜单初始化
}from './../utils/ui-ex.js';

var codelabel_menu_enable = true; //  块菜单是否激活
var codelabel_menu_observer = null; // 块菜单
var codelabel_mark = null;      // 是否是代码块


/**
 * 块菜单更改回调函数
 * REF [MutationObserver.MutationObserver() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/MutationObserver)
 * REF [MutationRecord - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord)
 */
 function blockMenuCallback(mutationList, observer) {
    // 已经添加菜单项
    // console.log(mutationList);

    if (codelabel_menu_observer.menuNode.querySelector(`#${config.theme.menu.codelabel.items[0].id}`)) {
        observer.takeRecords();
        return;
    };

    // 没有添加菜单项
    // console.log(mutationList);
    for (let i = mutationList.length - 1; i >= 0; --i) {
        let mutation = mutationList[i];
        // console.log(mutation);

        // 菜单已经加载完成
        if (mutation.addedNodes.length === 1
            // && mutation.addedNodes[0].classList.contains('b3-menu__item--readonly')
            && mutation.addedNodes[0].classList.contains('b3-menu__item')
            // && mutation.previousSibling
            // && mutation.previousSibling.classList.contains('b3-menu__separator')
        ) {
            // 块菜单添加
            let block = codelabel_mark || null;
            // console.log("rest:"+block);
            if (block) {
                let items = codelabelMenuInit(
                    config.theme.menu.codelabel.items,
                    block.element,
                    block.type,
                );
                if (items) items.forEach(item => codelabel_menu_observer.menuNode.insertBefore(item, mutation.previousSibling));
            }
            break;
        }
    }
}

/* 开启/关闭块菜单 */
function blockMenuEnable() {
    if (!codelabel_menu_enable) {
        // 开启块菜单
        codelabel_menu_observer.observe();
        codelabel_menu_enable = true;
    }
    else {
        // 关闭块菜单
        codelabel_menu_observer.disconnect();
        codelabel_menu_observer.takeRecords();
        codelabel_menu_enable = false;
    }
    // 更改菜单栏按钮状态
    toolbarItemChangeStatu(
        config.theme.menu.codelabel.toolbar.id,
        codelabel_menu_enable,
        'SVG',
        undefined,
        1,
    );
}

setTimeout(() => {
    try {
        if (config.theme.menu.enable) {
            if (config.theme.menu.codelabel.enable) {
                // setTimeout(loadFontsItem, 0);
                codelabel_menu_observer = new CommonMenuObserver(blockMenuCallback);
                let Fn_blockMenuEnable = toolbarItemInit(
                    config.theme.menu.codelabel.toolbar,
                    blockMenuEnable,
                );
                // 使用快捷键开启/关闭块菜单
                window.addEventListener('keyup', (e) => {
                    // console.log(e);
                    if (isKey(e, config.theme.hotkeys.menu.codelabel)) {
                        Fn_blockMenuEnable();
                    }
                }, true);
+
                // 获取块标记 ID
                window.addEventListener('mouseup', (e) => {
                    // console.log(e);
                    // block_mark = getBlockMark(e.target);
                    codelabel_mark = getCodeLabelMark(e.target);
                }, true);

                // 默认开启
                setTimeout(() => {
                    Fn_blockMenuEnable();
               }, 1000);
               
                setTimeout(() => {
                    Fn_blockMenuEnable();
               }, 1000);
            }
        }

    } catch (err) {
        console.error(err);
    }
}, 0);

function getCodeLabelMark(target){
    let node = target;

    if (node.localName === 'span' && node.getAttribute('data-type') === 'code') {
        return {
            element: target,
            type:'code',
        }
    }

    return null;
}
