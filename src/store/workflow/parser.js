import { KEYS } from './keys'

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

  // serialize
  // serializes a workflow from the database-level abstraction into a data buffer to be sent to a device
  serialize (workflow) {
    console.log('serialize')
    console.log(KEYS)
    console.log(workflow)
  }
}

// // // //

export default new WorkflowParser()
