import ChromeWebUsbService from './chrome_web_usb_service'
import FirefoxWebUSBService from './firefox_web_usb_service'

// // // //

// Handles Chrome & Firefox WebUSB service classes
let WebUsbService
if (window.chrome) {
  WebUsbService = new ChromeWebUsbService({ devices: [] })
} else {
  WebUsbService = new FirefoxWebUSBService({ devices: [] })
}

// // // //

export default WebUsbService
