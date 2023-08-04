import type { ObjectDirective } from 'vue'

// usage: v-title="'v-title'"
export default {
  mounted(el: any, binding: any, vnode: any, prevNnode: any) {
    console.log(binding)
    document.title = binding.value
  }
} as ObjectDirective
