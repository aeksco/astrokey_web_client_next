
<template>
  <div class="container mt-4 pt-4">
    <LayoutView :workflow="workflow"/>
  </div>
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
    title: 'Workflow - Edit'
  },
  computed: {
    workflow () {
      let workflows = this.$store.getters['workflow/collection']
      return _.find(workflows, { _id: this.id })
    }
  }
}
</script>


