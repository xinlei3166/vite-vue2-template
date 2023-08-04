// @ts-ignore
import { createFromIconfontCN } from '@ant-design/icons-vue'

const Icon = createFromIconfontCN({
  // 如果在iconfont.cn里新增了icon，记得更新项目public中的iconfont.js文件
  scriptUrl: `${import.meta.env.VITE_APP_BASE || '/'}iconfont.js`
})

export default {
  install: (app: any) => {
    app.component('Icon', Icon)
  }
}
