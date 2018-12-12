<template>
  <div class="row hr-100 justify-content-center mt-4">
      <div class="col-lg-6">

        <button class='btn btn-block btn-outline-primary' @click="connect">Connect</button>

        <hr>

        <div class="row">
          <div class="col-lg-6">
            <input class='form-control' id="payload" type="text" placeholder="Text to send">
          </div>
          <div class="col-lg-6">
            <button class='btn btn-block btn-outline-success' id="writeButton">Send Text</button>
          </div>
        </div>

      </div>
  </div>
</template>

<script>
/* eslint-disable */

const charMap = {

  // Lowercase
  'a':      [0, 4],
  'b':      [0, 5],
  'c':      [0, 6],
  'd':      [0, 7],
  'e':      [0, 8],
  'f':      [0, 9],
  'g':      [0,10],
  'h':      [0,11],
  'i':      [0,12],
  'j':      [0,13],
  'k':      [0,14],
  'l':      [0,15],
  'm':      [0,16],
  'n':      [0,17],
  'o':      [0,18],
  'p':      [0,19],
  'q':      [0,20],
  'r':      [0,21],
  's':      [0,22],
  't':      [0,23],
  'u':      [0,24],
  'v':      [0,25],
  'w':      [0,26],
  'x':      [0,27],
  'y':      [0,28],
  'z':      [0,29],

  // Uppercase
  'A':      [2, 4],
  'B':      [2, 5],
  'C':      [2, 6],
  'D':      [2, 7],
  'E':      [2, 8],
  'F':      [2, 9],
  'G':      [2,10],
  'H':      [2,11],
  'I':      [2,12],
  'J':      [2,13],
  'K':      [2,14],
  'L':      [2,15],
  'M':      [2,16],
  'N':      [2,17],
  'O':      [2,18],
  'P':      [2,19],
  'Q':      [2,20],
  'R':      [2,21],
  'S':      [2,22],
  'T':      [2,23],
  'U':      [2,24],
  'V':      [2,25],
  'W':      [2,26],
  'X':      [2,27],
  'Y':      [2,28],
  'Z':      [2,29],

  // Numeric
  '1':      [0,30],
  '2':      [0,31],
  '3':      [0,32],
  '4':      [0,33],
  '5':      [0,34],
  '6':      [0,35],
  '7':      [0,36],
  '8':      [0,37],
  '9':      [0,38],
  '0':      [0,39],

  // Numeric + Shift
  '!':      [2,30],
  '@':      [2,31],
  '#':      [2,32],
  '$':      [2,33],
  '%':      [2,34],
  '^':      [2,35],
  '&':      [2,36],
  '*':      [2,37],
  '(':      [2,38],
  ')':      [2,39],

  // Else
  '.':      [0,99],
  'num':    [0,131],
  ' ':      [0,44],  // Space
  right:    [0,79],  // Right
  left:     [0,80],  // Left
  down:     [0,81],  // Down
  up:       [0,82],  // Up
  back:     [0,42],  // Backspace
  '/':      [0,84],
  // '*':      [0,85],
  '-':      [0,86],
  '+':      [0,87],
  'enter':  [0,88]

}

let characteristic;

export default {
  name: 'Lyrebird',
  data () {
    return { foo: 'bar' }
  },
  methods: {
    async connect () {
      const PRIMARY_SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb'
      const SECONDARY_SERVICE_UUID = '0000b000-0000-1000-8000-00805f9b34fb'

      const REQUEST_DEVICE_SERVICES = [ PRIMARY_SERVICE_UUID ]

      const REQUEST_DEVICE_FILTERS = [
        { name: 'Lyrebird' }
      ]

      const REQUEST_DEVICE_OPTIONS = {
        filters: REQUEST_DEVICE_FILTERS,
        optionalServices: REQUEST_DEVICE_SERVICES
      }

      // let characteristicUuid = "0000ffe0-0000-1000-8000-00805f9b34fb";
      let characteristicUuid = "0000ffe1-0000-1000-8000-00805f9b34fb";

      console.log('AJSDLKlasjJDLAKSJDLKAJDSLKAjd')

      try {
        console.log('Requesting any Bluetooth Device...');
        const device = await navigator.bluetooth.requestDevice(REQUEST_DEVICE_OPTIONS)

        console.log('Connecting to GATT Server...');
        const server = await device.gatt.connect();

        // console.log('Getting Services...');
        // const services = await server.getPrimaryServices()
        // console.log(services)

        console.log('Getting Service...');
        const service = await server.getPrimaryService(PRIMARY_SERVICE_UUID);
        // console.log(service)
        console.log(service)

        console.log('Getting Characteristic...');
        characteristic = await service.getCharacteristic(characteristicUuid);

        console.log('Getting Descriptor...');
        const myDescriptor = await characteristic.getDescriptor('gatt.characteristic_user_description');
        // console.log(myDescriptor)
        // document.querySelector('#writeButton').disabled = !characteristic.properties.write;

        // console.log('Reading Descriptor...');
        // const value = await myDescriptor.readValue();

        // let decoder = new TextDecoder('utf-8');
        // console.log('> Characteristic User Description: ' + decoder.decode(value));

      } catch(error) {
        document.querySelector('#writeButton').disabled = true
        console.log('Argh! ' + error)
      }
    },
    // writeKeyup
    // Sends a single character to the device
    async writeKeyup() {
      if (!characteristic) {
        // console.log('NO DESC IN WRITE KEYUP')
        return;
      }

      // Builds keyUp packet
      let keyupPacket = [3,0,0,0,0,0,0,0]

      // Builds packet buffer
      let keyUpBuffer = new Uint8Array(keyupPacket).buffer

      try {
        // Writes second packet
        console.log('Writing "KEY-UP" to primary service')
        await characteristic.writeValue(keyUpBuffer)
      } catch (error) {
        console.log('Oh no! in writeKeyup ' + error)
      }
    },
    // writeKeydown
    // Sends a single character to the device
    async writeKeydown(myChar) {
      if (!characteristic) {
        // console.log('NO DESC IN writeKeydown')
        return
      }

      // Packet construction
      const control = [3]
      const charArr = charMap[myChar]
      const padding = [0,0,0,0,0]
      const packet  = control.concat(charArr).concat(padding)
      const keyDownBuffer = new Uint8Array(packet).buffer

      // Sends packet
      try {
        // Writes first packet
        console.log('Writing "KEY-DOWN: "' + myChar + ' to primary service')
        await characteristic.writeValue(keyDownBuffer)
      } catch (error) {
        console.log('Oh noOooOO! ' + error)
      }

    },
    // writeChar
    // Sends a single character to the device
    async writeChar(myChar) {
      await writeKeydown(myChar)
      await writeKeyup()
    },
    // sendText
    // Sends a single character to the device
    async sendText(text) {
      for (index in text){
        await writeChar(text[index])
      }
    },
    async onWriteButtonClick() {
      if (!characteristic) {
        // console.log('NO DESCRIPT')
        return
      }

      // Isolates user text
      const payload = document.querySelector('#payload').value
      await sendText(payload)
      console.log('Done sending text')
    }
  }
}
/* eslint-enable */
</script>

<style lang="sass">
  img.welcome-logo
    height: 4rem
    width: 4rem

  .welcome-text
    letter-spacing: .6rem
    font-weight: 300
    font-size: 2rem
</style>
