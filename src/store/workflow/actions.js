import Factory from './factory'
import WorkflowParser from './parser'

// // // //

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {
  fetchCollection: ({ commit }) => Factory.fetchCollection({ commit }),

  create: ({ commit }, attributes) => Factory.create({ commit }, attributes),

  serialize: ({ commit }, { workflow }) => WorkflowParser.serialize(workflow),

  parse: ({ commit }, data) => WorkflowParser.parse({ commit }, data)
}

// // // //

export default actions
