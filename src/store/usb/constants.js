export const REQUEST_DEVICE_FILTERS = [
  { vendorId: 0x10c4 }
]

export const READ_MACRO_CONTROL_TRANSFER = {
  'requestType': 'vendor',
  'recipient': 'device',
  'request': 0x03,
  // 'value': keyIndex, // NOTE - `value` attribute is assigned in the ChromeWebUSBService.readMacro() method
  'index': 0x02
}
