// Workflow Containers
import WorkflowList from '@/containers/workflow_list'
import WorkflowEdit from '@/containers/workflow_edit'

export const WorkflowListRoute = {
  path: '/workflows',
  component: WorkflowList,
  props: true
}

export const WorkflowEditRoute = {
  path: '/workflows/:id/edit',
  component: WorkflowEdit,
  props: true
}
