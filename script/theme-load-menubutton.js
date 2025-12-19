export { ClickMonitor };

import { setBlockAttrs } from "./api.js";
import { InlineSpan, SiyuanSpan, VlookSpan } from "./domex.js";
import { mv } from "./mv-util.js";
import { VLookPluginEnter, VlookItemBase, CloaseCommonMenu } from "./theme-vlook-plugin.js";
import {BqColorPluginEnter,ColloutPluginEnter} from "./theme-vlook-bqcolor-plugin.js"
//#region *********************** 辅助函数   ***********************

/**
 * 获得所选择的块对应的块 ID
 * @returns {string} 块 ID
 * @returns {
*     id: string, // 块 ID
*     type: string, // 块类型
*     subtype: string, // 块子类型(若没有则为 null)
* }
* @returns {null} 没有找到块 ID */
function getBlockSelected(e) {
 let node_list = document.querySelectorAll(".protyle-wysiwyg--select");
 if (node_list.length === 1 && node_list[0].dataset.nodeId != null)
   return {
     id: node_list[0].dataset.nodeId,
     type: node_list[0].dataset.type,
     subtype: node_list[0].dataset.subtype,
   };

 return null;
}

//#endregion *********************** 辅助函数

function ClickMonitor() {
  window.addEventListener("mouseup", MenuShow);
  window.addEventListener("click", WzLabelClick);
  window.addEventListener("keyup",WzKeyUp)
}


async function WzKeyUp(e) {
  await BqColorPluginEnter.WzKeyUpCallout(e);
  await BqColorPluginEnter.WzKeyUpBqcolor(e);
  await VLookPluginEnter.OnWzLabelKeyUp(e);
}


async function WzLabelClick(e) {
  // 依次交给各模块处理，命中一个即停止，避免同一次点击被多处重复处理
  await VLookPluginEnter.WzLabelClick(e);
  await BqColorPluginEnter.WzLabelClick(e);
  await ColloutPluginEnter.WzLabelClick(e);
}

function MenuShow(e) {
  // 确保有有效的事件对象
  if (!e || !e.target) {
    return;
  }

  setTimeout(() => {
    let selectinfo = getBlockSelected(e);
    if (selectinfo) {
      let selecttype = selectinfo.type;
      let selectid = selectinfo.id;
      let dom = selectinfo.dom;

      if (selecttype == "NodeList") {
        setTimeout(() => InsertListViewMenuItem(selectid, selecttype), 0);
        return; // 列表视图 菜单
      }
      //data-type="NodeBlockquote"
      if (selecttype == "NodeBlockquote") {
        setTimeout(() => InsertBlockquoteMenuItem(selectid, selecttype), 0);
        return; // 引用块 菜单
      }
    }
    else
    {
      // 使用事件的target属性而不是坐标
      VLookPluginEnter.MenuShow(e);
    }

  }, 0);
}

/**
 * 插入列表视图菜单项
 * @param {*} selectid
 * @param {*} selecttype
 */
function InsertListViewMenuItem(selectid, selecttype) {
  let commonMenu = document.querySelector("#commonMenu .b3-menu__items");
  let updated = commonMenu.querySelector('[data-id="updateAndCreatedAt"]');
  let readonly = document.querySelector('[data-readonly="true"]');
  let selectview = commonMenu.querySelector('[id="viewselect"]');
  if (!readonly && updated) {
    if (!selectview) {
      commonMenu.insertBefore(ViewSelect(selectid, selecttype), updated);
      commonMenu.insertBefore(MenuSeparator(), updated);
      window.theme.elements.add(selectview);
    }
  }
}

/**
 * 插入引用块菜单项
 * @param {*} selectid
 * @param {*} selecttype
 */
