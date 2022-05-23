
export{
    
    codelabelMenuInit,   // 自定义右键菜单初始化
}

import { config, render, updateM } from '../module/b320config.js';
import { getBlockByID, getFocusedDoc,updateBlock } from './api.js';
import { empty } from './b320comm.js';
import { getBlockMark, getFocusedBlock, getFocusedBlockID,getTargetBlock, getTargetBlockID } from './dom.js';
import  {
    toolbarItemInit, // 工具栏项初始化
    toolbarItemChangeStatu, // 工具栏项状态改变
    blockMenuInit, // 右键菜单初始化
    createMenuItemNode,

    createMenuItemIconNode,
    createMenuItemLabelNode,
    createMenuItemAcceleratorNode,
    createMenuItemSubMenuIconNode,
    createMenuItemSubMenuNode,
    createMenuItemSeparatorNode,
} from './ui.js';


/*
<div class="protyle-util cbeditor" style="width: 480px;">
    <div class="b3-form__space--small">  //0
        <label class="fn__flex"> // 0-0
            <span class="ft__on-surface fn__flex-center">内容</span> // 0-0-0
            <input class="b3-text-field fn__block" placeholder="内容"> // 0-0-1
        </label>
        <div class="fn__hr"></div> //0-1
        <div class="fn__flex">     //0-2
            <button class="b3-button">确定</button>   //0-2-0
            <div class="fn__space">                   //0-2-1
            </div><button class="b3-button b3-button--cancel">取消</button>    //0-2-2
        </div>
    </div>
</div>
 */


async function showUtil(element, callback) {

    let bid = getFocusedBlockID();
    // console.log("b1:"+bid);

    let oldValue = element.getAttribute('custom-codelabel-value');
    let innerHTML = empty(oldValue) ? element.innerHTML : oldValue;

    let okFun = async () => {

        // 隐藏对话框
        cbEditor.classList.add('fn__none');
        
        // 获取更改后的值
        let value = cbEditor.children[0]  // 容器
            .children[0]  // label
            .children[1]  // 输入框
            .value;

        // 清空所有属性
        element.className = "";
        while (element.attributes.length > 0) {
            element.removeAttributeNode(element.attributes[0]);
        }

        // 获取父节点    
        let parentNode=getTargetBlock(element);
        let id = getTargetBlockID(element);

        element.innerHTML = value;
        
        var tmd=siyuan.layout.centerLayout.children[0]
            .children[0].model.editor
            .protyle.lute.BlockDOM2Md(parentNode.innerHTML);
        updateM(id,tmd).then(d=>{
            let dom=document.querySelectorAll(`div[data-node-id="${d[0].doOperations[0].id}"]`)[0];
            render(dom)
            // console.log(d)
        })
    
        // let b=siyuan.layout.centerLayout.children[0].children[0].model.editor.protyle.lute.HTML2BlockDOM(e);
        // console.log(b);

    };


    let cbEditors = document.querySelectorAll('.protyle:not(.fn__none) .protyle-util.cbeditor');
    var cbEditor = cbEditor !== null && cbEditor !== undefined && cbEditor.length !== 0?cbEditors[0]:null;
    
    if (cbEditor !== null && cbEditor !== undefined){
        
        cbEditor.children[0]  // 容器
            .children[0]  // label
            .children[1]  // 输入框
            .value = innerHTML;

        cbEditor.classList.remove('fn__none');

        cbEditor.children[0] // 容器
            .children[2] // 按钮层
            .children[0] // 确定按钮
            .onclick = okFun;

        await cbEditor;
    }

    if (cbEditor === null || cbEditor === undefined ) {
        var putil = document.querySelectorAll('.protyle:not(.fn__none) .protyle-util')[0];
        cbEditor = document.createElement('div');

        // style="width: 480px; top: 248.6px; left: 131px;"

        // 插入
        cbEditor.classList.add('protyle-util')
        cbEditor.classList.add('cbeditor')
        cbEditor.style = "width: 480px;"
        putil.parentNode.insertBefore(cbEditor, putil.nextElementSibling);

        // 容器 0
        let subroot = document.createElement('div');
        subroot.classList.add('b3-form__space--small');
        cbEditor.appendChild(subroot);

        /**-------------- 输入框 0-0 ----------------------- */
        //label 
        let lb = document.createElement('label');
        lb.classList.add('fn__flex');
        subroot.appendChild(lb);

        // label-内容--0-0-0
        let sn = document.createElement('span');
        sn.classList.add('ft__on-surface');
        sn.classList.add('fn__flex-center');
        sn.style.style = "width: 72px";
        sn.innerHTML = "内容";
        lb.appendChild(sn);

        // label-空格--0-0-1
        let space = document.createElement('div');
        space.classList.add('fn__space')
        lb.appendChild(space);

        //label-输入--0-0-2
        let it = document.createElement('input');
        it.classList.add('b3-text-field')
        it.classList.add('fn__block')
        it.placeholder = "内容"
        it.value = innerHTML
        lb.appendChild(it);
        /**-------------- 输入框（end） ----------------------- */

        /**-------------- 风格符 0-1 ----------------------- */

        // <div class="fn__hr"></div>
        let hr = document.createElement('div');
        hr.classList.add('fn__hr');
        subroot.appendChild(hr);

        /**-------------- 按钮层 0-2 ----------------------- */
        // <div class="fn__flex"><span class="fn__flex-1"></span><button class="b3-button b3-button--cancel">删除</button></div>
        let buttons = document.createElement('div');
        buttons.classList.add('fn__flex');
        subroot.appendChild(buttons);

        // 确定按钮 0-2-0
        var ok = document.createElement('button');
        ok.classList.add('b3-button')
        ok.innerHTML = "确定";
        ok.onclick = okFun;
        buttons.appendChild(ok);

        // 分割 0-2-1
        let space1 = document.createElement('div');
        space.classList.add('fn__space')
        buttons.appendChild(space);

        // 取消按钮 0-2-2
        var cancel = document.createElement('button');
        cancel.classList.add('b3-button')
        cancel.classList.add('b3-button--cancel');
        cancel.innerHTML = "取消";
        cancel.onclick = () => {
            cbEditor.classList.add('fn__none');
        };
        buttons.appendChild(cancel);

        await cbEditor;
    }

    await null;
}

