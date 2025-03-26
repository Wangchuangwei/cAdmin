import {createUserList} from './user'
import menuList from './menu'

const FILE_DIR = '/frame-layout/mock/files/'

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
  // 上传文件
  {
    url: '/tbsp/uploadFiles',//请求地址
    method: 'post',//请求方式
    response: (res) => {
      console.log("res:", res)
      return { respType: "S" }
    },
  },
  // 获取文件
  {
    url: '/tbsp/downFile',
    method: 'get',
    response: (req) => {
      const {fileName} = req.query
      let baseUrl = 'http://' + req.headers.host + FILE_DIR
      return { respType: "S", data: {fileName: fileName, url: baseUrl + fileName} }
    }
  }
]