
<template>
  <LayoutView/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'
// import store from '@/store'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Device - Show' // title is now "AstroKey - Device - Show"
  },
  props: ['id']
  // created () {
  //   this.fetch()
  // },
  // methods: {
  //   fetch () {
  //     return store.dispatch('user/fetchModel', this.id)
  //   }
  // },
  // computed: {
  //   model () {
  //     return store.getters['user/current']
  //   }
  // }
}
</script>


