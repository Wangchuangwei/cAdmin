import {useUserStore} from '@/store/modules/user'

export default function installRouterGuard(router) {
  createPageGuard(router)
}

function createPageGuard(router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    if (!userStore.token && to.fullPath !== '/login') {
      console.log("example:")
      next('/')
      // next('/login')
    }
    next()
  })
}