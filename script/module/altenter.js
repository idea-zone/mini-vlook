
import { config } from './b320config.js';
import { isKey } from '../utils/hotkey.js';

import { mv } from '../commons/domex.js';

(() => {
    try {

        let body = document.body;
        
        body.addEventListener('keyup', (e) => {

            var el=mv.GetSiyuanBlock(document.getSelection().focusNode.parentElement);

            // 如果启用了
            if(config.theme.altenter.enable){
                if (isKey(e,config.theme.hotkeys.altenter)){
                    
                    let nel=mv.GetDomBySelectors('div[contenteditable="true"]','',el)[0];
                    let id = mv.GetSiyuanBlockId(el);
                    console.log("el.parentElement?.parentElement:");
                    console.log(el.parentElement?.parentElement);
                    console.log("el:");
                    console.log(el);
                    console.log("nel:");
                    console.log(nel);

                    if (mv.DeepHasAttrs(el,'custom-f',config.theme.altenter.customf)!==true){
                        console.log("NoNAltEnter");
                        return;
                    }

                    console.log("AltEnter");
                  
                    if (nel.innerHTML.match('\n\n')){
                        let selection = getSelection();

                        // {: style="color: red;--before-ctx:'♯ '"}
                        nel.innerHTML = `${nel.innerHTML.replace('\n\n','\n')}<span data-type="em" style="color: gray;--before-ctx:'♯ '"> </span>`
                        
                        var range = selection.getRangeAt(0)
                        var textNode = range.startContainer;
                        // 处理光标位置
                        var rangeStartOffset = range.startOffset;
                        range.setStart(textNode, rangeStartOffset + 2)
                        range.collapse(true)

                        selection.removeAllRanges()
                        selection.addRange(range)
                    }

                    //#region 旧版
                    // // <span data-type="em" style="color: gray">dddsfdsfdddDfsdfdsfdd</span>
                    // let txtMd=mv.GetLute().BlockDOM2StdMd(el.innerHTML);
                    // console.log(txtMd);
                    // if (txtMd.match('\\\*.*\\\*')){
                    //     console.log("stil")
                    //     // let span= document.createElement('span');
                    //     // span.setAttribute('data-type','em');
                    //     // span.setAttribute('style','color: gray');
                    //     // span.innerHTML='d注释';
                    //     // nel.append(span);

                    // }else{
                    //     console.log("cc")
                    //     txtMd = txtMd + '*&nbsp;*';
                    //     txtMd = txtMd + '{: style="color: gray"} ';
                    //     // mv.UpdateBlockByMd_API(id,txtMd);
                    // }
                    //#endregion
                }
            }
            
        })

    } catch (err) {
        console.error(err);
    }
})();

// var userInput = 'a\u200Bb\u200Cc\u200Dd\uFEFFe';
// console.log(userInput.length); // 9
// var result = userInput.replace(/[\u200B-\u200D\uFEFF]/g, '');
// console.log(result.length); // 5

// * U+200B zero width space
// * U+200C zero width non-joiner Unicode code point
// * U+200D zero width joiner Unicode code point
// * U+FEFF zero width no-break space Unicode code point