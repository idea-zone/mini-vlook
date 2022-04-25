
import { config } from './b320config.js';
import { isKey } from '../utils/hotkey.js';
import {CodeLabelParse} from '../utils/codelabel-parse.js'

function render(){
    for(let value of config.theme.codelabel.ptype){
        new CodeLabelParse(value).render();
    }
}

(() => {
    try {

        let body = document.body;
        
        window.onload = setTimeout(render, 0);
        body.addEventListener('keyup', (e) => {

            // // 通过 Ctrl+Alt+0切换开关
            // if (isKey(e, config.theme.hotkeys.codelabel.render)) {
            //     config.theme.codelabel.render.enable = !config.theme.codelabel.render.enable;
            //     console.warn("bug320_3:", config.theme.codelabel.render.enable)
            // }

            if (config.theme.codelabel.render.enable) {
                setTimeout(render, 0);
            }
        })


    } catch (err) {
        console.error(err);
    }
})();