function InsertBlockquoteMenuItem(selectid, selecttype) {
  let commonMenu = document.querySelector("#commonMenu .b3-menu__items");
  let updated = commonMenu.querySelector('[data-id="updateAndCreatedAt"]');
  let readonly = document.querySelector('[data-readonly="true"]');
  let selectview = commonMenu.querySelector('[id="blockquote"]');
  if (!readonly && updated) {
    if (!selectview) {
      // TODO： 先注释掉默认的逻辑
      commonMenu.insertBefore(CalloutBlockquote(selectid, selecttype), updated);
      commonMenu.insertBefore(RainbowBlockquote(selectid, selecttype), updated);
      commonMenu.insertBefore(RainbowBlockquote2(selectid, selecttype), updated);
      commonMenu.insertBefore(MenuSeparator(), updated);
      window.theme.elements.add(selectview);
    }
  }
}


/****UI****/
//#region *********************** 彩虹引用 ***********************

function CalloutBlockquote(selectid, selecttype) {
  let button = document.createElement("button");
  button.id = "wzselect";
  button.className = "b3-menu__item";
  button.innerHTML =
    '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">备忘与警示样式[Github Style Alert]</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>';
  button.appendChild(CalloutBlockquoteSubMenu(selectid, selecttype));
  window.theme.elements.add(button);
  return button;
} 

function RainbowBlockquote(selectid, selecttype) {
  let button = document.createElement("button");
    button.id = "wzselect";
    button.className = "b3-menu__item";
    button.innerHTML =
      '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">彩虹引用[常规]</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>';
    let dom=null;
    let item={
      setColor1:setColor1,
      setColor2:setColor2,
      customAttrName:'bqcolor',
    };
    button.appendChild(
      WzColorSubMenu(selectid, selecttype, dom, item, true)
    );
    window.theme.elements.add(button);
    return button;
}

function RainbowBlockquote2(selectid, selecttype) {
  let button = document.createElement("button");
  button.id = "wzselect";
  button.className = "b3-menu__item";
  button.innerHTML =
    '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">彩虹引用[强调]</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>';
  let dom=null;
  let item={
    setColor1:setColor1,
    setColor2:setColor2,
    customAttrName:'bqcolor',
  };
  button.appendChild(
    WzColorSubMenu(selectid, selecttype, dom, item, false)
  );
  window.theme.elements.add(button);
  return button;
}

function WzColorSubMenu(selectid, selecttype, dom, item, isColor1) {
  let button = document.createElement("button");
  button.id = "viewselectSub2";
  button.className = "b3-menu__submenu";
  button.appendChild(
   ColorItems(selectid, selecttype, dom, item, isColor1)
  );
  return button;
}

function CalloutBlockquoteSubMenu(selectid, selecttype) {
  let button = document.createElement("button");
  button.id = "viewselectSub2";
  button.className = "b3-menu__submenu";
  button.appendChild(
   CalloutBlockquoteSubMenuItems(selectid, selecttype)
  );
  return button;
}


function setColor1(){
}

function setColor2(){
}

function ColorItems(
  selectid,
  selecttype,
  dom,
  item,
  isColor1,
  className = "b3-menu__items"
) {
  let node = document.createElement("div");
  node.className = className;

  let func = isColor1 ? item.setColor1 : item.setColor2;
  let appendColor = isColor1 ? "" : "!";

  if (func !== null && func !== undefined && typeof func === "function") {
    // todo: 实现不同的颜色选择
    //node.appendChild(ColorView(selectid, selecttype, dom, "rd","设置为Red"));
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "T1" + appendColor,
        "设置为[T1|ThemePrimary]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "T2" + appendColor,
        "设置为[T2|THemeSecondary]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Gd" + appendColor,
        "设置为[Gd|Gold]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Pk" + appendColor,
        "设置为[Pk|Pink]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Ye" + appendColor,
        "设置为[Ye|Yellow]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Lm" + appendColor,
        "设置为[Lm|Lime]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Aq" + appendColor,
        "设置为[Aq|Aqua]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "La" + appendColor,
        "设置为[La|Lavender]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Bn" + appendColor,
        "设置为[Bn|Brown]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Ro" + appendColor,
        "设置为[Ro|Rose]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Rd" + appendColor,
        "设置为[Rd|Red]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Og" + appendColor,
        "设置为[Og|Orange]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Gn" + appendColor,
        "设置为[Gn|Green]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Cy" + appendColor,
        "设置为[Cy|Cyan]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Bu" + appendColor,
        "设置为[Bu|Blue]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Vn" + appendColor,
        "设置为[Vn|Vine]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Gy" + appendColor,
        "设置为[Gy|Gray]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Pu" + appendColor,
        "设置为[Pu|Purple]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Wn" + appendColor,
        "设置为[Wn|Wine]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Ol" + appendColor,
        "设置为[Ol|Olives]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Mn" + appendColor,
        "设置为[Mn|Mineral]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Se" + appendColor,
        "设置为[Se|Sea]",
        item,
        func,
        isColor1
      )
    );
    node.appendChild(
     ColorView(
        selectid,
        selecttype,
        dom,
        "Bk" + appendColor,
        "设置为[Bk|Black]",
        item,
        func,
        isColor1
      )
    );
  }

  return node;
}

