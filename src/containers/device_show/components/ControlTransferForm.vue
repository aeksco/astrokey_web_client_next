<template>
  <div class="row">
    <div class="col-lg-12">
      <p class="lead">Control Transfer Form</p>
      <pre class="bg-dark text-light">{{transferPayload}}</pre>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ControlTransferForm',
  created () {
    this.resetTransferPayload()
  },
  methods: mapActions({
    controlTransferOut: 'web_usb/controlTransferOut',
    controlTransferIn: 'web_usb/controlTransferIn',
    resetTransferPayload: 'web_usb/resetTransferPayload'
  }),
  computed: mapGetters({
    transferPayload: 'web_usb/transferPayload'
  })
}
</script>
