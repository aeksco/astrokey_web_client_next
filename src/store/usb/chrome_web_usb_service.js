import { REQUEST_DEVICE_FILTERS } from './constants'

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

//     this.prototype.radioRequests = {
//       'usb devices':      'getDevices',
//       'usb read:macro':   'readMacro',
//       'usb write:macro':  'writeMacro'
//     };
//   }

//   // getDevices
//   getDevices() {

//     // Returns a Promise to manage asynchonous behavior
//     return new Promise((resolve, reject) => {

//       // Step 1 - Request device
//       return navigator.usb.requestDevice({ filters: requestDeviceFilters })
//       .then( device => {

//         // TODO - remove
//         // console.log device

//         // Step 2 - Get Devices
//         // TODO - verify this workflow
//         return navigator.usb.getDevices()
//         .then(d => {

//           console.log(d);

//           d = d[0];

//           // STEP 3 - open device
//           return d.open().then(() => {

//             console.log('open');

//             // Step 4 - select configuration
//             return d.selectConfiguration(1).then(() => {

//               // console.log 'selectConfiguration'

//               // TODO - remove
//               window.d = d;

//               // Resolves with device
//               return resolve(d);
//             });
//           });

//               // wIndex - Request type (0x01 for set macro)
//               // wValue - Macro index (0 - 4 inclusive)
//               // bRequest - 3 (hardcoded)
//               // wLength - number of bytes (should be macro length * 2)

//               // d.controlTransferOut(
//               //   {
//               //     'requestType': 'vendor',
//               //     'recipient': 'device',
//               //     'request': 0x03,
//               //     'value': 0x0000,
//               //     'index': 0x01
//               //   }, new Uint8Array([1,4,2,4]).buffer
//               // ).then( (response) => { console.log(response) })

//               // STEP 5 - controlTransferIn
//               // window.d.controlTransferIn({'requestType': 'standard', 'recipient': 'device', 'request': 0x06, 'value': 0x0F00, 'index': 0x00}, 5).then( (r) => { console.log(r) })

//         })
//         // getDevices Error handling
//         .catch(err => {
//           return console.log('ERR - navigator.usb.getDevices()');
//         });

//       });
//     });
//   }

//   // readMacro
//   readMacro(macroIndex) {

//     // Returns a Promise to manage asynchonous behavior
//     if (macroIndex == null) { macroIndex = 0x0000; }
//     return new Promise((resolve, reject) => {

//       // TODO - move to constants
//       const transferOptions = {
//         'requestType':  'vendor',
//         'recipient':    'device',
//         'request':      0x03,
//         'value':        macroIndex,
//         'index':        0x02
//       };

//       // device.controlTransferIn (READS DATA FROM DEVICE)
//       // TODO - abstract the controlTransferIn request object into a constant (cloned each time)
//       return d.controlTransferIn(transferOptions, 256) // TODO - '256' should be '128'
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
