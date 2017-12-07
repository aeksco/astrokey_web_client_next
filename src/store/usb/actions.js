import ChromeWebUsbService from './chrome_web_usb_service'

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {
  requestDevices: ({ commit }) => ChromeWebUsbService.requestDevices({ commit }),
  getDevices: ({ commit }) => ChromeWebUsbService.getDevices({ commit }),

  // Invokes with:
  // store.dispatch('usb/readMacro', { device: UsbDevice, key: 0x0000 })
  readMacro: ({ commit }, { device, key }) => ChromeWebUsbService.readMacro({ commit }, device, key)
}

// // // //

export default actions
