import _ from 'lodash'
import { TEXT_WORKFLOW_STEP, MACRO_WORKFLOW_STEP, DELAY_WORKFLOW_STEP, KEY_WORKFLOW_STEP, KEY_DN_POSITION, KEY_UP_POSITION, KEY_PR_POSITION } from './constants'

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
    state.selectedStep = _.cloneDeep(step)
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

    let new_step = _.cloneDeep(getStep(step_type))
    new_step.order = workflow.steps.length
    new_step.id = _.uniqueId('st')
    workflow.steps.push(new_step)
  },
  // cycleMacroStepPosition
  // Determines next position for an individual macroStep
  cycleMacroStepPosition (state, { macroStep }) {
    function cyclePosition (oldPosition) {
      switch (oldPosition) {
        // KEY_DN_POSITION -> KEY_UP_POSITION
        case KEY_DN_POSITION:
          return KEY_UP_POSITION

        // KEY_UP_POSITION -> KEY_PR_POSITION
        case KEY_UP_POSITION:
          return KEY_PR_POSITION

        // KEY_PR_POSITION -> KEY_DN_POSITION
        case KEY_PR_POSITION:
          return KEY_DN_POSITION
      }
    }
    macroStep.position = cyclePosition(macroStep.position)
  },
  // addMacroKey
  // Adds an additional key to the currently selected macro
  addMacroKey (state, { macro, key }) {
    let newKey = _.cloneDeep(key)
    newKey.order = macro.value.length
    newKey.position = KEY_PR_POSITION
    newKey.id = _.uniqueId('macrostep_')
    macro.value.push(newKey)
  },

  // removeMacroStep
  // Removes an individual macro step from currently edited Macro
  removeMacroStep (state, { macro, macroStep }) {
    macro.value = _.filter(macro.value, (s) => { return s.id !== macroStep.id })
  }
}

// // // //

export default mutations
