import {useUserStore} from '@/store/modules/user'
import storage from '@/utils/storageUtil'
import {arrayToTree, cloneObj } from '@/utils/arrayUtils'

import { getMenuList } from '@/api/system/login'

import {useAppStore} from '@/store/modules/app'
import { createPinia } from 'pinia';

const whiteList = ['/login', '/forgetPasswd', '/beforepage'] // no redirect whitelist
const pinia = createPinia()
const appStore = useAppStore(pinia)

export default function installRouterGuard(router) {
  createPageGuard(router)
}

/*
 * 根据路由跳转信息找到对应的菜单
 */
function findRouterToMenu(toHash, menus) {
  let obj = storage.getItem("menuObj")
  let index=toHash.indexOf("?");
  let toHashUrl ="";
  if(index != -1){
    toHashUrl = toHash.substring(0, index);
  }else{
    toHashUrl = toHash
  }
  if (obj[toHashUrl]) {
    storage.setItem({
      name: "curMenu",
      value: obj[toHashUrl]
    })
    return  obj[toHashUrl]
  }
  return false;
}

// 后续用于针对多个导航栏进去不同系统的展示   用于根据权限生成路由
function registRouter(to, next) {
  if (storage.getItem('menusType') == '0') {
    // 没有子系统的显示，只有菜单栏,根据views所在的名称进行获取对应router/store/locale等【极端情况】
  } else {
    let curSYSName=""
    //let curMenu=[]
    let toArr = to.path.split('/')
    let path =to.path+to.hash
    console.log("to:", to)
    if (toArr && toArr[1] !== '') {
      appStore.menusRoot.some((item, index) => {
        let res = findRouterToMenu(path, item.children);
        if (res && res.subsystemCode=== item.subsystemCode) {
          appStore.ActiveRootIndex(index)
          curSYSName = res.subsystemCode
          return true
        } else {
          return false
        }
      })

    }
    //保存第一次进入的路由是哪一个模块下的
    storage.setItem({
      name: "curSYSName",
      value: curSYSName
    })
    next()
  }
}

function insertStr(source,start,newStr){
  return source.slice(0,start) + newStr + source.slice(start)
}

function createPageGuard(router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    if (window.LOCAL_CONFIG.isToken) {
      if (userStore.token) {
        if (to.fullPath === '/login' || to.fullPath === '/' ) {
          next('/mainIndex')
        } else {
          let menus = storage.getItem('menus');
          // console.log("menus.length, appStore.menusRoot.length:", menus.length, appStore.menusRoot.length)
          if (Array.isArray(menus) && menus.length >= 0 && appStore.menusRoot.length <= 0) { // 处理F5刷新丢失menusRoot
            appStore.GenerateMenuByMenus(menus)
            registRouter(to, next)
          } else if (Array.isArray(menus) && menus.length >= 0 && appStore.menusRoot.length > 0) {
            appStore.GenerateMenuByMenus(menus)
            registRouter(to, next)
          } else {
            const res = await getMenuList(storage.getItem('logins'))
            if (res && res.data) {
              let data = res.data
              storage.setItem({
                name: 'authObj',
                value: data,
              })
              let tempWorkList = [];
              let menuObj = {}
              // // cloneObj(data).forEach(item => {
              data.forEach(item => {
                // 筛选出非按钮级别的菜单
                item.title = item.menuName;
                if(item.menuHerf){
                  let idx= item.menuHerf.indexOf("/",1)
                  let newUrl = insertStr(item.menuHerf,idx,'/#')
                  item.url = newUrl;
                  menuObj[newUrl] = item
                }else{
                  item.url=item.menuHerf
                }
                if (Number(item.menuLevel) != 9) {
                  tempWorkList.push(item);
                }
                item.children = [];
              })
              storage.setItem({
                name: "menuObj",
                value: menuObj
              });
              let tree = arrayToTree(tempWorkList, "menuCode", "uppMenuCode")[0].children;
              appStore.GenerateMenuByMenus(tree)
              if (to.path === "/mainIndex" || to.path === "/modPasswd") {
                console.log("to123:", to)
                next();
              } else {
                registRouter(to, next)
              }
            } else {
              if (to.path === "/mainIndex" || to.path === "/modPasswd") {
                next();
              }
            }
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