
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
  computed: {
    collection () {
      return store.getters['device/collection']
    }
  }
}
</script>


