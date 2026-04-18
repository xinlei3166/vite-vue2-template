import Phone from '@packages/components/phone/index.vue'
import Search from '@packages/components/search/index.vue'
import SearchTable from '@packages/components/table/index.vue'

export default {
  install: (app: any) => {
    app.component('Phone', Phone)
    app.component('Search', Search)
    app.component('SearchTable', SearchTable)
  }
}
