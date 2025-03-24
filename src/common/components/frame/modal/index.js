import { createVNode, render, h } from 'vue';
import mainVue from './main.vue'
import asyncModal from '@/basicPlatform/scripts/router/asyncModal'

// import testVue from './test.vue'

async function open(name, title, editType, modifyData, width, height, workFlag, options = {}) {
  const defaultOptions = {}; // 默认options，预留用于扩展业务
  options = Object.assign({}, defaultOptions, options);

  let COP = () => {
    return asyncModal[name]()
  }

  let res = await COP()

  return new Promise((resolve, reject) => {
    // 创建一个容器元素
    const boxElement = document.createElement('div');
    document.body.appendChild(boxElement);

    const boxInstance = createVNode(mainVue, {
        title: title,
        editType: editType,
        modifyData: modifyData,
        width: width,
        height: height,
        workFlag: workFlag,
        onClose: () => {
          render(null, boxElement); // 销毁组件
          document.body.removeChild(boxElement); // 移除 DOM 元素
        }
      }, 
      {
        // 将插槽内容包装为函数形式
        // default: () => [h(testVue)]
        default: (props) => [h(res.default, {...props})]
      }
    );
    render(boxInstance, boxElement)
  })
}

export default {
  open
}

// 在 Vue 3 中，当你使用 createVNode 创建组件时，插槽内容需要以函数的形式传递，而不是直接传递组件。
// 直接传递组件会导致 Vue 无法正确处理插槽内容，从而触发警告