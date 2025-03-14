import { defineStore } from 'pinia';
import storage from '@/common/scripts/utils/storageUtil'

//根据后台传回的可用menus,递归过滤异步路由表，返回符合用户角色权限的路由表
function filterRouterByMenus (router, menus) {

}

export const useAppStore = defineStore('useAppStore', {
  state: () => {
    return {
      activeIndex: '0', // 当前激活的根菜单
      sidebar: {
        opened: true,
        withoutAnimation: false,
        // 侧边栏折叠
        collapse: false,
      },
      device: 'desktop',
      // 语言
      language: 'zh',
      // 主题
      theme: 'light',
      pColor: '#165dff',
      menusRoot: [], // 有多个子系统
      menusNoRoot: [], // 仅有一个系统[没有头部菜单],
      visitedViews: [], // 记录访问过的路由
    }
  },
  actions: {
    // 根据服务端菜单生成路由
    GenerateRoutesByMenus(data) {

    },
    GenerateMenuByMenus(data) {
      if (data && data.length >= 0) {
        if (data.length > 0) {
          storage.setItem({ name: 'menus', value: data })
          storage.setItem({ name: 'menusType', value: '1'})
        } else {
          storage.setItem({ name: 'menus', value: data })
          storage.setItem({ name: 'menusType', value: '0' })  // 没有子系统
        }
        this.SetMenuRoot(data)
      }
    },
    SetMenuRoot(data) {
      this.menusRoot = data
    },
    ActiveRootIndex(data) {
      this.activeIndex = data
    },
    AddVisitedViews(data) {
      if (storage.getItem('curMenu')) {
        let curMenu = storage.getItem('curMenu')
        if (this.visitedViews.some(v => v.path === curMenu.url)) {
          let oriIdx = this.visitedViews.findIndex(v => v.path === curMenu.url)
          this.visitedViews[oriIdx].query = data.query
          // 超出限制并存在当前页，被隐藏时。
          if (data.path != '/mainIndex' && oriIdx <= (this.visitedViews.length - window.LOCAL_CONFIG.TABS_VIEW_LIMIT)){
            let item = this.visitedViews.splice(oriIdx, 1)
            this.visitedViews.push(item)
          }
          return
        }
        this.visitedViews.push({name: curMenu.menuName, path: curMenu.url})
      }
    },
    DelCurVisitedViews(data) {
      for (const [k,v] of this.visitedViews.entries()) {
        if (v.path == data.path) {
          this.visitedViews.splice(k,1)
          return
        }
      }
    },
    DelAllVisitedViews() {
      this.visitedViews = [{name: '首页', path: '/mainIndex'}]
    },
    DelOthersVisitedViews(data) {
      if (data.path == '/mainIndex') {
        this.visitedViews = [{name: '首页', path: '/mainIndex'}]
      } else {
        this.visitedViews = [{name: '首页', path: '/mainIndex'}, data]
      }
    },
  }
})