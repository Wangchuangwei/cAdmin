<template>
  <div class="h-sidebar-contain" ref="sidebarContain" :class="classObject" @mouseenter="sidebarFocus=true" @mouseleave="sidebarFocus=false">
    <div class="h-sidebar-menu">
      <el-menu class="h-sidebar-drawer-menu-container" mode="vertical">
        <sidebar-item :routes="childRoute"></sidebar-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import {watchEffect, ref, computed, reactive, onBeforeMount, onMounted } from 'vue'
import storage from '@/utils/storageUtil'
import {useAppStore} from '@/store/modules/app'

import SidebarItem from './SidebarItem.vue'

const appStore = useAppStore()

const menusType = storage.getItem('menusType')
const menusNoRoot = appStore.menusNoRoot
const menusRoot = appStore.menusRoot
const activeIndex = appStore.activeIndex

let firstMountTop = reactive({});
let firstMountMaxHeight = reactive({});
let covertMenu = reactive({});
let childRoute = reactive([]);
let clickItemIndex = ref(-1); 

let sidebarFocus = ref(false)
let childRouteData = reactive([])

const isCollapse = computed(() => {
  return !sidebar.opened
})

// 获取当前子系统菜单数据
const computChildRoute = () => {
  console.log("menusType, menusRoot:",menusType, menusRoot)
  if (menusType && menusType == '1' && menusRoot.length > 0) { // 多个子系统
    let isMergeMenu = window.LOCAL_CONFIG.isMergeMenu
    console.log("isMergeMenu, menusRoot:",isMergeMenu, menusRoot)
    if (isMergeMenu) {  // 合并菜单
      let tempRoute = []
      menusRoot.forEach(item => {
        tempRoute = tempRoute.concat(item)
      })
      childRouteData = tempRoute
    } else { // 不合并菜单
      childRouteData = menusRoot[activeIndex].children
    }
  } else { // 单个系统
    childRouteData = menusNoRoot
  }
  console.log("data:",childRouteData)
}

// 获取菜单父级列表covertMenu
const rebuildMenu =  (menus) => {
  if (menus && menus.length > 0) {
    for (let menu of menus) {
      covertMenu[menu.menuCode] = menu.uppMenuCode
      if (menu.children && menu.children.length > 0) rebuildMenu(menu.children)
    }
  }
}

const rebuildChildeMenu = () => {
  firstMountTop = {};
  firstMountMaxHeight = {};
  covertMenu = {};
  rebuildMenu(childRouteData);
  console.log("example childRouteData:", childRouteData)
  if (childRouteData && childRouteData.length > 0) {
    childRoute = []
    childRouteData.forEach((item, index) => {
      let newItem = {...item}
      item.isActived = false

      if (clickItemIndex.value === -1) {
        if (index === 0) {
          newItem.isActived = true;
        }
      } else {
        if (index === clickItemIndex.value) {
          newItem.isActived = true;
        }
      }
      childRoute.push(newItem);
    })
    console.log("childRoute:", childRoute)
  }
}

const classObject = computed(() => {
  return {
    'h-sidebar-focus': sidebarFocus.value == true,
    'h-sidebar-blur': sidebarFocus.value == false,
    'openedSidebar': !isCollapse
  }
})

onBeforeMount(() => {
  computChildRoute()
  rebuildChildeMenu()
})
setTimeout(() => {
  // computChildRoute()
  console.log("appStore.menusRoot111:",appStore)
}, 1000)

onBeforeMount(() => {
  computChildRoute()
})

onMounted(() => {
  console.log("appStore, appStore.menusRoot:",appStore, appStore.menusRoot)
})
</script>