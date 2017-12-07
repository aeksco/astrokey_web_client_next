import ChromeWebUsbService from './chrome_web_usb_service'

// actions
// functions that causes side effects and can involve asynchronous operations.
const actions = {
  requestDevices: ({ commit }) => ChromeWebUsbService.requestDevices({ commit }),
  getDevices: ({ commit }) => ChromeWebUsbService.getDevices({ commit })
}

// // // //

export default actions
