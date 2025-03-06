import {createUserList} from './user'
import menuList from './menu'


function randomWord(range) {
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  let str = '';
  for (let i=0;i<range;i++) {
    let pos = Math.round(Math.random() * (arr.length-1));
    str += arr[pos]
  }
  return str;
}

export default [
  // 用户登录接口
  {
    url: '/tbsp/user/login',//请求地址
    method: 'post',//请求方式
    response: ({ body }) => {
      const token = randomWord(6)
      return { respType: "S", token: token, userInfo: { userId: 1, userName: 'admin' } }
    },
  },
  // 用户权限菜单接口
  {
    url: '/tbsp/user/getMenuList',//请求地址
    method: 'post',//请求方式
    response: ({ body }) => {
      const token = randomWord(6)
      return { respType: "S", data: menuList }
    },
  },
  // 用户退出接口
  {
    url: '/tbsp/user/logout',//请求地址
    method: 'post',//请求方式
    response: ({ body }) => {
      return { respType: "S" }
    },
  },
]