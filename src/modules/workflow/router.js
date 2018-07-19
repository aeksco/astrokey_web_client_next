// Workflow Containers
import WorkflowList from './views/workflow_list'
import WorkflowNew from './views/workflow_new'
import WorkflowShow from './views/workflow_show'
import WorkflowEdit from './views/workflow_edit'

const WorkflowListRoute = {
  path: '/workflows',
  component: WorkflowList,
  props: true
}

const WorkflowNewRoute = {
  path: '/workflows/new',
  component: WorkflowNew
}

const WorkflowShowRoute = {
  path: '/workflows/:id',
  component: WorkflowShow,
  props: true
}

const WorkflowEditRoute = {
  path: '/workflows/:id/edit',
  component: WorkflowEdit,
  props: true
}

export default [
  WorkflowListRoute,
  WorkflowNewRoute,
  WorkflowShowRoute,
  WorkflowEditRoute
]