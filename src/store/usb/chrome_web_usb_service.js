import _ from 'lodash'
import { REQUEST_DEVICE_FILTERS, READ_MACRO_CONTROL_TRANSFER } from './constants'

// ChromeWebUsbService class definition
class ChromeWebUsbService {
  // constructor
  constructor (options) {
    // this.options = options
    // this.messages = options.messages // TODO - support default messages
    // this.API_ROOT = options.API_ROOT
    return this
  }

  // openDevice
  // Invokes UsbDevice.open() method
  // Opens a single device
  openDevice (deviceInstance) {
    return new Promise((resolve, reject) => {
      return deviceInstance.open()
      .then(() => {
        // TODO - do we want to manage configuration selection in a separate method?
        return deviceInstance.selectConfiguration(1).then(() => {
          // TODO - remove - debugging only
          window.d = deviceInstance
          // Resolves with device
          return resolve(deviceInstance)
        })
      })
      .catch((err) => {
        console.log('ERR - USBDevice.open() failure')
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

      console.log(READ_MACRO_OPTIONS)

      // NOTE - `device.controlTransferIn` (READS DATA FROM DEVICE)
      // TODO - '256' should be '128'
      // TODO - `256` should be moved into constants.js
      // QUESTION - what is this `256` again, expected return length?
      return deviceInstance.controlTransferIn(READ_MACRO_OPTIONS, 256)
      .then((response) => {
        // console.log('readMacro response:');
        // console.log(response);
        return resolve(new Uint8Array(response.data.buffer))
      })
      .catch((err) => {
        // console.log('readMacro error:')
        // console.log(err)
        return reject(err)
      })
    })
  }
}
// // // //

// TODO - this should export the constructor, rather than an instance
export default new ChromeWebUsbService()

// // /*
//  * decaffeinate suggestions:
//  * DS102: Remove unnecessary code created because of implicit returns
//  * DS206: Consider reworking classes to avoid initClass
//  * DS207: Consider shorter variations of null checks
//  * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
//  */
// // Filters used to query WebUSB devices
// // TODO - update filters to query devices by AstroKey VendorID
// const requestDeviceFilters = [
//   { vendorId: 0x10c4 }
// ];

// // # # #

// // ChromeWebUsbService class definition
// // Responsible for managing USB devices
// // - fetch all devices
// // - writing data to a device
// // - reading data from a device
// // - write firmware to a device
// class ChromeWebUsbService extends Marionette.Service {
//   static initClass() {

//   // readMacro
//   readMacro(macroIndex) {

//     // Returns a Promise to manage asynchonous behavior
//     if (macroIndex == null) { macroIndex = 0x0000; }
//     return new Promise((resolve, reject) => {

//       // TODO - move to constants
//       const READ_MACRO_CONTROL_TRANSFER = {
//         'requestType':  'vendor',
//         'recipient':    'device',
//         'request':      0x03,
//         'value':        macroIndex,
//         'index':        0x02
//       };

//       // device.controlTransferIn (READS DATA FROM DEVICE)
//       // TODO - abstract the controlTransferIn request object into a constant (cloned each time)
//       return d.controlTransferIn(READ_MACRO_CONTROL_TRANSFER, 256) // TODO - '256' should be '128'
//       .then( response => {
//         console.log('readMacro response:');
//         console.log(response);
//         return resolve(new Uint8Array(response.data.buffer));
//       })
//       .catch( err => {
//         console.log('readMacro error:');
//         console.log(err);
//         return reject(err);
//       });
//     });
//   }

//   // writeMacro
//   writeMacro(macroIndex, data) {

//     // Returns a Promise to manage asynchonous behavior
//     return new Promise((resolve, reject) => {

//       // wIndex - Request type (0x01 for set macro)
//       // wValue - Macro index (0 - 4 inclusive)
//       // bRequest - 3 (hardcoded)
//       // wLength - number of bytes (should be macro length * 2)
//       const requestObj = {
//           'requestType':  'vendor',
//           'recipient':    'device',
//           'request':      0x03, // TODO - document
//           'value':        macroIndex,
//           'index':        0x01 // TODO - We can use index for the key the macro corresponds to (low-byte = key, high-byte = number of actions in the macro)
//         };

//       console.log(requestObj);

//       return d.controlTransferOut(requestObj, new Uint8Array(data).buffer)
//       .then( response => {
//         console.log(response);
//         return resolve(response);
//       })
//       .catch( err => {
//         console.log('ERROR SENDING MACRO');
//         return reject(err);
//       });
//     });
//   }
// }
