import _ from 'lodash'
import { KEYS } from './keys'
import { WORKFLOW_STEP_DELAY, WORKFLOW_STEP_MACRO, WORKFLOW_STEP_KEYUP } from './constants'

// // // //

// Creates new AbstractFactory instance
class WorkflowParser {
  // constructor
  constructor (options) {
    this.options = options
    return this
  }

  // parse
  // Parses a workflow data buffer read from the device into the database-level abstraction
  parse (data) {
    console.log('PARSE')
    console.log(KEYS)
    console.log(data)
  }

  // serializeText
  // serialzes a text workflow step
  serializeText (text) {
    const macroKeys = []

    // cloneKey
    // clones an object from KEYS
    function cloneKey (macro, attrs = { position: 3 }) {
      // Clones and returns the macro object
      return _.merge(_.clone(macro), attrs)
    }

    // TODO - ABSTRACT TO CONSTANTS?
    const SHIFT_KEY = _.find(KEYS, { key: 'SHIFT' })

    // Iterates over each character in the text
    // and stores it in it's KEY representation
    for (var index = 0; index < text.length - 1; index++) {
      // Isolaets the character
      const char = text[index]

      // DEBUG
      // console.log(char)

      // Finds the macro
      // Adds shiftt characters for upper/lower case
      let macro = _.find(KEYS, { key: char })
      if (macro) {
        macroKeys.push(cloneKey(macro))
        continue
      }

      // Checks for shifted macro
      if (!macro) {
        macro = _.find(KEYS, { shift_key: char })
      }

      // Applies key with SHIFT to capitalize
      if (macro) {
        macroKeys.push(cloneKey(SHIFT_KEY, { position: 1 })) // KEY_DN
        macroKeys.push(cloneKey(macro))
        macroKeys.push(cloneKey(SHIFT_KEY, { position: 2 })) // KEY_UP
        continue
      }

      // 'SPACE' character printed when not found
      // TODO - ensure ^ doesn't happen
      if (!macro) { macro = _.find(KEYS, { key: 'SPACE' }) }

      // Appends macro to macroKeys array
      macroKeys.push(cloneKey(macro))
    }

    // console.log(JSON.stringify(macroKeys, null, 2))

    // Parses the individual macro keys into their decimal values
    // and returns the resulting array
    return this.serializeKeys(macroKeys)
  }

  // serializeKeys
  // Serializes a single key into its decimal format
  serializeKeys (macroKeys) {
    // console.log('SERIALIZE KEYS')
    // console.log(macroKeys)
    let serialized_values = []

    _.each(macroKeys, (key) => {
      // # KEY_DN
      if (key.position === 1) { // TODO - constantize
        serialized_values.push(1)
        serialized_values.push(key.dec || 4)
      }

      // # KEY_UP
      if (key.position === 2) { // TODO - constantize
        serialized_values.push(2)
        serialized_values.push(key.dec || 4)
      }

      // # KEY_PR
      if (key.position === 3) { // TODO - constantize
        serialized_values.push(3)
        serialized_values.push(key.dec || 4)
      }
    })

    return serialized_values
  }

  // serialize
  // serializes a workflow from the database-level abstraction into a data buffer to be sent to a device
  serialize (workflow) {
    let data = []
    _.each(workflow.steps, (step) => {
      // console.log(step)

      if (step.type === WORKFLOW_STEP_DELAY) {
        data.push(16) // TODO - CONSTANTIZE AS DELAY INDICATOR
        data.push(step.value) // 1 - 255 (i.e. 5 = 5 x 100ms = 500ms)
        return
      }

      if (step.type === WORKFLOW_STEP_KEYUP) {
        data.push(255) // TODO - CONSTANTIZE as KEY_UP indicator
        data.push(0) // ARBITRARY
        return
      }

      // if (step.type === WORKFLOW_STEP_TEXT) {
      //   data = _.concat(data, this.serializeText(step.value))
      // }

      if (step.type === WORKFLOW_STEP_MACRO) {
        data = _.concat(data, this.serializeKeys(step.value))
      }
    })

    console.log('workflow/serialize: ')
    console.log(data)
    return data
  }
}

// // // //

export default new WorkflowParser()
