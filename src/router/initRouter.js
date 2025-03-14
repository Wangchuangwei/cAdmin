export function Login() {
  return import(/* webpackChunkName: "login" */ '@/views/system/login/Login.vue')
}

export function Layout() {
  return import(/* webpackChunkName: "layout" */ '@/layouts/Layout.vue')
}

export function MainIndex() {
  return import(/* webpackChunkName: "mainIndex" */ '@/views/system/main/MainIndex.vue')
}

