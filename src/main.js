import { createApp } from 'vue'
import 'normalize.css'
import './style.css'
import App from './App.vue'

import installStore from './store'
import installRouter from './router'

const app = createApp(App)

installStore(app)
installRouter(app)

app.mount('#app')
