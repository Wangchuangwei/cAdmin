import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'

const store = createPinia()

export default function installStore(app) {
  // 持久化
  store.use(piniaPersist)
  app.use(store)

}

export {store}