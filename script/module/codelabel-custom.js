
import { config } from './b320config.js';
import { isKey } from '../utils/hotkey.js';
import {CodeLabelParse} from '../utils/codelabel-parse.js'
import {
    toolbarItemInit,
    toolbarItemChangeStatu,
} from './../utils/ui.js';

function render(){
    for(let value of config.theme.codelabel.ptype){
        new CodeLabelParse(value,document).render();
    }
}

function CodelabelEnable(){

    config.theme.codelabel.render.enable=!config.theme.codelabel.render.enable

    // console.log("enable:"+config.theme.codelabel.render.enable);

    if (config.theme.codelabel.render.toolbar){
        // 更改菜单栏按钮状态
        toolbarItemChangeStatu(
            config.theme.codelabel.render.toolbar.id,
            config.theme.codelabel.render.enable,
            'SVG',
            undefined,
            1,
        );
    }
 }

// fn__flex layout-tab-bar

// 观察器的配置（需要观察什么变动）
const tab_config = { attributes: true, childList: true, subtree: true };
// 当观察到变动时执行的回调函数
const tab_callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
            setTimeout(render, 500);
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
            setTimeout(render, 500);
            
        }
    }
};

(() => {
    try {

        let body = document.body;
        
        window.onload = setTimeout(render, 0);

        if (config.theme.codelabel.render.toolbar.enable) {
            let Fn_guidesEnable = toolbarItemInit(
                config.theme.codelabel.render.toolbar,
                CodelabelEnable,
            );
        }

        body.addEventListener('keyup', (e) => {

            // 通过 Ctrl+Alt+0切换开关
            if (isKey(e, config.theme.hotkeys.codelabel.render)) {
                config.theme.codelabel.render.enable = !config.theme.codelabel.render.enable;
                // console.warn("bug320_3:", config.theme.codelabel.render.enable)
            }
            
            // console.log("ll:"+config.theme.codelabel.enable);
            if (config.theme.codelabel.render.enable !== false) {
                setTimeout(render, 0);
            }
            
        })

        // 选择需要观察变动的节点
        // const targetNode = document.getElementById('some-id');
        const targetNode = document.getElementsByClassName('layout-tab-bar')[4];
        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(tab_callback);    
        // 以上述配置开始观察目标节点
        observer.observe(targetNode, tab_config);


    } catch (err) {
        console.error(err);
    }
})();

