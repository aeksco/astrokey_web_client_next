
<template>
  <LayoutView :workflow="workflow"/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Workflow - Show' // title is now "AstroKey - Workflow - Show"
  },
  props: ['id'],
  data () {
    return {
      workflow: {
        label: 'My New Workflow',
        steps: [
          { order: 1, type: 'text', value: 'Hello, AstroKey!' },
          { order: 2, type: 'macro', value: [{ key: 'A' }, { key: 'SHIFT' }] },
          { order: 3, type: 'delay', value: 500 }
        ]
      }
    }
  }
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


