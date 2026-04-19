import { Icon as IconFont } from 'tdesign-icons-vue'
import { defineComponent, h } from 'vue'

const Icon = defineComponent({
  name: 'Icon',
  inheritAttrs: false,
  components: { IconFont },
  props: {
    url: {
      type: String,
      // 如果在iconfont.cn里新增了icon，记得更新下面的链接
      default: `${import.meta.env.VITE_APP_BASE || '/'}iconfont.js`
    }
  },
  render() {
    return h(IconFont, {
      class: ['iconfont-icon'],
      attrs: {
        // @ts-ignore
        url: this.url,
        loadDefaultIcons: false,
        ...this.$attrs
      },
      on: (this as any).$listeners
    })
  }
})

export default {
  install: (app: any) => {
    app.component('Icon', Icon)
  }
}
