import {login} from '@/api/system/login'
import storage from '@/utils/storageUtil'

import {defineStore} from 'pinia';
export const useUserStore =  defineStore('useUserStore', {
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
  },
  actions: {
    async login(data) {
      return new Promise((resolve, reject) => {
        console.log('Login-Login-Login-Login-Login')
        login(data).then(res => {
          const data = res.data;
          if (data.respType==="S") {
            console.log("data:", data.token)
            // this.userInfo = data.data.userInfo;
            // this.token = data.data.token;
            // this.roleList = data.data.roleList;

            resolve(data);
          } else {
            resolve(data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})