function CalloutBlockquoteSubMenuItems(selectid, selecttype,className = "b3-menu__items") {
  
  let node = document.createElement("div");
  node.className = className;

  // 转换为 NODE
  node.appendChild(
    CalloutBlockView(
       selectid,
       selecttype,
       "信息[NOTE]",
       "bqstyle",
       "NOTE"
     )
   );

   node.appendChild(
    CalloutBlockView(
       selectid,
       selecttype,
       "提示[TIP]",
       "bqstyle",
       "TIP"
     )
   ); 

  node.appendChild(
    CalloutBlockView(
       selectid,
       selecttype,
       "重要[IMPORTANT]",
       "bqstyle",
       "IMPORTANT"
     )
   );
   
   node.appendChild(
    CalloutBlockView(
       selectid,
       selecttype,
       "注意[WARNING]",
       "bqstyle",
       "WARNING"
     )
   );

   node.appendChild(
    CalloutBlockView(
       selectid,
       selecttype,
       "警告[CAUTION]",
       "bqstyle",
       "CAUTION"
     )
   ); 


  return node;
}

function CalloutBlockView(selectid, selecttype, title, attrName, attrValue) {
  let button = document.createElement("button");
  button.className = "b3-menu__item";
  button.setAttribute("data-node-id", selectid);
  button.setAttribute("custom-attr-name", `${attrName}`);
  button.setAttribute("custom-attr-value", `${attrValue}`);
  button.tgSelecttype = selecttype;

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">${title}</span>`;
  //button.onclick = func;
  button.onclick = async (event) => {
    let bqColor = await BqColorPluginEnter.SetBqFirtP(selectid,attrName,attrValue);
  };
  return button;
}

function ColorView(
  selectid,
  selecttype,
  dom,
  color,
  label,
  item,
  func,
  isColor1
) {
  let button = document.createElement("button");
  button.className = "b3-menu__item";
  button.setAttribute("data-node-id", selectid);
  button.setAttribute("custom-attr-name", `${item.customAttrName}`);
  button.setAttribute("custom-attr-value", `${color}`);
  button.tgDom = dom;
  button.tgColor = color;
  button.tgSelecttype = selecttype;
  button.item = item;

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">${label}</span>`;
  //button.onclick = func;
  button.onclick = async (event) => {
    ViewMonitor(event);
    await BqColorPluginEnter.SetBqFirstColor(selectid,color);
  };
  return button;
}

//#endregion *********************** 彩虹引用

//#region *********************** 视图选择 ***********************
function ViewSelect(selectid, selecttype) {
  let button = document.createElement("button");
  button.id = "viewselect";
  button.className = "b3-menu__item";
  button.innerHTML =
    '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">视图选择</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>';
  button.appendChild(SubMenu(selectid, selecttype));

  window.theme.elements.add(button);
  return button;
}


