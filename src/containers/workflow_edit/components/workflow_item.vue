
<template>
  <li :class="className">
    <div class="row d-flex align-items-center">
      <div class="col-lg-8 text-left">
        <i class="fa fa-lg fa-bars mr-3" v-if="item.icon"></i>

        <i class="fa fa-lg fa-play mr-3" v-if="item.type === 'KEY_DOWN'"></i>
        <i class="fa fa-lg fa-pause mr-3" v-if="item.type === 'KEY_UP'"></i>
        <i class="fa fa-lg fa-flag-checkered mr-3" v-if="item.type === 'FINISH'"></i>
        <!-- <i class='fa fa-lg fa-circle-o mr-3' v-if="item.type !== 'KEY_DOWN' && item.type !== 'KEY_UP' && item.type !== 'FINISH'"></i> -->

        <!-- <i :class="'fa fa-lg mr-3 ' + item.icon" v-if="item.icon"></i> -->
        <i :class="'fa fa-circle-o mr-3'" v-if="item.icon"></i>

        {{ item.label || item.type }}
        <!-- {{ item.type }} -->
        <!-- <small class="text-muted">
          {{ item.order }}
        </small> -->
      </div>

      <div class="col-lg-4 text-right" v-if="item.type !== 'KEY_DOWN' && item.type !== 'FINISH'">
        <button class="btn btn-sm btn-outline-secondary"><i class="fa fa-fw fa-pencil"></i></button>
        <!-- <button class="btn btn-sm btn-outline-secondary" @click="remove(item)"><i class="fa fa-fw fa-times"></i> -->
      </div>

    </div>
  </li>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['item', 'remove'],
  computed: {
    className () {
      let css = ['list-group-item']

      if (this.item.type === 'KEY_DOWN') {
        // css.push('list-group-item-primary')
        css.push('list-group-item-success')
        // css.push('list-group-item-dark')
      } else if (this.item.type === 'KEY_UP') {
        // css.push('list-group-item-success')
        css.push('list-group-item-warning')
        css.push('draggable')
      } else if (this.item.type === 'FINISH') {
        css.push('list-group-item-dark')
      } else {
        css.push('draggable')
      }

      return css.join(' ')
    },
    removable () {
      return true
    }
  }
}
</script>

<style type="text/css">
  .list-group-item {
    border-left: .25rem solid #666666
  }

  .list-group-item:hover i.fa-bars {
    opacity: 1
  }

  i.fa-bars {
    opacity: 0;
  }

</style>
