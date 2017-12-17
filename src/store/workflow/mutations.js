import _ from 'lodash'
import { TEXT_WORKFLOW_STEP, MACRO_WORKFLOW_STEP, DELAY_WORKFLOW_STEP, KEY_WORKFLOW_STEP } from './constants'

// // // //

// Project Module mutations
const mutations = {
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  sync (state, collection) {
    state.collection = _.sortBy(collection, (s) => { return s.order })
  },
  current (state, attributes) {
    state.current = attributes
  },
  removeStep (state, { workflow, step }) {
    workflow.steps = _.chain(workflow.steps).filter((s) => { return s.id !== step.id }).each((s, i) => { s.order = i }).sortBy('order').value()
  },
  addStep (state, { workflow, step_type }) {
    function getStep (type) {
      switch (type) {
        case 'TEXT': // TODO - CONSTANTIZE
          return TEXT_WORKFLOW_STEP
        case 'MACRO': // TODO - CONSTANTIZE
          return MACRO_WORKFLOW_STEP
        case 'DELAY': // TODO - CONSTANTIZE
          return DELAY_WORKFLOW_STEP
        case 'KEY': // TODO - CONSTANTIZE
          return KEY_WORKFLOW_STEP
      }
    }

    let new_step = _.clone(getStep(step_type))
    new_step.order = workflow.steps.length
    new_step.id = _.uniqueId('st')
    workflow.steps.push(new_step)
  }
}

// // // //

export default mutations
