
<template>
  <li :class="className">
    <div class="row d-flex align-items-center">

      <div class="col-lg-1 text-left d-flex align-items-center">
        <i class="fa fa-lg fa-fw fa-bars mr-3" v-if="item.icon"></i>

        <i class="fa fa-lg fa-fw fa-chevron-down mr-3" v-if="item.type === 'KEY_DOWN'"></i>
        <i class="fa fa-lg fa-fw fa-chevron-up mr-3" v-if="item.type === 'KEY_UP'"></i>
        <i class="fa fa-lg fa-fw fa-flag-checkered mr-3" v-if="item.type === 'FINISH'"></i>
        <i :class="'fa fa-fw'" v-if="item.icon"></i>
      </div>

      <div class="col-lg-8">

        <div class="" v-if="item.type === 'KEY_UP' || item.type === 'KEY_DOWN' || item.type === 'FINISH'">
          {{ item.label || item.type }}
        </div>

        <!-- TEXT / KEY -->
        <span class="badge" v-if="item.type === 'TEXT'">
          <i class="fa fa-quote-left mr-2"></i>
          {{item.value}}
        </span>

        <!-- DELAY -->
        <span class="badge" v-if="item.type === 'DELAY'">
          <i class="fa fa-clock-o mr-2"></i>
          {{item.value * 10}} ms
        </span>

        <!-- KEY -->
        <span v-if="item.type === 'KEY'">
          <i class="fa fa-keyboard-o mr-2"></i>
          <span class="badge" v-if="item.type === 'KEY'">{{item.value}}</span>
        </span>

        <!-- MACRO PREVIEW -->
        <span class="d-flex" v-if="item.type === 'MACRO'">
          <span class="badge">
            <i class="fa fa-cogs mr-2"></i>
          </span>

          <span class="d-flex align-items-center" v-for="m, i in item.value" v-bind:key="m.id">
            <span class="badge badge-secondary">{{m.key}}</span>
            <i class="fa fa-fw fa-plus mx-1" v-if="i < item.value.length - 1"></i>
          </span>
        </span>

      </div>

      <div class="col-lg-3 text-right controls" v-if="item.icon">
        <button class="btn btn-sm btn-outline-danger" @click="remove(item)"><i class="fa fa-fw fa-trash"></i></button>
        <button class="btn btn-sm btn-outline-secondary" @click="edit(item)"><i class="fa fa-fw fa-pencil"></i></button>
      </div>

    </div>
  </li>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['item', 'remove', 'edit'],
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
        // css.push('bg-dark text-light')
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

<style lang='sass' scoped>

  .list-group-item
    border-left: .25rem solid #666666

  .list-group-item:hover i.fa-bars
    opacity: 1

  .list-group-item:hover .controls
    opacity: 1

  i.fa-bars
    transition: opacity .25s ease-in
    opacity: 0

  .badge
    font-weight: 300
    padding: .3rem .3rem

  .controls
    transition: opacity .25s ease-in
    opacity: 0

</style>
