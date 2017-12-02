
<template>
  <div class='col-lg-12'>
    <div v-for="m in collection" class='card bg-light mt-3'>
      <div class="card-body">
        <h4 class="card-title">{{m.title}}</h4>
        <p class="card-text">{{m.description}}</p>
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['collection']
}
</script>


