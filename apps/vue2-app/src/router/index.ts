import type { RawLocation } from 'vue-router'
import VueRouter from 'vue-router'
import home from './home'
import common from './common'
import routes from './routes'
import { getToken, loadingEnd, loadingStart } from '@packages/utils'
import { useMenuStore } from '@/store/menu'

export const createRouter = () => {
  return new VueRouter({
    base: import.meta.env.BASE_URL,
    mode: 'history',
    // mode: 'hash',
    routes: __DYNAMIC_MENU__ ? [...home, ...common] : [...home, ...routes, ...common]
  })
}

const router = createRouter()

export const checkExternalWhiteRoute = (routePath: string) => {
  let hasExternalWhiteRoute = false
  for (const w of externalWhiteList) {
    if (routePath.startsWith(w)) {
      hasExternalWhiteRoute = true
      break
    }
  }
  return hasExternalWhiteRoute
}

export const externalWhiteList = ['/visualScreen']
const whiteList = ['/login', '/initLogin', '/netAccessConfig']
router.beforeEach(async (to, from, next) => {
  loadingStart()
  if (checkExternalWhiteRoute(to.path)) return next()
  const token = getToken()
  if (whiteList.includes(to.path)) {
    if (token && to.path === '/login') return next({ path: '/' })
    return next()
  }
  if (!token) return next({ path: '/login' })
  if (!__DYNAMIC_MENU__) return next()
  const menuStore = useMenuStore()
  if (menuStore.hasSetRoutes) {
    next()
  } else {
    await menuStore.setMenus()
    next({ ...to, replace: true } as RawLocation)
  }
})

router.afterEach(() => {
  loadingEnd()
})

export default router
