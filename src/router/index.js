import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import installRouterGuard from './guard';

export const pageRoute = [
  {
    path: '/platform/home/personal',
    name: 'personal',
    component: () => import('@/views/pages/preview/pdfView.vue'),
  },
  {
    path: '/platform/home/jiashi',
    name: 'jiashi',
    component: () => import('@/views/pages/dashboard/analysis.vue'),
  },

]

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
    children:pageRoute
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