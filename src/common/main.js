import { createApp } from 'vue'
import 'normalize.css'
import './styles/main.scss'
import './icon/iconfont.css'
import App from './App.vue'

import installComponent from './components/index'

import clickoutside from './scripts/directives/clickoutside'

import installStore from './scripts/store'
import installRouter from './scripts/router'

const app = createApp(App)

app.directive('clickoutside', clickoutside)

installComponent(app)
installStore(app)
installRouter(app)

app.mount('#app')
