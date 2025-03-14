<template>
  <div class="tabs-view-container" >
    <div class="tags-inner-scroll-left" @click="handleLeft">
      <i class="iconfont icon-fanhui" style="color: #999; font-size: 17px;"></i>
    </div>
    <div ref="scrollBody" class="tags-inner-scroll-body">
      <span v-for="(tag, index) in visitedViews" :key="tag.path">
        <h-tag 
          closable 
          :name="tag.name" 
          :color="isActive(tag.path)? 'active' : 'default'"  
          @onClose='closeViewTabs($event, tag, index)'
          @click.right.stop.prevent="closeChoice($event, tag, index)"
        >{{tag.name }}</h-tag>
      </span>

      <!-- <router-link v-for="(item, index) in visitedViews" :key="item.path">
        {{item.name }}
      </router-link> -->
    </div>
    <div class="tags-inner-scroll-right" @click="handleRight">
      <i class="iconfont icon-gengduo" style="color: #999; font-size: 17px;"></i>
    </div>
    <ul class="h-tag-close-tip" :style="styles" v-clickoutside="handleHide">
      <li class="h-tag-close-tip-item" @click.stop.prevent="handleCloseCurrent()">
        <span>关闭当前选项卡</span>
      </li>
      <li class="h-tag-close-tip-item" @click.stop.prevent="handleCloseAll()">
        <span>关闭全部选项卡</span>
      </li>
      <li class="h-tag-close-tip-item" @click.stop.prevent="handleCloseOther()">
        <span>关闭当前以外选项卡</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref, reactive, watch, computed, nextTick} from 'vue'
import {useRoute} from 'vue-router'
import { router } from '@/common/scripts/router';

import {useAppStore} from '@/common/scripts/store/modules/app'
import storage from '@/common/scripts/utils/storageUtil'

import HTag from '@/common/components/HTag/HTag.vue'

const route = useRoute()
const appStore = useAppStore()

const limit = window.LOCAL_CONFIG.TABS_VIEW_LIMIT

let styles = ref({})
let curTag = reactive({})

const visitedViews = computed(() => {
  if (appStore.visitedViews.length > limit) {

    // 若页面有缓存，清除当前页面缓存
    if (window.LOCAL_CONFIG.isRefresh) {
      console.log("清除当前页面缓存")
    }
  }
  let arr = appStore.visitedViews
  // 确保第一个tab是首页
  // if (arr[0] && arr[0].path !== '/mainIndex') {
  //   arr.unshift(appStore.visitedViews[0])
  // }
  storage.setItem({name: 'visitedViews', value: arr})

  return arr
})

const handleHide = () => {
  styles.value = {}
}

const handleCloseCurrent = () => {
  closeViewTabs(curTag.$event, curTag.view, curTag.index)
  styles.value = {}
  curTag = {}
}

const handleCloseAll = () => {
  appStore.DelAllVisitedViews()
  // 若页面有缓存，清除当前页面缓存
  if (window.LOCAL_CONFIG.isRefresh) {
    console.log("清除当前页面缓存")
  }
  nextTick(() => {
    router.push({path: visitedViews.value[0].path})
  })
  styles.value = {}
  curTag = {}
}

const handleCloseOther = () => {
  appStore.DelOtherVisitedViews(curTag.view)
  styles.value = {}
  curTag = {}
}

const closeViewTabs = ($event, view, index) => {
  appStore.DelCurVisitedViews(view)
  // 若页面有缓存，清除当前页面缓存
  if (window.LOCAL_CONFIG.isRefresh) {
    console.log("清除当前页面缓存")
  }

  // $event.preventDefault()
  if (isActive(view.path)) {
    nextTick(() => {
      visitedViews.value.length < index + 1 ? router.push({path: visitedViews.value[index - 1].path}) : router.push({path: visitedViews.value[index].path})
    })
  }
}

const closeChoice = ($event, view, index) => {
  // 确保最后一个的宽度足够展示
  if (window.innerWidth - $event.clientX > 148) {
    styles.value = {
      display: 'block',
      top: `${$event.clientY}px`,
      left: `${$event.clientX}px`,
      height: '100px'
    }
    curTag = {
      event: $event,
      view: view, 
      index: index
    }
  } else {
    styles.value = {
      display: 'block',
      top: `${$event.clientY}px`,
      left: `${$event.clientX - 148}px`,
      height: '100px'
    }
    curTag = {
      event: $event,
      view: view, 
      index: index
    }
  }
}

const isActive = (path) => {
  // console.log("route:", route)
  return path === route.path
}

// 添加tab
const addViews = () => {
  appStore.AddVisitedViews(route)
}

watch(route, (to) => {
  addViews()
  nextTick(() => {
    // getActiveMenuByRouter(to.path, childRoute)
  })
})
</script>

<style lang="scss" scoped>
.tabs-view-container {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  .tags-inner-scroll-left {
    color: #CCCCCC;
    position: absolute;
    height: 34px;
    line-height: 34px;
    width: 17px;
    text-align: center;
    //border-right: 1px solid $navbar-tag-padding-bordercolor;
    background: #E6EBF5;
    z-index: 9;
    cursor: pointer;
  }

  .tags-inner-scroll-right {
    color: #CCCCCC;
    height: 34px;
    line-height: 34px;
    width: 17px;
    text-align: center;
    //border-left: 1px solid $navbar-tag-padding-bordercolor;
    background: #E6EBF5;
    z-index: 9;
    position: absolute;
    right: 0;
    // float: right;
    cursor: pointer;
  }

  .tags-inner-scroll-body {
    position: absolute;
    padding: 0px 22px;
    overflow: visible;
    white-space: nowrap;
    -webkit-transition: left .3s ease;
    transition: left .3s ease;
  }

  .h-tag-close-tip {
    display: none;
    position: fixed;
    width: 148px;
    height: 100px;
    padding: 2px 0;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);

    &-item {
      display: block;
      height: 32px;
      line-height: 32px;
      outline: none;
      list-style: none;
      font-size: 13px;
      cursor: pointer;
      span {
        display: block;
        padding-left: 10px
      }
      &:hover {
        background: #78C1DE;
        color: #fff;
      }
    }
  }
}
</style>