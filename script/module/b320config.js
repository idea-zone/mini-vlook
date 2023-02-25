import { CodeLabelParse } from "../utils/codelabel-parse.js";
import { TASK_HANDLER } from "../utils/ui.js";
import { mv } from "../commons/domex.js";
import {
  InputData,
  Messagebox,
  MessageboxInputs,
  MessageboxYesNo,
} from "../commons/widget.js";
import { getFile, putFile } from "./../utils/api.js";
import { merge } from "./../utils/misc.js";

const THEME_PATHNAME = "/appearance/themes/mini-vlook";

export function render(nodoDom) {
  for (let value of config.theme.codelabel.ptype) {
    new CodeLabelParse(value, nodoDom).render();
  }
}

export const createUL = (e) => {
  let ul = document.createElement("ul");
  e.parentNode.insertBefore(ul, e.nextElementSibling);
  e.appendChild(ul);

  // 创建
  ul.createli = (text, dataValue, indexValue) => {
    let li = document.createElement("li");
    li.setAttribute("custom-li-data", dataValue);
    li.setAttribute("custom-li-index", indexValue);
    li.innerHTML = text;
    ul.appendChild(li);

    return li;
  };

  return ul;
};

export var config = {
  token: "", // API token, 无需填写
  custom: {
    // 自定义配置
    path: "/data/widgets/custom.json", // 自定义配置文件路径
  },
  theme: {
    regs: {
      // 正则表达式
      url: /^siyuan:\/\/blocks\/(\d{14}\-[0-9a-z]{7})\/*(?:(?:\?)(\w+=\w+)(?:(?:\&)(\w+=\w+))+)?$/, // 思源 URL Scheme 正则表达式
      time: /^(\d+)(:[0-5]?[0-9]){0,2}(\.\d*)?$/, // 时间戳正则表达式
      id: /^\d{14}\-[0-9a-z]{7}$/, // 块 ID 正则表达式

      colorvalue: "^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$", // 匹配#开头的颜色
    },

    common: {
      // 通用的配置
      colors: {
        names: [
          // 支持的颜色名称
          "red",
          "orange",
          "yellow",
          "lime",
          "green",
          "aqua",
          "cyan",
          "blue",
          "sea",
          "steel",
          "purple",
          "magenta",
          "pink",
          "gold",
          "brown",
          "gray",
          "black",
          "theme1",
          "theme2",
        ],
        values: {
          red: {
            value: "rgb(204,49,64)", //'#CC3140',
            titlecolor: "rgb(246,238,243)", //'#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },

          orange: {
            value: "rgb(248,112,0)", //'#F87000',
            titlecolor: "rgb(246,238,243)", // '#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },

          yellow: {
            value: "	rgb(253,192,0)", //'#FDC000',
            titlecolor: "rgb(43,28,41)", //'#2b1c29',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },

          lime: {
            value: "rgb(178,209,21)", //'#B2D115',
            titlecolor: "rgb(43,28,41)", //'#2b1c29',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },

          green: {
            value: "rgb(48,168,48)", //'#30A830',
            titlecolor: "rgb(246,238,243)", //'#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },

          aqua: {
            value: "rgb(45,224,200)", //'#2DE0C8',
            titlecolor: "rgb(43,28,41)", //'#2b1c29',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },

          cyan: {
            value: "rgb(23,177,194)", //'#17B1C2',
            titlecolor: "rgb(246,238,243)", //'#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },

          blue: {
            value: "rgb(34,144,240)", //'#2290F0',
            titlecolor: "rgb(246,238,243)", // '#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },

          sea: {
            value: "rgb(45,81,224)", //'#2D51E0',
            titlecolor: "rgb(246,238,243)", // '#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },
          steel: {
            value: "	rgb(112,115,214)", //'#7073D6',
            titlecolor: "rgb(246,238,243)", // '#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },
          purple: {
            value: "rgb(149,78,204)", //'#954ECC',
            titlecolor: "rgb(246,238,243)", // '#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },
          magenta: {
            value: "rgb(230,78,214)", //'#E64ED6',
            titlecolor: "rgb(246,238,243)", //'#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },
          pink: {
            value: "rgb(250,185,209)", //'#FAB9D1',
            titlecolor: "rgb(43,28,41)", //'#2b1c29',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },
          gold: {
            value: "rgb(224,191,157)", //'#E0BF9D',
            titlecolor: "rgb(43,28,41)", //'#2b1c29',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },
          brown: {
            value: "rgb(133,95,58)", //'#855F3A',
            titlecolor: "rgb(43,28,41)", //'#2b1c29',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },
          gray: {
            value: "rgb(148,152,160)", // '#9498A0',
            titlecolor: "rgb(246,238,243)", //'#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },
          black: {
            value: "rgb(22,25,42)", //'#16192a',
            titlecolor: "rgb(246,238,243)", // '#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.9)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },
          theme1: {
            value: "rgb(128,100,169)", //'#8064A9', //
            titlecolor: "rgb(246,238,243)", //'#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },
          theme2: {
            value: "rgb(42,168,153)", //'#2AA899',
            titlecolor: "rgb(246,238,243)", //'#f6eef3',
            msgbgcolor: "rgba(255,255,255,0.6)",
            msgcolor: "rgb(43,28,41)", // 2b1c29,
          },
        },
      },
    },

    codelabel: {
      // 标签增强解析
      enable: true, // 是否启用自定义样式渲染
      render: {
        // 渲染信息
        enable: true, // 是否启用自定义样式渲染
        toolbar: {
          // 菜单栏
          enable: true,
          id: "toolbar-theme-style-codelabel",
          hotkey: () => config.theme.hotkeys.codelabel.render,
          label: {
            zh_CN: "标签解析增强",
            zh_CNT: null,
            fr_FR: null,
            en_US: null,
            other: "Inline Code Parse",
          },
          icon: "#iconSuper",
          index: -3,
        },
      },
      ptype: [
        // 解析类型
        //#region 
        // ptypeItem 对应的值
        // {   // 解析配置项
        //     typeid: "唯一ID",
        //     reg: '正则表达式',  // 针对 innerHTML
        //     tagName: "标签名称，如 code、strong",
        //     customf: '禁止渲染的块属性值,如 wz',   // 自定义属性 f=wz 即可。
        //     className: 'css类属性名称',
        //    // select1: `.protyle-wysiwyg *[data-node-id] ${this.tagName}`  // 要选择的,默认不用设置
        //    // select2: `.protyle-wysiwyg *[data-node-id][custom-f~=${this.customf}] ${this.tagName}` //  要选择的,默认不用设置
        //     maps: { // 解析后-分组的别名，也是 parseInfo 中的字段
        //         /**
        //          * 以下字段名称被占用,不要用于下面列表的值中.
        //          * value,             // code 标签的 InnerHTML
        //          * color1,bgcolor1,   // 主颜色计算结果和适配背景色
        //          * color2,bgcolor2,   // 次颜色计算结果和适配背景色
        //          * $0~$9 也不要用.
        //          */
        //         '$0': 'value', // 占用，code 原始的 innerHTML 内容
        //         '$1': '',
        //         '$2': 'title',
        //         '$3': 'msg',
        //         '$4': '',
        //         '$5': 'color',
        //         '$6': 'endsuffix',
        //         '$7': '',
        //         '$8': '',
        //         '$9': '',
        //     },
        //     emptys: ['title','msg'],    // 不能为null，undefined或者空值的字段，用 '$0'-'$9' 对应的别名
        //     emptysValues:{              // 当值为null，undefined或者空值时，要设置的值，用 'key 用：$0'-'$9' 对应的别名,value 是对应的值。
        //          'title':'ke',
        //     },
        //     onlyValue:{                 // 不为null时，必须在这个范围内取值，可以不设置，
        //          'title':['1','2'],
        //     },
        //     ignoreValue:{               // 不为null时，必须不在这个范围内的取，可以不设置，
        //          'title':['1','2'],
        //     },
        //     style:{ // 样式映射信息
        //         rerender:true,                // 是否计算颜色
        //         color: {
        //             value:'color',            // 主颜色对应的字段，用 $0'-'$9' 对应的别名
        //             suffix:'endsuffix',       // 颜色后缀对应的字段，用 $0'-'$9' 对应的别名
        //         },
        //         default:'theme2',             // 主颜色缺省时，默认的颜色值
        //         defaultSuffix:false,          // 颜色后缀缺省时,默认的后缀内容，表示的值（suffixs中value）
        //         colors:{
        //             suffixs:{                 // 颜色后缀内容，表示的值
        //                 '!':true,
        //             },
        //             names: ()=>config.theme.common.colors.names,     // 主颜色，支持的颜色名称-列表，
        //             values: ()=>config.theme.common.colors.values,   // 主颜色，对应的适配配色-列表
        //         }
        //     },
        //     customAttr: {   // 自定义属性，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
        //         'custom-codelabel-wz-title': "${title}",
        //         'custom-codelabel-wz-msg': "${msg}",
        //     },
        //     inlineStyle: {  // 自定义内联样式，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
        //         "--theme-wz-bgcolor":"${bgcolor1}",
        //         "--theme-wz-title-color":"${color1}",
        //         "--theme-wz-msg-color":"${color2}",
        //         "--theme-wz-msg-bgcolor":"${bgcolor2}",
        //     },
        //     innerHTML:  '<span>${value}</span>',  // 解析后 code 标签的 innerHTML 内容，支持类似js的模板语法，${别名}, 会被实际的值替换
        //     renderEnd: (parse, element,oldHTML) => { //在每个元素渲染解析完成后的回调函数
        //            // parse是解析信息，$0~$9 的别名，如果开启 style.rerender为true，还有 color1,bgcolor1,color2,bgcolor2 (主颜色和适配颜色)
        //            // element 当前元素（解析后的）
        //            // oldHTML （解析前的 innerHTML 内容）
        //     },
        // },
//#endregion
        { // 微章
          typeid: "wz",
          // reg: '(#(.*?)[|](.*?)#){1,1}?([\(](#?[\\d\\w]+)(!)?[\)])?',  // 正则表达式
          reg: "(#(.*?)([|](.*?))?#){1,1}?([(](#?[\\d\\w]+)(!)?[)])?", // 正则表达式
          tagName: "span",
          tagDataType: "code",
          customf: "wz", // 忽略解析的属性值
          className: "custom-codelabel-wz", // 自定义的属性名称
          maps: {
            // 解析后-分组的别名，也是 parseInfo 中的字段
            /**
             * 以下字段名称被占用,不要用于下面列表的值中.
             * value,             // code 标签的 InnerHTML
             * color1,bgcolor1,   // 主颜色计算结果和适配背景色
             * color2,bgcolor2,   // 次颜色计算结果和适配背景色
             * $0~$9 也不要用.
             */
            $0: "value", // 占用，code 原始的 innerHTML 内容
            $1: "",
            $2: "title",
            $3: "msgG", // 是否有消息
            $4: "msg",
            $5: "",
            $6: "color",
            $7: "endsuffix",
            $8: "",
            $9: "",
          },

          emptys: ["title"], // 不能为空的字段
          emptysValues: {
            // 当值为空值的值
            msg: "",
          },
          ignoreValue: {
            // 当取值是对应的值时，不处理
            title: ["[ ]", "[x]"],
          },
          style: {
            // 样式映射信息
            rerender: true, // 是否计算配色
            color: {
              value: "color", // 主颜色字段
              suffix: "endsuffix", // 颜色后缀对应的字段
            },
            default: "theme2", // 缺省颜色值
            defaultSuffix: false, // 缺省时,颜色后缀,对应的值.
            colors: {
              suffixs: {
                "!": true,
              },
              names: () => config.theme.common.colors.names, // 颜色名称-列表
              values: () => config.theme.common.colors.values, // 适配配色-列表
            },
          },
          customAttr: {
            // 自定义属性
            // 'custom-codelabel-value':'${value}',
            "custom-codelabel-wz-title": "${title}",
            "custom-codelabel-wz-msg": "${msg}",
          },
          inlineStyle: {
            "--theme-wz-bgcolor": "${bgcolor1}",
            "--theme-wz-title-color": "${color1}",
            "--theme-wz-msg-color": "${color2}",
            "--theme-wz-msg-bgcolor": "${bgcolor2}",
          },
          innerHTML: "<span>${value}</span>",
          renderEnd: (parse, element, oldHTML) => {
            // 渲染完单个元素的回调.
          },
        },
        { // 刮刮乐
          typeid: "rb",
          reg: '^\\*\\{(.*)\\}\\((.*?)(\\s*\\"(#?[\\d\\w]+)\\")?\\)$', // 正则表达式
          tagName: "span",
          tagDataType: "code",
          customf: "rb", // 忽略解析的属性值
          className: "v-rb-coat", // 自定义的属性名称
          maps: {
            // 解析后-分组的别名，也是 parseInfo 中的字段
            /**
             * 以下字段名称被占用,不要用于下面列表的值中.
             * value,             // code 标签的 InnerHTML
             * color1,bgcolor1,   // 主颜色计算结果和适配背景色
             * color2,bgcolor2,   // 次颜色计算结果和适配背景色
             * $0~$9 也不要用.
             */
            $0: "value", // 占用，code 原始的 innerHTML 内容
            $1: "coat_text",
            $2: "coat_data",
            $3: "",
            $4: "color",
            $5: "",
            $6: "",
            $7: "",
            $8: "",
            $9: "",
          },

          emptys: ["coat_data"], // 不能为空的字段
          emptysValues: {
            // 当值为空值的值
            coat_text: "****",
          },
          style: {
            // 样式映射信息
            rerender: true, // 是否计算配色
            color: {
              value: "color", // 主颜色字段
              suffix: "", // 颜色后缀对应的字段
            },
            default: "gray", // 缺省颜色值
            defaultSuffix: false, // 缺省时,颜色后缀,对应的值.
            colors: {
              suffixs: {
                "!": true,
              },
              names: () => config.theme.common.colors.names, // 颜色名称-列表
              values: () => config.theme.common.colors.values, // 适配配色-列表
            },
          },
          customAttr: {
            // 自定义属性
            // 'custom-codelabel-value':'${value}',
            "custom-codelabel-rb-coat-text": "${coat_text}",
            "custom-codelabel-rb-coat-data": "${coat_data}",
            "custom-codelabel-rb-coat-showe": "false",
          },
          inlineStyle: {
            "--theme-rb-bgcolor": "${bgcolor1}",
            "--theme-rb-title-color": "${color1}",
            "--theme-rb-msg-color": "${color2}",
            "--theme-rb-msg-bgcolor": "${bgcolor2}",
          },
          innerHTML: "<span>${value}</span>",
          renderEnd: (parse, element, oldHTML) => {
            // 渲染完单个元素的回调.
            function bingOnClick(button) {
              let value =
                button.getAttribute("custom-codelabel-rb-coat-showe") ===
                  false ||
                button.getAttribute("custom-codelabel-rb-coat-showe") ===
                  "false"
                  ? "true"
                  : "false";
              button.setAttribute("custom-codelabel-rb-coat-showe", value);
            }
            element.onclick = bingOnClick.bind(element, element);
          },
        },
        { // 注音
          typeid: "pg",
          reg: "^\\{(.*)\\}\\s*\\((.*)\\)$", // 正则表达式
          tagName: "span",
          tagDataType: "code",
          customf: "pg", // 忽略解析的属性值
          className: "vk-pg", // 自定义的属性名称
          maps: {
            // 解析后-分组的别名，也是 parseInfo 中的字段
            /**
             * 以下字段名称被占用,不要用于下面列表的值中.
             * value,             // code 标签的 InnerHTML
             * color1,bgcolor1,   // 主颜色计算结果和适配背景色
             * color2,bgcolor2,   // 次颜色计算结果和适配背景色
             * $0~$9 也不要用.
             */
            $0: "value", // 占用，code 原始的 innerHTML 内容
            $1: "text",
            $2: "pgdata",
            $3: "",
            $4: "",
            $5: "",
            $6: "",
            $7: "",
            $8: "",
            $9: "",
          },

          emptys: ["text", "pgdata"], // 不能为空的字段
          emptysValues: {
            // 当值为空值的值
          },
          style: {
            // 样式映射信息
            rerender: false, // 是否计算配色
            // color: {
            //     value:'color',            // 主颜色字段
            //     suffix:'',                // 颜色后缀对应的字段
            // },
            // default:'gray',               // 缺省颜色值
            // defaultSuffix:false, // 缺省时,颜色后缀,对应的值.
            // colors:{
            //     suffixs:{
            //         '!':true,
            //     },
            //     names: ()=>config.theme.common.colors.names,   // 颜色名称-列表
            //     values: ()=>config.theme.common.colors.values, // 适配配色-列表
            // }
          },
          customAttr: {
            // 自定义属性
            // 'custom-codelabel-value':'${value}',
            "custom-codelabel-pg-text": "${text}",
            "custom-codelabel-pg-data": "${pgdata}",
          },
          inlineStyle: {},
          innerHTML:
            "<ruby><span>{</span>${text}<span>}</span><rp>(</rp><rt>${pgdata}</rt><rp>)</rp></ruby>",
          renderEnd: (parse, element, oldHTML) => {
            // 渲染完单个元素的回调.
          },
        },
        { // 彩虹引用
          typeid: "bq",
          reg: "&gt;[(]((#?[\\d\\w]+)(!)?)[)]", // 针对 innerHTML
          tagName: "span",
          tagDataType: "code",
          customf: "bqcolor", // 自定义属性 f=wz 即可。
          className: "bqcolor",
          //// select1: `.protyle-wysiwyg *[data-node-id] ${this.tagName}`  // 要选择的,默认不用设置
          //// select2: `.protyle-wysiwyg *[data-node-id][custom-f~=${this.customf}] ${this.tagName}` //  要选择的,默认不用设置
          select1:
            '.protyle-wysiwyg .bq[data-node-id] .p span[data-type="code"]:first-of-type',
          select2:
            '.protyle-wysiwyg .bq[data-node-id][custom-f~=bqcolor] .p span[data-type="code"]:first-of-type',
          maps: {
            // 解析后-分组的别名，也是 parseInfo 中的字段
            /**
             * 以下字段名称被占用,不要用于下面列表的值中.
             * value,             // code 标签的 InnerHTML
             * color1,bgcolor1,   // 主颜色计算结果和适配背景色
             * color2,bgcolor2,   // 次颜色计算结果和适配背景色
             * $0~$9 也不要用.
             */
            $0: "value", // 占用，code 原始的 innerHTML 内容
            $1: "colorTag",
            $2: "color",
            $3: "endsuffix",
            $4: "",
            $5: "",
            $6: "",
            $7: "",
            $8: "",
            $9: "",
          },
          emptys: [
            "color",
            // 'title','msg'
          ], // 不能为null，undefined或者空值的字段，用 '$0'-'$9' 对应的别名
          emptysValues: {
            // 当值为null，undefined或者空值时，要设置的值，用 'key 用：$0'-'$9' 对应的别名,value 是对应的值。
            //  'title':'ke',
          },
          onlyValue: {
            color: () => config.theme.common.colors.names,
          },
          style: {
            // 样式映射信息
            rerender: true, // 是否计算颜色
            color: {
              value: "color", // 主颜色对应的字段，用 $0'-'$9' 对应的别名
              suffix: "endsuffix", // 颜色后缀对应的字段，用 $0'-'$9' 对应的别名
            },
            default: "theme2", // 主颜色缺省时，默认的颜色值
            defaultSuffix: false, // 颜色后缀缺省时,默认的后缀内容，表示的值（suffixs中value）
            colors: {
              suffixs: {
                // 颜色后缀内容，表示的值
                "!": true,
              },
              names: () => config.theme.common.colors.names, // 主颜色，支持的颜色名称-列表，
              values: () => config.theme.common.colors.values, // 主颜色，对应的适配配色-列表
            },
          },
          customAttr: {
            // 自定义属性，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
            // 'custom-codelabel-bq-title': "${title}",
            // 'custom-codelabel-bq-msg': "${msg}",
          },
          inlineStyle: {
            // 自定义内联样式，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
            "--theme-bq-bgcolor": "${bgcolor1}",
            "--theme-bq-title-color": "${color1}",
            "--theme-bq-msg-color": "${color2}",
            "--theme-bq-msg-bgcolor": "${bgcolor2}",
          },
          innerHTML: "<span>${value}</span>", // 解析后 code 标签的 innerHTML 内容，支持类似js的模板语法，${别名}, 会被实际的值替换
          renderEnd: (parse, element, oldHTML) => {
            //在每个元素渲染解析完成后的回调函数
            // parse是解析信息，$0~$9 的别名，如果开启 style.rerender为true，还有 color1,bgcolor1,color2,bgcolor2 (主颜色和适配颜色)
            // element 当前元素（解析后的）
            // oldHTML （解析前的 innerHTML 内容）

            // 获取父节点
            let parentNode = mv.GetSiyuanBlock(element);
            let id = mv.GetSiyuanBlockId(element);

            var itms = [];
            // var items = config.theme.common.colors.names;
            for (let ims of config.theme.common.colors.names) {
              itms.push(ims);
              itms.push(`${ims}!`);
            }

            let setHtml = async (slt, slt2) => {
              let endsuffix = "";
              if (slt2 === "2") {
                endsuffix = "!";
              }

              element.innerHTML = `<span>&gt;(${slt})</span>`;

              var bqNode = element.parentNode.parentNode.parentNode;
              mv.SetStyleValue(
                bqNode.style,
                "--theme-bq-bgcolor",
                parse.parseInfo.bgcolor1
              );
              mv.SetStyleValue(
                bqNode.style,
                "--theme-bq-color1",
                parse.parseInfo.color1
              );
              mv.SetStyleValue(
                bqNode.style,
                "--theme-bq-bgcolor2",
                parse.parseInfo.bgcolor2
              );
              mv.SetStyleValue(
                bqNode.style,
                "--theme-bq-color2",
                parse.parseInfo.color2
              );

              if (mv.Empty(endsuffix) === true) {
                bqNode.setAttribute("bqtype", "color1");
              } else {
                bqNode.setAttribute("bqtype", "color");
              }

              element.setAttribute("custom-select-data", slt);
              let pstionX =
                element.getBoundingClientRect().left -
                element.parentNode.getBoundingClientRect().left +
                20;
              let pstionY =
                element.getBoundingClientRect().bottom -
                element.parentNode.getBoundingClientRect().bottom;
              let mUl = createUL(element);
              mUl.setAttribute(
                "style",
                "margin-left:" + pstionX + "px;margin-top:" + pstionY + "px"
              );

              let i = 0;
              for (let item of itms) {
                let itext = item;
                let eli = mUl.createli("", itext, i++);
                eli.onclick = async (e) => {
                  let idx = e.target.getAttribute("custom-li-index");
                  let slt1 = itms[idx];
                  if (slt1.endsWith("!")) {
                    slt2 = "2";
                  } else {
                    slt2 = "1";
                  }
                  setHtml(slt1, slt2);

                  var tmd = mv.GetLute().BlockDOM2StdMd(parentNode.innerHTML);
                  let did = await mv.UpdateBlockByMd_API(id, tmd);
                  let dom = document.querySelectorAll(
                    `div[data-node-id="${did}"]`
                  )[0];
                  render(dom);
                };
              }
            };

            setHtml(
              `${parse.parseInfo.color}${parse.parseInfo.endsuffix}`,
              mv.Empty(parse.parseInfo.endsuffix) ? "1" : "2"
            );
          },
        },
        { // 多级标签
        
          typeid: "mtag",
          reg: "^(.*)/(.*)$", // 针对 innerHTML
          tagName: 'span[data-type="tag"]',
          customf: "mtag", // 自定义属性 f=mtag 即可。
          className: "mult-tag",
          maps: {
            // 解析后-分组的别名，也是 parseInfo 中的字段
            /**
             * 以下字段名称被占用,不要用于下面列表的值中.
             * value,             // code 标签的 InnerHTML
             * color1,bgcolor1,   // 主颜色计算结果和适配背景色
             * color2,bgcolor2,   // 次颜色计算结果和适配背景色
             * $0~$9 也不要用.
             */
            $0: "value", // 占用，code 原始的 innerHTML 内容
            $1: "lv1",
            $2: "lv2",
            $3: "",
            $4: "",
            $5: "",
            $6: "",
            $7: "",
            $8: "",
            $9: "",
          },
          emptys: ["lv1", "lv2"], // 不能为null，undefined或者空值的字段，用 '$0'-'$9' 对应的别名
          emptysValues: {
            // 当值为null，undefined或者空值时，要设置的值，用 'key 用：$0'-'$9' 对应的别名,value 是对应的值。
            //  'title':'ke',
          },
          style: {
            // 样式映射信息
            rerender: false, // 是否计算颜色
            // color: {
            //     value:'color',            // 主颜色对应的字段，用 $0'-'$9' 对应的别名
            //     suffix:'endsuffix',       // 颜色后缀对应的字段，用 $0'-'$9' 对应的别名
            // },
            // default:'theme2',             // 主颜色缺省时，默认的颜色值
            // defaultSuffix:false,          // 颜色后缀缺省时,默认的后缀内容，表示的值（suffixs中value）
            // colors:{
            //     suffixs:{                 // 颜色后缀内容，表示的值
            //         '!':true,
            //     },
            //     names: ()=>config.theme.common.colors.names,     // 主颜色，支持的颜色名称-列表，
            //     values: ()=>config.theme.common.colors.values,   // 主颜色，对应的适配配色-列表
            // }
          },
          customAttr: {
            // 自定义属性，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
            // 'mult-tag-lv1': "${lv1}",
            // 'mult-tag-lv2': "${lv2}",
          },
          inlineStyle: {
            // 自定义内联样式，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
            // "--theme-wz-bgcolor":"${bgcolor1}",
            // "--theme-wz-title-color":"${color1}",
            // "--theme-wz-msg-color":"${color2}",
            // "--theme-wz-msg-bgcolor":"${bgcolor2}",
          },
          // 解析后 code 标签的 innerHTML 内容，支持类似js的模板语法，${别名}, 会被实际的值替换
          innerHTML:
            "<span class='mult-tag-lv1'>${lv1}</span>" +
            "<span class='mult-tag-none'>/</span>" +
            "<span class='mult-tag-lv2'>${lv2}</span>",
          renderEnd: (parse, element, oldHTML) => {
            //在每个元素渲染解析完成后的回调函数
            // parse是解析信息，$0~$9 的别名，如果开启 style.rerender为true，还有 color1,bgcolor1,color2,bgcolor2 (主颜色和适配颜色)
            // element 当前元素（解析后的）
            // oldHTML （解析前的 innerHTML 内容）
            let innerHTML = "";

            if (parse !== undefined && parse !== null)
              parse = parse["parseInfo"];
            console.log("lv1" + parse["lv1"]);
            console.log("lv1" + parse["lv2"]);
            console.log(parse);

            if (
              parse["lv1"] !== undefined &&
              parse["lv1"] !== null &&
              parse["lv1"] !== ""
            ) {
              innerHTML += `<span class="mult-tag-lv1">${parse["lv1"]}<span>`;
            }

            if (
              parse["lv2"] !== undefined &&
              parse["lv2"] !== null &&
              parse["lv2"] !== ""
            ) {
              innerHTML += "<span class='mult-tag-none'>/</span>";
              innerHTML += `<span class="mult-tag-lv2">${parse["lv2"]}<span>`;
            }

            element.innerHTML = innerHTML;
          },
        },
        { // 下拉框
       
          typeid: "cx",
          reg: "\\^\\[(\\d+)\\](&gt;\\(.+\\))", // 针对 innerHTML
          tagName: "span",
          tagDataType: "code",
          customf: "cx", // 自定义属性 f=wz 即可。
          className: "cw-cbox",
          maps: {
            // 解析后-分组的别名，也是 parseInfo 中的字段
            /**
             * 以下字段名称被占用,不要用于下面列表的值中.
             * value,             // code 标签的 InnerHTML
             * color1,bgcolor1,   // 主颜色计算结果和适配背景色
             * color2,bgcolor2,   // 次颜色计算结果和适配背景色
             * $0~$9 也不要用.
             */
            $0: "value", // 占用，code 原始的 innerHTML 内容
            $1: "index",
            $2: "itms",
            $3: "",
            $4: "",
            $5: "",
            $6: "",
            $7: "",
            $8: "",
            $9: "",
          },
          // reg2mapts:{
          //     // key: 上一轮匹配的地方 ; value: 对应的解析规则
          //     '$0':{
          //         reg:'\\\$\\\{(.*?)\\\}',
          //         isMatchAll:true,   // 是否是匹配所有
          //         type:'array',      // 类型
          //     },
          // },
          emptys: ["index", "itms"], // 不能为null，undefined或者空值的字段，用 '$0'-'$9' 对应的别名
          emptysValues: {
            // 当值为null，undefined或者空值时，要设置的值，用 'key 用：$0'-'$9' 对应的别名,value 是对应的值。
          },
          style: {
            // 样式映射信息
            rerender: false, // 是否计算颜色
            // color: {
            //     value:'color',            // 主颜色对应的字段，用 $0'-'$9' 对应的别名
            //     suffix:'endsuffix',       // 颜色后缀对应的字段，用 $0'-'$9' 对应的别名
            // },
            // default:'theme2',             // 主颜色缺省时，默认的颜色值
            // defaultSuffix:false,          // 颜色后缀缺省时,默认的后缀内容，表示的值（suffixs中value）
            // colors:{
            //     suffixs:{                 // 颜色后缀内容，表示的值
            //         '!':true,
            //     },
            //     names: ()=>config.theme.common.colors.names,     // 主颜色，支持的颜色名称-列表，
            //     values: ()=>config.theme.common.colors.values,   // 主颜色，对应的适配配色-列表
            // }
          },
          customAttr: {
            // 自定义属性，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
            "custom-codelabel-cx-index": "${index}",
            "custom-codelabel-cx-itmes": "${itms}",
          },
          inlineStyle: {
            // 自定义内联样式，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
            // "--theme-wz-bgcolor":"${bgcolor1}",
            // "--theme-wz-title-color":"${color1}",
            // "--theme-wz-msg-color":"${color2}",
            // "--theme-wz-msg-bgcolor":"${bgcolor2}",
          },
          innerHTML: "<span>${value}</span>", // 解析后 code 标签的 innerHTML 内容，支持类似js的模板语法，${别名}, 会被实际的值替换
          renderEnd: async (parse, element, oldHTML) => {
            //在每个元素渲染解析完成后的回调函数
            // parse是解析信息，$0~$9 的别名，如果开启 style.rerender为true，还有 color1,bgcolor1,color2,bgcolor2 (主颜色和适配颜色)
            // element 当前元素（解析后的）
            // oldHTML （解析前的 innerHTML 内容）

            let tIndex = parse.parseInfo["index"];
            let tItms = parse.parseInfo["itms"];

            // 获取父节点
            let parentNode = mv.GetSiyuanBlock(element);
            let id = mv.GetSiyuanBlockId(element);

            let setHtml = async (index, tItms) => {
              let itmes = [...tItms.matchAll("\\((.*?)\\)")];

              element.innerHTML = `<span>^[${index}]${tItms}</span>`;

              let slt = itmes[index][1];
              element.setAttribute("custom-select-data", slt);

              element.setAttribute("custom-codelabel-cx-index", index);
              let pstionX =
                element.getBoundingClientRect().left -
                element.parentNode.getBoundingClientRect().left +
                20;
              let pstionY =
                element.getBoundingClientRect().bottom -
                element.parentNode.getBoundingClientRect().bottom;
              let mUl = createUL(element);
              mUl.setAttribute(
                "style",
                "margin-left:" + pstionX + "px;margin-top:" + pstionY + "px"
              );

              let i = 0;
              for (let item of itmes) {
                let itext = item[1];
                let eli = mUl.createli("", itext, i++);
                eli.onclick = async (e) => {
                  // let idx=e.target.getAttribute('custom-li-data');
                  let idx = e.target.getAttribute("custom-li-index");
                  let tms = element.getAttribute("custom-codelabel-cx-itmes");
                  setHtml(idx, tms);

                  var tmd = mv.GetLute().BlockDOM2StdMd(parentNode.innerHTML);
                  let did = await mv.UpdateBlockByMd_API(id, tmd);
                  let dom = document.querySelectorAll(
                    `div[data-node-id="${did}"]`
                  )[0];
                  render(dom);
                };
              }
            };

            setHtml(tIndex, tItms);
          },
        },
        { // 复选框
       
          typeid: "chk",
          // reg: '(#(.*?)[|](.*?)#){1,1}?([\(](#?[\\d\\w]+)(!)?[\)])?',  // 正则表达式
          // reg: '(\\\+(\\\[()\\\])([|](.*?))?){1,1}?([\(](#?[\\d\\w]+)(!)?[\)])?',  // 正则表达式
          reg: "(\\+(\\[(\\s|x)\\])([|](.*?))?\\+){1,1}?([(](#?[\\d\\w]+)(!)?[)])?", // 正则表达式
          tagName: "span",
          tagDataType: "code",
          customf: "chk", // 忽略解析的属性值
          className: "custom-codelabel-chk", // 自定义的属性名称
          maps: {
            // 解析后-分组的别名，也是 parseInfo 中的字段
            /**
             * 以下字段名称被占用,不要用于下面列表的值中.
             * value,             // code 标签的 InnerHTML
             * color1,bgcolor1,   // 主颜色计算结果和适配背景色
             * color2,bgcolor2,   // 次颜色计算结果和适配背景色
             * $0~$9 也不要用.
             */
            $0: "value", // 占用，code 原始的 innerHTML 内容
            $1: "",
            $2: "chkG",
            $3: "chk", // 是否有消息
            $4: "msgG",
            $5: "msg",
            $6: "colorG",
            $7: "color",
            $8: "endsuffix",
            $9: "",
          },
          emptys: ["chkG"], // 不能为空的字段
          emptysValues: {
            // 当值为空值的值
            chk: " ",
            msg: "",
          },
          style: {
            // 样式映射信息
            rerender: true, // 是否计算配色
            color: {
              value: "color", // 主颜色字段
              suffix: "endsuffix", // 颜色后缀对应的字段
            },
            default: "theme2", // 缺省颜色值
            defaultSuffix: false, // 缺省时,颜色后缀,对应的值.
            colors: {
              suffixs: {
                "!": true,
              },
              names: () => config.theme.common.colors.names, // 颜色名称-列表
              values: () => config.theme.common.colors.values, // 适配配色-列表
            },
          },
          customAttr: {
            // 自定义属性
            // 'custom-codelabel-value':'${value}',
            "custom-codelabel-chk-chk": "${chk}",
            "custom-codelabel-chk-msg": "${msg}",
            "custom-codelabel-chk-colorG": "${colorG}",
            "custom-codelabel-chk-endsuffix": "${endsuffix}",
          },
          inlineStyle: {
            "--theme-wz-bgcolor": "${bgcolor1}",
            "--theme-wz-title-color": "${color1}",
            "--theme-wz-msg-color": "${color2}",
            "--theme-wz-msg-bgcolor": "${bgcolor2}",
          },
          innerHTML: '<span class="hide">${value}<span>',
          renderEnd: (parse, element, oldHTML) => {
            // 渲染完单个元素的回调.

            // let parentNode = mv.GetSiyuanBlock(element);
            let id = mv.GetSiyuanBlockId(element);

            let div = mv.GetDomByAtrrs(
              element,
              "class",
              "cw-chk-wrap",
              "span"
            )[0];
            if (div === null || div === undefined) {
              div = mv.CreateSpan(null, "cw-chk-wrap", null);
              let span1 = mv.CreateSpan(null, "cw-chk-gaph-one", null);
              let span2 = mv.CreateSpan(null, "cw-chk-gaph-two", null);
              div.appendChild(span1);
              div.appendChild(span2);
              element.appendChild(div);
            }

            div.classList.remove("cw-chk-tick");
            if (parse.parseInfo.chk === "x") {
              div.classList.add("cw-chk-tick");
            }

            div["onclick"] = async function () {
              let msg = mv.GetAttrs(element, "custom-codelabel-chk-msg");
              if (msg === undefined) msg = "";

              msg = mv.Empty(msg) ? "" : `|${msg}`;
              let colorG = mv.GetAttrs(element, "custom-codelabel-chk-colorG");
              if (colorG === "undefined" || colorG === undefined) {
                colorG = "";
              }

              if (div.classList.contains("cw-chk-tick")) {
                div.classList.remove("cw-chk-tick");
                element.innerHTML = `<span class="hide">+[ ]${msg}+${colorG}</span>`;
                mv.SetAttrs(element, "custom-codelabel-chk-chk", " ");
                mv.SetAttrs(
                  element,
                  "custom-codelabel-value",
                  `+[ ]${msg}+${colorG}`
                );
              } else {
                div.classList.add("cw-chk-tick");
                element.innerHTML = `<span class="hide">+[x]${msg}+${colorG}</span>`;
                mv.SetAttrs(element, "custom-codelabel-chk-chk", "x");
                mv.SetAttrs(
                  element,
                  "custom-codelabel-value",
                  `+[ ]${msg}+${colorG}`
                );
              }

              if (
                colorG !== null &&
                colorG !== undefined &&
                colorG.includes("!")
              ) {
                div.classList.add("cw-chk-endsuffix");
              } else {
                div.classList.remove("cw-chk-endsuffix");
              }

              let md = mv
                .GetLute()
                .BlockDOM2StdMd(element.parentNode.parentNode.innerHTML);
              console.log(md);
              let kid = await mv.UpdateBlockByMd_API(id, md);
              let dom = document.querySelectorAll(
                `div[data-node-id="${kid}"]`
              )[0];
              render(dom);
            };
          },
        },
        { // 微章+复选框
        
          typeid: "chk-wz",
          // reg: '(#(.*?)[|](.*?)#){1,1}?([\(](#?[\\d\\w]+)(!)?[\)])?',  // 正则表达式
          // reg: '(\\\+(\\\[()\\\])([|](.*?))?){1,1}?([\(](#?[\\d\\w]+)(!)?[\)])?',  // 正则表达式
          reg: "(\\#(\\[(\\s|x)\\])([|](.*?))?\\#){1,1}?([(](#?[\\d\\w]+)(!)?[)])?", // 正则表达式
          tagName: "span",
          tagDataType: "code",
          customf: "chk-wz", // 忽略解析的属性值
          className: "custom-codelabel-chk", // 自定义的属性名称
          maps: {
            // 解析后-分组的别名，也是 parseInfo 中的字段
            /**
             * 以下字段名称被占用,不要用于下面列表的值中.
             * value,             // code 标签的 InnerHTML
             * color1,bgcolor1,   // 主颜色计算结果和适配背景色
             * color2,bgcolor2,   // 次颜色计算结果和适配背景色
             * $0~$9 也不要用.
             */
            $0: "value", // 占用，code 原始的 innerHTML 内容
            $1: "",
            $2: "chkG",
            $3: "chk", // 是否有消息
            $4: "msgG",
            $5: "msg",
            $6: "colorG",
            $7: "color",
            $8: "endsuffix",
            $9: "",
          },
          emptys: ["chkG"], // 不能为空的字段
          emptysValues: {
            // 当值为空值的值
            chk: " ",
            msg: "",
          },
          style: {
            // 样式映射信息
            rerender: true, // 是否计算配色
            color: {
              value: "color", // 主颜色字段
              suffix: "endsuffix", // 颜色后缀对应的字段
            },
            default: "theme2", // 缺省颜色值
            defaultSuffix: false, // 缺省时,颜色后缀,对应的值.
            colors: {
              suffixs: {
                "!": true,
              },
              names: () => config.theme.common.colors.names, // 颜色名称-列表
              values: () => config.theme.common.colors.values, // 适配配色-列表
            },
          },
          customAttr: {
            // 自定义属性
            // 'custom-codelabel-value':'${value}',
            "custom-codelabel-chk-chk": "${chk}",
            "custom-codelabel-chk-msg": "${msg}",
            "custom-codelabel-chk-colorG": "${colorG}",
            "custom-codelabel-chk-endsuffix": "${endsuffix}",
          },
          inlineStyle: {
            "--theme-wz-bgcolor": "${bgcolor1}",
            "--theme-wz-title-color": "${color1}",
            "--theme-wz-msg-color": "${color2}",
            "--theme-wz-msg-bgcolor": "${bgcolor2}",
          },
          innerHTML: '<span class="hide">${value}<span>',
          renderEnd: (parse, element, oldHTML) => {
            // 渲染完单个元素的回调.

            // let parentNode = mv.GetSiyuanBlock(element);
            let id = mv.GetSiyuanBlockId(element);

            let div = mv.GetDomByAtrrs(
              element,
              "class",
              "cw-chk-wrap",
              "span"
            )[0];
            if (div === null || div === undefined) {
              div = mv.CreateSpan(null, "cw-chk-wrap", null);
              let span1 = mv.CreateSpan(null, "cw-chk-gaph-one", null);
              let span2 = mv.CreateSpan(null, "cw-chk-gaph-two", null);
              div.appendChild(span1);
              div.appendChild(span2);
              element.appendChild(div);
            }

            div.classList.remove("cw-chk-tick");
            if (parse.parseInfo.chk === "x") {
              div.classList.add("cw-chk-tick");
            }

            div["onclick"] = async function () {
              let msg = mv.GetAttrs(element, "custom-codelabel-chk-msg");
              if (msg === undefined) msg = "";

              msg = mv.Empty(msg) ? "" : `|${msg}`;
              let colorG = mv.GetAttrs(element, "custom-codelabel-chk-colorG");
              if (colorG === "undefined" || colorG === undefined) {
                colorG = "";
              }

              if (div.classList.contains("cw-chk-tick")) {
                div.classList.remove("cw-chk-tick");
                element.innerHTML = `<span class="hide">#[ ]${msg}#${colorG}</span>`;
                mv.SetAttrs(element, "custom-codelabel-chk-chk", " ");
                mv.SetAttrs(
                  element,
                  "custom-codelabel-value",
                  `#[ ]${msg}#${colorG}`
                );
              } else {
                div.classList.add("cw-chk-tick");
                element.innerHTML = `<span class="hide">#[x]${msg}#${colorG}</span>`;
                mv.SetAttrs(element, "custom-codelabel-chk-chk", "x");
                mv.SetAttrs(
                  element,
                  "custom-codelabel-value",
                  `#[ ]${msg}#${colorG}`
                );
              }

              if (
                colorG !== null &&
                colorG !== undefined &&
                colorG.includes("!")
              ) {
                div.classList.add("cw-chk-endsuffix");
              } else {
                div.classList.remove("cw-chk-endsuffix");
              }

              let md = mv
                .GetLute()
                .BlockDOM2StdMd(element.parentNode.parentNode.innerHTML);
              console.log(md);
              let kid = await mv.UpdateBlockByMd_API(id, md);
              let dom = document.querySelectorAll(
                `div[data-node-id="${kid}"]`
              )[0];
              render(dom);
            };
          },
        },
        { // 计数任务
        
          typeid: "todo",
          reg: '^\\+\\[(\\d+)\\]\\s*\\((.*?)(\\s*\\"([\\d\\w]+)\\")?\\)$', // 正则表达式
          tagName: "span",
          tagDataType: "code",
          customf: "todo", // 忽略解析的属性值
          className: "vk-todo", // 自定义的属性名称
          maps: {
            // 解析后-分组的别名，也是 parseInfo 中的字段
            $0: "value", // 占用，code 原始的 innerHTML 内容
            $1: "count",
            $2: "data",
            $3: "colorTag",
            $4: "color",
            $5: "",
            $6: "",
            $7: "",
            $8: "",
            $9: "",
          },

          emptys: ["count", "data"], // 不能为空的字段
          emptysValues: {
            // 当值为空值的值
            colorTag: "",
          },
          style: {
            // 样式映射信息
            rerender: true, // 是否计算配色
            color: {
              value: "color", // 主颜色字段
              suffix: "", // 颜色后缀对应的字段
            },
            default: "black", // 缺省颜色值
            defaultSuffix: false, // 缺省时,颜色后缀,对应的值.
            colors: {
              suffixs: {
                "!": true,
              },
              names: () => config.theme.common.colors.names, // 颜色名称-列表
              values: () => config.theme.common.colors.values, // 适配配色-列表
            },
          },
          customAttr: {
            // 自定义属性
            "custom-codelabel-value": "${value}",
            "custom-codelabel-todo-count": "${count}",
            "custom-codelabel-todo-data": "${data}",
            "custom-codelabel-todo-colorTag": "${colorTag}",
          },
          inlineStyle: {
            color: "${color}",
          },
          innerHTML:
            "<button>+</button><span>[${count}]</span><span>(</span>${data}<span>${colorTag})</span>",
          renderEnd: async (parse, element, oldHTML) => {
            async function bingOnClick(parse, e, oldHTML) {
              // 获取父节点
              let parentNode = mv.GetSiyuanBlock(e);
              let id = mv.GetSiyuanBlockId(e);

              parse.reinitFormat(parse.ptypeItem);

              let parseInfo = parse.clacParseInfo(oldHTML);
              let c = 1 + +parseInfo.count;
              parseInfo.count = "" + c;
              parse.parseInfo = parseInfo;

              // 渲染
              parse.renderSingle(e, parseInfo);
              // 这里已经更新了，所有旧的 oldHTML 和 parse.Value 就没用了。重新组合
              let newInnerHtml = `+[${parse.parseInfo.count}](${parse.parseInfo.data}${parse.parseInfo.colorTag})`;

              e.firstChild.onclick = bingOnClick.bind(
                e.firstChild,
                parse,
                e,
                newInnerHtml
              );

              // 设置新的 自定义的value
              e.setAttribute("custom-codelabel-value", newInnerHtml);

              e.firstChild.setAttribute(
                "custom-codelabel-todo-count",
                parse.parseInfo.count
              );

              var tmd = mv.GetLute().BlockDOM2StdMd(parentNode.innerHTML);
              let did = await mv.UpdateBlockByMd_API(id, tmd);
              let dom = document.querySelectorAll(
                `div[data-node-id="${did}"]`
              )[0];
              render(dom);
            }

            element.firstChild.onclick = bingOnClick.bind(
              element.firstChild,
              parse,
              element,
              oldHTML
            );
            element.firstChild.setAttribute(
              "custom-codelabel-todo-count",
              element.getAttribute("custom-codelabel-todo-count")
            );
          },
        },
        { // Tab引用
         
          typeid: "bqtab",
          reg: "::(tab)(\\d*)", // 针对 innerHTML
          tagName: "span",
          tagDataType: "code",
          customf: "bqtab", // 自定义属性 f=wz 即可。
          className: "bqtab",
          //// select1: `.protyle-wysiwyg *[data-node-id] ${this.tagName}`  // 要选择的,默认不用设置
          //// select2: `.protyle-wysiwyg *[data-node-id][custom-f~=${this.customf}] ${this.tagName}` //  要选择的,默认不用设置
          select1:
            '.protyle-wysiwyg .bq[data-node-id] .p:first-of-type span[data-type="code"]:first-of-type', // 要选择的,默认不用设置
          select2:
            '.protyle-wysiwyg .bq[data-node-id][custom-f~=bqtab] .p:first-of-type span[data-type="code"]:first-of-type', //  要选择的,默认不用设置

          // select1: `.protyle-wysiwyg *[data-node-id] ${this.tagName}`  // 要选择的,默认不用设置
          // select2: `.protyle-wysiwyg *[data-node-id][custom-f~=${this.customf}] ${this.tagName}` //  要选择的,默认不用设置
          maps: {
            // 解析后-分组的别名，也是 parseInfo 中的字段
            /**
             * 以下字段名称被占用,不要用于下面列表的值中.
             * value,             // code 标签的 InnerHTML
             * color1,bgcolor1,   // 主颜色计算结果和适配背景色
             * color2,bgcolor2,   // 次颜色计算结果和适配背景色
             * $0~$9 也不要用.
             */
            $0: "value", // 占用，code 原始的 innerHTML 内容
            $1: "mode",
            $2: "index",
            $3: "",
            $4: "",
            $5: "",
            $6: "",
            $7: "",
            $8: "",
            $9: "",
          },
          emptys: ["mode"], // 不能为null，undefined或者空值的字段，用 '$0'-'$9' 对应的别名
          emptysValues: {
            // 当值为null，undefined或者空值时，要设置的值，用 'key 用：$0'-'$9' 对应的别名,value 是对应的值。
            index: "0",
          },
          onlyValue: {
            // 不为null时，必须在这个范围内取值，可以不设置，
            mode: ["tab"],
          },
          style: {
            // 样式映射信息
            rerender: false, // 是否计算颜色
            // color: {
            //     value:'color',            // 主颜色对应的字段，用 $0'-'$9' 对应的别名
            //     suffix:'endsuffix',       // 颜色后缀对应的字段，用 $0'-'$9' 对应的别名
            // },
            // default:'theme2',             // 主颜色缺省时，默认的颜色值
            // defaultSuffix:false,          // 颜色后缀缺省时,默认的后缀内容，表示的值（suffixs中value）
            // colors:{
            //     suffixs:{                 // 颜色后缀内容，表示的值
            //         '!':true,
            //     },
            //     names: ()=>config.theme.common.colors.names,     // 主颜色，支持的颜色名称-列表，
            //     values: ()=>config.theme.common.colors.values,   // 主颜色，对应的适配配色-列表
            // }
          },
          customAttr: {
            // 自定义属性，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
            // 'custom-codelabel-wz-title': "${title}",
            // 'custom-codelabel-wz-msg': "${msg}",
          },
          inlineStyle: {
            // 自定义内联样式，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
            // "--theme-wz-bgcolor":"${bgcolor1}",
            // "--theme-wz-title-color":"${color1}",
            // "--theme-wz-msg-color":"${color2}",
            // "--theme-wz-msg-bgcolor":"${bgcolor2}",
          },
          innerHTML: "<span>${value}</span>", // 解析后 code 标签的 innerHTML 内容，支持类似js的模板语法，${别名}, 会被实际的值替换
          renderEnd: async (parse, element, oldHTML) => {
            //在每个元素渲染解析完成后的回调函数

            // parse是解析信息，$0~$9 的别名，如果开启 style.rerender为true，还有 color1,bgcolor1,color2,bgcolor2 (主颜色和适配颜色)
            // element 当前元素（解析后的）
            // oldHTML （解析前的 innerHTML 内容）
            // 获取父节点

            let crtLine = mv.GetSiyuanBlock(element);
            let parentNode = crtLine.parentNode;

            let tab = async (tab_t, tab_t_tag, tab_c, tag_c_tag, evt, rix) => {
              // 设置 button
              element.classList.remove("bq-tab-button-mode");
              element.classList.add("bq-tab-button-mode");

              // 设置插入
              let button = mv.GetDomByAtrrs(
                parentNode,
                "bq-button-value",
                "新建",
                "button"
              )[0];
              if (button === null || button === undefined) {
                button = document.createElement("button");
                button.setAttribute("bq-button-value", "新建");
                element.parentNode.insertBefore(button, element.nextSibling);
              }

              button[evt] = async function () {
                let inner = async () => {
                  var tab_t = mv.GetDomByAtrrs(
                    parentNode,
                    "custom-type",
                    "bq-tab_t",
                    "div"
                  )[0];
                  var tab_t_li = mv.GetDomByAtrrs(tab_t, "class", "li", "div");

                  var tab_c = mv.GetDomByAtrrs(
                    parentNode,
                    "custom-type",
                    "bq-tab_c",
                    "div"
                  )[0];
                  var tab_c_li = mv.GetDomByAtrrs(tab_c, "class", "bq", "div");

                  let t_ix = mv.GetSiyuanBlockId(tab_t_li[tab_t_li.length - 1]);
                  let c_ix = mv.GetSiyuanBlockId(tab_c_li[tab_c_li.length - 1]);

                  let aid = await mv.InsertBlockByMd_API(c_ix, "> 内容new");
                  let bid = await mv.InsertBlockByMd_API(t_ix, "* 选项卡new");
                  let c_li = mv.GetDomByAtrrs(
                    tab_c,
                    "data-node-id",
                    bid,
                    "div"
                  )[0];
                  tab("bq-tab_t", "li", "bq-tab_c", "bq", "onclick", -1);
                };

                let msgbox = new MessageboxYesNo("确定新建一个标签页吗？", 5);
                let mgdom = msgbox.Create(
                  "bqtmsgbox",
                  "bqtmsgbox",
                  "width: 480px;top: 45%; left: 45%;"
                );
                document.body.appendChild(mgdom);
                msgbox.Start(inner, () => {});
              };

              // 设置 bq-none
              let button2 = mv.GetDomByAtrrs(
                parentNode,
                "bq-button-value",
                "展开/收缩",
                "button"
              )[0];
              if (button2 === null || button2 === undefined) {
                button2 = document.createElement("button");
                button2.setAttribute("bq-button-value", "展开/收缩");
                element.parentNode.insertBefore(button2, element.nextSibling);
              }

              button2[evt] = async function () {
                let str2 = parentNode.getAttribute("custom-type");
                if (str2.indexOf("bq-none") >= 0) {
                  str2 = str2.replace("bq-none", "");

                  if (str2.indexOf("bq-wrap") < 0) {
                    str2 = str2 + " bq-wrap ";
                  }

                  console.log(str2);
                  parentNode.setAttribute("custom-type", str2);
                  let kid = await mv.SetAttrs_API(
                    mv.GetSiyuanBlockId(parentNode),
                    "custom-type",
                    str2
                  );
                } else {
                  if (str2.indexOf("bq-wrap") < 0) {
                    str2 = str2 + " bq-wrap ";
                  }

                  str2 = str2 + " bq-none ";
                  console.log(str2);
                  parentNode.setAttribute("custom-type", str2);
                  let kid = await mv.SetAttrs_API(
                    mv.GetSiyuanBlockId(parentNode),
                    "custom-type",
                    str2
                  );
                }
              };

              var tab_t = mv.GetDomByAtrrs(
                parentNode,
                "custom-type",
                tab_t,
                "div"
              )[0];
              var tab_t_li = mv.GetDomByAtrrs(tab_t, "class", tab_t_tag, "div");

              var tab_c = mv.GetDomByAtrrs(
                parentNode,
                "custom-type",
                tab_c,
                "div"
              )[0];
              var tab_c_li = mv.GetDomByAtrrs(tab_c, "class", tag_c_tag, "div");

              var len = tab_t_li.length;
              var i = 0;
              for (i = 0; i < len; i++) {
                tab_t_li[i].index = i;
                tab_t_li[i][evt] = async function () {
                  for (i = 0; i < len; i++) {
                    tab_t_li[i].setAttribute("custom-type", "null");
                    tab_c_li[i].setAttribute("custom-type", "bq-hide");

                    let kid1 = await mv.SetAttrs_API(
                      mv.GetSiyuanBlockId(tab_t_li[i]),
                      "custom-type",
                      "null"
                    );
                    let kid2 = await mv.SetAttrs_API(
                      mv.GetSiyuanBlockId(tab_c_li[i]),
                      "custom-type",
                      "bq-hide"
                    );
                  }

                  tab_t_li[this.index].setAttribute("custom-type", "bq-act");
                  tab_c_li[this.index].setAttribute("custom-type", "null");

                  let id = mv.GetSiyuanBlockId(tab_t_li[this.index]);
                  let kid1 = await mv.SetAttrs_API(id, "custom-type", "bq-act");
                  let kid2 = await mv.SetAttrs_API(
                    mv.GetSiyuanBlockId(tab_c_li[this.index]),
                    "custom-type",
                    "null"
                  );
                };
              }

              console.log("1");
              if (rix !== null && rix !== undefined) {
                if (rix >= 0) {
                  tab_t_li[0][evt]();
                } else {
                  tab_t_li[tab_t_li.length - 1][evt]();
                }
              }
            };

            tab("bq-tab_t", "li", "bq-tab_c", "bq", "onclick");
            crtLine.onclick = async (e) => {
              tab("bq-tab_t", "li", "bq-tab_c", "bq", "onclick");
            };
          },
        },
        { // @@命令  ((?<time>\\d{1,2}:\\d{1,2})(?<ope>[+]))?(?<tlen>\\d+(.\\d+)?)(?<ttype>[smhd])
         
          typeid: "cmd",
          // reg: "^([\u200B-\u200D\uFEFF])?@@(?<func>(kanban)|(map)|(bqcolor)|(range)|(bqtab))(?<args>\\((.*)\\))?([\u200B-\u200D\uFEFF])?[;；]$", // 针对 innerHTML
          reg: "^([\u200B-\u200D\uFEFF])?@@(?<func>(kanban)|(map)|(bqcolor)|(range)|(((?<time>\\d{1,2}:\\d{1,2})(?<ope>[+]))?(?<tlen>\\d+(.\\d+)?)(?<ttype>[smhd]))|(bqtab))(?<args>\\((.*)\\))?([\u200B-\u200D\uFEFF])?[;；]$", // 针对 innerHTML
          tagName: "span",
          tagDataType: "code",
          customf: "cmd", // 自定义属性 f=wz 即可。
          className: "custom-codelabel-cmd",
          maps: {
            // 解析后-分组的别名，也是 parseInfo 中的字段
            /**
             * 以下字段名称被占用,不要用于下面列表的值中.
             * value,             // code 标签的 InnerHTML
             * color1,bgcolor1,   // 主颜色计算结果和适配背景色
             * color2,bgcolor2,   // 次颜色计算结果和适配背景色
             * $0~$9 也不要用.
             */
            // 使用 exec() 以后，用 reg.goups.xxx 提嗲
            $0: "value", // 占用，code 原始的 innerHTML 内容
            $1: "",
            $2: "func",
            $3: "",
            $4: "",
            $5: "",
            $6: "",
            $7: "",
            $8: "args",
            $9: "",
          },
          emptys: ["func"], // 不能为null，undefined或者空值的字段，用 '$0'-'$9' 对应的别名
          onlyValue: {
            // 不为null时，必须在这个范围内取值，可以不设置，
            func: ["kanban", "map", "bqcolor", "bqtab", "range","((?<time>\\d{1,2}:\\d{1,2})(?<ope>[+]))?(?<tlen>\\d+(.\\d+)?)(?<ttype>[smhd])"],
          },
          emptysValues: {
            // 当值为null，undefined或者空值时，要设置的值，用 'key 用：$0'-'$9' 对应的别名,value 是对应的值。
            //  'func':'',
          },
          style: {
            // 样式映射信息
            rerender: false, // 是否计算颜色
            // color: {
            //     value:'color',            // 主颜色对应的字段，用 $0'-'$9' 对应的别名
            //     suffix:'endsuffix',       // 颜色后缀对应的字段，用 $0'-'$9' 对应的别名
            // },
            // default:'theme2',             // 主颜色缺省时，默认的颜色值
            // defaultSuffix:false,          // 颜色后缀缺省时,默认的后缀内容，表示的值（suffixs中value）
            // colors:{
            //     suffixs:{                 // 颜色后缀内容，表示的值
            //         '!':true,
            //     },
            //     names: ()=>config.theme.common.colors.names,     // 主颜色，支持的颜色名称-列表，
            //     values: ()=>config.theme.common.colors.values,   // 主颜色，对应的适配配色-列表
            // }
          },
          customAttr: {
            // 自定义属性，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
            // 'custom-codelabel-cmd-func': "${func}",
            // 'custom-codelabel-cmd-args': "${args}",
          },
          inlineStyle: {
            // 自定义内联样式，key表示属性名，value是属性值，支持类似js的模板语法，${别名}, 会被实际的值替换
            // "--theme-wz-bgcolor":"${bgcolor1}",
            // "--theme-wz-title-color":"${color1}",
            // "--theme-wz-msg-color":"${color2}",
            // "--theme-wz-msg-bgcolor":"${bgcolor2}",
          },
          innerHTML: "<span>${value}</span>", // 解析后 code 标签的 innerHTML 内容，支持类似js的模板语法，${别名}, 会被实际的值替换
          renderEnd: async (parse, element, oldHTML) => {
            //在每个元素渲染解析完成后的回调函数
            // parse是解析信息，$0~$9 的别名，如果开启 style.rerender为true，还有 color1,bgcolor1,color2,bgcolor2 (主颜色和适配颜色)
            // element 当前元素（解析后的）
            // oldHTML （解析前的 innerHTML 内容）

            var id = mv.GetSiyuanBlockId(element);

            var funcPat = new RegExp('((?<time>\\d{1,2}:\\d{1,2})(?<ope>[+]))?(?<tlen>\\d+(.\\d+)?)(?<ttype>[smhd])');
            // 处理时间范围
            var doTimeRange = async function  (start, endD,endType) {
              if (mv.Empty(start)) {
                let dnow = moment(Date.now());
                start = moment(dnow).format("HH:mm");
              }

              start = moment(start, "HH:mm");
              let end = moment(start, "HH:mm");
              if (endType === "s") {
                end.add(endD, "seconds");
              } else if (endType === "m") {
                end.add(endD, "minutes");
              } else if (endType === "h") {
                end.add(endD, "hours");
              } else if (endType === "d") {
                end.add(endD, "days");
              }

              element.innerHTML =
                "@" + start.format("HH:mm") + "-" + end.format("HH:mm");
              let parentNode = mv.GetSiyuanBlock(element);
              let id = mv.GetSiyuanBlockId(element);
              var tmd = mv.GetLute().BlockDOM2StdMd(parentNode.innerHTML);
              console.log(tmd);
              let did = await mv.UpdateBlockByMd_API(id, tmd);
            };

            // 直接通过 时分+时长 进行
            let g =funcPat.exec(parse.parseInfo["func"]);
            if (g!==null && g!==undefined && g.groups!==null && g.groups!==null& g.groups!==undefined){
                let start = g.groups["time"];
                let ope = g.groups["ope"];
                let endD = g.groups["tlen"];
                let endType =g.groups["ttype"];  
                console.log(start,endD,endType);
                await doTimeRange(start,endD,endType);
            }

            if (parse.parseInfo["func"] === "range") {
              console.log("now");
              let argsPatt = new RegExp(
                "((?<time>\\d{1,2}:\\d{1,2})(?<ope>[+,]))?(?<tlen>\\d+(.\\d+)?)(?<ttype>[smhd])"
                // "\\((\\d{1,2}:\\d{1,2}[,+])?(\\d+(.\\d+)?)([smhd])\\)"
              );
              let argsTxt = parse.parseInfo["args"];
              let g =argsPatt.exec(argsTxt)
              if (g!==null && g!==undefined && g.groups!==null && g.groups!==null& g.groups!==undefined){
                let start = g.groups["time"];
                let ope = g.groups["ope"];
                let endD = g.groups["tlen"];
                let endType =g.groups["ttype"];
                await doTimeRange(start,endD,endType);
              }
              return;
            }

            if (parse.parseInfo["func"] === "kanban") {
              let aid = await mv.InsertBlockByMd_API(id, "---");
              let bid = await mv.InsertBlockByMd_API(aid, "---");
              let cid = await mv.InsertBlockByMd_API(
                bid,
                "* 未开始 \n  * 任务1 \n* 进行中 \n   * 任务2 \n* 已完成 \n    * 任务3"
              );

              await mv.DeleteBlockById_API(id);
              return;
            }

            if (parse.parseInfo["func"] === "map") {
              let ida = await mv.InsertBlockByMd_API(id, "---");
              let idb = await mv.InsertBlockByMd_API(ida, "---");
              let idc = await mv.InsertBlockByMd_API(idb, "---");
              let idd = await mv.InsertBlockByMd_API(
                idc,
                "* 中心主题 \n  * 分支1 \n  * 分支2 \n  * 分支3 "
              );
              let ide = await mv.DeleteBlockById_API(id);
              return;
            }

            if (parse.parseInfo["func"] === "bqcolor") {
              let szcolor = "red";
              if (mv.Empty(parse.parseInfo["args"]) === false) {
                szcolor = parse.parseInfo["args"];
              }
              let aid = await mv.InsertBlockByMd_API(id, ">  ");
              let bid = await mv.AppendBlockByMd_API(
                aid,
                "`>(" + szcolor + ")` ."
              );
              let cid = await mv.UpdateBlockByMd_API(id, " ");
              return;
            }

            if (parse.parseInfo["func"] === "bqtab") {
              // 插入父容器
              let wid = await mv.InsertBlockByMd_API(id, "> `::tab`");
              await mv.SetAttrs_API(wid, "custom-type", "bq-wrap");

              // 插入选项卡
              let tabtid = await mv.AppendBlockByMd_API(
                wid,
                "* 选项1 \n * 选项2 \n * 选项3 "
              );
              await mv.SetAttrs_API(tabtid, "custom-type", "bq-tab_t");

              // 插入选项卡容器
              let tabcid = await mv.AppendBlockByMd_API(wid, "> > 内容1");
              await mv.SetAttrs_API(tabcid, "custom-type", "bq-tab_c");
              let bid = await mv.AppendBlockByMd_API(tabcid, "> 内容2");
              let cid = await mv.AppendBlockByMd_API(tabcid, "> 内容3");
              let did = await mv.UpdateBlockByMd_API(id, " ");

              // window.location.reload();
              return;
            }
          },
        },
      ],
    },

    codelabelrender: {
      // 渲染自定义样式
      enable: true, // 是否启用自定义样式渲染
      render: {
        enable: true, // 是否启用自定义样式渲染
        toolbar: {
          // 菜单栏
          enable: true, // 是否启用自定义样式渲染
          id: "toolbar-theme-style-codelabelrender",
          hotkey: () => config.theme.hotkeys.codelabel.render2,
          label: {
            zh_CN: "渲染整个页面",
            zh_CNT: null,
            fr_FR: null,
            en_US: null,
            other: "Render Inline Code Parse",
          },
          icon: "#iconPreview",
          index: -5,
        },
      },
    },

    menu: {
      enable: true, // 行内代码编辑增强
      codelabel: {
        enable: true, // 行内代码编辑增强
        toolbar: {
          // 菜单栏
          enable: true, //
          id: "toolbar-theme-menu-codelabel",
          hotkey: () => config.theme.hotkeys.menu.codelabel,
          label: {
            zh_CN: "行内代码编辑增强",
            zh_CNT: null,
            fr_FR: null,
            en_US: null,
            other: "codelabel Menu Enhancements",
          },
          icon: "#iconMenu",
          index: -4,
        },
        items: [
          {
            enable: true, // 是否启用菜单项
            prefixSeparator: true, // 是否添加前缀分隔线
            suffixSeparator: false, // 是否添加后缀分隔线
            type: null, // 哪些类型的块启用, 值 null 则全部启用
            id: "theme-menu-codelabel-common-editor", // 菜单项 ID
            mode: "button", // 菜单项类型
            icon: "#iconEdit", // 菜单项图标
            label: {
              // 菜单项标签
              zh_CN: "编辑行内代码块",
              other: "Edit Inline Code",
            },
            accelerator: "", // 菜单项快捷键
            click: {
              // 菜单项点击事件
              enable: true,
              callback: null,
              tasks: [
                {
                  type: "codelabel-editor",
                  params: {
                    style: null,
                    "custom-font-family": null,
                  },
                },
              ],
            },
            itemsLoad: false, // 是否加载子菜单
            // itemsIcon: "#iconRight",
            items: null,
          },
        ],
      },
    },

    comment: {
      // 批注功能开关
      enable: true,
    },

    window: {
      enable: true, // 窗口功能开关
      windowParams: {
        // 窗口参数
        width: 720, // 窗口宽度
        height: 480, // 窗口高度
        frame: true, // 是否显示边缘框
        fullscreen: false, // 是否全屏显示
        alwaysOnTop: true, // 是否置顶显示
        autoHideMenuBar: true, // 是否隐藏菜单栏(使用 Alt 显示)
        // backgroundColor: window.siyuan.config.appearance.mode // 窗口默认背景色
        //     ? '#1e1e1e'
        //     : '#f5f5f5',
        webPreferences: {
          nodeIntegration: true, // 是否启用 Node.js 内置模块
          nativeWindowOpen: true,
          // webviewTag: true,
          webSecurity: false, // 是否启用 Web 安全
          // contextIsolation: false,
          // defaultFontFamily: { // 默认字体
          //     standard: window.siyuan.config.editor.fontFamily,
          // },
        },
      },
      menu: {
        template: null,
        // // 新窗口菜单
        // template: [
        //     // 新窗口菜单模板
        //     // REF [菜单项 | Electron](https://www.electronjs.org/zh/docs/latest/api/menu-item)
        //     {
        //         label: 'SiYuan',
        //         submenu: [
        //             {
        //                 label: 'About SiYuan',
        //                 role: 'about',
        //             },
        //             { type: 'separator' },
        //             { role: 'services' },
        //             { type: 'separator' },
        //             {
        //                 label: 'Hide SiYuan',
        //                 role: 'hide',
        //             },
        //             { role: 'hideOthers' },
        //             { role: 'unhide' },
        //             { type: 'separator' },
        //             {
        //                 label: 'Quit SiYuan',
        //                 role: 'quit',
        //             },
        //         ],
        //     },
        //     {
        //         role: 'editMenu',
        //         submenu: [
        //             { role: 'selectAll' },
        //             { role: 'cut' },
        //             { role: 'copy' },
        //             { role: 'paste' },
        //             { role: 'pasteAndMatchStyle', accelerator: 'CmdOrCtrl+Shift+V' },
        //             { type: 'separator' },
        //             { role: 'toggleSpellChecker' },
        //         ],
        //     },
        //     {
        //         role: 'viewMenu',
        //         submenu: [
        //             { role: 'resetZoom' },
        //             { role: 'zoomIn', accelerator: 'CmdOrCtrl+=' },
        //             { role: 'zoomOut' },
        //         ],
        //     },
        //     {
        //         role: 'windowMenu',
        //         submenu: [
        //             { role: 'minimize' },
        //             { role: 'zoom' },
        //             { role: 'togglefullscreen' },
        //             { type: 'separator' },
        //             { role: 'toggledevtools' },
        //             { type: 'separator' },
        //             { role: 'front' },
        //             { type: 'separator' },
        //             { role: 'reload', accelerator: 'F5' },
        //             { role: 'forcereload', accelerator: 'CmdOrCtrl+F5' },
        //             { role: 'close' },
        //             { type: 'separator' },
        //             {
        //                 label: 'Pinned',
        //                 click: (menuItem, browserWindow, event) => {
        //                     if (browserWindow) browserWindow.setAlwaysOnTop(!browserWindow.isAlwaysOnTop());
        //                 },
        //                 type: 'checkbox',
        //                 checked: true,
        //                 // REF [快捷键 | Electron](https://www.electronjs.org/zh/docs/latest/api/accelerator)
        //                 accelerator: 'Alt+Shift+P',
        //             },
        //         ],
        //     },
        // ],
      },
      open: {
        enable: true, // 打开窗口功能开关
        panel: {
          enable: true, // 打开一个新窗口
          url: null, // 新窗口的 URL, 值 null 则为 '/stage/build/desktop/'
          toolbar: {
            // 菜单栏
            enable: true,
            display: true,
            id: "toolbar-theme-window-open-panel",
            label: {
              zh_CN: "打开一个新窗口",
              other: "Open a New Window",
            },
            icon: "#iconExport",
            index: 1,
          },
        },
        block: {
          // 新窗口打开当前块, 否则打开当前文档
          enable: true,
          editable: false, // 新窗口默认是否可编辑
          outfocus: {
            // 新窗口打开当前块, 否则打开当前文档
            enable: true,
            toolbar: {
              // 菜单栏
              enable: true,
              display: true,
              id: "toolbar-theme-window-open-block-outfocus",
              hotkey: () => config.theme.hotkeys.window.open.block.outfocus,
              label: {
                zh_CN: "在新窗口打开当前块",
                other: "Open the Current Block in a New Window",
              },
              icon: "#iconExport",
              index: 2,
            },
          },
          infocus: {
            // 新窗口打开当前块并聚焦, 否则打开当前文档
            enable: true,
            toolbar: {
              // 菜单栏
              enable: true,
              display: true,
              id: "toolbar-theme-window-open-block-infocus",
              hotkey: () => config.theme.hotkeys.window.open.block.infocus,
              label: {
                zh_CN: "在新窗口打开当前块并聚焦",
                other: "Open the Current Block in a New Window and Focus",
              },
              icon: "#iconExport",
              index: 3,
            },
          },
        },
        link: {
          enable: true, // 新窗口打开当链接/块引用
          outfocus: {
            enable: true, // 不聚焦
          },
          infocus: {
            enable: true, // 聚焦
          },
        },
        editor: {
          enable: true, // 启用新窗口打开当编辑器
          labels: {
            openFile: { zh_CN: "打开文件", other: "Open File" },
            open: { zh_CN: "打开", other: "Open" },
          },
          path: {
            // 路径
            index: `${THEME_PATHNAME}/app/editor/`, // 编辑器路径
            temp: {
              // 临时文件路径
              relative: "/temp/theme/editor/", // 临时文件相对路径
              absolute:
                `${window.siyuan.config.system.workspaceDir}/temp/theme/editor/`
                  .replaceAll("\\", "/")
                  .replaceAll("//", "/"), // 临时文件绝对路径
            },
          },
          kramdown: {
            // 编辑文档 kramdown 源代码
            message: {
              error: {
                zh_CN: "编辑文档 kramdown 源代码功能仅能在桌面端使用",
                other:
                  "The feature to edit the kramdown source code of a document is only available on the desktop client",
              },
            },
          },
        },
      },
    },

    toolbar: {
      // 工具栏
      id: "custom-toolbar", // 工具栏 ID
      more: {
        id: "custom-toolbar-more",
        enable: true,
        status: {
          default: "fold",
          fold: {
            icon: "#iconFullscreen",
            label: {
              zh_CN: "展开扩展工具栏",
              other: "Expand the Expansion Toolbar",
            },
          },
          unfold: {
            icon: "#iconContract",
            label: {
              zh_CN: "收起扩展工具栏",
              other: "Collapse the Expansion Toolbar",
            },
          },
        },
      },
    },

    wordcount: {
      // 字数统计
      enable: true,
    },

    altenter:{
        // alt+enter换行变特殊样式
        enable:true, 
        customf: "ae"
    },
    hotkeys: {
      // 快捷键
      codelabel: {
        render: {
          // 渲染(Ctrl + Alt + 0)
          ctrlKey: true,
          metaKey: true,
          shiftKey: false,
          altKey: true,
          key: "0",
        },

        render2: {
          // 渲染(Ctrl + 0)
          ctrlKey: true,
          metaKey: true,
          shiftKey: false,
          altKey: false,
          key: "0",
        },
      },

      altenter:{
        // 块菜单开关(Shift + Alt + M)
        ctrlKey: false,
        metaKey: false,
        shiftKey: true,
        altKey: false,
        key: "Enter",
      },

      menu: {
        codelabel: {
          // 块菜单开关(Shift + Alt + M)
          ctrlKey: false,
          metaKey: false,
          shiftKey: true,
          altKey: true,
          key: "M",
        },
      },

      window: {
        open: {
          block: {
            outfocus: {
              // 新窗口打开当前块, 否则打开当前文档(Shift + Alt + N)
              enable: true,
              CtrlCmd: false,
              WinCtrl: false,
              Shift: true,
              Alt: true,
              key: "N",
            },
            infocus: {
              // 新窗口打开当前块并聚焦, 否则打开当前文档(Ctrl + Shift + Alt + N)
              enable: true,
              CtrlCmd: true,
              WinCtrl: false,
              Shift: true,
              Alt: true,
              key: "N",
            },
          },
          link: {
            outfocus: {
              // 新窗口打开链接(鼠标中键)
              enable: true,
              CtrlCmd: false,
              WinCtrl: false,
              Shift: false,
              Alt: false,
              button: 1, // 鼠标中键
            },
            infocus: {
              // 新窗口打开链接并聚焦(Shift + 鼠标中键)
              enable: true,
              CtrlCmd: false,
              WinCtrl: false,
              Shift: true,
              Alt: false,
              button: 1, // 鼠标中键
            },
          },
          editor: {
            // 新窗口打开编辑器(Alt + 鼠标中键)
            enable: true,
            CtrlCmd: false,
            WinCtrl: false,
            Shift: false,
            Alt: true,
            button: 1, // 鼠标中键
          },
          markdown: {
            // 以 markdown 模式在新窗口打开编辑器(Shift + Alt + 鼠标中键)
            enable: true,
            CtrlCmd: false,
            WinCtrl: false,
            Shift: true,
            Alt: true,
            button: 1, // 鼠标中键
          },
        },
      },
    },
  },
};

