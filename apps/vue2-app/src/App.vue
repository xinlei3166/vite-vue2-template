<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router/composables'
// @ts-ignore
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN'
import { useUserStore } from '@/store/user'
import { getToken } from '@packages/utils'
import { checkExternalWhiteRoute } from '@/router'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()

    const routePath = computed(() => {
      return window.location.pathname.replace(import.meta.env.BASE_URL, '/')
    })

    onMounted(async () => {
      if (checkExternalWhiteRoute(routePath.value)) return
      const token = getToken()
      if (!token) return
      await userStore.setUserinfo()
      await userStore.setPermissions()
      if (window.__POWERED_BY_WUJIE__) {
        // @ts-ignore
        window.$wujie?.bus.$on('vue2-app-router-change', (name: string, path: string) => {
          router.push({ path })
        })
      }
    })

    return { locale: zhCN }
  }
})
</script>

<style></style>
