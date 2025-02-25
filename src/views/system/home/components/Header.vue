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

const appStore = useAppStore();
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
  console.log("Header");
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
