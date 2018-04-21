
<template>
  <LayoutView :device="device" v-if="device" />
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import LayoutView from './components/layout.vue'

export default {
  props: ['id'],
  metaInfo: {
    title: 'Device - Interface'
  },
  components: {
    LayoutView
  },
  mounted () {
    // NOTE: eases delays that occur while developing this page as a standalone
    // TODO - clean up this mess
    setTimeout(() => {
      let device = _.find(this.$store.getters['web_usb/collection'], { id: this.id })
      this.$store.commit('device/selectedDevice', { device })
    }, 200)
  },
  computed: {
    device () {
      // TODO - move the connection logic OUT of this view
      let device = this.$store.getters['device/selectedDevice']
      if (device) this.$store.dispatch('device/connect', { device })
      return device
    }
  }
}
</script>


