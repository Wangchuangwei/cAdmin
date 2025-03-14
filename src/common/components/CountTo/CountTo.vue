<template>
  <span>
    <slot :value="cur_count">{{cur_count}}</slot>
  </span>
</template>

<script setup>
import {ref} from 'vue'

let cur_count = ref(0)

const props = defineProps({
  count: {
    type: Number,
  },
  // 单位：秒
  duration: {
    type: Number,
  }
})

const countAnimation = (count) => {
  let handle, content = 0;
  // requestAnimationFrame 每秒大约60帧 就是每秒的执行次数 所以这里  *60
  let per_count = count / (props.duration * 60)

  const fn = () => {
    if (count <= content + per_count) {
      // 因为精度问题 最后一次执行 不一定满足 === number
      cancelAnimationFrame(handle)
      content = count
    } else {
      content += per_count
      handle = requestAnimationFrame(fn)
    }
    cur_count.value = Math.floor(content)
  }
  requestAnimationFrame(fn)
}

countAnimation(props.count)
</script>

<style>

</style>