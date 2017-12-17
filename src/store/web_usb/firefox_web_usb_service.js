// import _ from 'lodash'
// import { REQUEST_DEVICE_FILTERS, READ_MACRO_CONTROL_TRANSFER, WRITE_MACRO_CONTROL_TRANSFER } from './constants'

// // // //

// FirefoxWebUsbService class definition
// Responsible for managing USB devices
// - requesting permission to pair with devices
// - fetching paired devices
// - writing data to a device
// - reading data from a device
// - write firmware to a device (TODO)
class FirefoxWebUsbService {
  // constructor
  constructor (options) {
    // this.options = options
    return this
  }

  // openDevice
  // Invokes UsbDevice.open() method
  // Opens a single device
  openDevice ({ commit }, deviceInstance) {
    return true
  }

  // closeDevice
  // Invokes UsbDevice.close() method
  // Closes a single device
  closeDevice ({ commit }, deviceInstance) {
    return true
  }

  // getDevices
  // Invokes navigator.usb.getDevices()
  // Used to populate state.collection with an array of paired devices
  getDevices ({ commit }) {
    return true
  }

  // requestDevices
  // Invokes navigator.usb.requestDevice()
  // Used to find available devices that may not have already been paired
  requestDevices ({ commit }) {
    return true
  }

  // readMacro
  // Reads a raw macro from an opened device
  readMacro ({ commit }, deviceInstance, keyIndex) {
    return true
  }

  // writeMacro
  // Writes a raw macro to an opened device
  writeMacro ({ commit }, deviceInstance, keyIndex, data) {
    return true
  }
}

// // // //

export default FirefoxWebUsbService
