import _ from 'lodash'

// // // //

// Device Module mutations
const mutations = {
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  collection (state, collection) {
    state.collection = collection
  },
  current (state, attributes) {
    state.current = attributes
  },
  add (state, device) {
    // Finds a device currently in the collection that matches
    // TODO - rename `serialNumber` to `id`?
    let trackedDevice = _.find(state.collection, { serialNumber: device.serialNumber })

    // Removes the tracked device and replaces with the latest update
    if (trackedDevice) {
      state.collection = _.reject(state.collection, (d) => { return d.serialNumber === device.serialNumber })
      // state.collection.push(device)
    }

    // Adds the device
    state.collection.push(device)
  }
}

// // // //

export default mutations
