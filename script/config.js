export{
    getItem,
    setItem,
    removeItem
}

import { 写入文件Savor } from "./api.js";

//#region  *********************** 配置文件读写相关 ***********************

function getItem(key) {
  return window.theme.config[key] === undefined ? null : window.theme.config[key];
}
  
  function setItem(key, value) {
    window.theme.config[key] = value;
    写入文件Savor("/data/snippets/MiniVlook.config.json", JSON.stringify(window.theme.config, undefined, 4));
  }
  
  function removeItem(key) {
    delete window.theme.config[key];
    写入文件Savor( "/data/snippets/MiniVlook.config.json", JSON.stringify(window.theme.config, undefined, 4));
  }
  
  //#endregion *********************** 配置文件读写相关