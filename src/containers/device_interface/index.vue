
<template>
  <LayoutView :device="device" v-if="device" />
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import LayoutView from './components/layout.vue'
import store from '@/store'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Device - Interface' // title is now "AstroKey - Device - Interface"
  },
  props: ['id'],
  mounted () {
    // NOTE: eases delays that occur while developing this page as a standalone
    setTimeout(() => {
      let device = _.find(store.getters['device/collection'], { serialNumber: this.id })
      store.commit('device/selectedDevice', { device })
    }, 200)
  },
  computed: {
    device () {
      return store.getters['device/selectedDevice']
    }
  }
}
</script>


