
<template>
  <LayoutView :collection="collection"/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'
import store from '@/store'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Devices' // title is now "AstroKey - Devices"
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      return store.dispatch('usb/getDevices')
    }
  },
  computed: {
    collection () {
      return store.getters['usb/collection']
    }
  }
}
</script>


