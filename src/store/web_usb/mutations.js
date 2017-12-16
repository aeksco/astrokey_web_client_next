import store from '@/store'
import WebUSBService from './service'
import _ from 'lodash'

// // // //

// WebUSB Module mutations
const mutations = {
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  add (state, usbDeviceInstance) {
    let device = WebUSBService.addDevice(usbDeviceInstance)
    store.commit('device/add', device)
  },
  remove (state, usbDeviceInstance) {
    let device = WebUSBService.removeDevice(usbDeviceInstance)
    store.commit('device/remove', device)
  },
  // TODO - the WebUSB store should NOT maintain a reference to its own collection of devices
  collection (state, collection) {
    // Iterates over each WebUSB device
    // Adds the device to the centralized device store
    _.each(collection, (device) => { store.commit('device/add', device) })
  }
}

// // // //

export default mutations
