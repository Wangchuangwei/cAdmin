<template>
  <div style="height: 100%">
    <VueOfficeDocx :src="url" :style="{ height: `${height - 20}px` }"></VueOfficeDocx>
  </div>
  <div class="pageFooter-buttongroup">
    <el-button @click="handleClose">关闭</el-button>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import {getServerURL} from '@/common/scripts/utils/common'

import VueOfficeDocx from '@vue-office/docx'
// 引入相关样式
import '@vue-office/docx/lib/index.css'

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

const url = ref('')

const emit = defineEmits(['handleAction'])
const handleClose = () => {
  emit('handleAction', '')
}

const openFile = () => {
  // 改为直接对应文件地址 -- 服务器地址
  let baseFile = getServerURL('mock/files/' + props.modifyData.filePath)
  url.value = baseFile
}

onMounted(() => {
  openFile()
})
</script>

<style>
</style>