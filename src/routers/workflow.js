// Workflow Containers
import WorkflowList from '@/containers/workflow_list'
import WorkflowNew from '@/containers/workflow_new'
import WorkflowShow from '@/containers/workflow_show'
import WorkflowEdit from '@/containers/workflow_edit'

export const WorkflowListRoute = {
  path: '/workflows',
  component: WorkflowList,
  props: true
}

export const WorkflowNewRoute = {
  path: '/workflows/new',
  component: WorkflowNew
}

export const WorkflowShowRoute = {
  path: '/workflows/:id',
  component: WorkflowShow,
  props: true
}

export const WorkflowEditRoute = {
  path: '/workflows/:id/edit',
  component: WorkflowEdit,
  props: true
}
