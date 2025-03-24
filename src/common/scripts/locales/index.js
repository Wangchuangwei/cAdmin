import { createI18n } from "vue-i18n";

import zhLocale from './lang/zh-CN'
import enLocale from './lang/en-US'

// 多语言配置--打包后可以自定义设置
const mergeZH = Object.assign(window.zh_cn, zhLocale)

const localeData = {
  locale: 'zh-CN',  // set locale
  messages: {
    'zh-CN': mergeZH, // 默认中文
    'en-US': enLocale
  },
  silentTranslationWarn: true // 去掉warning提示
}

const i18n = createI18n(localeData)
export default function installI18n(app) {
  console.log("window.zh_cn:", window.zh_cn)
  app.use(i18n)
}