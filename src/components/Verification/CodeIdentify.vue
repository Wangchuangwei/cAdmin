<!-- 图形验证码组件 -->
<template>
  <div class="c-canvas">
    <canvas
      id="c-canvas"
      :width="width"
      :height="height"
    ></canvas>
  </div>
</template>

<script setup>
import {ref, onMounted, defineExpose } from 'vue';
import CheckCode from '@/utils/checkCode';

const props = defineProps({
  // canvas宽度
  width: {
    type: Number,
    default: 84
  },
  // canvas高度
  height: {
    type: Number,
    default: 32
  },
  //背景干扰点最大值
  dotColorMax: {
    type: Number,
    default: 120
  },
  // 背景干扰点最小值
  dotColorMin: {
    type: Number,
    default: 50
  },
  // 验证码图片背景色最小值
  backgroundColorMin: {
    type: Number,
    default: 200
  },
  // 验证码图片背景色最大值
  backgroundColorMax: {
    type: Number,
    default: 220
  },
  // 字体大小最小值
  fontSizeMin: {
    type: Number,
    default: 30
  },
  // 字体大小最大值
  fontSizeMax: {
    type: Number,
    default: 40
  },
})

let checkCode = ref(null)

const initCheckCode = () => {
  checkCode.value = new CheckCode('c-canvas', 4, props.width, props.height, props.dotColorMin, props.dotColorMax, props.backgroundColorMin, props.backgroundColorMax, props.fontSizeMin, props.fontSizeMax)
  checkCode.value.drawPic()
}

onMounted(() => {
  initCheckCode()
})

defineExpose({
  initCheckCode
})
</script>

<style>

</style>