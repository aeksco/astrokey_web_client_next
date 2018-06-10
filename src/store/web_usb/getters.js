
// USB Module Getters
const getters = {
  collection: state => {
    return state.collection
  },
  fetching: state => {
    return state.fetching
  },
  transferPayload: state => {
    return state.transferPayload
  },
  transferResponse: state => {
    return state.transferResponse
  }
}

export default getters
