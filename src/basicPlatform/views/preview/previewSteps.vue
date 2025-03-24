<!-- 
  文件预览模块 (前两种方式直接给文件地址即可)
  pdf采用pdfjs插件来实现
  doc采用vue-office插件来实现(vue-office可实现pdf,doc和excel)
  excel采用
-->

<!-- 
  更多的方法   https://huaweicloud.csdn.net/654a11e95543f15fea1a2725.html
-->
<template>
  <div class="layout">
    <div class="panel">
      <h-tag v-for="(item, index) in previewFormat" 
        :key="index" 
        @click="handlePreview(item.type, item.name, item.vuePath, item.filePath)" 
        class="tagCard"
      >{{item.name }}</h-tag>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import HTag from '@/common/components/HTag/HTag.vue';

const $modal = inject('$modal')

const previewFormat = [
  { type: 'pdf', name: 'pdf预览', vuePath: 'pdfPreview', filePath: 'test.pdf' },
  { type: 'doc', name: 'docx预览', vuePath: 'docPreview', filePath: 'test.docx' },
  { type: 'excel', name: 'excel预览', vuePath: 'excelPreview', filePath: 'test.xlsx' }
]

const show = (compModal, title, editType, modifyData, width, height) => {
  $modal.open(compModal, title, editType, modifyData, width, height)
}

const handlePreview = (type, name, vuePath, filePath) => {
  let url = 'basicBusiness/views/preview/' + vuePath
  show(url, name, 'view', {filePath: filePath}, 850, 600)
}
</script>

<style lang="scss" scoped>
.tagCard {
  margin: 0 10px;
}
</style>