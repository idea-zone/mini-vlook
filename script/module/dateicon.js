// import domtoimage from '../static/dom-to-image.min.js';
// import moment from '../static/moment.min.js';

// var domtoimage = require('../static/dom-to-image.min.js')
// var moment = require('../static/moment.min.js')
import { mv } from '../commons/domex.js';

let weeks = {
    '0':'日',
    '1':'一',
    '2':'二',
    '3':'三',
    '4':'四',
    '5':'五',
    '6':'六',
}

let moths = {
    '01':'一',
    '02':'二',
    '03':'三',
    '04':'四',
    '05':'五',
    '06':'六',
    '07':'七',
    '08':'八',
    '09':'九',
    '10':'十',
    '11':'十一',
    '12':'十二',
}

// 创建 div 
let creatDiv = (className, text) => {
    let div1 = document.createElement('div');
    div1.classList.add(className)
    if (text !== null && text !== undefined) {
        let txt1 = document.createTextNode(text)
        div1.appendChild(txt1);
    }
    return div1
};

// 设置 element style ,cfgs 用 {width:"60px", height: "60px"}
let setElmStyle = (div1, cfgs) => {
    for (let key in cfgs) {
        div1.style.setProperty(key, cfgs[key])
    }
}

// 创建具有顶部文字、中间文字和底部文字组合的图标
let createIcon = (toptext, midtext, foottext) => {
    let icon = creatDiv('dataicons')
    let top = creatDiv('top')

    let title = creatDiv('title', toptext)
    let sign = creatDiv('sign', '∷')
    top.appendChild(title);
    top.appendChild(sign);

    let bottom = creatDiv('bottom')
    let data = creatDiv('data', midtext)
    let footer = creatDiv('footer', foottext)
    bottom.appendChild(data);
    bottom.appendChild(footer);

    icon.appendChild(top);
    icon.appendChild(bottom);

    // 设置整体的样式
    setElmStyle(icon, {
        width: "60px",
        height: "60px",
    })

    // 设置顶部的样式
    setElmStyle(top, {
        background: "crimson",
        width: "60px",
        height: "20px",
    })
    setElmStyle(title, {
        color: "white",
        transform: "scale(0.75)",
    })

    // 根据标题是否为空设置 sign 位置
    if (mv.Empty(toptext)) {
        setElmStyle(sign, {
            transform: "translate(43px,-3px)",
            "font-size": "1em",
            display: "block",
            color: "white",
        })
    }
    else {
        setElmStyle(sign, {
            transform: "translate(43px,-23px)",
            "font-size": "1em",
            display: "block",
            color: "white",
        })
    }

    // 设置下方整体的样式
    setElmStyle(bottom, {
        background: "gainsboro",
        width: "60px",
        height: "40px",
        "text-align": "center",
        "font-size": "1.25em",
    })

    // 根据标题是否为空设置 data 位置
    setElmStyle(footer, {
        transform: "scale(0.5) translate(0px,-20px)",
    })
    
    if (mv.Empty(foottext)) {
        setElmStyle(footer, {
            display: "none"
        })
        setElmStyle(data, {
            "text-align": "center",
            "vertical-align": "middle",
            "line-height": "40px"
        })
    }

    return icon
};

// 生成图片
let genImg = (toptext, midtext, foottext, func) => {

    let icon = createIcon(toptext, midtext, foottext);
    // if (isshowHtml){
    //   let pnode = document.getElementById('hh');
    //   pnode.appendChild(icon) 

    //   // 创建一个空白区域，和下一个图片隔开一点距离
    //   let space = creatDiv('space');
    //     setElmStyle(space,{
    //       "margin": "1px",
    //       "display":"inline"
    //     })
    //   pnode.appendChild(space)
    // }
    console.log(icon);

    domtoimage.toSvg(icon, { height: '60px', width: '60px' })
        .then(function (dataUrl) {
            func(dataUrl)
            // console.log()
            // var img = new Image();
            // img.src = dataUrl;
            // document.body.appendChild(img);

            // var img=document.createElement('img');

            // var pimg = document.getElementById('dd');
            // pimg.appendChild(img);
            // img.setAttribute('src', dataUrl);

            // // 创建一个空白区域，和下一个图片隔开一点距离
            // let space = creatDiv('space');
            // setElmStyle(space,{
            //   "margin": "1px",
            //   "display":"inline"
            // })
            // pimg.appendChild(space)
        })

    // html2canvas(icon).then(function(canvas){
    //     // console.log(canvas)
    //      var img=document.createElement('img');
    //      var pimg = document.getElementById('dd');
    //      pimg.appendChild(img);
    //      var screenshot = canvas.toDataURL('image/png');
    //      img.setAttribute('src', screenshot);
    //      img;
    // });

};

function render(){
    let ondataUrl = (url)=>{
        console.log("url")
        console.log(url)
    }

    var date = moment('2022-05-23')
    console.log(date)
    //0
    genImg(
        `${moths[date.format('MM')]}月`,
        `${date.format('DD')}`,
        `星期${weeks[date.format('d')]}`,
        ondataUrl
    )

}

// render();
// (() => {
//     try {
//         setTimeout(render, 0);
//     } catch (err) {
//         console.error(err);
//     }
// })();


