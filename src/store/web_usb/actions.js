import _ from 'lodash'
import WebUsbService from './service'
const USBDevices = []

// // // //

function buildVuexDevice (usbDevice) {
  return {
    id: usbDevice.id,
    productName: 'AstroKey',
    type: 'chrome_web_usb',
    opened: usbDevice.opened
  }
}

function trackUsbDevice (device) {
  let trackedDevice = _.find(USBDevices, { id: device.id })
  if (trackedDevice) return
  USBDevices.push(device)
}

function getUsbDevice (device_id) {
  return _.find(USBDevices, { id: device_id })
}

// // // //

export default {
  // Invoked with:
  // store.dispatch('web_usb/requestDevices')
  // TODO - ensure that this function does not add duplicate devices to store.collection
  requestDevices: ({ dispatch }) => {
    return WebUsbService.requestDevices()
    .then((device) => {
      trackUsbDevice(device)
      dispatch('resetCollcetion')
    })
  },

  // resets state.collection to be up-to-date with all devices in USBDevices array
  resetCollcetion ({ commit }) {
    let collection = []
    _.each(USBDevices, (d) => {
      collection.push(buildVuexDevice(d))
    })

    commit('collection', collection)
  },

  // Invoked with:
  // store.dispatch('web_usb/getDevices')
  getDevices: ({ state, commit, dispatch }) => {
    WebUsbService.getDevices()
    .then((devices) => {
      _.each(devices, (d) => { trackUsbDevice(d) })
      dispatch('resetCollcetion')
    })
  },

  // Invoked with:
  // store.dispatch('web_usb/openDevice', vuexDevice)
  openDevice: ({ dispatch }, vuexDevice) => {
    let usbDevice = getUsbDevice(vuexDevice.id)
    if (!usbDevice) return

    return WebUsbService.openDevice(usbDevice)
    .then((d) => { dispatch('resetCollcetion') })
  },

  // Invoked with:
  // store.dispatch('web_usb/closeDevice', { device: UsbDevice })
  closeDevice: ({ dispatch }, vuexDevice) => {
    let usbDevice = getUsbDevice(vuexDevice.id)
    if (!usbDevice) return

    WebUsbService.closeDevice(usbDevice)
    .then((d) => { dispatch('resetCollcetion') })
  },

  // Invoked with:
  // store.dispatch('web_usb/readMacro', { device: UsbDevice, key: 0x0000 })
  readMacro: ({ commit }, { device, key }) => WebUsbService.readMacro({ commit }, device, key),

  // Invoked with:
  // store.dispatch('web_usb/writeMacro', { device: UsbDevice, key: 0x0000, data: [ 1, 2, ... ] })
  // TODO - rename to writeWorkflow
  writeMacro: ({ commit }, { device, key, data }) => WebUsbService.writeMacro({ commit }, device, key, data)
}
