// import _ from 'lodash'
import { REQUEST_DEVICE_OPTIONS, PRIMARY_SERVICE_UUID } from './constants'

// // // //

// ChromeWebBluetoothService class definition
// Responsible for managing USB devices
// - requesting permission to pair with devices
// - fetching paired devices
// - writing data to a device
// - reading data from a device
// - write firmware to a device (TODO)
class ChromeWebBluetoothService {
  // constructor
  // TODO - is this needed?
  constructor (options) {
    // this.options = options
    // this.messages = options.messages // TODO - support default messages
    // this.API_ROOT = options.API_ROOT
    return this
  }

  // updateDevice
  // This is used to update the master record of the device with
  // the latest data that was fetched asynchronously
  // TODO - figure out whether or not this is _actually_ needed
  updateDevice ({ commit }, options) {
    return commit('add', options)
  }

  // connect
  // Invokes BluetoothRemoteGATTServer.open() method
  // Opens a single device
  connect ({ commit }, deviceInstance) {
    return new Promise((resolve, reject) => {
      return deviceInstance.gatt.connect()
      .then((g) => {
        // TODO - do we want to manage configuration selection in a separate method?
        // TODO - we SHOULD manage this in a separate method
        deviceInstance.gatt.getPrimaryService(PRIMARY_SERVICE_UUID)
        .then((gattService) => {
          console.log('GOT PRIMARY SERVICE')
          console.log(gattService)
          // Invokes BluetoothRemoteGATTService.getCharacteristics()
          gattService.getCharacteristics()
          .then((characteristics) => {
            console.log(characteristics)
            // Refreshes device list
            return resolve(this.updateDevice({ commit }, { instance: deviceInstance, primary_service: gattService, characteristics: characteristics }))
          })
        })
      })
      .catch((err) => {
        console.log('ERR - BluetoothRemoteGATTServer.open() failure')
        // throw err
        return reject(err)
      })
    })
  }

  // disconnect
  // Invokes BluetoothRemoteGATTServer.disconnect() method
  // Closes a single device
  disconnect ({ commit }, deviceInstance) {
    deviceInstance.gatt.disconnect()
    return this.updateDevice({ commit }, { instance: deviceInstance })
  }

  // write
  // Invokes BluetoothRemoteGATTService.writeValue()
  write ({ commit }, gattService, packet) {
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      return gattService.writeValue(packet)
      .then((device) => {
        console.log('WROTE TO DEVICE')
        // commit('collection', [device])
        return resolve(true)
      })
      .catch((err) => {
        console.log('ERR - BluetoothRemoteGATTService.write()')
        // throw err
        return reject(err)
      })
    })
  }

  // requestDevices
  // Invokes navigator.bluetooth.requestDevice()
  // Used to find available devices that may not have already been paired
  requestDevices ({ commit }) {
    // Returns a Promise to manage asynchonous behavior
    return new Promise((resolve, reject) => {
      return navigator.bluetooth.requestDevice(REQUEST_DEVICE_OPTIONS)
      .then((device) => {
        commit('collection', [device])
        return resolve(true)
      })
      .catch((err) => {
        console.log('ERR - navigator.bluetooth.requestDevice()')
        // throw err
        return reject(err)
      })
    })
  }
}

// // // //

// TODO - this should export the constructor, rather than an instance
export default new ChromeWebBluetoothService()
