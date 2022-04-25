
import { config } from './b320config.js';
import { isKey } from '../utils/hotkey.js';
import {CodeLabelParse,config1} from '../utils/codelabel-parse.js'

(() => {
    try {

        let body = document.body;
        

        window.onload = setTimeout(new CodeLabelParse(config1.theme.codelabel.ptype[0]).render, 0);
        body.addEventListener('keyup', (e) => {

            // // 通过 Ctrl+Alt+0切换开关
            // if (isKey(e, config.theme.hotkeys.codelabel.render)) {
            //     config.theme.codelabel.render.enable = !config.theme.codelabel.render.enable;
            //     console.warn("bug320_3:", config.theme.codelabel.render.enable)
            // }

            if (config.theme.codelabel.render.enable) {
                let parser = new CodeLabelParse(config1.theme.codelabel.ptype[0]);
                setTimeout(parser.render, 0);
            }
        })


    } catch (err) {
        console.error(err);
    }
})();