function SubMenu(selectid, selecttype) {
  let button = document.createElement("button");
  button.id = "viewselectSub";
  button.className = "b3-menu__submenu";
  button.appendChild(MenuItems(selectid, selecttype));
  return button;
}

function MenuItems(selectid, selecttype, className = "b3-menu__items") {
  let node = document.createElement("div");
  node.className = className;
  if (selecttype == "NodeList") {
    node.appendChild(GraphView(selectid));
    node.appendChild(TableView(selectid));
    node.appendChild(kanbanView(selectid));
    node.appendChild(kanbanView2(selectid));
    node.appendChild(DefaultView(selectid));
  }
  if (selecttype == "NodeTable") {
    // node.appendChild(FixWidth(selectid))
    // node.appendChild(AutoWidth(selectid))
    // node.appendChild(FullWidth(selectid))
    // node.appendChild(vHeader(selectid))
    // node.appendChild(Removeth(selectid))
    // node.appendChild(Defaultth(selectid))
  }
  return node;
}

function GraphView(selectid) {
  let button = document.createElement("button");
  button.className = "b3-menu__item";
  button.setAttribute("data-node-id", selectid);
  button.setAttribute("custom-attr-name", "f");
  //button.setAttribute("custom-attr-value","dt")
  button.setAttribute("custom-attr-value", "map");

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">转换为导图</span>`;
  button.onclick = ViewMonitor;
  return button;
}
function TableView(selectid) {
  let button = document.createElement("button");
  button.className = "b3-menu__item";
  button.setAttribute("data-node-id", selectid);
  button.setAttribute("custom-attr-name", "f");
  button.setAttribute("custom-attr-value", "bg");

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">转换为表格bg</span>`;
  button.onclick = ViewMonitor;
  return button;
}
function kanbanView(selectid) {
  let button = document.createElement("button");
  button.className = "b3-menu__item";
  button.setAttribute("data-node-id", selectid);
  button.setAttribute("custom-attr-name", "f");
  button.setAttribute("custom-attr-value", "kb");

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconMenu"></use></svg><span class="b3-menu__label">转换为看板kb</span>`;
  button.onclick = ViewMonitor;
  return button;
}
function kanbanView2(selectid) {
  let button = document.createElement("button");
  button.className = "b3-menu__item";
  button.setAttribute("data-node-id", selectid);
  button.setAttribute("custom-attr-name", "f");
  button.setAttribute("custom-attr-value", "kbw");

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconMenu"></use></svg><span class="b3-menu__label">转换为看板kbw</span>`;
  button.onclick = ViewMonitor;
  return button;
}
function DefaultView(selectid) {
  let button = document.createElement("button");
  button.className = "b3-menu__item";
  button.onclick = ViewMonitor;
  button.setAttribute("data-node-id", selectid);
  button.setAttribute("custom-attr-name", "f");
  button.setAttribute("custom-attr-value", "");

  button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">恢复为列表</span>`;
  return button;
}
function MenuSeparator(className = "b3-menu__separator") {
  let node = document.createElement("button");
  node.className = className;
  return node;
}

function ViewMonitor(event,bqstyle=null) {
  let id = event.currentTarget.getAttribute("data-node-id");
  let attrName =
    "custom-" + event.currentTarget.getAttribute("custom-attr-name");
  let attrValue = event.currentTarget.getAttribute("custom-attr-value");
  if (bqstyle !== null) {
    attrValue = bqstyle;
  }
  let blocks = document.querySelectorAll(
    `.protyle-wysiwyg [data-node-id="${id}"]`
  );

  // 去掉 attrValue 前后的空串
  attrValue = attrValue.trim();
  if(attrValue===undefined || attrValue===null && attrValue ===''){
    return;
  }

  if (blocks) {
    blocks.forEach((block) => block.setAttribute(attrName, attrValue));
  }
  let attrs = {};
  attrs[attrName] = attrValue;
  setBlockAttrs(id, attrs);

  CloaseCommonMenu();
}
//#endregion *********************** 视图选择
