
<template>
  <div class='row'>
    <div v-for="m in collection" class='col-lg-12 mt-3'>
      <div class="card card-body bg-light">
        <h4 class="card-title">
          <a v-bind:href="'/#/projects/' + m._id">{{m.name}}</a>
        </h4>
        <p class="card-text">{{m.description}}</p>
        <a class="btn btn-outline-primary" :href="'https://github.com/' + m.githubUsername + '/' + m.githubProjectName">Repository</a>
        <a class="btn btn-outline-primary" :href="'/#/projects/' + m._id + '/blog'">Blog</a>
        <a class="btn btn-outline-primary" :href="m.websiteUrl" v-if="m.websiteUrl">Website</a>
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


