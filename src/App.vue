<script setup>
// import waterMark from './components/waterMark.vue'
import Login from './views/system/login/Login.vue'
</script>

<template>
  <!-- <waterMark :markInfo="['cAdmin', 'copyright']" :options="{lineBreak: true,antiTamper: true}">
    <RouterView />
  </waterMark> -->
  <Login />
</template>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
}
</style>
