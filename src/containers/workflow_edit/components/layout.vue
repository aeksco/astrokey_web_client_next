
<template>
  <div class="container">
    <a href="/#/workflows">Back</a>
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
  <!--             <draggable v-model='steps'>
                <ul class="list-group" v-for="each in steps" v-bind:key="each.id">
                  <WorkFlowItemText :item="each" :remove="removeStep" v-if="each.type === 'TEXT'"/>
                  <WorkFlowItemMacro :item="each" :remove="removeStep" v-if="each.type === 'MACRO'"/>
                  <WorkFlowItemDelay :item="each" :remove="removeStep" v-if="each.type === 'DELAY'"/>
                  <WorkFlowItemDelay :item="each" :remove="removeStep" v-if="each.type === 'KEY'"/>
                </ul>
              </draggable> -->

              <ul class="list-group">
                <draggable v-model='steps' :options="{draggable:'.draggable'}">
                  <WorkFlowItem v-for="each in steps" :item="each"/>
                </draggable>
              </ul>

            </div>

            <div class="col-lg-12 mt-2">
              <div class="btn-group w-100">
                <button class="btn btn-outline-dark w-25" @click="addStep('TEXT')">TEXT</button>
                <button class="btn btn-outline-dark w-25" @click="addStep('MACRO')">MACRO</button>
                <button class="btn btn-outline-dark w-25" @click="addStep('DELAY')">DELAY</button>
                <button class="btn btn-outline-dark w-25" @click="addStep('KEY')">KEY</button>
              </div>
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
import store from '@/store'
import draggable from 'vuedraggable'
import WorkFlowItem from './workflow_item'
import WorkFlowItemText from './workflow_item_text'
import WorkFlowItemMacro from './workflow_item_macro'
import WorkFlowItemDelay from './workflow_item_delay'

export default {
  props: ['workflow'],
  components: {
    draggable,
    WorkFlowItem,
    WorkFlowItemText,
    WorkFlowItemMacro,
    WorkFlowItemDelay
  },
  methods: {
    addStep (type) {
      store.commit('workflow/addStep', { workflow: this.workflow, step_type: type })
    },

    removeStep (step) {
      store.commit('workflow/removeStep', { workflow: this.workflow, step: step })
    }
  },
  computed: {
    steps: {
      get () {
        // console.log('GETTERS\n')
        this.workflow.steps = _.orderBy(this.workflow.steps, ['order'], ['asc'])
        // this.workflow.steps = _.sortBy(this.workflow.steps, (s) => { return s.order }) // TODO - does this need to be sorted here?
        // console.log(_.each(this.workflow.steps, (s) => { console.log(s.type) }))
        return this.workflow.steps
      },
      set (value) {
        // console.log('VALUE VALUE')
        // let key_down = _.remove(value, (s) => { return s.type === 'KEY_DOWN' })
        // console.log(key_down)
        // console.log(_.each(value, (v) => { console.log(v.type) }))

        // console.log(value)
        _.each(value, (s, i) => { s.order = i })

        // console.log(key_down.concat(value))
        // value = key_down.concat(value)

        // console.log(key_down.concat(value))
        // this.workflow.steps = _.orderBy(key_down.concat(value), ['order'], ['asc'])
      }
    }
  }
}
</script>


