import Vue from 'vue'
import VueRouter from 'vue-router'
import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import plugins from '@packages/plugins'
import '@packages/styles/index.less'
import '@packages/styles/reset.less'
import '@/styles/index.less'
import 'animate.css'
import 'virtual:uno.css'
import './mock'

function createApp() {
  const app = Vue

  app.use(PiniaVuePlugin)
  const pinia = createPinia()
  pinia.use(piniaPersist)

  app.use(VueRouter)
  app.use(plugins)

  new Vue({
    el: '#app',
    router,
    pinia,
    render: h => h(App)
  })

  if (import.meta.env.MODE !== 'development') {
    app.config.errorHandler = (err, vm, info) => {
      console.group('vue_global_error')
      console.log('捕获到异常：', { err, vm, info })
      console.groupEnd()
    }

    window.onerror = function (message, source, lineno, colno, error) {
      console.group('window_global_error')
      console.log('捕获到异常：', { message, source, lineno, colno, error })
      console.groupEnd()
    }
  }

  return app
}

declare global {
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean
    // 子应用mount函数
    __WUJIE_MOUNT: () => void
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void
    // 子应用无界实例
    __WUJIE: { mount: () => void }
  }
}

if (window.__POWERED_BY_WUJIE__) {
  let app: any
  window.__WUJIE_MOUNT = () => {
    app = createApp()
  }
  window.__WUJIE_UNMOUNT = () => {
    app.unmount()
  }
  // module脚本异步加载，应用主动调用生命周期
  window.__WUJIE.mount()
} else {
  createApp()
}
