g
<template>
  <div class="container">
    <a href="/#/projects">Back</a>
    <h2>Project Show - {{model.name}}</h2>
  	<hr>

    <!-- Edit Link -->
  	<a class='btn btn-secondary' :href="'/#/projects/' + model._id + '/edit'">
      Edit Project
    </a>

    <!-- Opens Destroy Confirmation Modal -->
    <b-btn variant="danger" v-b-modal.confirm-modal>Destroy</b-btn>

    <!-- Bootstrap Modal Component -->
    <b-modal id="confirm-modal" title="Destroy Project?" @ok="onConfirm">
      <p class="my-4">Are you sure you want to destroy this project?</p>
    </b-modal>

  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'

export default {
  props: ['model'],
  methods: {
    onConfirm () {
      return store.dispatch('project/destroy', this.model._id)
    }
  }
}
</script>


