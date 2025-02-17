// 检测是否为服务器端环境
const isServer = typeof window === 'undefined'

export const on = (function () {
  if (!isServer && document.addEventListener) {
    // 客户端环境，使用 addEventListener
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    // 服务器端或旧浏览器事件绑定
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
   }
  }
})()

export const off = (function () {
  if (!isServer && document.removeEventListener) {
    // 客户端环境，使用 removeEventListener
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    // 服务器端或旧浏览器事件绑定
    return function (element, event, handler) {
      if (element && event) {
       element.detachEvent('on' + event, handler)
      }
    }
  }
})()