
<template>
  <div class="container">
    <a href="/#/projects">Back</a>
  	<h2>Project New</h2>
  	<hr>

    <!-- TODO - abstract this into dedicated ProjectForm component? -->
    <form v-on:submit.prevent="formSubmit">

        <div class="form-group">
            <label name="project_name">Label</label>
            <input type="text" class="form-control" v-model="project.label" id="project_label" required>
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Create</button>
        </div>
    </form>

  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'

export default {
  name: 'layout',

  // TODO - abstract this into ProjectForm mixin?
  data () {
    return {
      project: {}
    }
  },

  methods: {

    // TODO - abstract this into ProjectForm mixin?
    formSubmit () {
      console.log('formSubmit!')
      console.log(this.project.label)

      // Assembles the payload being sent to the server
      let project = {
        label: this.project.label
      }

      return store.dispatch('project/create', project)
    }
  }
}
</script>


