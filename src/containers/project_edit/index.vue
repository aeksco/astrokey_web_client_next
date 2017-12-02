
<template>
  <LayoutView :id="id"/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Projects - Edit' // title is now "RCOS - Loading..."
  },
  props: ['id']
}
</script>


