
// WebUSB Module mutations
const mutations = {
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  collection (state, collection) {
    state.collection = collection
  },
  transferPayload (state, transferPayload) {
    state.transferPayload = transferPayload
  },
  transferResponse (state, transferResponse) {
    state.transferResponse = transferResponse
  }
}

// // // //

export default mutations
