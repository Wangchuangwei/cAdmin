import { createApp } from 'vue'
import 'normalize.css'
import '@/styles/main.scss'
// import './style.css'
import App from './App.vue'

import installComponent from './components/index'

import installStore from './store'
import installRouter from './router'


const app = createApp(App)

installComponent(app)
installStore(app)
installRouter(app)

app.mount('#app')
