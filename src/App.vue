<script setup>
import waterMark from './components/WaterMark/waterMark.vue'

import { getCurrentInstance } from 'vue';
import { provide } from 'vue'
const instance = getCurrentInstance();

const $tMsgbox = instance.appContext.app.config.globalProperties.$tMsgbox;
provide('$tMsgbox', $tMsgbox)

</script>

<template>
  <waterMark :markInfo="['cAdmin', 'copyright']" :options="{lineBreak: true,antiTamper: true}">
  </waterMark>
  <RouterView />
</template>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
}
</style>
