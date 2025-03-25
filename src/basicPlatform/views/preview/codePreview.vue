<template>
  <div>
    <pre>
      <code>
        {{ modifyData }}
      </code>
    </pre>
  </div>
</template>

<script setup>
import hljs from 'highlight.js'
import 'highlight.js/styles/a11y-light.min.css'

import {ref, onMounted, computed} from 'vue'
import {getServerURL} from '@/common/scripts/utils/common'

const props = defineProps({
  modifyData: {
    type: Object,
    default: () => {}
  },
  height: {
    type: Number,
    default: 500
  },
})
const emit = defineEmits(['handleAction'])
const handleClose = () => {
  emit('handleAction', '')
}
</script>

<style>

</style>