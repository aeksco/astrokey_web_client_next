
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
    title: 'Workflows' // title is now "AstroKey - Workflows"
  },
  // created () {
  //   this.fetch()
  // },
  // methods: {
  //   fetch () {
  //     return store.dispatch('workflow/fetchCollection')
  //   }
  // },
  computed: {
    collection () {
      return store.getters['workflow/collection']
    }
  }
}
</script>


