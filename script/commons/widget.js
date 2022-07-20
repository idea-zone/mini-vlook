import { mv } from "./domex.js";

/**

    // 显示单个按钮的消息提示框
    let msgbox=new Messagebox("测试刷新",5);
    let mgdom = msgbox.Create("bqtmsgbox","bqtmsgbox","width: 480px;top: 45%; left: 45%;");
    document.body.appendChild(mgdom);
    msgbox.Start()


    // 带确定取消按钮的提示框
    let msgbox=new MessageboxYesNo("测试刷新",5);
    let mgdom = msgbox.Create("bqtmsgbox","bqtmsgbox","width: 480px;top: 45%; left: 45%;");
    document.body.appendChild(mgdom);
    msgbox.Start(
        ()=>{  // 点确定时候的回调
            console.log("OK")
        },
        ()=>{ // 点取消时候的回调         
            console.log("NO")
    })

    // 待配置项的测试
    let its = [];
    its[0] = new InputData("msg","input","test-id","输入","提示","输入内容");
    let cts = new MessageboxInputs(its);
    let idom=cts.Create(
        ()=>{
            console.log("Ok")
            console.log(cts.Doms.msg.value)
        },
        ()=>{
            console.log("NO")
            console.log(cts.Doms.msg.value)
        },"","width: 480px;top: 45%; left: 45%;",""
    );
    document.body.appendChild(idom);

 */

/**
 * 倒计时辅助类
 */
export class CountDown {
    /**
     * 
     * @param {*} second 倒计时多长时间
     */
    constructor(second) {
        this.IsAction = false;   // 是否停止
        this.IsTimeDown = false;  // 是否超时
        this.countDownDate = new Date(Date.now() + second * 1000).getTime();
        this.loop = null;
        this.Seconds = second;
        this.downcalled = null;
        this.loopcalled = null;
    }

    Loops(obj) {
        if (obj.IsAction === true) {
            clearInterval(obj.loop);
            return;
        }
        let now = new Date().getTime();
        let distance = obj.countDownDate - now;
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        obj.Seconds = seconds;
        obj.loopcalled();
        if (distance < 0) {
            clearInterval(obj.loop);
            obj.downcalled();
        }
    }

    /**
     * 开始循环
     * @param {function} downcalled 取消事件
     * @param {function} loopcalled 循环事件
     */
    Start(downcalled, loopcalled) {
        this.downcalled = downcalled;
        this.loopcalled = loopcalled;
        this.loop = setInterval(this.Loops, 1000, this);
    }

    /**
     * 停止循环
     */
    Stop() {
        this.IsAction = true;
        clearInterval(this.loop);
    }
}

/**
 * 消息提示
 */
export class Messagebox {
    /**
     * 
     * @param {*} msg 消息
     * @param {*} timeout 过期时间
     */
    constructor(msg, timeout) {
        this.msg = msg;
        this.timeout = timeout + 2;     // 在siyuan中会有两秒的延迟
        this.msgbox = null;
        this.countdown = null;
        this.btntxt = "确定"
        this.btnForCount = null;

        this.OKCalled = this.OKCalled.bind(this);
        this.LoopsCalled = this.LoopsCalled.bind(this);
        this.Create = this.Create.bind(this);
        this.Start = this.Start.bind(this);
        this.Stop = this.Stop.bind(this);
    }

    OKCalled() {
        this.msgbox.classList.remove('fn__none');
        this.msgbox.classList.add('fn__none');
        // this.msgbox.parentNode.remove(this.msgbox);
        if (this.msgbox!==null){
            this.msgbox.remove()
        }
    }

    LoopsCalled() {
        this.btnForCount.innerHTML = `${this.btntxt}(${this.countdown.Seconds})`
    }

    Create(cls, id, style) {
        //protyle-util cbeditor fn__none

        this.countdown = new CountDown(this.timeout);

        if (this.msgbox !== null && this.msgbox === undefined) {
            this.msgbox.classList.remove('fn__none');
        }
        else {
            this.msgbox = mv.CreateDiv(id, `protyle-util ${cls}`, null);
            if (style !== null && style !== undefined) {
                this.msgbox.style = style;
            }

            let ctnDiv = mv.CreateDiv(null, 'b3-form__space--small')
            this.msgbox.appendChild(ctnDiv);

            let lbl = mv.CreateByTagName(null, "fn__flex", null, "label");
            ctnDiv.appendChild(lbl);

            let txt = mv.CreateSpan(null, "ft__on-surface fn__flex-center", this.msg);
            ctnDiv.appendChild(txt);
            ctnDiv.appendChild(mv.CreateDiv(null, "fn__hr", null));

            let dfex = mv.CreateDiv("", "fn__flex", "");
            ctnDiv.appendChild(dfex);

            let btnok = mv.CreateByTagName(null, "b3-button", this.btntxt, "button");
            dfex.appendChild(btnok);

            btnok["onclick"] = this.OKCalled;

            this.btnForCount = btnok;
        }

        return this.msgbox;
    }

