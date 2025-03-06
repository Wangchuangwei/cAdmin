<template>
  <div class="h-sidebar-contain" ref="sidebarContain" :class="classObject" @mouseenter="sidebarFocus=true" @mouseleave="sidebarFocus=false">
    <div class="h-sidebar-menu" v-if="showSide">
      <el-menu class="h-sidebar-drawer-menu-container" mode="vertical" :default-active="curMenuIndex">
        <sidebar-item :routes="childRoute"></sidebar-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import {watchEffect, ref, computed, reactive, onBeforeMount, onMounted, watch, nextTick, toRaw } from 'vue'
import { useRoute } from 'vue-router';
import storage from '@/utils/storageUtil'
import {useAppStore} from '@/store/modules/app'

import SidebarItem from './SidebarItem.vue'

const appStore = useAppStore()
const route = useRoute()

const menusType = storage.getItem('menusType')
const menusNoRoot = appStore.menusNoRoot
const menusRoot = appStore.menusRoot
let activeIndex = computed(() => Number(appStore.activeIndex))
let curMenuIndex = ref('')

let firstMountTop = reactive({});
let firstMountMaxHeight = reactive({});
let covertMenu = reactive({});
let childRoute = reactive([]);
let clickItemIndex = ref(-1); 

let showSide = ref(true)

let sidebarFocus = ref(false)
let childRouteData = reactive([])

const isCollapse = computed(() => {
  return !sidebar.opened
})  

watch(route, (to) => {
  nextTick(() => {
    getActiveMenuByRouter(to.path, childRoute)
  })
})

watch(activeIndex, () => {
  showSide.value = false
  nextTick(() => {
    showSide.value = true
    computChildRoute()
    rebuildChildeMenu()
  })
})

// 获取当前路由对应的菜单
const getActiveMenuByRouter = (path, menus) => {
  if(menus && menus.length > 0) {
    for (let menu of menus) {
      if (menu.children && menu.children.length > 0) {
        let res = getActiveMenuByRouter(path, menu.children);
        if (res == true) {
          return true
        }
      } else {
        if (menu.url && menu.url.indexOf(path) != -1) {
          curMenuIndex.value = menu.menuId;
          return true
        }
      }
    }
  }
  return false;
}
// 获取当前子系统菜单数据
const computChildRoute = () => {
  childRouteData = []
  if (menusType && menusType == '1' && menusRoot.length > 0) { // 多个子系统
    let isMergeMenu = window.LOCAL_CONFIG.isMergeMenu
    // console.log("isMergeMenu, menusRoot:",isMergeMenu, menusRoot)
    if (isMergeMenu) {  // 合并菜单
      let tempRoute = []
      menusRoot.forEach(item => {
        tempRoute = tempRoute.concat(item)
      })
      childRouteData = tempRoute
    } else { // 不合并菜单
      childRouteData = menusRoot[activeIndex.value].children
    }
  } else { // 单个系统
    childRouteData = menusNoRoot
  }
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
</script>