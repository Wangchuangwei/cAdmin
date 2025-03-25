<template>
  <div style="height: 100%">
    <div class="divRoot" ref="divRoot" ></div>
  </div>
  <div class="pageFooter-buttongroup">
    <el-button @click="handleClose">关闭</el-button>
  </div>
</template>

<script setup>
import * as xlsx from 'xlsx';
import canvasDatagrid from "canvas-datagrid";

import { onMounted, ref } from 'vue'
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

const divRoot = ref(null);
const handleBuffer = (data) => {
  const workbook = xlsx.read(data) || {};
  const sheet = workbook.Sheets[workbook.SheetNames[0]]; // 这里取第 0 个 sheet
  const json = xlsx.utils.sheet_to_json(sheet); // 得到的 json 是解析之后的数据
  const grid = canvasDatagrid();
  grid.data = json
  grid.editable = false
  divRoot.value.appendChild(grid);
  grid.style.width = "100%";
  grid.style.height = props.height + 'px';
}

const openFile = () => {
  // 改为直接对应文件地址 -- 服务器地址
  let baseFile = getServerURL('mock/files/' + props.modifyData.filePath)
  fetch(baseFile)
    .then(res => res.arrayBuffer())
    .then(buffer => handleBuffer(buffer))
}

onMounted(() => {
  openFile()
})
</script>

<style>

</style>