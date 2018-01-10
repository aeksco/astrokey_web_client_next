import WebUsbService from './service'

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {

  // Invoked with:
  // store.dispatch('web_usb/requestDevices')
  requestDevices: ({ commit }) => WebUsbService.requestDevices({ commit }),

  // Invoked with:
  // store.dispatch('web_usb/getDevices')
  getDevices: ({ commit }) => WebUsbService.getDevices(),

  // Invoked with:
  // store.dispatch('web_usb/openDevice', { device: UsbDevice })
  openDevice: ({ commit }, { device }) => {
    WebUsbService.openDevice(device).then((d) => { device.opened = true })
  },

  // Invoked with:
  // store.dispatch('web_usb/closeDevice', { device: UsbDevice })
  closeDevice: ({ commit }, { device }) => {
    WebUsbService.closeDevice(device).then((d) => { device.opened = false })
  },

  // Invoked with:
  // store.dispatch('web_usb/readMacro', { device: UsbDevice, key: 0x0000 })
  readMacro: ({ commit }, { device, key }) => WebUsbService.readMacro({ commit }, device, key),

  // Invoked with:
  // store.dispatch('web_usb/writeMacro', { device: UsbDevice, key: 0x0000, data: [ 1, 2, ... ] })
  // TODO - rename to writeWorkflow
  writeMacro: ({ commit }, { device, key, data }) => WebUsbService.writeMacro({ commit }, device, key, data)
}

// // // //

export default actions
