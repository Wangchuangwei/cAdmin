import fetch from '@/api/config/api'

export function login(userInfo) {
  let data = userInfo;
  return new Promise((resolve, reject) => {
    if (userInfo.type == 'passwd') {
      resolve(fetch.post('/tbsp/user/login', userInfo))
    } else if(userInfo.type == 'ukey') {
      resolve(fetch.post('/tbsp/ukey/login', userInfo))
    } else {
      resolve(fetch.post('/tbsp/mobile/login', userInfo))
    }
  })
}

export function getMenuList(logins) {
  return new Promise((resolve, reject) => {
    resolve(fetch.post('/tbsp/user/getMenuList', logins))
  })
}