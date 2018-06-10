<template>
  <div class="row">
    <div class="col-lg-12">
      <p class="lead">Control Transfer Form</p>
      <pre class="bg-dark text-light">{{transferPayload}}</pre>
      <pre class="bg-dark text-light">{{transferResponse}}</pre>

      <FormSelect name="requestType" v-model='transferPayload.requestType' label="requestType" help="Control Transfer Request Type" :options="[{ value: 'vendor', label: 'vendor' }]" />

      <FormSelect name="recipient" v-model='transferPayload.recipient' label="recipient" help="Control Transfer Recipient" :options="[{ value: 'device', label: 'device' }]" />

      <FormInput name="request" label="request" type="number" help="Control Transfer request" v-model="transferPayload.request"/>
      <FormInput name="value" label="value" type="number" help="Control Transfer value" v-model="transferPayload.value"/>
      <FormInput name="index" label="index" type="number" help="Control Transfer index. 1 for write workflow, 2 for read workflow " v-model="transferPayload.index"/>

      <FormInput name="data" label="data" type="string" help="Array of numerical values sent to device - comma separated" v-model="payloadData"/>

      <hr>

      <div class="btn-group w-100">
        <button class="btn btn-outline-success w-50" @click="controlTransferOut({ device: device, transfer: transferPayload, data: payloadData })">
          Control Transfer Out
          <i class="fa fa-arrow-circle-o-right ml-2"></i>
        </button>

        <button class="btn btn-outline-success w-50" @click="controlTransferIn({ device: device, transfer: transferPayload })">
          <i class="fa fa-arrow-circle-o-left mr-2"></i>
          Control Transfer In
        </button>
      </div>

      <button class="btn btn-outline-light btn-block mt-3" @click="resetTransferPayload()">
        <i class="fa fa-refresh mr-2"></i>
        Reset Transfer Payload
      </button>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormSelect from '@/components/FormSelect'
import FormInput from '@/components/FormInput'

export default {
  name: 'ControlTransferForm',
  props: ['device'],
  components: {
    FormSelect,
    FormInput
  },
  data () {
    return {
      payloadData: ''
    }
  },
  created () {
    this.resetTransferPayload()
  },
  methods: mapActions({
    controlTransferOut: 'web_usb/controlTransferOut',
    controlTransferIn: 'web_usb/controlTransferIn',
    resetTransferPayload: 'web_usb/resetTransferPayload'
  }),
  computed: mapGetters({
    transferPayload: 'web_usb/transferPayload',
    transferResponse: 'web_usb/transferResponse'
  })
}
</script>
