/**
 * 选中文字的悬浮栏上增加按钮
 */
  export{ appendToolbarBtn }
  import { VLookPluginEnter } from "./theme-vlook-plugin.js";
  
  //#region *********************** 在工具栏添加相关按钮 ***********************
  let toolbarObserver = null;
  let retryTimer = null;
  let retryCount = 0;
  const maxRetryCount = 10;

  /**
   * 往 toolbar 中添加按钮
   * @param {node} protyle 需要添加功能按钮的 protyle editor
   */
  function appendToolbarBtn(protyle) {
    const toolbars = protyle
      ? Array.from(protyle.querySelectorAll(".protyle-toolbar"))
      : Array.from(document.querySelectorAll(".protyle-toolbar"));

    if (toolbars.length === 0) {
      scheduleToolbarRetry();
      return false;
    }

    toolbars.forEach((toolbar) => safeAppendToolbarBtn(toolbar));
    return true;
  }

  function safeAppendToolbarBtn(toolbar) {
    if (!toolbar || toolbar.querySelector('[data-type="wz-label"]')) return;
    try {
      let fragment = createToolbarBtn();
      if (fragment) toolbar.appendChild(fragment);
    } catch (error) {
      console.warn("[Mini-VLOOK] appendToolbarBtn failed", error);
    }
  }

  function scheduleToolbarRetry() {
    if (retryTimer || retryCount >= maxRetryCount) return;
    retryTimer = window.setTimeout(() => {
      retryTimer = null;
      retryCount += 1;
      appendToolbarBtn();
    }, 300);
  }

  function observeToolbarMount() {
    if (toolbarObserver || !document.body) return;
    toolbarObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          if (node.matches?.(".protyle-toolbar")) safeAppendToolbarBtn(node);
          node.querySelectorAll?.(".protyle-toolbar").forEach((toolbar) => safeAppendToolbarBtn(toolbar));
        }
      }
    });
    toolbarObserver.observe(document.body, { childList: true, subtree: true });
    window.theme?.eventTarget?.addEventListener("destroy", () => toolbarObserver?.disconnect(), { once: true });
  }

  observeToolbarMount();

  /**
   * 创建 toolbar 功能按钮
   * @returns
   */
 function createToolbarBtn() {
    return VLookPluginEnter.ToolBarShow();
  }
  //#endregion *********************** 在工具栏添加相关按钮
