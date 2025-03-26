<template>
  <ul ref="uploadList" :class="[prefixCls + '-list']">
    <template v-for="(file, inx) in files">
      <li 
      
        :key="inx"
      >

      </li>
    </template>
  </ul>
</template>

<script setup>

const prefixCls = 'h-upload'

const props = defineProps({
  selfConfig: {
    type: Boolean,
    default: false
  },
})
</script>

<style>

</style>