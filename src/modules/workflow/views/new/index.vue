
<template>
  <div class="container-fluid">
    <h2>{{workflow.label}}</h2>
    <hr>

    <div class="row">
      <div class="col-lg-12">
        <WorkflowForm :workflow="workflow" />
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WorkflowForm from '../../components/WorkflowForm'

export default {
  metaInfo: {
    title: 'Workflow - New'
  },
  components: {
    WorkflowForm
  },
  computed: mapGetters({
    workflow: 'workflow/newModel'
  })
}
</script>


