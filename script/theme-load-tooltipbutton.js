/**
 * 选中文字的悬浮栏上增加按钮
 */
  export{ appendToolbarBtn }
  import { VLookPluginEnter } from "./theme-vlook-plugin.js";
  
  //#region *********************** 在工具栏添加相关按钮 ***********************
  /**
   * 往 toolbar 中添加按钮
   * @param {node} protyle 需要添加功能按钮的 protyle editor
   */
  function appendToolbarBtn(protyle) {
    if (protyle) {
      // 处理新增的 protyle
      let icon = protyle.querySelector('[data-type="wz-label"]');
      if (!icon) {
        let toolbar = protyle.querySelector(".protyle-toolbar");
        let fragment =  createToolbarBtn();
        toolbar.appendChild(fragment);
      }
    } else {
      // 初始化时找到所有 protyle-toolbar
      let toolbars = document.querySelectorAll(".protyle-toolbar");
      if (toolbars) {
        toolbars.forEach((item, index, node) => {
          if (!item.querySelector('[data-type="wz-label"]')) {
            let fragment =  createToolbarBtn();
            item.appendChild(fragment);
          }
        });
      }
    }
  }

  
  /**
   * 创建 toolbar 功能按钮
   * @returns
   */
 function createToolbarBtn() {
    return VLookPluginEnter.ToolBarShow();
  }
  //#endregion *********************** 在工具栏添加相关按钮
  