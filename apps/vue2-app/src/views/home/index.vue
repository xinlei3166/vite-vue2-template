<template>
  <t-card class="card">
    <div class="title">{{ title }}</div>
  </t-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = import.meta.env.VITE_APP_TITLE
</script>

<style lang="less" scoped></style>
