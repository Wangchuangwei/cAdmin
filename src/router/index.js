import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import installRouterGuard from './guard';

import menuRoute from './routes'

let routerList = []
for (let menu in menuRoute) {
  let idx = menu.lastIndexOf('/')
  routerList.push({
    name: menu.slice(idx + 1),
    path: menu,
    component: menuRoute[menu],
  })
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/system/login/Login.vue'),
  },
  {
    path: '/mainIndex',
    name: 'MainIndex',
    component: () => import('@/layouts/Layout.vue'),
    children: routerList
  },
]

// 路由实例
export const router = createRouter({
  // 添加基础路径
  base: '/frame-layout/',
  // 创建hash历史记录
  history: createWebHashHistory(),
  // 初始路由列表
  routes: routes,
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
});

// 配置路由器
export default function installRouter(app) {
  app.use(router);
  // 注册路由守卫
  installRouterGuard(router)
}