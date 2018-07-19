import Vue from 'vue'
import Router from 'vue-router'

// Module routes
import { MainHomeRoute } from './main'
import { UserListRoute, UserShowRoute } from './user'
import { DeviceListRoute, DeviceShowRoute, DeviceInterfaceRoute } from './device'
import WorkflowRoutes from '@/modules/workflow/router'

// Vue Router setup
Vue.use(Router)

// Exports new Router instance
export default new Router({
  routes: [
    MainHomeRoute,
    UserListRoute,
    UserShowRoute,
    DeviceListRoute,
    DeviceShowRoute,
    DeviceInterfaceRoute,
    ...WorkflowRoutes
  ]
})
