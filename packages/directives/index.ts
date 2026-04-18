import title from './title'

export default {
  install: (app: any) => {
    app.directive('title', title)
  }
}
