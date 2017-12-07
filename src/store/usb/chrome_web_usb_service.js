import _ from 'lodash'
import { REQUEST_DEVICE_FILTERS, READ_MACRO_CONTROL_TRANSFER, WRITE_MACRO_CONTROL_TRANSFER } from './constants'

// // // //

// ChromeWebUsbService class definition
// Responsible for managing USB devices
// - requesting permission to pair with devices
// - fetching paired devices
// - writing data to a device
// - reading data from a device
// - write firmware to a device (TODO)
class ChromeWebUsbService {
  // constructor
  // TODO - is this needed?
  constructor (options) {
    // this.options = options
    // this.messages = options.messages // TODO - support default messages
    // this.API_ROOT = options.API_ROOT
    return this
  }

  // openDevice
  // Invokes UsbDevice.open() method
  // Opens a single device
  openDevice ({ commit }, deviceInstance) {
    return new Promise((resolve, reject) => {
      return deviceInstance.open()
      .then(() => {
        // TODO - do we want to manage configuration selection in a separate method?
        return deviceInstance.selectConfiguration(1)
        .then(() => {
          // Refreshes device list
          return resolve(this.getDevices({ commit }))
        })
      })
      .catch((err) => {
        console.log('ERR - USBDevice.open() failure')
        // throw err
        return reject(err)
      })
    })
  }

  // closeDevice
  // Invokes UsbDevice.close() method
  // Closes a single device
  closeDevice ({ commit }, deviceInstance) {
    return new Promise((resolve, reject) => {
      return deviceInstance.close()
      .then(() => {
        // Refreshes device list
        return resolve(this.getDevices({ commit }))
      })
      .catch((err) => {
        console.log('ERR - USBDevice.close() failure')
        // throw err
        return reject(err)
      })
    })
  }

  // getDevices
  // Invokes navigator.usb.getDevices()
  // Used to populate state.collection with an array of paired devices
  getDevices ({ commit }) {
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      return navigator.usb.getDevices()
      .then((deviceArray) => {
        commit('collection', deviceArray)
      })
      .catch((err) => {
        console.log('ERR - navigator.usb.getDevices()')
        // throw err
        return reject(err)
      })
    })
  }

  // requestDevices
  // Invokes navigator.usb.requestDevice()
  // Used to find available devices that may not have already been paired
  requestDevices ({ commit }) {
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      return navigator.usb.requestDevice({ filters: REQUEST_DEVICE_FILTERS })
      .then((device) => {
        return resolve(this.getDevices({ commit }))
      })
      .catch((err) => {
        console.log('ERR - navigator.usb.requestDevice()')
        // throw err
        return reject(err)
      })
    })
  }

  // readMacro
  // Reads a raw macro from an opened device
  readMacro ({ commit }, deviceInstance, keyIndex) {
    console.log(deviceInstance)
    console.log(keyIndex)

    // keyIndex in hex: `0x0000`
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      // Clones the READ_MACRO_CONTROL_TRANSFER request object
      // And adds custom `value` attribute to handle the index of the key we're reading from
      let READ_MACRO_OPTIONS = _.clone(READ_MACRO_CONTROL_TRANSFER)
      READ_MACRO_OPTIONS.value = keyIndex

      // NOTE - `device.controlTransferIn` READS DATA FROM DEVICE
      // TODO - '256' should be '128'
      // TODO - `256` should be moved into constants.js
      // QUESTION - what is this `256` again, expected return length?
      return deviceInstance.controlTransferIn(READ_MACRO_OPTIONS, 256)
      .then((response) => {
        // console.log('readMacro response:')
        // console.log(new Uint8Array(response.data.buffer))
        return resolve(new Uint8Array(response.data.buffer))
      })
      .catch((err) => {
        console.log('readMacro error:')
        return reject(err)
      })
    })
  }

  // writeMacro
  // Writes a raw macro to an opened device
  writeMacro ({ commit }, deviceInstance, keyIndex, data) {
    // keyIndex in hex: `0x0000`
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      // Clones the READ_MACRO_CONTROL_TRANSFER request object
      // And adds custom `value` attribute to handle the index of the key we're reading from
      let WRITE_MACRO_OPTIONS = _.clone(WRITE_MACRO_CONTROL_TRANSFER)
      WRITE_MACRO_OPTIONS.value = keyIndex

      // NOTE - `device.controlTransferOut` WRITES DATA TO DEVICE
      return deviceInstance.controlTransferOut(WRITE_MACRO_OPTIONS, new Uint8Array(data).buffer)
      .then((response) => {
        // console.log('writeMacro response:')
        // console.log(response)
        return resolve(new Uint8Array(response.data.buffer))
      })
      .catch((err) => {
        console.log('writeMacro error:')
        return reject(err)
      })
    })
  }
}

// // // //

// TODO - this should export the constructor, rather than an instance
export default new ChromeWebUsbService()
