// protyle-scroll

import { config } from './b320config.js';

function createNode(){

    let div=document.createElement('div');
    div.classList.add("dock");
    let div2 = document.createElement('div');
    let divCon = document.createElement('div');
    divCon.classList.add("fn__flex-1");
    let div4 = document.createElement('div');
    div.appendChild(div2);
    div.appendChild(divCon);
    div.appendChild(div4);
    let bottomDock=document.getElementById('dockBottom');
    bottomDock.parentNode.insertBefore(div,bottomDock)
    // var domNode=document.getElementsByClassName('protyle-scroll');
    console.log('domNode')

    let span1= document.createElement("span");
    let txt1 = document.createTextNode("200");
    span1.appendChild(txt1)
    div.appendChild(span1);
    
    return span1;
}

function wordCount(data){

    var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
    // var pattern = /\S+/g;
	var m =data.match(pattern);
	var count = 0;
	if(m==null){return count;}
	for(var i=0;i<m.length;i++){
		if(m[i].charCodeAt(0)>=0x4E00){
			count += charCount(m[i]);
		}else{
            if (m[i].charCodeAt(0) !== 8203)
                count += 1;
		}
	}
    return count;
}


function charCount(data){
	// var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
	var pattern = /\S+/g;
	var m =data.match(pattern);
	var count = 0;
	if(m==null){return count;}
	for(var i=0;i<m.length;i++){
        if (m[i].charCodeAt(0) !== 8203)
            count += m[i].length;
	}
    return count;
}

// function charCount(data){
    
//     var pattern = /[^\s\n\t]/g;
//     var m = data.match(pattern)
//     let len=0;
//     for (let i in m) {
//         len++
//     }
//     // console.log(len)
//     return len;
// }

//替换文本前与后的空格
String.prototype.trim=function()
{
    return this.replace(/(^\s*)|(\s*$)/g,"");
}

function selectText()
{
      try{

            var selecter=window.getSelection().toString();
            if(selecter!=null&&selecter.trim()!=""){
                  return selecter;
            }
    
            return "";

      }catch(err){
            
            var selecter=document.selection.createRange();
            var s=selecter.text;
            if(s!=null&&s.trim()!=""){
                //   alert(s)
                return s;
            }

            return "";
      }
      return "";
}


const span = createNode();

function render(){
    
    // document.body.addEventListener("mousedown", count);
    // document.body.addEventListener("mouseup", count);
    // document.body.addEventListener("selectionchange", count);

    span.innerText="词数:";

    let count = ()=>{

        if (config.theme.wordcount.enable) {
            // fn__flex-1 protyle fn__none
            // protyle-wysiwyg
            // console.log(domNode.innerText)  

            let domNode = document.querySelector('.protyle:not(.fn__none) .protyle-wysiwyg')     
            let allTxt =domNode.innerText.trim();
            let selectTxt  = selectText();

            // 统计字数
            let selecterCharCount = charCount(selectTxt);
            let allCharCount = charCount(allTxt);
            let msgChar = "";
            if (selecterCharCount){
                msgChar = selecterCharCount+" / ";
            }
            let chars = `字符数: ${msgChar}${allCharCount}`

            // 统计词数
            let selectWordCount= wordCount(selectTxt); 
            let allWordCount= wordCount(allTxt); 
            let msgWord="";
            if (selectWordCount !== 0){
                msgWord = selectWordCount+" / ";
            } 
            let words = `词数: ${msgWord}${allWordCount}`

            span.innerText = chars+" "+words;

        }

        
    };
    
    window.onload = setTimeout(count,1000)
    // 选中改变
    document.addEventListener('selectionchange', count);
    // 按键输入
    document.body.addEventListener('keyup', count);


}

(() => {
    try {

        if (config.theme.wordcount.enable) {
            setTimeout(render, 0);
        }

    } catch (err) {
        console.error(err);
    }
})();