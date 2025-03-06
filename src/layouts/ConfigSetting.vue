<template>
  <el-drawer v-model="drawer">
    <template #header> 系统设置 </template>
    <div>
      <el-divider content-position="center">
        <i class="iconfont icon-layout"></i>
        颜色风格
      </el-divider>

      <div class="flex-center">
        <div class="theme-swatches flex-center">
          <div v-for="theme in themeStateLs" :key="theme" class="theme-swatch"
            :class="{ active: theme.value === appStore.theme }" @click="changeThemeState(theme.value, $event)">
            <i class="iconfont" :class="`icon-${theme.icon}`" /> {{ theme.label }}
          </div> 
        </div>
      </div>

      <div class="flex-around" style="margin-top: 20px;  margin-bottom: 16px">
        <template v-for="item in themeColorLs" :key="item">
          <div class="theme-color flex-center" @click="selectedColor(item)"
            :class="{active: item === appStore.pColor}"
          >
            <span :style="{ background: item }"></span>
          </div>
        </template>
        <input class="selThemeColor" type="color" v-model="appStore.pColor" />
      </div>

      <el-divider content-position="center">
        <i class="iconfont icon-layout"></i>
        排版样式
      </el-divider>

      <el-divider content-position="center">
        <i class="iconfont icon-layout"></i>
        全局主题
      </el-divider>
    </div>
  </el-drawer>
</template>

<script setup>
import {ref ,computed} from 'vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const props = defineProps(['showConfigSetting'])
const drawer = computed(() => props.showConfigSetting)

const themeStateLs = [
  {
    label: '明亮',
    icon: 'sun',
    value: 'light'
  },
  {
    label: '暗黑',
    icon: 'moon',
    value: 'dark'
  },
  {
    label: '系统',
    icon: 'contrast',
    value: 'system'
  }
]
const themeColorLs = [
  '#F53F3F',
  '#00B42A',
  '#3491FA',
  '#F77234',
  '#F5319D'
]

const changeThemeState = (value, e) => {
  appStore.theme = value
}

const selectedColor = (color) => {
  appStore.pColor = color
}
</script>

<style lang="scss" scoped>
.theme-swatches {
  padding: 3px;
  border-radius: 5px;
  margin-top: 20px;
  background: #E5E6EB;
  color: #1D2129;

  .theme-swatch { 
    min-width: 50px;
    height: 25px;
    line-height: 25px;
    padding: 0 5px;
    text-align: center;
    font-size: 13px;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      color: #00B42A;
    }

    &.active {
      background: #fff;
    }
  }
}

.theme-color { 
  border: 1px solid #00B42A;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    border: 2px solid #00B42A;
  }

  span {
    display: inline-block;
    width: 25px;
    height: 15px;
    border-radius: 50%;
    transform: rotate(-45deg)
  }

  &.active {
    border: 2px solid #00B42A;

    span {
      transform: rotate(0deg);
    }
  }
}

.selThemeColor {
  border: 1px solid #00B42A;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  box-sizing: border-box;
  background: #fff;
}
</style>