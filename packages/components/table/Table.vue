<template>
  <component
    :is="wrapper"
    v-bind="wrapperProps"
    :class="['search-wrap', { 'search-card': card }, $attrs.class]"
  ></component>
</template>

<script lang="ts">
import type { TableProps } from 'tdesign-vue'
import type { PropType, CSSProperties } from 'vue'
import { Card, Table, Pagination } from 'tdesign-vue'
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useData } from '@packages/hooks'
import { typeOf } from '@packages/utils'
import { deepClone } from '@packages/utils'
import type Search from '../search/index.vue'

export type SearchProps = InstanceType<typeof Search>['$props']

export default defineComponent({
  props: {
    // table
    card: { type: Boolean, default: true },
    cardBordered: { type: Boolean, default: false },
    cardBodyStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    fixedPagination: { type: Boolean, default: true },

    span: { type: Number, default: 6 },
    searchClass: { type: String, default: '' },
    searchStyle: { type: Object, default: () => ({}) },
    columns: { type: Array as PropType<Array<Record<string, any>>>, default: () => [] },
    model: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    labelAlign: { type: String as PropType<any>, default: 'right' }, // left | right
    labelWidth: { type: [String, Number], default: 'auto' },
    showLabel: { type: Boolean, default: true }, // 显示label
    showSearchBtn: { type: Boolean, default: true },
    showResetBtn: { type: Boolean, default: true },
    showBtn: { type: Boolean, default: true },
    searchBtnLabel: { type: String, default: '查询' }, // 查询, 搜索
    resetBtnLabel: { type: String, default: '重置' },
    showBtnPlaceholder: { type: Boolean, default: false }, // 显示按钮placeholder
    btnPlaceholderWidth: { type: [String, Number], default: undefined },
    btnAlign: { type: String, default: 'start' }, // start/end
    btnSpan: { type: Number, default: undefined },
    btnClass: { type: String, default: '' },
    btnStyle: { type: Object, default: () => ({}) },
    btnInnerStyle: { type: Object, default: () => ({}) }
  },
  emits: ['search', 'reset', 'enter'],
  setup(props, { emit }) {
    const wrapper = computed(() => {
      return props.card ? Card : 'div'
    })

    const wrapperProps = computed(() => {
      return props.card
        ? { bordered: props.cardBordered, bodyStyle: { padding: '16px', ...props.cardBodyStyle } }
        : {}
    })

    const mergeColumnStyle = (...styles: any[]) => {
      return Object.assign({}, props.componentStyle, ...styles.filter(Boolean))
    }

    const parseValue = (value: any, number: true) => {
      return number ? parseInt(value) : value
    }

    const onSearch = () => {
      emit('search')
    }

    const onReset = () => {
      emit('reset')
    }

    const onEnter = (e: any, key: string) => {
      emit('enter', key, e.target.value, { [key]: e.target.value })
    }

    return {
      wrapper,
      wrapperProps,
      mergeColumnStyle,
      onSearch,
      onReset,
      typeOf,
      parseValue,
      onEnter
    }
  }
})
</script>

<style lang="less" scoped></style>
