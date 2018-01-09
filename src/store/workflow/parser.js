import _ from 'lodash'
import { KEYS } from './keys'
import { KEY_UP_POSITION, KEY_PR_POSITION, KEY_DN_POSITION, WORKFLOW_STEP_DELAY, WORKFLOW_STEP_MACRO, WORKFLOW_STEP_KEYUP, WORKFLOW_STEP_TEXT, TEXT_WORKFLOW_STEP, MACRO_WORKFLOW_STEP, DELAY_WORKFLOW_STEP, KEYUP_WORKFLOW_STEP } from './constants'

// // // //

// Accepts an array and splits it
// into pairs of [position, character_id]
function pairArray (a) {
  let temp = a.slice()
  let arr = []

  while (temp.length) {
    arr.push(temp.splice(0, 2))
  }

  return arr
}

// TODO - Abstract into WorkflowParser & WorkflowSerializer classes
class WorkflowParser {
  // constructor
  constructor (options) {
    this.options = options
    return this
  }

  // parse
  // Parses a workflow data buffer read from the device into the database-level abstraction
  parse (data) {
    // Stores the keys used to populate the macro collection
    let macro
    let macros = []
    // let parsedMacros = []

    // Compacts the data array
    // QUESTION - will we ever have zeros between each key stroke?
    data = _.compact(data)

    // Splits the array into pairs of [position, character_id]
    let pairs = pairArray(data)

    let currentWorkflowStep = null

    const addWorkflowStep = () => {
      currentWorkflowStep.order = macros.length
      // Parses TEXT
      if (currentWorkflowStep.type === 'TEXT') {
        currentWorkflowStep.value = this.parseText(currentWorkflowStep.value)
      }
      if (currentWorkflowStep.type === 'MACRO') {
        currentWorkflowStep.value = this.sanitizeMacro(currentWorkflowStep.value)
      }
      macros.push(currentWorkflowStep)
      currentWorkflowStep = null
    }

    // Iterates over each pair in the macroArray
    for (let index = 0; index < pairs.length; index++) {
      // Captures and formats the position
      const pair = pairs[index]
      const position = pair[0]

      // 255 == KEY_UP Workflow Step
      // KEYUP_WORKFLOW_STEP
      if (pair[0] === 255) {
        if (currentWorkflowStep) {
          addWorkflowStep()
        }
        // Clones the macro object
        macro = _.clone(KEYUP_WORKFLOW_STEP)
        macro.order = macros.length
        macros.push(macro)

      // 16 == DELAY Workflow Step
      // DELAY_WORKFLOW_STEP
      } else if (pair[0] === 16) {
        if (currentWorkflowStep) {
          addWorkflowStep()
        }
        // Clones the macro object
        macro = _.clone(DELAY_WORKFLOW_STEP)

        // Assignss the proper delay value
        macro.value = pair[1]
        macro.order = macros.length
        macros.push(macro)

      // Finds the macro object
      // 254 == TEXT Workflow Step
      // TODO - constantize
      // TEXT_WORKFLOW_STEP
      } else if (pair[0] === 254) {
        if (currentWorkflowStep) {
          addWorkflowStep()
        }
        // Clones the macro object
        macro = _.clone(TEXT_WORKFLOW_STEP)

        // Temporarily hold the keys used to construct the text
        macro.value = []

        // MACRO_WORKFLOW_STEP
        currentWorkflowStep = macro

        // Assigns the nested text
        // let value =
        // macro.value = 'TEXT TEXT'

      // 253 == MACRO Workflow Step
      // TODO - constantize
      // MACRO_WORKFLOW_STEP
      // } else if (pair[0] === 253) {
      //   if (currentWorkflowStep) {
      //     addWorkflowStep()
      //   }

      //   // Clones the macro object
      //   macro = _.clone(MACRO_WORKFLOW_STEP)

      //   // Assignss the proper order/index and position attributes
      //   macro.value = []

      //   currentWorkflowStep = macro
      } else {
        // HACK until workflow actions are fully integrated
        if (!currentWorkflowStep) {
          macro = _.clone(MACRO_WORKFLOW_STEP)

          // Assignss the proper order/index and position attributes
          macro.value = []

          currentWorkflowStep = macro
        }

        // Finds key object
        let key = _.find(KEYS, { dec: pair[1] }) // TODO - CONSTANTIZE INDEX HERE

        // Clones the macro object
        key = _.clone(key)

        // Sets the appropriate position on the key
        key.position = position

        // Assignss the proper order/index and position attributes
        if (currentWorkflowStep) {
          currentWorkflowStep.value.push(key)
        } else {
          console.log('???')
          console.log(key)
          // currentWorkflowStep.value.push(key)
        }
      }
    }

    // Appends the last macro the the `macros` array
    if (currentWorkflowStep) {
      currentWorkflowStep.order = macros.length
      // Parses TEXT
      if (currentWorkflowStep.type === 'TEXT') {
        currentWorkflowStep.value = this.parseText(currentWorkflowStep.value)
      }
      if (currentWorkflowStep.type === 'MACRO') {
        currentWorkflowStep.value = this.sanitizeMacro(currentWorkflowStep.value)
      }
      macros.push(currentWorkflowStep)
    }

    // Parses TEXT

    // OUTPUT
    // TODO - rename to `workflow`
    console.log({ steps: macros })
    return { steps: macros }
  }

