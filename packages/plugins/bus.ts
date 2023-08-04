import mitt from 'mitt'

export default {
  install: (app: any) => {
    app.prototype.$bus = mitt()
  }
}
