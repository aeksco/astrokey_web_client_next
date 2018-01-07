import Vue from 'vue'
import Router from 'vue-router'

// Module routes
import { MainHomeRoute } from './main'
import { AuthLoginRoute, AuthRegisterRoute } from './auth'
import { UserListRoute, UserShowRoute } from './user'
import { DeviceListRoute, DeviceShowRoute } from './device'
import { WorkflowListRoute, WorkflowShowRoute, WorkflowEditRoute } from './workflow'

// Vue Router setup
Vue.use(Router)

// Exports new Router instance
export default new Router({
  routes: [
    MainHomeRoute,
    AuthLoginRoute,
    AuthRegisterRoute,
    UserListRoute,
    UserShowRoute,
    DeviceListRoute,
    DeviceShowRoute,
    WorkflowListRoute,
    WorkflowShowRoute,
    WorkflowEditRoute
  ]
})
