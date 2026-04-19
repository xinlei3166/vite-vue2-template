<template>
  <t-card :bordered="false" v-if="wrapper === 'card'" v-bind="wrapperProps">
    <slot />
  </t-card>
  <div v-else v-bind="wrapperProps">
    <slot />
  </div>
</template>
<script setup lang="ts">
defineProps({
  wrapper: { type: String, default: undefined },
  wrapperProps: { type: Object, default: () => ({}) }
})
</script>
<style lang="less" scoped>
.search-table-card {
  :deep(.t-card__body) {
    padding: 16px 16px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &.search-table-card--no-pagination :deep(.t-card__body) {
    padding: 16px;
  }
}
</style>
