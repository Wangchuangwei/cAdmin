<template>
  <div class="header__container">
    <div class="header__content__left">
      <div @click="toFold">
        <el-icon v-if="appStore.opened"><Expand /></el-icon>
        <el-icon v-else><Fold /></el-icon>
      </div>
      <div @click="reFresh">
        <el-icon><RefreshRight /></el-icon>
      </div>
    </div>
    <div class="header__content__nav">
      <template v-if="!isMergeMenu && menusRoot.length > 0">
        <div class="h-system-list">
          <div class="h-system-item">
            <el-menu :default-active="activeIndex" mode="horizontal" style="height: 100%" >
              <el-menu-item   
                  v-for="(item, index) in menusRoot" 
                  :key="item.menuId" 
                  :index='item.menuId' 
                >
                  {{ item.title }}
                </el-menu-item>       
            </el-menu>
          </div>
        </div>
      </template>
    </div>
    <div class="header__content__right">
      <div class="contruller">
        <el-icon><Search /></el-icon>
      </div>
      <div class="contruller">
        <el-icon><Setting /></el-icon>
      </div>
      <div class="contruller">
        <el-icon><Sunny /></el-icon>
      </div>
      <div class="contruller">
        <el-icon><FullScreen /></el-icon>
      </div>
      <div class="contruller">
        <el-icon><Bell /></el-icon>
      </div>
      <div class="contruller">
        <el-popover placement="bottom" :width="150" trigger="hover">
          <template #reference>
            <img class="avatar" src="@/assets/images/header.png" alt="" />
          </template>
          <div @click="toLock">
            <el-icon><Lock /></el-icon>
            <span> 锁定屏幕 </span>
          </div>
          <div @click="sureToExit">
            <el-icon><SwitchButton /></el-icon>
            <span> 退出登录 </span>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Expand,
  Fold,
  RefreshRight,
  Search,
  Setting,
  Sunny,
  FullScreen,
  Bell,
  Lock,
  SwitchButton,
} from "@element-plus/icons-vue";
import { useAppStore } from "@/store/modules/app";
import { router } from '@/router';

const appStore = useAppStore();

const isMergeMenu = window.LOCAL_CONFIG.isMergeMenu
const menusRoot = appStore.menusRoot
let activeIndex = ref(0)


//获取子系统首个路由页面
const getFirstUrl = (children) => {
  if (children && children.length > 0) {
    if (children[0].children && children[0].children.length > 0) {
      getFirstUrl(children[0].children[0]);
    } else if (children[0].url) {

      router.push({path: children[0].url})
      return true
    }
  }
};

//切换子系统，更新对应的sidebar
const activeSidebar = (index, menuId, systemCode) => {
  if (index >= 0) {
    // menusRoot[index].children = menusRoot[index].children

    appStore.ActiveRootIndex(index)
  }
  //跳转子系统首个路由页面
  getFirstUrl(this.menusRoot[index].children);
}

const toFold = () => {
  appStore.opened = !appStore.opened;
};

const reFresh = () => {
  console.log("刷新");
};

const toLock = () => {
  console.log("锁定屏幕");
};

const sureToExit = () => {
  console.log("退出登录");
};

onMounted(() => {
  activeIndex.value = appStore.activeIndex
});
</script>

<style lang="scss" scoped>
.header__container {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  border-bottom: 1px solid #f2f3f5;
}
.header__content__left {
  display: flex;
  gap: 10px;
  height: 100%;
  align-items: center;
}
.header__content__nav {
  flex: 1;
  padding: 0 50px;

  .h-system-list {
    overflow: hidden;
    position: relative;
    height: 100%;
    .h-system-item {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }
  }
}
.header__content__right {
  display: flex;
  gap: 10px;
  height: 100%;
  align-items: center;

  .contruller {
    margin: 0 10px;
    display: flex;
    align-items: center;
    height: 100%;

    &:hover {
      cursor: pointer;
    }
  }
}

.avatar {
  border-radius: 50%;
  height: 30px;
  width: 30px;
}
.el-popover {
  div {
    height: 30px;
    display: flex;
    align-items: center;
    padding-left: 10px;

    span {
      margin-left: 5px;
    }

    &:hover {
      cursor: pointer;
      color: #165DFF;
    }
  }
}
</style>
