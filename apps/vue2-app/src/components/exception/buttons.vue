<template>
  <t-button theme="primary" @click="onGoHome">返回首页</t-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/composables'

const router = useRouter()

const onGoHome = () => {
  router.push('/')
}
</script>

<style lang="less" scoped></style>
