<template>
  <div class="h-sidebar-contain" ref="sidebarContain" :class="classObject" @mouseenter="sidebarFocus=true" @mouseleave="sidebarFocus=false">
    <div class="h-sidebar-menu">

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const sidebarFocus = ref(false)

const isCollapse = computed(() => {
  return !sidebar.opened
})

const classObject = computed(() => {
  return {
    'h-sidebar-focus': sidebarFocus.value == true,
    'h-sidebar-blur': sidebarFocus.value == false,
    'openedSidebar': !isCollapse
  }
})
</script>

<style lang="scss" scoped>
.h-sidebar-contain {
  background: #fff;
  color: #192229;
  width: 200px;
  font-size: 14px;
  top: 50px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: non
}
</style>
