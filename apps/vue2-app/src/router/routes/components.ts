import type { RouteConfig } from 'vue-router'

const Layout = () => import('@/components/layout/index.vue')

const routes: RouteConfig[] = [
  {
    path: '/components',
    name: 'components',
    meta: {
      title: '常用组件',
      icon: 'icon-reloadtime'
    },
    redirect: { name: 'provide-inject' },
    component: Layout,
    children: [
      {
        path: 'router',
        name: 'router',
        meta: {
          title: 'router',
          icon: 'icon-reloadtime'
        },
        component: () => import('features/components/router/index.vue')
      },
      {
        path: 'store',
        name: 'store',
        meta: {
          title: 'store',
          icon: 'icon-unorderedlist'
        },
        component: () => import('features/components/store/index.vue')
      },
      {
        path: 'provide-inject',
        name: 'provide-inject',
        meta: {
          title: 'provide',
          icon: 'icon-appstoreadd'
        },
        component: () => import('features/components/provide/index.vue')
      },
      {
        path: 'bus',
        name: 'bus',
        meta: {
          title: 'bus',
          icon: 'icon-user'
        },
        component: () => import('features/components/bus/index.vue')
      },
      {
        path: 'table',
        name: 'table',
        meta: {
          title: 'table',
          icon: 'icon-appstore'
        },
        component: () => import('features/components/table/index.vue')
      },
      {
        path: 'fixed-table',
        name: 'fixed-table',
        meta: {
          title: 'fixed-table',
          icon: 'icon-appstore'
        },
        component: () => import('features/components/table/fixed.vue')
      },
      {
        path: 'draggable',
        name: 'draggable',
        meta: {
          title: 'draggable',
          icon: 'icon-setting'
        },
        component: () => import('features/components/draggable/index.vue')
      }
    ]
  }
]

export default routes
