import { defineStore } from 'pinia';
import storage from '@/utils/storageUtil'

export const useAppStore = defineStore('useAppStore', {
  state: () => {
    return {
      activeIndex: '0', // 当前激活的根菜单
      sidebar: {
        opened: true,
        withoutAnimation: false,
        // 侧边栏折叠
        collapse: false,
      },
      device: 'desktop',
      // 语言
      language: 'zh',
      // 主题
      theme: 'light',
      pColor: '#165dff',
      menusRoot: [], // 有多个子系统
      menusNoRoot: [], // 仅有一个系统[没有头部菜单],
    }
  },
  actions: {
    GenerateMenuByMenus(data) {
      if (data && data.length >= 0) {
        if (data.length > 0) {
          storage.setItem({ name: 'menus', value: data })
          storage.setItem({ name: 'menusType', value: '1'})
        } else {
          storage.setItem({ name: 'menus', value: data })
          storage.setItem({ name: 'menusType', value: '0' })  // 没有子系统
        }
        this.SetMenuRoot(data)
      }
    },
    SetMenuRoot(data) {
      this.menusRoot = data
    },
    ActiveRootIndex(data) {
      this.activeIndex = data
    }
  }
})