<template>
  <div>
    <jsBarcode :value="value" :options="options"></jsBarcode>
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'

import jsBarcode from '@/basicPlatform/components/BarCode/jsBarCode.vue'

const props = defineProps({
  modifyData: {
    type: Object,
    default: () => {}
  },
})

const value = ref('barCode')
const options = ref({})

const initBarCode = () => {
  // value.value = props.modifyData.value
  // options.value = props.modifyData.options
  value.value = 'code show'
  options.value = {
    height: 100,//高度
    width: 3,
    text: "用途：xxx",//覆盖显示的文本
    displayValue: true,//是否在条形码下方显示文字
    // fontOptions:"bold italic",//使文字加粗体或变斜体
    font: "fantasy",//设置文本的字体
    textAlign: "right",//设置文本的水平对齐方式
    textPosition: "top",//设置文本的垂直位置
    textMargin: 5,//设置条形码和文本之间的间距
    fontSize: 15,//设置文本的大小
    background: "#eee",//设置条形码的背景
    lineColor: "skyblue",//设置条和文本的颜色。
    margin: 15//设置条形码周围的空白边距
  }
}
onMounted(() => {
  initBarCode()
})
</script>

<style>

</style>