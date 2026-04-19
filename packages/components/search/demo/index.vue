<template>
  <div>
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
        <t-select
          v-model="search.name6"
          class="w-full"
          :clearable="true"
          placeholder="请选择课性别"
        >
          <t-option value="male">男</t-option>
          <t-option value="female">女</t-option>
        </t-select>
      </template>
    </Search>
    <t-card :bordered="false" class="card">
      <t-table
        resizable
        maxHeight="none"
        class="content"
        row-key="id"
        :loading="loading"
        :data="data"
        :columns="tableColumns"
        :pagination="pagination"
        @change="onTableChange"
      >
        <template #operation="{ record }">
          <t-link theme="primary" hover="color" class="t-text-btn" @click="onEdit(record)">
            编辑
          </t-link>
          <t-link theme="primary" hover="color" class="t-text-btn" @click="onPreview(record)">
            预览
          </t-link>
        </template>
      </t-table>
    </t-card>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, reactive, computed } from 'vue'
import { useData } from '@packages/hooks'
// @ts-ignore
import { getList } from '@/api'
import { searchColumns, tableColumns } from './columns'

const params = computed(() => ({
  ...search
}))
const { loading, data, pagination, init, onSearch, onTableChange } = useData(getList, {
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
  if (pagination) {
    pagination.current = 1
  }
  await init()
}

const onEdit = (record: Record<string, any>) => {
  window.open('https://baidu.com')
}

const onPreview = (record: Record<string, any>) => {
  window.open('https://baidu.com')
}
</script>

<style lang="less" scoped>
.card {
  min-height: 0;
  :deep(.t-card__body) {
    padding: 16px 16px 0;
  }
}

.btn {
  color: theme('colors.brand');
  margin-right: 10px;
  cursor: pointer;
}
</style>
