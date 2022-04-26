
import { config } from './b320config.js';
import { isKey } from '../utils/hotkey.js';
import {CodeLabelParse} from '../utils/codelabel-parse.js'
import {
    toolbarItemInit,
    toolbarItemChangeStatu,
} from './../utils/ui.js';

function render(){
    for(let value of config.theme.codelabel.ptype){
        new CodeLabelParse(value).render();
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

            if (config.theme.codelabel.render.enable) {
                setTimeout(render, 0);
            }
        })


    } catch (err) {
        console.error(err);
    }
})();