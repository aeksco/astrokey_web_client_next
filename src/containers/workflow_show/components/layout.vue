
<template>
  <div class="container">
    <a href="/#/workflows">Back</a>
    <h2>{{workflow.label}}</h2>
  	<hr>

    <div class="row">
      <div class="col-lg-12">

        <div class="card card-body bg-dark text-light border-light">
          <div class="row">
            <div class="col-lg-8">
              <p class="card-text lead">Workflow</p>
            </div>
            <div class="col-lg-4 text-right">
              <a class="btn btn-sm btn-outline-warning mr-2" v-bind:href="'/#/workflows/' + workflow._id + '/edit'"><i class="fa fa-fw fa-pencil"></i></a>
              <button class="btn btn-sm btn-outline-secondary mr-2"><i class="fa fa-fw fa-clone"></i></button>
              <button class="btn btn-sm btn-outline-danger"><i class="fa fa-fw fa-trash"></i></button>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['workflow']
}
</script>


