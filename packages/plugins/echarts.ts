import ECharts from 'vue-echarts'

export default {
  install: (app: any) => {
    app.component('VChart', ECharts)
  }
}
