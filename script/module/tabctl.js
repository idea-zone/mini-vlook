import { mv } from '../commons/domex.js';
// <div data-node-id="20220618114451-9a4ip0q" data-node-index="1" data-type="NodeBlockquote" class="bq" updated="20220618144002" data-eof="true"><div data-node-id="20220618114316-zjjv3yc" data-node-index="166" data-type="NodeThematicBreak" class="hr"><div></div></div><div data-content="select * from blocks where id='20220618112709-5z56stu'" data-node-id="20220618112343-7kv9r0j" data-node-index="167" data-type="NodeBlockQueryEmbed" class="render-node" updated="20220618114349" data-render="true"><div class="protyle-icons">
//     <span class="protyle-icon protyle-action__reload protyle-icon--first"><svg class=""><use xlink:href="#iconRefresh"></use></svg></span>
//     <span class="protyle-icon protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span>
//     <span class="protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span>
// </div><div class="protyle-wysiwyg__embed" data-id="20220618112709-5z56stu" style=""><div data-node-id="20220618112709-3qty97o" data-node-index="1" data-type="NodeParagraph" class="p" updated="20220618112731"><div contenteditable="false" spellcheck="false">Model - 测试</div><div class="protyle-attr" contenteditable="false">​</div></div></div><div style="position: absolute;">​</div><div class="protyle-attr" contenteditable="false">​</div></div><div data-content="select * from blocks where id='20220618112817-dglndzc'" data-node-id="20220618112753-ckvqbtq" data-node-index="168" data-type="NodeBlockQueryEmbed" class="render-node" updated="20220618114353" data-render="true"><div class="protyle-icons">
//     <span class="protyle-icon protyle-action__reload protyle-icon--first"><svg class=""><use xlink:href="#iconRefresh"></use></svg></span>
//     <span class="protyle-icon protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span>
//     <span class="protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span>
// </div><div class="protyle-wysiwyg__embed" data-id="20220618112817-dglndzc" style=""><div data-node-id="20220618112817-xpbt62v" data-node-index="1" data-type="NodeParagraph" class="p" updated="20220618141909"><div contenteditable="false" spellcheck="false">Mode-2 测试Ddd</div><div class="protyle-attr" contenteditable="false">​</div></div></div><div style="position: absolute;">​</div><div class="protyle-attr" contenteditable="false">​</div></div><div data-content="select * from blocks where id='20220618112832-y05e8yv'" data-node-id="20220618114316-9njjzo3" data-type="NodeBlockQueryEmbed" class="render-node" updated="20220618141235" data-render="true"><div class="protyle-icons">
//     <span class="protyle-icon protyle-action__reload protyle-icon--first"><svg class=""><use xlink:href="#iconRefresh"></use></svg></span>
//     <span class="protyle-icon protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span>
//     <span class="protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span>
// </div><div class="protyle-wysiwyg__embed" data-id="20220618112832-y05e8yv" style=""><div data-node-id="20220618112832-hsvbeof" data-node-index="1" data-type="NodeParagraph" class="p" updated="20220618112912"><div contenteditable="false" spellcheck="false">Mode3-测试</div><div class="protyle-attr" contenteditable="false">​</div></div></div><div style="position: absolute;">​</div><div class="protyle-attr" contenteditable="false">​</div></div><div data-node-id="20220618144023-p2obo9h" data-type="NodeParagraph" class="p protyle-wysiwyg--select"><div contenteditable="true" spellcheck="false"></div><div class="protyle-attr" contenteditable="false">​</div></div><div class="protyle-attr" contenteditable="false">​</div></div>

function render(){

    let select1 = `.protyle-wysiwyg .bq`  // 要选择的
    let select2 = `.protyle-wysiwyg .bq[custom-f~=bqtab]` // 排除的
    
    let bqs = mv.GetDomBySelectors(select1,select2,document);
    
    if (bqs === null ||  bqs === undefined) {
        console.log("Nothing")
        return;
    }

    //◆neighbourNode.previousSibling ：获取已知节点(neighbourNode)的前一个节点，这个属性和前面的firstChild、lastChild一样都似乎可以递归运用的。
    //◆neighbourNode.nextSibling ：获取已知节点(neighbourNode)的下一个节点，同样支持递归。
    //

    for (let bq of bqs){

        if (bq.classList.contains('bqtab-box')){
            continue;
        }
        bq.classList.add('bqtab-box');

        var elemt = bq.firstChild;
        console.log(elemt.classList)
        if (elemt.classList.contains('hr') === false){
            continue;
        }

        // let isRenderNode = true;
        // var myList = new Array();
        // let i=0;
        // do {
        //     var elemt = elemt.nextSibling;

        //     // 是否是连续
        //     if (elemt === null
        //         ||elemt === undefined
        //         ||!elemt.classList.contains('render-node')){
        //             isRenderNode= false;
        //             break;
        //     }
            
        //     // myList[i] = elemt.getAttribute('data-node-id')
        //     myList[i] = "tabid"+i;
        //     elemt.id = myList[i];
        //     console.log(elemt.id)
        //     elemt.classList.add('bqtab-list')
        //     i++;
        // } while (isRenderNode);
        
        // let div=document.createElement('div');
        // div.classList.add('bqtab-anchor')
        // let j=1;
        // for (let list of myList){
        //     let a = document.createElement('a');
        //     a.href='#'+list;
        //     a.classList.add('bqtab-click');
        //     a.setAttribute('bqtab-index','Tab'+j++)
        //     div.appendChild(a)
        // }
        // bq.parentNode.insertBefore(div, bq.nextElementSibling);
        // console.log(div)
        // console.log("包含")

        
    let box= document.createElement('div');
    box.classList.add('bqtab-box');

    for(let i=1;i<=4;i++){
        let list= document.createElement('div');
        list.classList.add('bqtab-list');
        list.classList.add('bqtab-list-'+i);
        list.id=i;
        let tnode = document.createTextNode(i);
        list.appendChild(tnode);
        box.appendChild(list);
    }
    bq.parentNode.insertBefore(box, bq.nextElementSibling);
   
    let anchor= document.createElement('div');
    box.classList.add('bqtab-anchor');

    for(let i=1;i<=4;i++){
        let list= document.createElement('a');
        list.classList.add('bqtab-click');
        list.href="bqtab-list-"+i;
        let tnode = document.createTextNode("#"+i);
        list.appendChild(tnode);

        list.onclick = (e)=>{
            e.preventDefault();
            let id = e.target.getAttribute("href");
            let targetElement = document.querySelector(id)
            let scrollHeight = targetElement.getBoundingClientRect().top + window.scrollY;

            window.scroll({
                top: scrollHeight,
                behavior: 'smooth'
              });

            }

        anchor.appendChild(list);
    }
    box.parentNode.insertBefore(anchor, box.nextElementSibling);


    }

    // <div class="box">
    //     <div><hr></div>
    //     <div class="list" id="one">1</div>
    //     <div class="list" id="two">2</div>
    //     <div class="list" id="three">3</div>
    //     <div class="list" id="four">4</div>
    // </div>
    // <div class="anchor">
    //     <a class="click" href="#one">1</a>
    //     <a class="click" href="#two">2</a>
    //     <a class="click" href="#three">3</a>
    //     <a class="click" href="#four">4</a>
    // </div>

    
    
    console.log("TDD")
}

render();
