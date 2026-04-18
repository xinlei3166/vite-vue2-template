<template>
  <Search
    :columns="searchColumns"
    :model="search"
    label-width="42px"
    :show-reset-btn="true"
    style="margin-bottom: 16px"
    @search="onSearch"
    @reset="onReset"
  >
    <template #name6>
      <t-select v-model="search.name6" class="w-full" :clearable="true" placeholder="请选择课性别">
        <t-select-option value="male">男</t-select-option>
        <t-select-option value="female">女</t-select-option>
      </t-select>
    </template>
  </Search>
  <t-card class="card">
    <t-table
      class="content"
      row-key="id"
      :loading="loading"
      :data="data"
      :columns="tableColumns"
      :pagination="pagination"
      @change="onTableChange"
    >
      <template #operation="{ record }">
        <t-link hover="color" class="t-text-btn" @click="onEdit(record)">编辑</t-link>
        <t-link hover="color" class="t-text-btn" @click="onPreview(record)">预览</t-link>
      </template>
    </t-table>
  </t-card>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, reactive, computed } from 'vue'
import { useData } from '@packages/hooks'
// @ts-ignore
import { getData } from '@/api'
import { searchColumns, tableColumns } from './columns'

const params = computed(() => ({
  ...search
}))
const { loading, data, pagination, init, onSearch, onTableChange } = useData(getData, {
  params
})

onBeforeMount(async () => {
  await init()
})

const search = reactive<Record<string, any>>({
  name1: undefined,
  name2: undefined,
  name3: undefined,
  name4: undefined,
  name5: undefined,
  name6: undefined,
  name7: undefined,
  name8: undefined,
  name9: undefined,
  name10: undefined
})

const onReset = async () => {
  Object.keys(search).forEach(key => (search[key] = undefined))
  pagination.current = 1
  await init()
}

const onEdit = () => {
  window.open('https://baidu.com')
}

const onPreview = () => {
  window.open('https://baidu.com')
}
</script>

<style lang="less" scoped>
.card {
  min-height: 0;
}

.btn {
  color: theme('colors.primary');
  margin-right: 10px;
  cursor: pointer;
}
</style>
