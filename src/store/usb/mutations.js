import store from '@/store'
import _ from 'lodash'

// // // //

// USB Module mutations
const mutations = {
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  collection (state, collection) {
    // Iterates over each WebUSB device
    _.each(collection, (device) => {
      // Isolates the requisite attributes
      let deviceAttributes = {
        type: 'web_usb',
        instance: device,
        serialNumber: device.serialNumber,
        productName: device.productName,
        opened: device.opened,
        deviceVersionMajor: device.deviceVersionMajor,
        deviceVersionMinor: device.deviceVersionMinor,
        deviceVersionSubminor: device.deviceVersionSubminor
      }

      // Adds the device to the centralized device store
      store.commit('device/add', deviceAttributes)
    })
  }
}

// // // //

export default mutations
