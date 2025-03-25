<!-- 
  文件预览模块 (前两种方式直接给文件地址即可)
  pdf采用pdfjs插件来实现
  doc采用vue-office插件来实现(vue-office可实现pdf,doc和excel)
  excel采用canvas-datagrid插件来实现
-->

<!-- 
  更多的方法   https://huaweicloud.csdn.net/654a11e95543f15fea1a2725.html
-->
<template>
  <div class="layout">
    <div class="panel">
      <div  class="grid grid-cols-1 grid-cols-2 grid-cols-3 gap-4">
        <!-- 文件预览模块 -->
        <card title="文件预览" desc="文件格式：pdf、doc、excel">
          <h-tag v-for="(item, index) in previewFileFormat" 
            :key="index" 
            @click="handleFilePreview(item.type, item.name, item.vuePath, item.filePath)" 
            class="tagCard"
          >{{item.name }}</h-tag>
        </card>
        <!-- 代码预览模块 -->
        <card title="代码预览">
          <h-tag class="tagCard" @click="handleCodePreview">代码预览</h-tag>
        </card>
        <!-- 条码预览模块 -->
        <card title="条码预览">
          <h-tag v-for="(item, index) in previewQrFormat" 
            :key="index" 
            @click="handleBarCodePreview(item.type, item.name, item.vuePath)" 
            class="tagCard"
          >{{item.name }}</h-tag>
        </card>
      </div>
      <!-- <iframe :src="url" width="100%" height="500px"></iframe> -->
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import HTag from '@/common/components/HTag/HTag.vue';
import Card from '@/common/components/Card/Card.vue'

const $modal = inject('$modal')
const show = (compModal, title, editType, modifyData, width, height) => {
  $modal.open(compModal, title, editType, modifyData, width, height)
}

// 文件预览
const previewFileFormat = [
  { type: 'pdf', name: 'pdf预览', vuePath: 'pdfPreview', filePath: 'test.pdf' },
  { type: 'doc', name: 'docx预览', vuePath: 'docPreview', filePath: 'test.docx' },
  { type: 'excel', name: 'excel预览', vuePath: 'excelPreview', filePath: 'test.xlsx' }
]
const handleFilePreview = (type, name, vuePath, filePath) => {
  let url = 'basicBusiness/views/preview/' + vuePath
  show(url, name, 'view', {filePath: filePath}, 850, 500)
}

// 代码预览
const handleCodePreview = () => {
  let obj = {
    code: 'const a = 1',
    la: {
      t: 12,
      sss: {
        a: 123
      }
    }
  }
  show('basicBusiness/views/preview/codePreview', '代码预览', 'view', obj, 850, 500)
}

// 条码预览
const previewQrFormat = [
  { type: '1dBarcode', name: '条形码预览', vuePath: '1dBarcodePreview'},
  { type: '2dBarcode', name: '二维码预览', vuePath: '2dBarcodePreview'},
]
const handleBarCodePreview = (type, name, vuePath) => {
  let url = 'basicBusiness/views/preview/' + vuePath
  show(url, name, 'view', {}, 850, 500)
}


import {getServerURL} from '@/common/scripts/utils/common'

const url = ref('')
const base = getServerURL('public/static/pptjs/Sample_12.pptx')
onMounted(() => {
  let serverUrl = getServerURL('public/static/pptjs/index.html')
  url.value = `${serverUrl}?file=${base}`
})
</script>

<style lang="scss" scoped>
.tagCard {
  margin: 0 10px;
}
</style>