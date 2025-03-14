
import { createApp, h, defineComponent, ref, nextTick } from 'vue';
import nMsgbox from './nMsgbox.vue'; // 导入 nMsgbox 组件

function open(paraObj, type) {
  const install = (opts = {}) => {
    const defaultOptions = {}; // 默认options，预留用于扩展业务
    const options = Object.assign({}, defaultOptions, paraObj.options || {});

    const boxInstance = createApp(nMsgbox, {
      modalType: type,
      contentTitle: paraObj.contentTitle,
      contentBody: paraObj.contentBody,
      printPath: paraObj.printPath,
      printData: paraObj.printData,
      options: options,
      onEnsure: paraObj.onEnsure ? paraObj.onEnsure : () => { },
      onCancel: paraObj.onCancel ? paraObj.onCancel : () => { },
    });
    const boxElement = document.createElement("div");
    document.body.appendChild(boxElement);
    const container = boxInstance.mount(boxElement);
    console.log("container:", container, boxInstance)

    // 监听子组件的 close 事件

  };

  install();
}

// 成功提示框
const success = async function (paraObj) {
  return await open(paraObj,"success")
}
// 失败提示框
const failed = async function (paraObj) {
  return await open(paraObj,"failed")
}
// 确认提示框
const confirm = async function (paraObj) {
  return await open(paraObj,"confirm")
}
// 消息提示框
const info = async function (paraObj) {
  return await open(paraObj,"info")
}
// 纯文字提示框
const no = async function (paraObj) {
  return await open(paraObj,"no")
}
// 带打印按钮的成功提示框
const print = async function (paraObj) {
  return await open(paraObj,"print")
}
export default {
  success,failed,confirm,info,no,print
}