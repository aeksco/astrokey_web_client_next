import Vue from 'vue'
import Router from 'vue-router'

// Module routes
import MainRoutes from '@/modules/main/router'
import WorkflowRoutes from '@/modules/workflow/router'
import { UserListRoute, UserShowRoute } from './user'
import { DeviceListRoute, DeviceShowRoute, DeviceInterfaceRoute } from './device'

// Vue Router setup
Vue.use(Router)

// Exports new Router instance
export default new Router({
  routes: [
    UserListRoute,
    UserShowRoute,
    DeviceListRoute,
    DeviceShowRoute,
    DeviceInterfaceRoute,
    ...MainRoutes,
    ...WorkflowRoutes
  ]
})
