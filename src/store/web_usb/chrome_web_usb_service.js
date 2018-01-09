import _ from 'lodash'
import store from '@/store'
import { REQUEST_DEVICE_FILTERS, READ_MACRO_CONTROL_TRANSFER, WRITE_MACRO_CONTROL_TRANSFER } from './constants'

// // // //

// TODO - this class should NOT manage any VUEX state

// ChromeWebUsbService class definition
// Responsible for managing USB devices
// - requesting permission to pair with devices
// - fetching paired devices
// - writing data to a device
// - reading data from a device
// - write firmware to a device (TODO)
class ChromeWebUsbService {
  // constructor
  // Manages the initial configuration of the class
  constructor (options) {
    // TODO - this.devices should be passed in as an option
    // this.devices = web_usb.state.devices = []
    this.options = options
    this.devices = [] // TODO - we don't need to maintain this.devices

    // WebUSB Device 'connect' event handler
    navigator.usb.addEventListener('connect', (usbConnectionEvent) => {
      // TODO - these should JUST hit the 'device/add' directly
      // store.commit('web_usb/add', usbConnectionEvent.device)
      this.addDevice(usbConnectionEvent.device)
    })

    // WebUSB Device 'disconnect' event handler
    navigator.usb.addEventListener('disconnect', (usbConnectionEvent) => {
      // TODO - these should JUST hit the 'device/add' directly
      // store.commit('web_usb/remove', usbConnectionEvent.device)
      this.removeDevice(usbConnectionEvent.device)
    })

    // Performs initial fetch of devices
    this.getDevices()

    return this
  }

  // getDevice
  // Gets or creates a new abstract represnetation of a WebUSB device
  getDevice (usbDeviceInstance) {
    // Finds and returns the device if it exists
    let device = _.find(this.devices, { serialNumber: usbDeviceInstance.serialNumber })
    if (device) { return device }

    // Adds a new device
    // Isolates the requisite attributes
    device = {
      type: 'web_usb',
      instance: usbDeviceInstance,
      serialNumber: usbDeviceInstance.serialNumber,
      productName: usbDeviceInstance.productName,
      opened: usbDeviceInstance.opened,
      deviceVersionMajor: usbDeviceInstance.deviceVersionMajor,
      deviceVersionMinor: usbDeviceInstance.deviceVersionMinor,
      deviceVersionSubminor: usbDeviceInstance.deviceVersionSubminor
    }

    // Adds the device to the centralized device store
    // store.commit('device/add', device)
    // this.devices.push(device)
    return device
  }

  // addDevice
  // Adds a device to this.devices
  addDevice (usbDeviceInstance) {
    // TODO - SERIOUS
    // Devices must maintain a unique attribute that can be
    // reliably used to single out a specific device
    console.log(usbDeviceInstance)

    // Fetches an existing device by serialNumber,
    // or creates a new abstract representation of a device
    let device = this.getDevice(usbDeviceInstance)

    // Adds device to device store
    store.commit('device/add', device)
    return device
  }

  // removeDevice
  // Adds a device to this.devices
  removeDevice (usbDeviceInstance) {
    let device = this.getDevice(usbDeviceInstance)
    // console.log('REMOVING DEVICE')
    // console.log(device)
    // _.remove(this.devices, (d) => { return d.serialNumber === device.serialNumber })
    store.commit('device/remove', device)
    return device
  }

  // openDevice
  // Invokes UsbDevice.open() method
  // Opens a single device
  openDevice (device) {
    return new Promise((resolve, reject) => {
      return device.instance.open()
      .then(() => {
        // TODO - do we want to manage configuration selection in a separate method?
        return device.instance.selectConfiguration(1)
        .then(() => {
          // Refreshes device list
          return resolve(device)
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
  closeDevice (device) {
    return new Promise((resolve, reject) => {
      return device.instance.close()
      .then(() => {
        // Refreshes device list
        return resolve(device)
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
  getDevices () {
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      return navigator.usb.getDevices()
      .then((deviceArray) => {
        // Transforms each WebUSB device into an abstract representation
        _.each(deviceArray, (d) => { this.addDevice(d) })
        // Resolves the promise with this.devices
        return resolve(this.devices)
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
        console.log('writeMacro response:')
        console.log(response)
        // return resolve(new Uint8Array(response.data.buffer))
        return resolve(response)
      })
      .catch((err) => {
        console.log('writeMacro error:')
        return reject(err)
      })
    })
  }
}

// // // //

export default ChromeWebUsbService
