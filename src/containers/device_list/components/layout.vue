
<template>
  <div class="container">
    <h2>Devices</h2>
  	<hr>

    <div class='row'>
      <div v-for="device in collection" v-bind:key="device.serialNumber" class='col-lg-12 mt-2'>
        <div class="card card-body bg-light">
          <div class="row">

            <div class="col-lg-8">
              <a v-bind:href="'/#/devices/' + device.serialNumber">{{device.productName}}</a>
            </div>

            <div class="col-lg-4 text-right">
              <!-- Open Device -->
              <button class='btn btn-sm btn-outline-success' v-if="!device.opened" @click="openDevice(device)">
                <i class="fa fa-check-circle-o mr-1"></i>
                Open
              </button>

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

export default {
  props: ['collection'],
  methods: {
    openDevice: (device) => {
      return store.dispatch('usb/openDevice', { device: device })
    },
    closeDevice: (device) => {
      return store.dispatch('usb/closeDevice', { device: device })
    }
  }
}
</script>
