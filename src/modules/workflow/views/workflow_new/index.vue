
<template>
  <LayoutView :workflow="workflow"/>
</template>

<!-- // // // //  -->

<script>
// import _ from 'lodash'
// import store from '@/store'
import LayoutView from './components/layout.vue'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Workflow - New' // title is now "AstroKey - Workflow - New"
  },
  computed: {
    workflow () {
      // TODO - fetch new workflow from Vuex store
      return {
        label: 'New Workflow'
      }
    }
  }
}
</script>


