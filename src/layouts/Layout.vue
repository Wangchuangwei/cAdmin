<template>
  <div class="app-wrapper">
    <!-- 页面顶部 -->
    <div class="h-topbar-wrapper">
      <topbar></topbar>
    </div>
    <!-- <div class="main-wrapper" :class="{hideSidebar : !sidebar.opened}"> -->
    <div class="main-wrapper">
      <!-- 侧边栏 -->
      <sidebar class="h-sidebar-wrapper"></sidebar>
      <!-- 中间区域 -->
      <div class="main-container">
      <!-- 面包屑导航栏 -->
      <navbar></navbar>
      <!-- 内容 -->
      <app-main ref="appMain"></app-main>        
      </div>
    </div>
  </div>
</template>

<script setup>
import Topbar from './Topbar.vue'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
import AppMain from './AppMain.vue'
</script>

<style scoped>

</style>