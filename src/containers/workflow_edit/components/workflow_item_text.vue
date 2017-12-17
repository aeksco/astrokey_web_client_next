
<template>
  <li class="list-group-item list-group-item-secondary">
    <div class="row d-flex align-items-center">
      <div class="col-lg-2"><span class="fa-stack"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-stack-1x fa-stack"><i class="fa fa-circle-thin fa-stack-2x fa-2x"></i>{{ item.order }}</i></span>
      </div>
      <div class="col-lg-7">Type "{{ item.value }}"</div>
      <div class="col-lg-3 text-right">
        <div class="btn-group">
          <button class="btn btn-sm btn-outline-secondary"><i class="fa fa-fw fa-pencil"></i></button>
          <button class="btn btn-sm btn-outline-secondary" @click="remove(item)"><i class="fa fa-fw fa-times"></i></button>
        </div>
      </div>
    </div>
  </li>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['item', 'remove']
}
</script>


