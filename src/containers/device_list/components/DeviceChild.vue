<!-- CAN'T USE SERIALNUMBER, PRODUCTNAME, MANUFACTURER NAME -->
<template>
  <div class='col-lg-12 mt-2'>
    <div class="card card-body bg-dark border-light text-light">
      <div class="row d-flex align-items-center">

        <div class="col-lg-8">

          <!-- Device URL -->
          <a v-bind:href="'#/devices/' + device.id + '/interface'">
            {{ device.productName }}
          </a>

          <!-- Device ID -->
          <!-- DEBUG ONLY -->
          <small class='text-muted'>({{device.id}})</small>
        </div>

        <div class="col-lg-4 text-right">

          <!-- Developer Interface -->
          <button class="btn btn-sm btn-outline-light" @click="showDeveloperInterface(device)">
            <i class="fa fa-fw fa-code mr-2"></i>
            Developer
          </button>

          <!-- Workflow Interface -->
          <!-- TODO - change this <a> to a <button> like above -->
          <a class="btn btn-sm btn-outline-info" :href="'#/devices/' + device.id + '/interface'">
            <i class="fa fa-fw fa-cog mr-2"></i>
            Interface
          </a>

          <!-- Open Device -->
          <OpenDeviceButton :device="device" />
          <CloseDeviceButton :device="device" />

          <!-- Loading -->
          <span class='badge badge-dark' v-if="device.fetching">
            <i class="p-1 fa fa-spinner fa-spin"></i>
          </span>

        </div>

      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'
import OpenDeviceButton from '@/components/OpenDeviceButton'
import CloseDeviceButton from '@/components/CloseDeviceButton'

export default {
  props: ['device'],
  components: {
    OpenDeviceButton,
    CloseDeviceButton
  },
  methods: mapActions({
    showDeveloperInterface: 'device/showDeveloperInterface'
  })
}
</script>
