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
    value: 1
  },
  {
    label: '暗黑',
    icon: 'moon',
    value: 2
  },
  {
    label: '系统',
    icon: 'contrast',
    value: 3
  }
]

const changeThemeState = (value, e) => {

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
    padding: 0 3px;
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
</style>