import type { RouteConfig } from 'vue-router'

import components from './components'
import others from './others'

const routes: RouteConfig[] = [...components, ...others]

export default routes
