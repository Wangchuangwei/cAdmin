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
          console.log('res', res.respType==="S")
          if (res.respType==="S") {
            storage.clear();//清空全部缓存
            storage.setItem({
              name: 'logins',
              value: res,
            })
            this.userInfo = res.userInfo;
            this.token = res.token;
            resolve(res);
          } else {
            resolve(res)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})