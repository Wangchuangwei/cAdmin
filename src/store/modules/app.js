import { defineStore } from 'pinia';

export const useAppStore = defineStore('useAppStore', {
  state: () => {
    return {
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
     // 灰色模式
    }
  }
})