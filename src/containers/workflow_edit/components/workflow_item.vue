
<template>
  <li :class="className">
    <div class="row d-flex align-items-center">
      <div class="col-lg-9 text-left d-flex align-items-center">
        <i class="fa fa-lg fa-fw fa-bars mr-3" v-if="item.icon"></i>

        <i class="fa fa-lg fa-fw fa-play mr-3" v-if="item.type === 'KEY_DOWN'"></i>
        <i class="fa fa-lg fa-fw fa-pause mr-3" v-if="item.type === 'KEY_UP'"></i>
        <i class="fa fa-lg fa-fw fa-flag-checkered mr-3" v-if="item.type === 'FINISH'"></i>
        <i :class="'fa fa-fw'" v-if="item.icon"></i>
        {{ item.label || item.type }}
        <span class="badge badge-secondary" v-if="item.value">{{item.value}}</span>
      </div>

      <div class="col-lg-3 text-right controls" v-if="item.icon">
        <button class="btn btn-sm btn-outline-danger" @click="remove(item)"><i class="fa fa-fw fa-trash"></i></button>
        <button class="btn btn-sm btn-outline-secondary"><i class="fa fa-fw fa-pencil"></i></button>
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
        css.push('list-group-item-light')
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
    border-left: .25rem solid #666666;
  }

  .list-group-item:hover i.fa-bars {
    opacity: 1
  }

  .list-group-item:hover .controls {
    opacity: 1
  }

  i.fa-bars {
    transition: opacity .25s ease-in;
    opacity: 0;
  }

  .badge {
    font-weight: 300;
    padding: .3rem .3rem;
    margin-left: .5rem;
  }

  .controls {
    transition: opacity .25s ease-in;
    opacity: 0;
  }

</style>
