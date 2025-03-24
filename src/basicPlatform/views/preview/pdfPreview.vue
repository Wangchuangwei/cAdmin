<template>
  <div style="height: 100%">
    <iframe :src="url" width="100%" :height="`${height - 20}px`"></iframe>
  </div>
  <div class="pageFooter-buttongroup">
    <el-button @click="handleClose">关闭</el-button>
  </div>
</template>

<script setup>
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

const url = ref('')
const serverUrl = getServerURL('public/static/pdfjs/web/viewer.html')

let proxyExtend = ''
if (process.env.NODE_ENV === 'production') {
  proxyExtend = window.LOCAL_CONFIG.proxyExtend + '/tbsp/downFile?fileName='
} else {
  proxyExtend = '/tbsp/downFile?fileName='
}

// 该地址应为用的mock, 直接给后端文件名，地址由后端拼接
const pdfUrlBase = window.location.protocol + '//' + window.location.host + proxyExtend 

const openFile = () => {
  // let pdfUrl = pdfUrlBase + props.filePath
  // url.value = `${serverUrl}?file=${encodeURIComponent(pdfUrl)}`

  // 改为直接对应文件地址
  let baseFile = getServerURL('mock/files/' + props.modifyData.filePath)
  url.value = `${serverUrl}?file=${encodeURIComponent(baseFile)}`
}



onMounted(() => {
  console.log("props123:", props.modifyData)
  openFile()
})

</script>

<style>

</style>