
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
import { mapGetters, mapActions } from 'vuex'
import WorkflowForm from '../../components/WorkflowForm'

export default {
  metaInfo: {
    title: 'Workflow - New'
  },
  components: {
    WorkflowForm
  },
  created () {
    this.resetNew()
  },
  methods: mapActions({
    resetNew: 'workflow/reset_new_workflow'
  }),
  computed: mapGetters({
    workflow: 'workflow/newModel'
  })
}
</script>


