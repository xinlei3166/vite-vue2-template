import { auth, pageAuth } from '@packages/utils'

export { auth, pageAuth }

export default {
  install: (app: any) => {
    app.prototype.$auth = auth
  }
}
