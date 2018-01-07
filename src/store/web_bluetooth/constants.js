
export const PRIMARY_SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb'

const REQUEST_DEVICE_SERVICES = [ PRIMARY_SERVICE_UUID ]

const REQUEST_DEVICE_FILTERS = [
  { name: 'Lyrebird' }
]

export const REQUEST_DEVICE_OPTIONS = {
  filters: REQUEST_DEVICE_FILTERS,
  services: REQUEST_DEVICE_SERVICES
}

// export const READ_MACRO_CONTROL_TRANSFER = {
//   'requestType': 'vendor',
//   'recipient': 'device',
//   'request': 0x03,
//   // 'value': keyIndex, // NOTE - `value` attribute is assigned in the ChromeWebUSBService.readMacro() method
//   'index': 0x02
// }

// wIndex - Request type (0x01 for set macro)
// wValue - Macro index (0 - 4 inclusive)
// bRequest - 3 (hardcoded)
// wLength - number of bytes (should be macro length * 2)
// export const WRITE_MACRO_CONTROL_TRANSFER = {
//   'requestType': 'vendor',
//   'recipient': 'device',
//   'request': 0x03, // TODO - document
//   // 'value': keyIndex, // NOTE - `value` attribute is assigned in the ChromeWebUSBService.writeMacro() method
//   'index': 0x01 // TODO - We can use index for the key the macro corresponds to (low-byte = key, high-byte = number of actions in the macro)
// }
