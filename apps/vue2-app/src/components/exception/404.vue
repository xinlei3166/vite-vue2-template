<template>
  <div class="exception-wrap">
    <t-result status="404" title="404" sub-title="抱歉，你访问的页面不存在">
      <template #extra>
        <Buttons />
      </template>
    </t-result>
  </div>
</template>

<script lang="ts" setup>
import Buttons from './buttons.vue'
</script>

<style lang="less" scoped>
@import './index.less';
</style>
