import WorkflowParser from './parser'

// // // //

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {
  // TODO - move to mutations?
  serialize: ({ commit }, { workflow }) => WorkflowParser.serialize(workflow),

  // TODO - move to mutations?
  parse: ({ commit }, { data }) => WorkflowParser.parse(data)
}

// // // //

export default actions
