<template>
  <component
    :is="wrapper"
    v-bind="wrapperProps"
    :class="[{ 'search-card': card }, 'search-wrap', $attrs.class]"
  >
    <t-row type="flex" :gutter="[16, 16]" :class="['search', searchClass]" :style="searchStyle">
      <t-col
        :span="column.span || span"
        v-for="(column, index) in columns"
        :key="`column_${index}_${column.key}`"
        :class="['search-item', '!flex', '!items-center', column.class]"
      >
        <span
          v-if="showLabel && column.label"
          :class="[
            'search-item-label',
            'flex-shrink-0',
            'mr-2',
            { 'label-required': column.required }
          ]"
          :style="{ textAlign: labelAlign, width: column.labelWidth || labelWidth }"
        >
          {{ column.label }}
        </span>
        <slot v-if="column.slot" :name="column.slot" class="search-item-component w-full" />
        <t-input
          v-else-if="column.searchType === 'input'"
          v-model.trim="model[column.key]"
          class="search-item-input search-item-component !w-full"
          :style="mergeColumnStyle(column.style)"
          :show-limit-number="column.props?.showLimitNumber !== false"
          :clearable="column.props?.clearable !== false"
          v-bind="column.props || {}"
          @change="(value: any, context: any) => onChange(column.key, value, context)"
          @enter="(value: any, context: any) => onEnter(column.key, value, context)"
        />
        <t-input-number
          v-else-if="column.searchType === 'input-number'"
          v-model.trim="model[column.key]"
          class="search-item-input-number search-item-component !w-full"
          :style="mergeColumnStyle(column.style)"
          :clearable="column.props?.clearable !== false"
          :theme="column.props?.theme || 'normal'"
          v-bind="column.props || {}"
          @change="(value: any, context: any) => onChange(column.key, value, context)"
          @enter="(value: any, context: any) => onEnter(column.key, value, context)"
        />
        <t-select
          v-else-if="column.searchType === 'select'"
          v-model="model[column.key]"
          class="search-item-select search-item-component !w-full"
          :style="mergeColumnStyle(column.style)"
          :clearable="column.props?.clearable !== false"
          v-bind="column.props || {}"
          @change="(value: any, context: any) => onChange(column.key, value, context)"
          @enter="(context: any) => onEnter(column.key, null, context)"
        >
          <template v-if="typeOf(column.options) === 'array'">
            <t-select-option
              v-for="option in column.options"
              :key="option[column.valueKey || 'value']"
              :value="option[column.valueKey || 'value']"
              :label="option[column.labelKey || 'label']"
            >
              {{ option[column.labelKey || 'label'] }}
            </t-select-option>
          </template>
          <template v-else-if="typeOf(column.options) === 'object'">
            <t-select-option
              v-for="(label, value) in column.options"
              :key="value"
              :value="parseValue(value, column.int || true)"
              :label="label"
            >
              {{ label }}
            </t-select-option>
          </template>
        </t-select>
        <t-tree-select
          v-else-if="column.searchType === 'tree-select'"
          v-model="model[column.key]"
          class="search-item-tree-select search-item-component !w-full"
          :style="mergeColumnStyle(column.style)"
          :clearable="column.props?.clearable !== false"
          v-bind="column.props || {}"
          @change="(value: any, context: any) => onChange(column.key, value, context)"
          @enter="(context: any) => onEnter(column.key, null, context)"
        />
        <t-cascader
          v-else-if="column.searchType === 'cascader'"
          v-model="model[column.key]"
          class="search-item-cascader search-item-component !w-full"
          :style="mergeColumnStyle(column.style)"
          :clearable="column.props?.clearable !== false"
          v-bind="column.props || {}"
          @change="(value: any, context: any) => onChange(column.key, value, context)"
        />
        <t-date-picker
          v-else-if="column.searchType === 'date-picker'"
          v-model="model[column.key]"
          class="search-item-date-picker search-item-component !w-full"
          :style="mergeColumnStyle(column.style)"
          :clearable="column.props?.clearable !== false"
          v-bind="column.props || {}"
          @change="(value: any, context: any) => onChange(column.key, value, context)"
        />
        <t-date-range-picker
          v-else-if="column.searchType === 'range-picker'"
          v-model="model[column.key]"
          className="search-item-range-picker search-item-component !w-full"
          :style="mergeColumnStyle(column.style)"
          :clearable="column.props?.clearable !== false"
          v-bind="column.props || {}"
          @change="(value: any, context: any) => onChange(column.key, value, context)"
        />
      </t-col>
      <t-col v-bind="btnProps" v-if="showBtn" :class="['search-btn', btnClass]" :style="btnStyle">
        <span
          v-if="showLabel && showBtnPlaceholder"
          :class="['search-item-label', 'flex-shrink-0', 'mr-2']"
          :style="{ width: btnPlaceholderWidth || labelWidth }"
        ></span>
        <div
          :class="['search-btn-inner', 'flex', 'items-center', 'gap-4', `justify-${btnAlign}`]"
          :style="btnInnerStyle"
        >
          <t-button v-if="showSearchBtn" class="search-btn-btn" theme="primary" @click="onSearch">
            {{ searchBtnLabel }}
          </t-button>
          <t-button v-if="showResetBtn" class="search-btn-btn" @click="onReset">
            {{ resetBtnLabel }}
          </t-button>
          <slot name="extra-btn" />
        </div>
      </t-col>
    </t-row>
  </component>
</template>

<script lang="ts">
import type { PropType, CSSProperties } from 'vue'
import { Card } from 'tdesign-vue'
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { typeOf } from '@packages/utils'

export default defineComponent({
  props: {
    // search
    card: { type: Boolean, default: true },
    cardBordered: { type: Boolean, default: false },
    cardBodyStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    span: { type: Number, default: 3 },
    searchClass: { type: String, default: '' },
    searchStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    columns: { type: Array as PropType<Array<Record<string, any>>>, default: () => [] },
    model: { type: Object as PropType<Record<string, any>>, default: () => ({}) },

    // label
    labelAlign: { type: String as PropType<any>, default: 'right' }, // left | right
    labelWidth: { type: [String, Number], default: 'auto' },
    showLabel: { type: Boolean, default: true }, // 显示label

    // component
    componentStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },

    // btn
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
    btnStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    btnInnerStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
  },
  emits: ['change', 'search', 'reset', 'enter'],
  setup(props, { emit }) {
    const wrapper = computed(() => {
      return props.card ? Card : 'div'
    })

    const wrapperProps = computed(() => {
      return props.card
        ? { bordered: props.cardBordered, bodyStyle: { padding: '16px', ...props.cardBodyStyle } }
        : {}
    })
    const btnProps = computed(() => {
      return props.btnSpan ? { span: props.btnSpan } : { flex: '1' }
    })

    const mergeColumnStyle = (...styles: any[]) => {
      return Object.assign({}, props.componentStyle, ...styles.filter(Boolean))
    }

    const parseValue = (value: any, number: true) => {
      return number ? parseInt(value) : value
    }

    const onChange = (key: string, value: any, context: any) => {
      emit('change', key, value, { ...props.model, [key]: value }, context)
    }

    const onSearch = () => {
      emit('search')
    }

    const onReset = () => {
      emit('reset')
    }

    const onEnter = (key: string, value: any, context: any) => {
      emit('enter', key, value, { ...props.model, [key]: value }, context)
    }

    return {
      wrapper,
      wrapperProps,
      btnProps,
      mergeColumnStyle,
      onChange,
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