  // sanitizeMacro
  sanitizeMacro (value) {
    console.log('sanitizeMacro')
    value = _.map(value, (key) => {
      console.log(key)
      return key
    })
    return value
  }

  // parseText
  // Parses a string of text from a TEXT WorkflowStep
  parseText (value) {
    let textValue = ''
    let shiftFlag = false

    _.each(value, (key) => {
      if (key.key === 'SHIFT') {
        if (key.position === KEY_DN_POSITION) {
          shiftFlag = true
          return
        } else {
          shiftFlag = false
          return
        }
      }

      if (key.key === 'SPACE') {
        textValue += ' '
      } else if (shiftFlag) {
        textValue += key.shift_key
      } else {
        textValue += key.key
      }
    })

    // console.log(textValue)
    return textValue
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
      // KEY_DN_POSITION
      if (key.position === KEY_DN_POSITION) {
        serialized_values.push(KEY_DN_POSITION)
        serialized_values.push(key.dec || 4) // TODO - constantize default
      }

      // # KEY_UP_POSITION
      if (key.position === KEY_UP_POSITION) {
        serialized_values.push(KEY_UP_POSITION)
        serialized_values.push(key.dec || 4) // TODO - constantize default
      }

      // # KEY_PR_POSITION
      if (key.position === KEY_PR_POSITION) {
        serialized_values.push(KEY_PR_POSITION)
        serialized_values.push(key.dec || 4) // TODO - constantize default
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

      // TODO - change to switch statement
      if (step.type === WORKFLOW_STEP_DELAY) {
        data.push(16) // TODO - CONSTANTIZE AS DELAY INDICATOR
        data.push(step.value) // 1 - 255 (i.e. 5 = 5 x 100ms = 500ms)
        return
      }

      if (step.type === WORKFLOW_STEP_KEYUP) {
        data.push(255) // TODO - CONSTANTIZE as KEY_UP indicator
        data.push(1) // ARBITRARY
        return
      }

      if (step.type === WORKFLOW_STEP_TEXT) {
        data.push(254) // TODO - Constantize as TEXT_START indicator
        data.push(1) // ARBITRARY
        data = _.concat(data, this.serializeText(step.value))
      }

      if (step.type === WORKFLOW_STEP_MACRO) {
        // data.push(253) // TODO - Constantize as MACRO_START indicator
        // data.push(1) // ARBITRARY
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
