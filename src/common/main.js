import { createApp } from 'vue'
import 'normalize.css'
import './styles/main.scss'
import './icon/iconfont.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import installComponent from './components/index'

import clickoutside from './scripts/directives/clickoutside'
import installStore from './scripts/store'
import installRouter from './scripts/router'
import installI18n from './scripts/locales'
import installHttp from './scripts/api/config/index'

const app = createApp(App)

app.use(ElementPlus)

app.directive('clickoutside', clickoutside)

installComponent(app)
installStore(app)
installRouter(app)
installI18n(app)
installHttp(app)

app.mount('#app')
