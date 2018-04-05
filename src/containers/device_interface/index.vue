
<template>
  <LayoutView :device="device" v-if="device" />
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import LayoutView from './components/layout.vue'

export default {
  props: ['id'],
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Device - Interface' // title is now "AstroKey - Device - Interface"
  },
  mounted () {
    // NOTE: eases delays that occur while developing this page as a standalone
    // TODO - clean up this mess
    setTimeout(() => {
      let device = _.find(this.$store.getters['device/collection'], { serialNumber: this.id })
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


