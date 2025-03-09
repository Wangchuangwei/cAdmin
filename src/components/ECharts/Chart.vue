<template>
  <div ref="myChartsRef" :style="{ height: height, width: width }"></div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {init} from 'echarts'

let myChartsRef = ref(null)
let myChart = null

const props = defineProps({
  option: {
    type: Object,
    default: () => {
      return {}
    }
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  autoResize: {
    type: Boolean,
    default: true
  }
})

// 初始化渲染echars
const renderChart = () => {
  if (myChart) {
    // removeEvent()
  }
  myChart.setOption(props.option)
}


onMounted(() => {
  myChart = init(myChartsRef.value)
  if (props.option) {
    renderChart()
  }
})
</script>

<style>

</style>