// 用户配置
export var custom = {
  theme: {
    toolbar: {
      [config.theme.toolbar.more.id]: { default: true }, // 工具栏是否展开
      // [config.theme.location.record.toolbar.id]: { default: false }, // 当前浏览位置
      // [config.theme.menu.block.toolbar.id]: { default: false }, // 块功能增强
      // [config.theme.style.itemtext.toolbar.id]: { default: false }, // 完整显示文本内容
      // [config.theme.style.tabbar.toolbar.id]: { default: false }, // 纵向排列选项卡
      // [config.theme.style.guides.toolbar.id]: { default: false }, // 列表辅助线
      // [config.theme.style.mark.toolbar.id]: { default: false }, // 显示标记文本
      // [config.theme.invert.toolbar.id]: { default: false }, // 反色显示
      // [config.theme.typewriter.switch.toolbar.id]: { default: false }, // 打字机模式
      // [config.theme.dock.fold.toolbar.id]: { default: false }, // 专注模式
      // [config.theme.readonly.toolbar.id]: { default: false }, // 只读模式
    },
    location: {},
    dock: {},
  },
};

/* 保存用户配置至文件 */
export async function saveCustomFile(data = custom, path = config.custom.path) {
  const response = await putFile(path, JSON.stringify(data, undefined, 4));
  // console.log(response);
  return response;
}

try {
  // 合并配置文件 custom.json
  let customjson = await getFile(config.custom.path);
  if (customjson) customjson = await customjson.json();
  if (customjson) merge(custom, customjson);
} catch (err) {
  console.warn(err);
} finally {
  console.log(custom);
}
