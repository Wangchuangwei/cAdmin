import Header from './components/Header.vue'

import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'home',
  setup() {
    console.log("example: home")
    return () => h('div', [h(Header)])
  }
})