const CL_TASK_HANDLER = {
    'codelabel-editor': async (element, type, params) => {

        try {

           await showUtil(element);
        }
        catch (e) {
            // console.log(e)
            await null;
        }

    },
}

/**
 * 
 * @param {Array} configs 菜单项配置 
 * @param {String} 传入的 Node 
 * @param {} type 标签渲染类型
 */
 function codelabelMenuInit(configs, element, type) {
    let items = []
    let language = window.theme.languageMode;
    configs.forEach((config) => {
        let item = createCodelabelMenuItemNode(language, config, element, type);
        if (item) {
            if (config.prefixSeparator) items.push(createMenuItemSeparatorNode());
            items.push(item);
            if (config.suffixSeparator) items.push(createMenuItemSeparatorNode());
        }
    });
    return items.length > 0 ? items : null;
}

function isCodelLabelEnabled(config, type, element) {

    // !config.enable // 被禁用, 不启用
    if (!config.enable) return false; // 不启用菜单项
    if (!config.type) return true; // 没有设置类型, 全部启用

    // !config.type[type] // 主类型未定义, 不启用
    // !config.type[type].enable // 主类型被禁用, 不启用
    if (!config.type[type]
        || !config.type[type].enable
    ) return false;

    // if (element.localname)
    // // config.type[type].subtype // 定义了子类型, 需要判断子类型是否启用
    // // !config.type[type].subtype[subtype] // 该子类型未定义或被禁用, 不启用
    // if (config.type[type].subtype
    //     && subtype
    //     && !config.type[type].subtype[subtype]
    // ) return false;

    return true;
}

/**
 * 创建右键菜单项
 */
function createCodelabelMenuItemNode(language, config, element, type, className = 'b3-menu__item') {
    switch (config.mode.toLowerCase()) {
        case 'separator':
            if (!isCodelLabelEnabled(config, type, element)) return null;
            return createMenuItemSeparatorNode();
        case 'button':
            if (!isCodelLabelEnabled(config, type, element)) return null;
            let node = document.createElement('button');
            node.className = className;
            if (config.id) node.id = config.id;
            node.appendChild(createMenuItemIconNode(config.icon));
            node.appendChild(createMenuItemLabelNode(config.label[language] || config.label.other, config.label.style));
            if (config.accelerator) node.appendChild(createMenuItemAcceleratorNode(config.accelerator));
            if (config.itemsIcon) {
                switch (typeof (config.itemsIcon)) {
                    case 'string':
                        node.appendChild(createMenuItemSubMenuIconNode(config.itemsIcon))
                        break;
                    case 'object':
                        node.appendChild(createMenuItemSubMenuIconNode(
                            config.itemsLoad
                                ? config.itemsIcon.unfold
                                : config.itemsIcon.fold
                        ))
                    default:
                        break;
                }
            };
            if (config.itemsLoad && config.items && config.items.length > 0) {
                let subMenuNodes = [];
                let separator = 0; // 启用的子菜单项数量
                config.items.forEach((subConfig) => {
                    let item = createMenuItemNode(language, subConfig, id, type, subtype); // 创建子菜单项
                    if (item) {
                        subMenuNodes.push(item);
                        if (item.className === 'b3-menu__separator') separator++;
                    }
                });
                // 有效节点大于0, 则创建子菜单
                if (subMenuNodes.length - separator > 0) {
                    let subMenuNode = createMenuItemSubMenuNode(); // 子菜单容器
                    subMenuNodes.forEach((item) => subMenuNode.appendChild(item));
                    node.appendChild(subMenuNode);
                }
            }
            if (config.click.enable) {
                if (config.click.callback) node.addEventListener('click', async () => await config.click.callback(id));
                else {
                    let handlers = [];
                    config.click.tasks.forEach((task) => {
                        if (CL_TASK_HANDLER[task.type]) handlers.push(() => CL_TASK_HANDLER[task.type](element, type, task.params));
                    });
                    node.addEventListener('click', (_) => {
                        handlers.forEach((handler) => handler());
                    });
                }
            };
            return node;
        default:
            return null;
    }
}
