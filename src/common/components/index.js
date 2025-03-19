import tMsgbox from "./frame/msgbox/index.js";
import nModal from './frame/modal/index.js'

const components = {

}

const install = (app, opts = {}) => {
  Object.keys(components).forEach(key => {
    app.component(key, components[key])
  })
  app.config.globalProperties.$tMsgbox = tMsgbox
  app.config.globalProperties.$modal = nModal
}

export default function installComponent(app) {

  if (typeof window !== 'undefined' && app) {
    install(app)
  }
  const exporter = Object.assign(components, {install})
  
  app.use(exporter)
}