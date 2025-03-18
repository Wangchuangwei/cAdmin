import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import installRouterGuard from './guard';

import  { MainIndex, Layout, Login, _404 }  from './initRouter'

export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    // hidden: true,
    component: Login,
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path: '/mainIndex',
        name: '首页',
        component: MainIndex,
      }
    ]
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   name: '*',
  //   meta: { hidden: true },
  //   redirect: '/404',
  // },
]

// 路由实例
export const router = createRouter({
  // 添加基础路径
  base: '/frame-layout/',
  // 创建hash历史记录
  history: createWebHashHistory(),
  // 初始路由列表
  routes: constantRouterMap,
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
});

// 配置路由器
export default function installRouter(app) {
  app.use(router);
  // 注册路由守卫
  installRouterGuard(router)
}