<template>
  <div  class="selfMenu">
    <div v-for="(item, index) in routes" :key="item.menuId">
      <!-- 无hidden，无children，有url 为菜单 -->
      <el-menu-item v-if="!item.hasOwnProperty('hidden') && !item.children " :index="item.menuId" @click="navigate(item.url)">
        <i class="menuiconfont iconfont" :class="`icon-${item.menuIcon}`"  :style="{color: colorArray[index%13]}" ></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
      <!-- 无hidden，有children但长度为0，有url 为菜单 -->
       <el-menu-item v-else-if="!item.hasOwnProperty('hidden') && item.children && item.children.length == 0 && item.url" :index="item.menuId" @click="navigate(item.url)">
        <i class="menuiconfont iconfont" :class="`icon-${item.menuIcon}`"  :style="{color: colorArray[index%13]}" ></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
      <!-- 无hidden，有children且长度大于0 为菜单组 -->
      <el-sub-menu v-else-if="!item.hasOwnProperty('hidden') && item.children && item.children.length > 0" :index="item.menuId">
        <template #title>
          <i class="menuiconfont iconfont" :class="`icon-${item.menuIcon}`"  :style="{color: colorArray[index%13]}" ></i>
          <span>{{ item.title }}</span>
        </template>
        <template v-for="(child, i) in item.children" :key="i.menuId">
          <!-- 继续递归遍历 -->
           <sidebar-item v-if="!child.hidden" class="menu-indent nest-menu" :routes="[child]"></sidebar-item>
        </template>
      </el-sub-menu>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { router } from '@/router';

defineOptions({name: 'sidebar-item'})
const props = defineProps({
  routes: {
    type: Array,
    default: () => []
  }
})

const colorArray = ['#406EE8','#13C2C2','#33CA66','#EF4864','#8543E0','#2F32CE','#2E9AFF','#089B79','#EA22AB','#E64807','#FF7B63','#8065F5','#CE64E5']
const navigate = (url) => {
  // window.open(url)
  console.log("url:", url)
  router.push(url)
}

onMounted(() => {
  console.log("props.routes:", props.routes)
})
</script>

<style lang="scss" scoped>
.menuiconfont {
  float: left;
  margin-right: 8px;
  margin-left: 6px;
  font-size: 20px;
  color: #747577;
}
</style>