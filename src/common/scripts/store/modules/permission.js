import { defineStore } from 'pinia';
import storage from '@/common/scripts/utils/storageUtil'

import {constantRouterMap} from '@/common/scripts/router'
import  { MainIndex, Layout }  from '../../router/initRouter'
import {router} from '../../router/index'

export const usePermissionStore = defineStore('usePermissionStore', {
  state: () => {
    return {
      routers: constantRouterMap,
      addRouters: [],
      searchRoute: [],
      isUpdate: {}
    }
  },
  actions: {
    SetRouters(data) {
      this.routers = [...constantRouterMap.concat(this.routers).concat(data)]
      this.addRouters = [...data]
    },
    SearchRoute(data) {
      this.searchRoute = data
    },
    SetCursystemUpdate(data) {
      this.isUpdate[data] = true
    },
    GetSystemUpdate(data) {
      if (this.isUpdate.hasOwnProperty(data)) return this.isUpdate[data]
      return false
    },
    // 根据服务端菜单生成路由
    async GenerateRoutesByMenus(data) {
      return new Promise((resolve, reject) => {
        let accessedRoutes = filterRouterByMenus(data.sysName, data.router)
        this.SearchRoute(accessedRoutes)
        this.SetRouters(accessedRoutes)
        router.addRoute(accessedRoutes[0])
        this.SetCursystemUpdate(data.sysName)
        console.log("accessedRoutes:", accessedRoutes)
        resolve()
      })
    }
  }
})

//根据后台传回的可用menus,递归过滤异步路由表，返回符合用户角色权限的路由表
function filterRouterByMenus (sysName, routes) {
  let authList = storage.getItem('authObj') || []
  let routerList = []
  authList.forEach((item) => {
    if (item.subsystemCode === sysName && item.menuHerf) {
      if (routes.hasOwnProperty(item.menuCode)) {
        routerList.push({
          name: item.menuCode,
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
  return [{
    path: '/' + sysName,
    name: sysName,
    component: Layout,
    children: routerList
  }]
}