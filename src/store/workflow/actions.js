import WorkflowParser from './parser'

// // // //

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {
  // serialize
  serialize ({ commit }, { workflow }) {
    WorkflowParser.serialize(workflow)
  },

  // parse
  parse ({ commit }, { data }) {
    WorkflowParser.parse(data)
  }
}

// // // //

export default actions
