<!-- CAN'T USE SERIALNUMBER, PRODUCTNAME, MANUFACTURER NAME -->
<template>
  <div class='row'>
    <!-- <div v-for="device in sortedDevices" v-bind:key="device.productName" class='col-lg-12 mt-2'> -->
    <div v-for="device in sortedDevices" v-if="sortedDevices[0]" v-bind:key="device.id" class='col-lg-12 mt-2'>
      <div class="card card-body bg-dark border-light text-light">
        <div class="row d-flex align-items-center">

          <div class="col-lg-8">

            <!-- Device URL -->
            <a v-bind:href="'#/devices/' + device.id + '/interface'">
              {{device.productName}}
            </a>

            <!-- Device Serial Number -->
            <!-- DEBUG ONLY -->
            <!-- <small class='text-muted'>({{device.id}})</small> -->
          </div>

          <div class="col-lg-4 text-right">

            <a class="btn btn-sm btn-outline-info" :href="'#/devices/' + device.id + '/interface'">
              <i class="fa fa-fw fa-cog mr-2"></i>
              Interface
            </a>
            <!-- Open Device -->
            <button class='btn btn-sm btn-outline-success' v-if="!device.opened && !device.fetching" @click="openDevice(device)">
              <i class="fa fa-check-circle-o mr-1"></i>
              Open
            </button>

            <!-- Loading -->
            <span class='badge badge-dark' v-if="device.fetching">
              <i class="p-1 fa fa-spinner fa-spin"></i>
            </span>

            <!-- Scan -->
            <!-- <button class='btn btn-sm btn-outline-primary' v-if="!device.instance.gatt && device.type === 'web_bluetooth'" @click="scanBluetooth()"> -->
              <!-- <i class="fa fa-bluetooth-b mr-1"></i> -->
              <!-- Scan -->
            <!-- </button> -->

            <!-- Close Device -->
            <button class='btn btn-sm btn-outline-warning' v-if="device.opened && !device.fetching" @click="closeDevice(device)">
              <i class="fa fa-times-circle-o mr-1"></i>
              Close
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="col-lg-12" v-else>
      <div class="card card-body text-center bg-dark border-light text-light">
        <p class="lead mb-0">No Devices currently available</p>
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: mapActions({
    openDevice: 'web_usb/openDevice',
    closeDevice: 'web_usb/closeDevice'
  }),
  computed: mapGetters({
    sortedDevices: 'web_usb/collection'
  })
}
</script>
