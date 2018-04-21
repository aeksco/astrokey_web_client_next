
<template>
  <div class="container-fluid">

    <PageHeader title="Developer Interface" />

    <div class="row">
      <div class="col-lg-12">

        <OpenDeviceButton :device="device" />
        <CloseDeviceButton :device="device" />

        <div class="card card-body bg-dark border-light text-light">
          <div class="row">
            <div class="col-lg-12">
              <p class="card-text lead">
                {{ device.productName }}
                <small class='text-muted'>({{device.id}})</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import PageHeader from '@/components/PageHeader'
import OpenDeviceButton from '@/components/OpenDeviceButton'
import CloseDeviceButton from '@/components/CloseDeviceButton'

export default {
  components: {
    PageHeader,
    OpenDeviceButton,
    CloseDeviceButton
  },
  created () {
    this.ensureDevice()
  },
  beforeDestroy () {
    this.clearDevice()
  },
  metaInfo: {
    title: 'Device - Developer Interface'
  },
  computed: mapGetters({
    device: 'device/selectedDevice'
  }),
  methods: mapActions({
    ensureDevice: 'device/ensureSelectedDevice',
    clearDevice: 'device/clearSelectedDevice'
  })
}
</script>
