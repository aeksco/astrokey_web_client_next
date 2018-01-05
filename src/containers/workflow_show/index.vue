
<template>
  <LayoutView :workflow="workflow"/>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import store from '@/store'
import LayoutView from './components/layout.vue'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Workflow - Show' // title is now "AstroKey - Workflow - Show"
  },
  props: ['id'],
  computed: {
    workflow () {
      let workflows = store.getters['workflow/collection']
      return _.find(workflows, { _id: this.id })
    }
  }
}
</script>


