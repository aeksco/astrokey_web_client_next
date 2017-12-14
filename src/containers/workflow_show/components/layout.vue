
<template>
  <div class="container">
    <a href="/#/workflows">Back</a>
    <h2>{{workflow.label}}</h2>
  	<hr>

    <div class="row">
      <div class="col-lg-12">

        <div class="card card-body">
          <div class="row">
            <div class="col-lg-8">
              <p class="card-text lead">Workflow</p>
            </div>
            <div class="col-lg-4 text-right">
              <button class="btn btn-sm btn-outline-success mr-2"><i class="fa fa-fw fa-save"></i></button>
              <button class="btn btn-sm btn-outline-dark"><i class="fa fa-fw fa-times"></i></button>
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


