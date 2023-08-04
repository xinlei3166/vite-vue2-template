<template>
  <a-card v-if="card" class="search-card">
    <SearchComponent
      v-bind="$attrs"
      :inline="inline"
      :columns="columns"
      :model="model"
      :label-align="labelAlign"
      :label-width="labelWidth"
      :show-search-btn="showSearchBtn"
      :show-reset-btn="showResetBtn"
      :show-btn="showBtn"
      :btn-align="btnAlign"
      :search-btn-label="searchBtnLabel"
      :reset-btn-label="resetBtnLabel"
      v-on="$listeners"
    >
      <template v-for="column in columns" #[column.slot]>
        <slot v-if="column.slot" :name="column.slot" />
      </template>
      <template #extra-btn>
        <slot name="extra-btn" />
      </template>
    </SearchComponent>
  </a-card>
  <SearchComponent
    v-else
    v-bind="$attrs"
    :inline="inline"
    :columns="columns"
    :model="model"
    :label-align="labelAlign"
    :label-width="labelWidth"
    :show-search-btn="showSearchBtn"
    :show-reset-btn="showResetBtn"
    :show-btn="showBtn"
    :btn-align="btnAlign"
    :search-btn-label="searchBtnLabel"
    :reset-btn-label="resetBtnLabel"
  >
    <template v-for="column in columns" #[column.slot]>
      <slot v-if="column.slot" :name="column.slot" />
    </template>
    <template #extra-btn>
      <slot name="extra-btn" />
    </template>
  </SearchComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchComponent from './Search.vue'
import { props } from './props'

// select的远程搜索及其他特殊场景可用插槽实现
export default defineComponent({
  components: { SearchComponent },
  props: {
    card: { type: Boolean, default: true },
    ...props
  }
})
</script>

<style lang="less" scoped>
.search-card {
  ::v-deep(.ant-card-body) {
    padding: 20px 24px 4px;
  }
}
</style>
