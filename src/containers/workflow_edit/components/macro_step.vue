
<template>
  <li :class="className(hovered, dragging, dragstart)" @drag="hovered = false" @drop="dragging = false" @mouseover="hovered = true" @mouseout="hovered = false">

    <div class="key d-flex">
      <div class="inner content">
        <div class="shift" v-if="item.shift_key && item.shifted">{{ item.shift_key }}</div>
        <div v-else-if="item.shift_key && item.shifted">{{ item.key }}</div>
        <div class='plain' v-else>{{ item.key }}</div>
      </div>

      <div class="inner hover">
        <i class="fa fa-fw fa-lg fa-times" @click="removeMacroStep()"></i>
      </div>

    </div>

    <div class="position mt-2">
      <span class="fa-stack fa-lg" @click="cycleMacroKeyPosition(item)">
        <i class="fa fa-circle-thin fa-stack-2x"></i>
        <i class="fa fa-stack-1x fa-stack">
          <i class="fa fa-circle-thin fa-stack-2x fa-2x"></i>
          <i class="fa fa-stack-1x fa-long-arrow-down text-warning" v-if="item.position === 1"></i>
          <i class="fa fa-stack-1x fa-long-arrow-up text-info" v-if="item.position === 2"></i>
          <i class="fa fa-stack-1x fa-arrows-v text-success" v-if="item.position === 3"></i>
        </i>
      </span>
    </div>

  </li>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'

export default {
  props: ['item', 'macro'],
  data () {
    return {
      hovered: false,
      dragging: false,
      dragstart: false
    }
  },
  methods: {
    cycleMacroKeyPosition (macroStep) {
      store.commit('workflow/cycleMacroStepPosition', { macroStep: macroStep })
    },
    removeMacroStep () {
      store.commit('workflow/removeMacroStep', { macro: this.macro, macroStep: this.item })
    },
    className (hover, drag, dragstart) {
      let css = 'macro-step flex-column justify-content-center align-items-center my-2'
      if (hover) { css = css + ' hovered' }
      // if (dragstart) { css = css + ' drag-start hovered' }
      // if (drag) { css = ' hovered' }
      return css
    }
  }
}
</script>

<style lang='sass' scoped>
  @import '../../../sass/vendor.sass'

  $macro_size: 3rem

  li.macro-step
    display: flex
    padding: 0 .25rem
    min-height: 8rem

    .key
      height: $macro_size
      width: $macro_size
      border: .15rem solid theme-color('secondary')
      border-radius: .2rem
      color: theme-color('light')
      display: flex
      font-size: .75rem
      font-weight: 400
      cursor: pointer

      .inner
        height: 100%
        width: 100%
        justify-content: center
        align-items: center

        &.content
          display: flex
          flex-direction: column

          // Space button
          &.space
            color: rgba(255, 255, 255, 0)

        &.hover
          display: none

    .position
      display: flex
      // opacity: 0

    // li.macro-step HOVER state
    &.hovered
      // .position
      //   opacity: 1

      .key
        // border: .15rem solid theme-color('secondary')

        .inner.content
          display: none

        .inner.hover
          display: flex
          color: lighten(theme-color('danger'), 25%)

    // TODO - this should be adjusted to
    &.drag-start
      // opacity: 0
      .key
        .inner.content
          display: flex
        .inner.hover
          display: none

      .position
        opacity: 0

    &.ghost
      .key
        border-width: .3rem
        border-color: #f3f3f3
        border-style: dashed
        color: theme-color('warning') !important

</style>
