import {useUserStore} from '@/common/scripts/store/modules/user'
import {useAppStore} from '@/common/scripts/store/modules/app'
import {router} from '../index'
import storage from '@/common/scripts/utils/storageUtil'
import {arrayToTree, cloneObj } from '@/common/scripts/utils/arrayUtils'

import { getMenuList } from '@/common/scripts/api/system/login'
import {getChildData} from '../../entry/getChildData'

import  { MainIndex, Layout }  from '../initRouter'

const whiteList = ['/login', '/forgetPasswd', '/beforepage'] // no redirect whitelist

export default function installRouterGuard(router) {
  createPageGuard(router)
}

function GenerateRoutesByMenus(sysName, routes) {
  let authList = storage.getItem('authObj') || []
  let routerList = []
  console.log("router111:", router,router.getRoutes())
  authList.forEach((item) => {
    if (item.subsystemCode === sysName && item.menuHerf) {
      if (routes.hasOwnProperty(item.menuCode)) {
        // let idx= item.menuHerf.indexOf("/",1)
        routerList.push({
          name: item.menuCode,
          // path: item.menuHerf.slice(idx),
          path: item.menuHerf,
          component: routes[item.menuCode],
          meta: {
              id:item.menuCode,
              title: item.menuCode,
              isKeepAlive: item.isKeepAlive === '1' ? true:false
          }
        })
      }
    }
  })
  let addRoute = {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: routerList
  }

  console.log("router123:", router,router.getRoutes(), addRoute.name)

  // 如果路由已存在，先移除
  if (routeExists(addRoute.name)) {
    router.removeRoute(addRoute.name);
    console.log("router17777:", router,router.getRoutes())

    // 添加新的路由
    router.addRoute(addRoute);
  }


  console.log("router222:", router,router.getRoutes())

  // 检查路由是否已存在
  function routeExists(name) {
    return router.getRoutes().some(route => route.name === name);
  }
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
async function registRouter(appStore, to, next) {
  if (storage.getItem('menusType') == '0') {
    // 没有子系统的显示，只有菜单栏,根据views所在的名称进行获取对应router/store/locale等【极端情况】
  } else {
    let curSYSName=""
    //let curMenu=[]
    let toArr = to.path.split('/')
    let path = to.path + to.hash
    console.log("to:", to, appStore.menusRoot)
    if (toArr && toArr[1] !== '') {
      appStore.menusRoot.some((item, index) => {
        let res = findRouterToMenu(path, item.children);
        if (res && res.subsystemCode=== item.subsystemCode) {
          appStore.ActiveRootIndex(index + '')
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

    console.log("curSYSNAME:", curSYSName) // basicPlatform

    await getChildData(curSYSName).then(res => {
      console.log("res:", res)
      GenerateRoutesByMenus(curSYSName, res.default.router)

      next()

    }).catch(err => {
      return false
    })
    // next('/mainIndex')

  }
}

function insertStr(source,start,newStr){
  return source.slice(0,start) + newStr + source.slice(start)
}

function createPageGuard(router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const appStore = useAppStore()
    debugger
    if (window.LOCAL_CONFIG.isToken) {
      if (userStore.token) {
        if (to.fullPath === '/login' || to.fullPath === '/' ) {
          next('/mainIndex')
        } else {
          let menus = storage.getItem('menus');
          // console.log("menus.length, appStore.menusRoot.length:", menus.length, appStore.menusRoot.length)
          if (Array.isArray(menus) && menus.length >= 0 && appStore.menusRoot.length <= 0) { // 处理F5刷新丢失menusRoot
            appStore.GenerateMenuByMenus(menus)
            await registRouter(appStore, to, next)
          } else if (Array.isArray(menus) && menus.length >= 0 && appStore.menusRoot.length > 0) {
            appStore.GenerateMenuByMenus(menus)
            await registRouter(appStore, to, next)
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
              cloneObj(data).forEach(item => {
              // data.forEach(item => {
                // 筛选出非按钮级别的菜单
                item.title = item.menuName;
                if(item.menuHerf){
                  let idx= item.menuHerf.indexOf("/",1)
                  // let newUrl = insertStr(item.menuHerf,idx,'/#')
                  let newUrl = insertStr(item.menuHerf,idx,'')
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
              console.log("tree:", tree)
              appStore.GenerateMenuByMenus(tree)
              if (to.path === "/mainIndex" || to.path === "/modPasswd") {
                console.log("to123:", to)
                next();
              } else {
                await registRouter(appStore, to, next)
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