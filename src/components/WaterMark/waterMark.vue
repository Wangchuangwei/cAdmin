<!-- 水印组件 -->
<template>
  <div class="watermark-container" ref="waterMmark">
    <div class="watermark" ref="mark"  :style="{ backgroundImage: `${bgUrl}`}">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useDebounce from '@/utils/debounce'

const props = defineProps({
  markInfo: {
    type: [String,Array],
    required: true
  },
  options: {
    type: Object,
  },
})

const defaultOptions = {
  width: 500,
  height: 300,
  fontColor: '#000',
  fontSize: 30,
  fontWeight: 'normal',
  fontFamily: 'Arial',
  textAlign: 'center',
  textBaseline: 'middle',
  opacity: 0.8,
  rotate: (-45 * Math.PI) / 180,  

  gapX: 100,
  offsetX: 0,
  offsetY: 0,
  maxWidth: 200,
  lineBreak: false, // 是否换行

  antiTamper: true
}
const options =  Object.assign({}, defaultOptions, props.options) 
const bgUrl = ref('')
const waterMmark= ref()
const mark = ref()
const canvas = document.createElement('canvas')
canvas.width = options.width
canvas.height = options.height
const ctx = canvas.getContext('2d')
ctx.fillStyle = options.fontColor
ctx.font = `${options.fontWeight} ${options.fontSize}px ${options.fontFamily}`
ctx.textAlign = options.textAlign
ctx.textBaseline = options.textBaseline
// 设置全局透明度
ctx.globalAlpha = options.opacity;  
ctx.translate(options.width / 2, options.height / 2)
ctx.rotate(options.rotate)

/**
 * 绘制水印
 * 该函数通过canvas在页面上绘制水印
 */
const drawWaterMark = async() => {
  if (!props.markInfo) throw new Error('markInfo is required')
  // array 表示文字数组，否则为图片地址
  if (Array.isArray(props.markInfo)) {
    props.markInfo.forEach((item, index) => {
      if (options.lineBreak) {
        // y方向上的偏移也可以用字体大小来
        ctx.fillText(item, 0, options.offsetY + options.fontSize * index, options.maxWidth);
      } else {
        ctx.fillText(item, options.offsetX + options.gapX * index, 0, options.maxWidth);
      }
    })
  } else {
    try {
      const img = await isImageByDom(props.markInfo)
      // 绘制图片 画布上起始位置，绘制的图片大小
      ctx.drawImage(img, -options.width / 2, -options.height / 2, options.width, options.height);
    } catch (error) {
      ctx.fillText(props.markInfo, options.offsetX, options.offsetY, options.maxWidth);
    }
  }
  setUrl(canvas.toDataURL("image/png"))
}

/**
 * 设置页面背景图片
 */
const setUrl = (url) => {
  bgUrl.value = `url(${url})` 
}

const isImageByDom = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject(new Error('图片加载失败'))
    }
  })
}

/**
 * 创建一个MutationObserver实例，监听DOM属性的变化
 * 
 * 当观察到DOM元素的属性发生变化时，调用drawWaterMark函数重新绘制水印
 */
let observer = new MutationObserver(mutationsList => {
  // console.log("example:", mutationsList)
  mutationsList.forEach(mutation => { 
    if (mutation.removedNodes[0] = mark.value) {
      createMarkDeb()
    } 
  })
})

const createMarkDeb = () => {
  drawWaterMark()
}

onMounted(() => {
  if (options.antiTamper) {
    // 观察的节点，以及配置
    observer.observe(mark.value, {
      attributes: true,
      childList: true,
      subtree: true,
    })    
  }

  createMarkDeb()
})

</script>

<style lang="scss" scoped>
.watermark-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  & .watermark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    pointer-events: none;
  }
}
</style>