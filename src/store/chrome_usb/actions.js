import ChromeAppUsbService from './chrome_app_usb_service'
import _ from 'lodash'

function getVuexDevice (usbDeviceInstance) {
  // Isolates the requisite attributes
  return {
    id: _.uniqueId('chrome_app_usb_'),
    type: 'chrome_usb',
    serialNumber: usbDeviceInstance.serialNumber,
    productName: usbDeviceInstance.productName,
    opened: usbDeviceInstance.opened || false,
    vendorId: usbDeviceInstance.vendorId,
    deviceVersionMajor: usbDeviceInstance.version,
    deviceVersionMinor: usbDeviceInstance.deviceVersionMinor,
    deviceVersionSubminor: usbDeviceInstance.deviceVersionSubminor
  }
}

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {

  // requestDevices
  // store.dispatch('chrome_usb/requestDevices')
  requestDevices: ({ state, commit }) => {
    commit('fetching', true)

    // Defines an array to add a representation of each device to the Vuex store
    let vuexDevices = []

    // Fetches devices from ChromeAppUsbService
    return ChromeAppUsbService.getDevices()
    .then((devices) => {
      // Iterates over each device
      _.each(devices, (d) => {
        let device = _.find(state.collection, { serialNumber: d.serialNumber })
        if (device) return vuexDevices.push(device)
        return vuexDevices.push(getVuexDevice(d))
      })

      // Updates the collection and fetching state
      commit('collection', vuexDevices)
      commit('fetching', false)

      // Updates the global device collection
      commit('device/collection', vuexDevices, { root: true })
    })
  },

  // openDevice
  // store.dispatch('web_usb/openDevice', { device: UsbDevice })
  openDevice: ({ commit }, { device }) => {
    ChromeAppUsbService.openDevice({ device })
    .then((d) => {
      console.log('OPENED')
      console.log(d)
      device.opened = true
    })
  },

  // closeDevice
  // store.dispatch('web_usb/closeDevice', { device: UsbDevice })
  closeDevice: ({ commit }, { device }) => {
    ChromeAppUsbService.closeDevice(device).then((d) => { device.opened = false })
  },

  // readMacro
  // store.dispatch('web_usb/readMacro', { device: UsbDevice, key: 0x0000 })
  // TODO - move selectedDevice into STATE
  // TODO - move selectedKey into STATE
  readMacro: ({ commit }, { device, key }) => {
    return ChromeAppUsbService.readMacro({ device, key })
  },

  // store.dispatch('web_usb/writeMacro', { device: UsbDevice, key: 0x0000, data: [ 1, 2, ... ] })
  // TODO - rename to writeWorkflow
  writeMacro: ({ commit }, { device, key, data }) => {
    ChromeAppUsbService.writeMacro({ device, key, data })
  }
}

// // // //

export default actions
