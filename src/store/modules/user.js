import {defineStore} from 'pinia';

export default defineStore('useUserStore', {
  state: () => {
    return {
      // 用户信息
      userInfo: {},
      // token
      token: '',
      // 权限列表
      roleList: [],
      // 超时时间
      sessionTimeout: false,
      // Last fetch time
      lastUpdateTime: 0,
    }
  },
  persist: {
    enabled: true,
  }
})