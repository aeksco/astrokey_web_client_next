
<template>
  <div class="container">
  	<div class="row">
  		<div class="col-lg-12">

        <!-- Header -->
  			<h2>Post List</h2>
  			<hr>

        <!-- Fetching -->
        <!-- TODO - this should be a component -->
        <p class='lead' v-if="fetching">
          <i class="fa fa-2x fa-spin fa-spinner"></i>
        </p>

        <!-- EmptyView -->
        <!-- TODO - abstract into ListView -->
        <p class='lead' v-if="!collection[0]">
          EMPTY
        </p>

        <!-- ListView -->
  			<ListView :collection="collection"></ListView>

  		</div>
  	</div>
  </div>
</template>

<!-- // // // //  -->

<script>
import ListView from './list.vue'
import store from '@/store'

export default {
  computed: {
    collection: () => {
      return store.getters['post/collection']
    },
    fetching: () => {
      return store.getters['post/fetching']
    }
  },
  mounted: () => {
    return store.dispatch('post/fetchCollection')
  },
  components: {
    ListView
  }
}
</script>


