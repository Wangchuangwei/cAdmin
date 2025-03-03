<template>
  <div class="tabs-view-container" >
    <div class="tags-inner-scroll-left" @click="handleLeft">
      <i class="iconfont icon-fanhui" style="color: #999; font-size: 17px;"></i>
    </div>
    <div ref="scrollBody" class="tags-inner-scroll-body" >
      <!-- <router-link>

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
import {ref, reactive} from 'vue'

const styles = reactive({})

const handleCloseCurrent = () => {

}

const handleCloseAll = () => {

}

const handleCloseOther = () => {

}
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