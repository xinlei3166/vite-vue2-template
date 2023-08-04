<template>
  <div>
    <div class="title">B组件</div>
    <div class="title">当前结果：{{ number }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import type { Emitter } from 'mitt'

export default defineComponent({
  setup() {
    const instance = getCurrentInstance().proxy as any
    const bus = instance.$bus as Emitter<any>
    const number = ref(0)

    const changeNumber = value => {
      number.value = value
    }

    onMounted(() => {
      bus.on('change-number', changeNumber)
    })

    onBeforeUnmount(() => {
      bus.off('change-number', changeNumber)
    })

    return { number }
  }
})
</script>

<style lang="less" scoped></style>
