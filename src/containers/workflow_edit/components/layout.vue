
<template>
  <div class="container">
    <a href="/#/workflows">Back</a>
    <h2>{{workflow.label}}</h2>

    <hr>

    <div class="row">
      <div class="col-lg-12">
        <div class="card card-body">

          <!-- Editor Card Header -->
          <div class="row">
            <div class="col-lg-8">
              <p class="card-text lead" v-if="editing">Edit Step</p>
              <p class="card-text lead" v-if="!editing">Edit Workflow</p>
            </div>
            <div class="col-lg-4 text-right">
              <button class="btn btn-sm btn-outline-success mr-2" v-if="!editing"><i class="fa fa-fw fa-save"></i></button>
              <button class="btn btn-sm btn-outline-dark" v-if="!editing"><i class="fa fa-fw fa-times"></i></button>
            </div>
            <div class="col-lg-12">
              <hr>
            </div>
          </div>

          <!-- Editor Card Body -->
          <div class="row">

            <!-- Step Editor -->
            <div class="col-lg-12" v-if="editing">
              <div class="row">

                <!-- TEXT Editor -->
                <div class="col-lg-12" v-if="editing.type === 'TEXT'">
                  <p class="lead">TEXT</p>
                  <p class="lead">{{ editing.value }}</p>
                  <input class="form-control" type='text' :value="editing.value" @input="editing.value = $event.target.value"></input>
                </div>

                <!-- DELAY Editor -->
                <div class="col-lg-12" v-if="editing.type === 'DELAY'">
                  <p class="lead">DELAY</p>
                  <p class="lead">{{ editing.value }}</p>
                  <input class="form-control" type='number' min="0" max="255" step="1" :value="editing.value" @input="editing.value = $event.target.value"></input>
                </div>

                <!-- MACRO Editor -->
                <div class="col-lg-12" v-if="editing.type === 'MACRO'">
                  <p class="lead">MACRO</p>

                  <div class="row">
                    <div class="col-lg-12">
                      <ul v-for="macro in editing.value" v-bind:key="macro.order" class='list-unstyled'>
                        <li class="lead">
                          {{macro.key}}

                          <span class="fa-stack fa-lg" @click="cycleMacroKeyPosition(macro)">
                            <i class="fa fa-circle-thin fa-stack-2x"></i>
                            <i class="fa fa-stack-1x fa-stack">
                              <i class="fa fa-circle-thin fa-stack-2x fa-2x"></i>
                              <i class="fa fa-stack-1x fa-long-arrow-down text-warning" v-if="macro.position === 1"></i>
                              <i class="fa fa-stack-1x fa-long-arrow-up text-info" v-if="macro.position === 2"></i>
                              <i class="fa fa-stack-1x fa-arrows-v text-success" v-if="macro.position === 3"></i>
                            </i>
                          </span>

                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
                <!-- END MacroEditor -->

              </div>
            </div>

            <!-- Workflow Editor -->
            <div class="col-lg-12" v-if="!editing">
              <ul class="list-group">
                <WorkFlowItem :item="{ type: 'KEY_DOWN', label: 'Press Key' }" :remove="removeStep" :edit="editStep"/>
                <draggable v-model='steps' :options="{draggable:'.draggable'}">
                  <WorkFlowItem v-for="each in steps" :item="each" :key="each.id" :remove="removeStep" :edit="editStep"/>
                </draggable>
                <WorkFlowItem :item="{ type: 'FINISH', label: 'Finish' }" :remove="removeStep" :edit="editStep" />
              </ul>
            </div>

            <!-- HR Break -->
            <div class="col-lg-12 mt-2">
              <hr>
            </div>

            <!-- Editor Card Footer -->
            <div class="col-lg-12 mt-2">

              <!-- Step Editor Controls -->
              <div class="col-lg-12 text-right" v-if="editing">
                <button class="btn btn-outline-dark" @click="clearSelected()">
                  <i class="fa fa-fw fa-times mr-1"></i>
                  Cancel
                </button>

                <button class="btn btn-outline-success" @click="updateSelected(editing)">
                  <i class="fa fa-fw fa-check"></i>
                  Submit
                </button>
              </div>

              <!-- Workflow Editor Controls -->
              <div class="btn-group w-100" v-if="!editing">
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
    },
    editStep (step) {
      store.commit('workflow/selectStep', { step })
    },
    clearSelected () {
      store.commit('workflow/clearSelectedStep')
    },
    updateSelected (step) {
      store.commit('workflow/updateSelectedStep', { workflow: this.workflow, step: step })
    },
    cycleMacroKeyPosition (macroStep) {
      store.commit('workflow/cycleMacroStepPosition', { macroStep: macroStep })
    }
  },
  computed: {
    editing () {
      return store.getters['workflow/selectedStep']
    },
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


