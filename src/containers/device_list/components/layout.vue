
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <h2>Devices</h2>
      </div>
      <div class="col-lg-6 text-right">
        <button class='btn btn-sm btn-outline-primary' @click="scanBluetooth()">
          <i class="fa fa-bluetooth-b"></i>
        </button>
      </div>
    </div>

  	<hr>

    <div class='row'>
      <div v-for="device in sortedDevices" v-bind:key="device.serialNumber" class='col-lg-12 mt-2'>
        <div class="card card-body bg-light">
          <div class="row">

            <div class="col-lg-8">
              <!-- Device URL -->
              <a v-bind:href="'/#/devices/' + device.serialNumber">{{device.productName}}</a>
              <!-- Device Serial Number -->
              <small class='text-muted'>({{device.serialNumber}})</small>
            </div>

            <div class="col-lg-4 text-right">
              <!-- Open Device -->
              <button class='btn btn-sm btn-outline-success' v-if="!device.opened && !device.loading" @click="openDevice(device)">
                <i class="fa fa-check-circle-o mr-1"></i>
                Open
              </button>

              <!-- Loading -->
              <span class='badge badge-dark' v-if="device.loading">
                <i class="p-1 fa fa-spinner fa-spin"></i>
              </span>

              <!-- Close Device -->
              <button class='btn btn-sm btn-outline-warning' v-if="device.opened" @click="closeDevice(device)">
                <i class="fa fa-times-circle-o mr-1"></i>
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'
import _ from 'lodash'

export default {
  props: ['collection'],
  methods: {
    scanBluetooth () {
      return store.dispatch('web_bluetooth/requestDevices')
    },
    openDevice: (device) => {
      return store.dispatch('device/connect', { device: device })
    },
    closeDevice: (device) => {
      return store.dispatch('device/disconnect', { device: device })
    }
  },
  computed: {
    sortedDevices () {
      return _.sortBy(this.collection, (i) => i.productName)
    }
  }
}
</script>