    Start() {
        this.countdown.Start(this.OKCalled, this.LoopsCalled);
    }

    Stop() {
        this.countdown.Stop()
    }

}

/**
 * 带确定/结束的消息提示
 */
export class MessageboxYesNo {
    constructor(msg, timeout) {
        this.msg = msg;
        this.timeout = timeout + 2;     // 在siyuan中会有两秒的延迟
        this.msgbox = null;
        this.countdown = null;
        this.btntxt = "取消"
        this.btntxtyes = "确定"
        this.btnForCount = null;
        this.IsLoop = true;
        this.IsOK = 0;

        this.yescalled = null;
        this.nocalled = null;

        this.NoCalled = this.NoCalled.bind(this);
        this.YesCalled = this.YesCalled.bind(this);
        this.LoopsCalled = this.LoopsCalled.bind(this);
        this.Create = this.Create.bind(this);
        this.Start = this.Start.bind(this);
        this.Stop = this.Stop.bind(this);
        this.Wait = this.Wait.bind(this);
    }

    Wait(func) {
        setTimeout(() => {
        }, 1000);
        let i = 0;
        while (this.countdown.Seconds > 1 && i++ < 100) {
            console.log(1)

        }
        func();
    }

    YesCalled() {
        this.IsLoop = false;
        this.IsOK = 1;
        this.msgbox.classList.remove('fn__none');
        this.msgbox.classList.add('fn__none');
        if (this.yescalled !== null) this.yescalled();
        if (this.msgbox!==null){
            this.msgbox.remove()
        }
    }
    NoCalled() {
        this.IsLoop = false;
        this.IsOK = 0;
        this.msgbox.classList.remove('fn__none');
        this.msgbox.classList.add('fn__none');
        if (this.nocalled !== null) this.nocalled();
        if (this.msgbox!==null){
            this.msgbox.remove()
        }
    }

    LoopsCalled() {
        this.btnForCount.innerHTML = `${this.btntxt}(${this.countdown.Seconds})`
    }

    Create(cls, id, style) {
        this.countdown = new CountDown(this.timeout);

        if (this.msgbox !== null && this.msgbox === undefined) {
            this.msgbox.classList.remove('fn__none');
        }
        else {
            this.msgbox = mv.CreateDiv(id, `protyle-util ${cls}`, null);
            if (style !== null && style !== undefined) {
                this.msgbox.style = style;
            }

            let ctnDiv = mv.CreateDiv(null, 'b3-form__space--small')
            this.msgbox.appendChild(ctnDiv);

            let lbl = mv.CreateByTagName(null, "fn__flex", null, "label");
            ctnDiv.appendChild(lbl);

            let txt = mv.CreateSpan(null, "ft__on-surface fn__flex-center", this.msg);
            ctnDiv.appendChild(txt);
            ctnDiv.appendChild(mv.CreateDiv(null, "fn__hr", null));

            let dfex = mv.CreateDiv("", "fn__flex", "");
            ctnDiv.appendChild(dfex);


            let btnyes = mv.CreateByTagName(null, "b3-button", this.btntxtyes, "button");
            dfex.appendChild(btnyes);
            btnyes["onclick"] = this.YesCalled;

            dfex.appendChild(mv.CreateDiv(null, "fn__space", null));

            let btnno = mv.CreateByTagName(null, "b3-button b3-button--cancel", this.btntxt, "button");
            dfex.appendChild(btnno);
            btnno["onclick"] = this.NoCalled;

            this.btnForCount = btnno;
        }

        return this.msgbox;
    }

    Start(yescalled, nocalled) {
        this.yescalled = yescalled;
        this.nocalled = nocalled;
        this.countdown.Start(this.NoCalled, this.LoopsCalled);
    }

    Stop() {
        this.countdown.Stop()
    }


}


/**
 * 辅助类
 */
export class InputData {

    constructor(id,tagName, cls, labelName,defalutValue="", tooltip = "", nulltext="",style="") {
        this.Id = id;             // id 名称
        this.Cls = cls;           // class 名称
        this.TagName = tagName;    // 标签名
        this.Tooltip = tooltip;        // 悬浮提示信息
        this.LabelName = labelName;      // 提示标签名
        this.Nulltext = nulltext;              // 为空时候显示的文本
        this.DefalutValue = defalutValue;                // 初始值
        this.Style = style;
    }

}

