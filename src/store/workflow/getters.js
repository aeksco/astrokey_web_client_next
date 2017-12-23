
// Project Module Getters
const getters = {
  collection: state => {
    return state.collection
  },
  current: state => {
    return state.current
  },
  fetching: state => {
    return state.fetching
  },
  selectedStep: state => {
    return state.selectedStep
  }
}

export default getters
