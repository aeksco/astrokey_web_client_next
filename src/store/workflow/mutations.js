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
  selectStep (state, { step }) {
    state.selectedStep = _.clone(step)
  },
  clearSelectedStep (state) {
    state.selectedStep = null
  },
  // updateSelectedStep
  // Inserts the updated step into
  // it's correct position in workflow.steps
  updateSelectedStep (state, { workflow, step }) {
    workflow.steps = _.chain(workflow.steps)
      .map((s) => {
        if (s.id !== step.id) {
          return s
        } else {
          return step
        }
      })
      .value()

    // Clears state.selected step
    state.selectedStep = null
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
  },
  // cycleMacroStepPosition
  // Determines next position for an individual macroStep
  cycleMacroStepPosition (state, { macroStep }) {
    const KEY_DN = 1
    const KEY_UP = 2
    const KEY_PR = 3
    function cyclePosition (oldPosition) {
      switch (oldPosition) {
        // KEY_DN -> KEY_UP
        case KEY_DN:
          return KEY_UP

        // KEY_UP -> KEY_PR
        case KEY_UP:
          return KEY_PR

        // KEY_PR -> KEY_DN
        case KEY_PR:
          return KEY_DN
      }
    }
    macroStep.position = cyclePosition(macroStep.position)
  }
}

// // // //

export default mutations
