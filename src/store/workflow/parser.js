import _ from 'lodash'
import { KEYS } from './keys'
import { randomId, pairArray } from './helpers'
import { KEY_UP_POSITION, KEY_PR_POSITION, KEY_DN_POSITION, WORKFLOW_STEP_DELAY, WORKFLOW_STEP_MACRO, WORKFLOW_STEP_KEYUP, WORKFLOW_STEP_TEXT, TEXT_WORKFLOW_STEP, MACRO_WORKFLOW_STEP, DELAY_WORKFLOW_STEP, KEYUP_WORKFLOW_STEP } from './constants'

// 1,2,3 - KEY ACTIONS
// 224-254 - Encapsulation delimiters
// 255 - RESERVED - INDICATES END OF MACRO
// const STEP_INITIATOR = 1 // STEP_INITIATOR
const STEP_TERMINATOR = 224 // STEP_TERMINATOR

const DELAY_INITIATOR = 16 // WORKING
const KEYUP_INITIATOR = 128 // TEST KEYUP
const MACRO_INITIATOR = 253 // WORKING
const TEXT_INITIATOR = 254 // WORKING

// WORKFLOW SIZE LIMIT = 4096

// // // //

// TODO - Abstract into WorkflowParser & WorkflowSerializer classes
class WorkflowParser {
  // constructor
  constructor (options) {
    this.options = options
    return this
  }

