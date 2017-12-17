
<template>
  <div class="container">
    <a href="/#/workflows">Back</a>
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
              <draggable v-model='steps'>
                <ul class="list-group" v-for="each in steps" v-bind:key="each.id">
                  <WorkFlowItemText :item="each" v-if="each.type === 'text'"/>
                  <WorkFlowItemMacro :item="each" v-if="each.type === 'macro'"/>
                  <WorkFlowItemDelay :item="each" v-if="each.type === 'delay'"/>
                </ul>
              </draggable>
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
import _ from 'lodash'
import draggable from 'vuedraggable'
import WorkFlowItemText from './workflow_item_text'
import WorkFlowItemMacro from './workflow_item_macro'
import WorkFlowItemDelay from './workflow_item_delay'

export default {
  props: ['workflow'],
  components: {
    draggable,
    WorkFlowItemText,
    WorkFlowItemMacro,
    WorkFlowItemDelay
  },

  computed: {
    steps: {
      get () {
        return _.sortBy(this.workflow.steps, (s) => { return s.order })
      },
      set (value) {
        _.each(value, (s, i) => { s.order = i })
      }
    }
  }
}
</script>


