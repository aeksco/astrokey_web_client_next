
<template>
  <div class="container">
    <a href="/#/devices">Back</a>
    <!-- <h2>Device Show</h2> -->
    <h2>{{workflow.label}}</h2>
  	<hr>

    <div class="row">
      <div class="col-lg-12">

        <div class="card card-body">
          <div class="row">
            <div class="col-lg-8">
              <p class="card-text lead">Edit Workflow</p>
            </div>
            <div class="col-lg-4 text-right">
              <button class="btn btn-sm btn-outline-success mr-2"><i class="fa fa-fw fa-save"></i></button>
              <button class="btn btn-sm btn-outline-dark"><i class="fa fa-fw fa-times"></i></button>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <hr>
              <ul class="list-group">
                <WorkFlowItemText :item="workflow.steps[0]"/>
                <WorkFlowItemMacro :item="workflow.steps[1]"/>
                <WorkFlowItemDelay :item="workflow.steps[2]"/>
              </ul>
            </div>

            <div class="col-lg-12 mt-2">

            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import WorkFlowItemText from './workflow_item_text'
import WorkFlowItemMacro from './workflow_item_macro'
import WorkFlowItemDelay from './workflow_item_delay'

export default {
  props: ['workflow'],
  components: {
    WorkFlowItemText,
    WorkFlowItemMacro,
    WorkFlowItemDelay
  }
}
</script>


