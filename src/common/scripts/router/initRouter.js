export function Login() {
  return import(/* webpackChunkName: "login" */ '@/common/views/system/login/Login.vue')
}

export function Layout() {
  return import(/* webpackChunkName: "layout" */ '@/common/views/layouts/Layout.vue')
}

export function MainIndex() {
  return import(/* webpackChunkName: "mainIndex" */ '@/common/views/system/main/MainIndex.vue')
}

export function _404() {
  return import(/* webpackChunkName: "_404" */ '@/common/views/system/main/_404.vue')
}