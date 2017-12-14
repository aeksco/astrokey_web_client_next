import store from '@/store'
import _ from 'lodash'

// // // //

// USB Module mutations
const mutations = {
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  collection (state, collection) {
    // Iterates over each WebBluetooth device
    _.each(collection, (device) => {
      store.commit('web_bluetooth/add', { instance: device })
    })
  },
  add (state, options) {
    // Isolates the requisite attributes
    let deviceAttributes = {
      type: 'web_bluetooth',
      characteristics: options.characteristics,
      primary_service: options.primary_service,
      instance: options.instance,
      serialNumber: options.instance.id,
      productName: options.instance.name,
      opened: options.instance.gatt.connected,
      deviceVersionMajor: 0,
      deviceVersionMinor: 0,
      deviceVersionSubminor: 1
    }

    // Adds the device to the centralized device store
    store.commit('device/add', deviceAttributes)
  }
}

// // // //

export default mutations
