
<template>
  <LayoutView :model="model"/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'
import store from '@/store'

export default {
  name: 'project_show',
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Projects - Show' // title is now "RCOS - Loading..."
  },
  props: ['id'],
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      return store.dispatch('project/fetchModel', this.id)
    }
  },
  computed: {
    model () {
      return store.getters['project/current']
    }
  }
}
</script>


