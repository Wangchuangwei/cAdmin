<script setup>
import waterMark from './components/WaterMark/waterMark.vue'

import { getCurrentInstance } from 'vue';
import { provide } from 'vue'
const instance = getCurrentInstance();

// 消息弹窗
const $tMsgbox = instance.appContext.app.config.globalProperties.$tMsgbox;
provide('$tMsgbox', $tMsgbox)
// 详情弹窗
const $modal = instance.appContext.app.config.globalProperties.$modal;
provide('$modal', $modal)
// axios
const $http = instance.appContext.app.config.globalProperties.$http;
provide('$http', $http)

console.log("example11111111:", instance.appContext)

// import { useI18n } from 'vue-i18n';
// const { locale } = useI18n();
// locale.value = 'en-US'

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
