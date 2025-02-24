import {useUserStore} from '@/store/modules/user'
import storage from '@/utils/storageUtil'
import {arrayToTree, cloneObj } from '@/utils/arrayUtils'

import { getMenuList } from '@/api/system/login'

const whiteList = ['/login', '/forgetPasswd', '/beforepage', '/mainIndex'] // no redirect whitelist

export default function installRouterGuard(router) {
  createPageGuard(router)
}

// 后续用于针对多个导航栏进去不同系统的展示
function registRouter(to, next) {
  console.log("get in regist:")
  next()
}

function insertStr(source,start,newStr){
  return source.slice(0,start) + newStr + source.slice(start)
}

function createPageGuard(router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    debugger
    if (window.LOCAL_CONFIG.isToken) {
      if (userStore.token) {
        if (to.fullPath === '/login' || to.fullPath === '/' ) {
          next('/mainIndex')
        } else {
          let menus = storage.getItem('menus');

          if (Array.isArray(menus) && menus.length >= 0) {
            registRouter(to, next)
          } else {
            next()
            getMenuList('aa').then(() => {
              next()
            })
            // getMenuList(storage.getItem('logins')).then(res => {
            //   if (res && res.data) {
            //     next()

            //     // let data = res.data
            //     // storage.setItem({
            //     //   name: 'authObj',
            //     //   value: data,
            //     // })
            //     // let tempWorkList = [];
            //     // let menuObj = {}
            //     // // cloneObj(data).forEach(item => {
            //     // data.forEach(item => {
            //     //   // 筛选出非按钮级别的菜单
            //     //   item.title = item.menuName;
            //     //   if(item.menuHerf){
            //     //     let idx= item.menuHerf.indexOf("/",1)
            //     //     let newUrl = insertStr(item.menuHerf,idx,'/#')
            //     //     item.url = newUrl;
            //     //     menuObj[newUrl] = item
            //     //   }else{
            //     //     item.url=item.menuHerf
            //     //   }
            //     //   if (Number(item.menuLevel) != 9) {
            //     //     tempWorkList.push(item);
            //     //   }
            //     //   item.children = [];
            //     // })
            //     // storage.setItem({
            //     //   name: "menuObj",
            //     //   value: menuObj
            //     // });
            //     // // let tree = arrayToTree(tempWorkList, "menuCode", "uppMenuCode")[0].children;
            //     // debugger
            //     // console.log("example:", to)
            //   } else {
            //     if (to.path === "/mainIndex" || to.path === "/modPasswd") {
            //       next();
            //       return;
            //     }
            //   }
            // })
          }
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          next()
        } else {
          next('/login')
        }
      }      
    } else {
      next()
    }
  })
}