/**
 * 弹出带输入的文本框
 */
export class MessageboxInputs {
    /**
     * 
     * @param {Array} inputs InputData 类型的数组 
     */
    constructor(inputs) {
        this.Inputs = inputs;
        this.msgbox = null;

        this.msgbox = null;
        this.btntxt = "取消"
        this.btntxtyes = "确定"
        this.IsOK = 0;

        this.yescalled = null;
        this.nocalled = null;

        // inputdata 包含对应的 input 相关信息
        this.Doms=null;

        this.NoCalled = this.NoCalled.bind(this);
        this.YesCalled = this.YesCalled.bind(this);
        this.Create = this.Create.bind(this);


    }
    
    YesCalled() {
        // this.IsLoop = false;
        this.IsOK = 1;
        this.msgbox.classList.remove('fn__none');
        this.msgbox.classList.add('fn__none');
        if (this.yescalled !== null) this.yescalled();
        if (this.msgbox!==null){
            this.msgbox.remove()
        }
    }
    NoCalled() {
        // this.IsLoop = false;
        this.IsOK = 0;
        this.msgbox.classList.remove('fn__none');
        this.msgbox.classList.add('fn__none');
        if (this.nocalled !== null) this.nocalled();
        if (this.msgbox!==null){
            this.msgbox.remove()
        }
    }

    Create(yescalled, nocalled,cls='',style='',id='') {

        this.yescalled = yescalled;
        this.nocalled = nocalled;

        if (this.msgbox !== null && this.msgbox === undefined) {
            this.msgbox.classList.remove('fn__none');
        }
        else {
            this.msgbox = mv.CreateDiv(id, `protyle-util ${cls}`, null);
            if (style !== null && style !== undefined) {
                this.msgbox.style = style;
            }

            let ctnDiv = mv.CreateDiv(null, 'b3-form__space--small')
            this.msgbox.appendChild(ctnDiv);
            // let lbl = mv.CreateByTagName(null, "fn__flex", null, "label");
            // ctnDiv.appendChild(lbl);

            if (this.Inputs!==null &&this.Inputs!==undefined&&this.Inputs.length>0){
                this.Doms={};
                for(let input of this.Inputs){
                    
                    // todo： id 和值的映射。
                    let lbl = mv.CreateByTagName("","fn__flex","","label");
                    ctnDiv.appendChild(lbl);
                    
                    lbl.appendChild(mv.CreateDiv(null, "fn__space", null));

                    let span = mv.CreateByTagName("","ft__on-surface fn__flex-center",input.LabelName);
                    lbl.appendChild(span);
                    lbl.appendChild(mv.CreateDiv(null, "fn__space", null));
                    let ipt = mv.CreateByTagName("",input.Cls,"",input.TagName);
                    lbl.appendChild(ipt);
                    if (mv.Empty(input.Style) === false){
                        ipt.style = input.Style;
                    }
                    this.Doms[input.Id] = ipt;
                    ipt["inputdata"] = input;
                    
                    // 处理 input 的一些东西
                    if (input.TagName.toLowerCase() === "input"){
                        ipt.placeholder=input.Nulltext;
                        if (mv.Empty(input.DefalutValue) == false){
                            ipt.value = input.DefalutValue;
                        }
                    }

                    ctnDiv.appendChild(mv.CreateDiv(null, "fn__hr", null));
                }
            }
            // let txt = mv.CreateSpan(null, "ft__on-surface fn__flex-center", this.msg);
            // ctnDiv.appendChild(txt);
            // ctnDiv.appendChild(mv.CreateDiv(null, "fn__hr", null));

            
            // todo: 如何处理 悬浮提示文本?
            let dfex = mv.CreateDiv("", "fn__flex", "");
            ctnDiv.appendChild(dfex);
            /**
             * 添加确定和删除按钮
             */
            let btnyes = mv.CreateByTagName(null, "b3-button", this.btntxtyes, "button");
            dfex.appendChild(btnyes);
            btnyes["onclick"] = this.YesCalled;
            dfex.appendChild(mv.CreateDiv(null, "fn__space", null));
            let btnno = mv.CreateByTagName(null, "b3-button b3-button--cancel", this.btntxt, "button");
            dfex.appendChild(btnno);
            btnno["onclick"] = this.NoCalled;

        }

        return this.msgbox;
    }

}