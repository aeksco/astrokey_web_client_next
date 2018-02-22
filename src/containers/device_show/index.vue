
<template>
  <LayoutView :device="device" v-if="!!device" />
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
    title: 'Device - Show' // title is now "AstroKey - Device - Show"
  },
  props: ['id'],
  // created () {
  //   this.fetch()
  // },
  // methods: {
  //   fetch () {
  //     return store.dispatch('web_usb/getDevices')
  //   }
  // },
  computed: {
    device () {
      return _.find(store.getters['device/collection'], { serialNumber: this.id })
    }
  }
}
</script>


