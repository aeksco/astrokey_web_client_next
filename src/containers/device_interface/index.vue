
<template>
  <LayoutView :device="device" v-if="device" />
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LayoutView from './components/layout.vue'

// TODO - much of this is repeated from `device_show`
export default {
  metaInfo: {
    title: 'Device - Interface'
  },
  components: {
    LayoutView
  },
  created () {
    this.ensureDevice()
  },
  beforeDestroy () {
    this.clearDevice()
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


