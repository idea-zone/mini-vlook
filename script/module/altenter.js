
import { config } from './b320config.js';
import { isKey } from '../utils/hotkey.js';

import { mv } from '../commons/domex.js';

var lastEditRange;

(() => {
    try {

        let body = document.body;
        
        body.addEventListener('keyup', (e) => {

            let selection = getSelection();
            lastEditRange = selection.getRangeAt(0);


            // 如果启用了
            if(config.theme.altenter.enable){
                if (isKey(e,config.theme.hotkeys.altenter)){
                    
                    var el=mv.GetSiyuanBlock(document.getSelection().focusNode.parentElement);
                    
                    let nel=mv.GetDomBySelectors('div[contenteditable="true"]','',el)[0];
                    let id = mv.GetSiyuanBlockId(el);
                    // console.log("el.parentElement?.parentElement:");
                    // console.log(el.parentElement?.parentElement);
                    // console.log("el:");
                    // console.log(el);
                    // console.log("nel:");
                    // console.log(nel);

                    if (mv.DeepHasAttrs(el,'custom-f',config.theme.altenter.customf,'protyle-wysiwyg')!==true){
                        // console.log("NoNAltEnter");
                        return;
                    }

                    // console.log("AltEnter");
                  
                    if (nel.innerHTML.match('\n\n')){
                        
                        let selection = getSelection();
                        nel.innerHTML = `${nel.innerHTML.replace('\n\n','\n')}<span data-type="em" style="color: gray;--before-ctx:'♯ '"> </span>`
                        el.focus();
                        selection = getSelection();
                        if (lastEditRange) {
                            // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
                            selection.removeAllRanges()
                            selection.addRange(lastEditRange)
                        }
                        // var range = selection.getRangeAt(selection.rangeCount-1);
                        // var textNode = range.endContainer;
                        var range = selection.getRangeAt(0);
                        var textNode = range.startContainer;
                        // 处理光标位置
                        var rangeStartOffset = range.startOffset;

                        // 获取最后一个 span 并focs ，解决关闭定位错乱问题
                        var nodes=textNode.querySelectorAll('span')
                        var first = nodes[0];
                        var as = nodes[nodes.length- 1];
                        as.focus();
                        if (range) {
                            // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
                            selection.removeAllRanges()
                            selection.addRange(range)
                        }
                        range = selection.getRangeAt(0);
                        textNode = range.startContainer;
                        var rangeStartOffset = range.startOffset;
                        range.setStart(as, rangeStartOffset+1);

                        range.collapse(true);
                        selection.removeAllRanges()
                        selection.addRange(range)
                        // as.focus();
                        lastEditRange = selection.getRangeAt(0);
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