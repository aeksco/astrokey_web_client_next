
<template>
  <div class="container">
    <a href="/#/devices">Back</a>
    <h2>Device Show</h2>
  	<hr>

    <div class="row">
      <div class="col-lg-12">

        <div class="card card-body bg-dark border-light text-light">
          <div class="row">
            <div class="col-lg-12">
              <p class="card-text lead">{{device.productName}}
                <small class='text-muted'>({{device.serialNumber}})</small>
              </p>
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
  props: ['device']
}
</script>


