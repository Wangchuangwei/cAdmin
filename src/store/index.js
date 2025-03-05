import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPersist)

export default function installStore(app) {
    // 持久化
    app.use(store)
}

export {store}