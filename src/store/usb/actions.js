import ChromeWebUsbService from './chrome_web_usb_service'

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {

  // Invoked with:
  // store.dispatch('usb/requestDevices')
  requestDevices: ({ commit }) => ChromeWebUsbService.requestDevices({ commit }),

  // Invoked with:
  // store.dispatch('usb/getDevices')
  getDevices: ({ commit }) => ChromeWebUsbService.getDevices({ commit }),

  // Invoked with:
  // store.dispatch('usb/openDevice', { device: UsbDevice })
  openDevice: ({ commit }, { device }) => ChromeWebUsbService.openDevice({ commit }, device),

  // Invoked with:
  // store.dispatch('usb/closeDevice', { device: UsbDevice })
  closeDevice: ({ commit }, { device }) => ChromeWebUsbService.closeDevice({ commit }, device),

  // Invoked with:
  // store.dispatch('usb/readMacro', { device: UsbDevice, key: 0x0000 })
  readMacro: ({ commit }, { device, key }) => ChromeWebUsbService.readMacro({ commit }, device, key),

  // Invoked with:
  // store.dispatch('usb/writeMacro', { device: UsbDevice, key: 0x0000, data: [ 1, 2, ... ] })
  writeMacro: ({ commit }, { device, key, data }) => ChromeWebUsbService.writeMacro({ commit }, device, key, data)
}

// // // //

export default actions