  // parse
  // Parses a workflow data buffer read from the device into the database-level abstraction
  parseOld (data) {
    // Stores the keys used to populate the macro collection
    let macro
    let macros = []

    // Compacts the data array
    // QUESTION - will we ever have zeros between each key stroke?
    // Doesn't look like it - but keep it in mind here.
    data = _.compact(data)

    // Splits the array into pairs of [position, character_id]
    let pairs = pairArray(data)

    // Defines variable to store the current step in the workflow
    let currentWorkflowStep = null

    // persistWorkflowStep helper function
    // Adds an ID to the currentWorkflow step
    const persistWorkflowStep = () => {
      currentWorkflowStep.id = randomId()
      currentWorkflowStep.order = macros.length
      // Parses TEXT
      if (currentWorkflowStep.type === 'TEXT') {
        currentWorkflowStep.value = this.parseText(currentWorkflowStep.value)
      }
      // Parses MACRO
      if (currentWorkflowStep.type === 'MACRO') {
        currentWorkflowStep.value = this.sanitizeMacro(currentWorkflowStep.value)
      }

      // Appends currentWorkflowstep to macros array
      macros.push(currentWorkflowStep)
      currentWorkflowStep = null
    }

    // Iterates over each pair in the macroArray
    for (let index = 0; index < pairs.length; index++) {
      // Captures values at the index position
      const pair = pairs[index]
      const position = pair[0]

      // KEYUP_WORKFLOW_STEP
      if (pair[0] === KEYUP_INITIATOR) {
        if (currentWorkflowStep) {
          persistWorkflowStep()
        }
        // Clones the macro object
        macro = _.clone(KEYUP_WORKFLOW_STEP)
        macro.id = randomId()
        macro.order = macros.length
        macros.push(macro)

      // DELAY_WORKFLOW_STEP
      } else if (pair[0] === DELAY_INITIATOR) {
        if (currentWorkflowStep) {
          persistWorkflowStep()
        }
        // Clones the macro object
        macro = _.clone(DELAY_WORKFLOW_STEP)

        // Assignss the proper delay value
        macro.value = pair[1]
        macro.id = randomId()
        macro.order = macros.length
        macros.push(macro)

      // TEXT_WORKFLOW_STEP
      } else if (pair[0] === TEXT_INITIATOR) {
        if (currentWorkflowStep) {
          persistWorkflowStep()
        }
        // Clones the macro object
        macro = _.clone(TEXT_WORKFLOW_STEP)
        macro.id = randomId()

        // Temporarily hold the keys used to construct the text
        macro.value = []

        // MACRO_WORKFLOW_STEP
        currentWorkflowStep = macro

        // Assigns the nested text
        // let value =
        // macro.value = 'TEXT TEXT'

      // MACRO_WORKFLOW_STEP
      } else if (pair[0] === MACRO_INITIATOR) {
        if (currentWorkflowStep) {
          persistWorkflowStep()
        }

        // Clones the macro object
        macro = _.clone(MACRO_WORKFLOW_STEP)
        macro.id = randomId()

        // Assignss the proper order/index and position attributes
        macro.value = []

        currentWorkflowStep = macro
      } else {
        // // // // // // // //
        // HACK until workflow actions are fully integrated
        if (!currentWorkflowStep) {
          macro = _.clone(MACRO_WORKFLOW_STEP)
          macro.id = randomId()

          // Assignss the proper order/index and position attributes
          macro.value = []

          currentWorkflowStep = macro
        }
        // END HACK
        // // // // // // // //

        // Finds key object
        let key = _.find(KEYS, { dec: pair[1] }) // TODO - CONSTANTIZE INDEX HERE

        if (!key) {
          console.log('ALERT - KEY NOT FOUND!')

          if (pair[0] === 255 && pair[1] === 255) {
            console.log('END MACRO')
            console.log(macros)
            // return { steps: macros }
            break
          } else {
            console.log('??????')
            console.log(pair)
            console.log(macros)
            return { steps: [] }
          }
        }

        // Clones the macro object
        key = _.clone(key)
        key.id = 'key_' + Math.floor((Math.random() * 100000000000000) + 1)

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
      currentWorkflowStep.id = randomId()
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

  parse (data) {
    // Stores the parsed workflow
    let workflowSteps = []

    // Compacts the data array
    // QUESTION - will we ever have zeros between each key stroke?
    // Doesn't look like it - but keep it in mind here.
    data = _.compact(data)

    // Splits the array into pairs of [position, character_id]
    // let pairs = pairArray(data)

    // Adds an individual step to the workflow
    const addToWorkflow = (step) => {
      step.id = randomId()
      step.order = workflowSteps.length
      workflowSteps.push(step)
    }

    // persistWorkflowStep helper function
    // Adds an ID to the currentWorkflow step
    const persistWorkflowStep = (step) => {
      // currentWorkflowStep.id = randomId()
      // currentWorkflowStep.order = macros.length
      // // Parses TEXT
      // if (currentWorkflowStep.type === 'TEXT') {
      //   currentWorkflowStep.value = this.parseText(currentWorkflowStep.value)
      // }
      // // Parses MACRO
      // if (currentWorkflowStep.type === 'MACRO') {
      //   currentWorkflowStep.value = this.sanitizeMacro(currentWorkflowStep.value)
      // }

      // // Appends currentWorkflowstep to macros array
      // macros.push(currentWorkflowStep)
      // currentWorkflowStep = null

      // Isolates the STEP_INITIATOR variable
      let STEP_INITIATOR = step.shift()

      let workflowStep

      switch (STEP_INITIATOR) {
        case (DELAY_INITIATOR):
          console.log('DELAY')
          console.log(step)
          workflowStep = _.clone(DELAY_WORKFLOW_STEP)
          workflowStep.value = step[1]
          addToWorkflow(workflowStep)
          break

        case (MACRO_INITIATOR):
          console.log('MACRO')
          console.log(step)
          workflowStep = _.clone(MACRO_WORKFLOW_STEP)
          workflowStep.value = step
          addToWorkflow(workflowStep)
          break
        case (TEXT_INITIATOR):
          console.log('TEXT')
          console.log(step)
          break
        case (KEYUP_INITIATOR):
          console.log('KEYUP')
          console.log(step)
          workflowStep = _.clone(KEYUP_WORKFLOW_STEP)
          addToWorkflow(workflowStep)
          break
      }
    }

    // // // //

    // Splits into individual workflow steps
    let steps = data.join(',').split(`,${STEP_TERMINATOR},`)

    // Splits each step BACK into an array
    steps = _.map(steps, (s) => {
      let step = s.split(',')
      return step.map(i => Number(i))
    })

    // Parses each workflow step
    _.each(steps, (step) => { persistWorkflowStep(step) })

    // Returns the array of Workflow steps
    return workflowSteps
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
    for (var index = 0; index < text.length; index++) {
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
        data.push(DELAY_INITIATOR) // TODO - CONSTANTIZE AS DELAY INDICATOR
        data.push(step.value) // 1 - 255 (i.e. 5 = 5 x 100ms = 500ms)
        data.push(STEP_TERMINATOR) // ARBITRARY
        return
      }

      if (step.type === WORKFLOW_STEP_KEYUP) {
        data.push(KEYUP_INITIATOR) // TODO - CONSTANTIZE as KEY_UP indicator
        data.push(STEP_TERMINATOR) // ARBITRARY
        // data.push(STEP_INITIATOR) // ARBITRARY
        return
      }

      if (step.type === WORKFLOW_STEP_TEXT) {
        data.push(TEXT_INITIATOR) // TODO - Constantize as TEXT_START indicator
        // data.push(STEP_INITIATOR) // ARBITRARY
        data = _.concat(data, this.serializeText(step.value))
        // data.push(TEXT_INITIATOR) // TODO - Constantize as TEXT_START indicator
        data.push(STEP_TERMINATOR) // ARBITRARY
      }

      if (step.type === WORKFLOW_STEP_MACRO) {
        data.push(MACRO_INITIATOR) // TODO - Constantize as MACRO_START indicator
        // data.push(STEP_INITIATOR) // ARBITRARY
        data = _.concat(data, this.serializeKeys(step.value))
        // data.push(MACRO_INITIATOR) // TODO - Constantize as MACRO_START indicator
        data.push(STEP_TERMINATOR) // ARBITRARY
      }
    })

    console.log('workflow/serialize: ')
    console.log(data)
    return data
  }
}

// // // //

// export default new WorkflowParser()
const parser = new WorkflowParser()
window.parser = parser
export default parser
