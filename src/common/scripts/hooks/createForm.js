import { defineComponent } from 'vue'
import mDiv from './mDiv.vue'

export default defineComponent({
  name: 'createForm',
  components: {
    mDiv
  },
  setup() {

    const form = (h) => {
      console.log("this.si:")
    }

    return {
      form
    }
  }
}) 