
<template>
  <div class="container">
    <a :href="'/#/projects/' + id">Back</a>
    <h2>Project Edit - {{model.name}}</h2>
    <hr>

    <form v-on:submit.prevent="formSubmit">
      <div class="form-group">
        <label name="project_name">Name</label>
        <input type="text" class="form-control" v-model="model.name" id="project_name" required>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Update</button>
      </div>
    </form>

  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'

export default {
  props: ['id'],
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      return store.dispatch('project/fetchModel', this.id)
    },
    formSubmit () {
      // TODO - validations
      return store.dispatch('project/update', this.model)
    }
  },
  computed: {
    model () {
      return store.getters['project/current']
    }
  }

}
</script>


