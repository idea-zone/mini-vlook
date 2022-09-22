
export{
    codelabelMenuInit,   // 自定义右键菜单初始化
}

import { mv } from '../commons/domex.js';
import { InputData, MessageboxInputs } from '../commons/widget.js';
import { render } from '../module/b320config.js';
import  {
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

async function showUtil(element,callback){

    let oldValue = element.getAttribute('custom-codelabel-value');
    let innerHTML = mv.Empty(oldValue) ? element.innerHTML : oldValue;

    console.log(innerHTML);
    
    // 待配置项的测试
    let its = [];
    its[0] = new InputData("msg","input",'',"输入",innerHTML,"提示","输入内容","width: 440px;");
    let cts = new MessageboxInputs(its);
    let idom=cts.Create(
        async ()=>{
            // console.log("Ok")
            // console.log(cts.Doms.msg.value)
            let value =cts.Doms.msg.value;
            // 清空所有属性
            // element.className = "";
            console.log("showUtil")
            console.log(element)

            while (element.attributes.length > 0) {
                element.removeAttributeNode(element.attributes[0]);
            }

            mv.SetAttrs(element,'data-type','code');

            // 获取父节点    
            let parentNode=mv.GetSiyuanBlock(element);
            let id = mv.GetSiyuanBlockId(element);
            
            element.innerHTML = value;
            var tmd = mv.GetLute().BlockDOM2StdMd(parentNode.innerHTML);
            let did = await mv.UpdateBlockByMd_API(id, tmd);
            let dom = document.querySelectorAll(`div[data-node-id="${did}"]`)[0];
            render(dom);

        },
        async ()=>{
            console.log("NO")
            // console.log(cts.Doms.msg.value)
        },"cbeditor","width: 480px;top: 45%; left: 45%;",""
    );
    
    document.body.appendChild(idom);
    // hideMenu();
}

 function hideMenu(){
    let comMenus = document.getElementById("commonMenu");
    if (comMenus===null||comMenus===undefined) return 0;

    var nodes=mv.GetChildNodes(comMenus);
    if (nodes===null||nodes === undefined || nodes.length===0) return 0;

    for(let node of nodes){
        console.log(node);
        node.remove();
    }
    
    comMenus.className.add("fn__none");
    return 1;
}

const CL_TASK_HANDLER = {
    'codelabel-editor': async (element, type, params) => {
        try {
           await showUtil(element);
        }
        catch (e) {
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
