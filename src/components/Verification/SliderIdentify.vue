<!-- 滑动验证码 -->
<template>
  <div ref="dragDiv" class="drag-container">
    <!-- 滑动展示区域 -->
    <div ref="dragBg" class="drag-bg"></div>
    <!-- 滑块容器文本 -->
    <div ref="dragText" class="drag-text">{{confirmWords}}</div>
    <!-- 拖动元素 -->
    <div 
      ref="moveDiv" 
      id="moveDiv"
      :class="{ handler_ok_bg: !confirmSuccess }"
      class="handler handler_bg"
      style="position: absolute; top: 0px; left: 0px;"  
      @mousedown="mousedownFn($event)"
    ></div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {on, off} from '@/utils/dom'

const dragDiv = ref(null)
const dragBg = ref(null)
const dragText = ref(null)
const moveDiv = ref(null)

const maxWidth = ref()  // 拖动最大宽度
const mousePressing = ref(false) // 是否正在按压滑块
const beginClientX = ref(0)  // 距离左端距离
const confirmWords = ref('按住滑块，拖动到最右边') // 提示文字
const confirmSuccess = ref(false) // 验证成功

const mousedownFn = (e) => {
  if (!mousePressing.value) {
    mousePressing.value = true
    beginClientX.value = e.clientX
  }
}
const mousemoveFn = (e) => {
  if (mousePressing.value) {
    const width = e.clientX - beginClientX.value
    if (width > 0 && width <= maxWidth.value) {
      moveDiv.value.style.left = width + 'px'
      dragBg.value.style.width = width + 'px'

      moveDiv.value.classList.remove('success');
      moveDiv.value.classList.add('default'); // 切换为默认状态
    } else if (width > maxWidth.value) {
      successFn()
    }
  }
}

const mouseupFn = (e) => {
  mousePressing.value = false
  const width = e.clientX - beginClientX.value
  if (width < maxWidth.value) {
    moveDiv.value.style.left = 0 + 'px'
    dragBg.value.style.width = 0 + 'px'
  }
}

const successFn = () => {
  confirmSuccess.value = true
  confirmWords.value = '验证成功'
  off(document.getElementById('moveDiv'), 'mousemove', mousemoveFn)
  off(document.getElementById('moveDiv'), 'mouseup', mouseupFn)

  dragText.value.style.color = '#fff'
  moveDiv.value.style.left = maxWidth.value + 'px'
  dragBg.value.style.width = maxWidth.value + 'px'

  moveDiv.value.classList.remove('default');
  moveDiv.value.classList.add('success'); // 切换为成功状态
}

const reset = () => {
  moveDiv.value.style.left = 0 + 'px'
  dragBg.value.style.width = 0 + 'px'
  moveDiv.value.classList.add('default');
  dragText.value.style.color = '#333'
  confirmSuccess.value = false
  mousePressing.value = false
  maxWidth.value = dragDiv.value.clientWidth - moveDiv.value.clientWidth
  on(document.getElementById('moveDiv'), 'mousemove', mousemoveFn)
  on(document.getElementById('moveDiv'), 'mouseup', mouseupFn)
}

onMounted(() => {
  moveDiv.value.classList.add('default');
  maxWidth.value = dragDiv.value.clientWidth - moveDiv.value.clientWidth
  on(document.getElementById('moveDiv'), 'mousemove', mousemoveFn)
  on(document.getElementById('moveDiv'), 'mouseup', mouseupFn)
})
</script>

<style scoped>
.drag-container {
  position: relative;
  height: 32px;
  background: #e8e8e8;
}

.drag-bg {
  background: #57d188;
  height: 32px;
  width: 0px;
}

.drag-text {
  position: absolute;
  line-height: 32px;
  top: 0px;
  width: 100%;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}

.handler {
  width: 40px;
  height: 32px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  cursor: move;
}

.handler_bg::before {
  font-family: 'iconfont'; 
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px; 
  color: #333; 
}
/* 默认状态 */
.handler_bg.default::before {
  content: "\e62f"; /* 默认图标 */
}

/* 滑动后的状态 */
.handler_bg.success::before {
  content: "\e77d"; /* 新图标 */
}
</style>