
<template lang='pug'>
  .row
    .col-lg-12
      .row.justify-content-center
        .col-lg-8.d-flex.justify-content-center
          button.selector-btn.btn.btn-outline-secondary.btn-sm.mx-3(@click="onClick(item)" v-for="item in navItems" :key="item.order" :item="item") {{ item.text }}

      .row
        .col-lg-12
          hr

      .row
        .col-lg-12( data-region='content' )

</template>

<!-- // // // //  -->

<script>
// import store from '@/store'

export default {
  props: ['item'],
  methods: {
    onClick (selected) {
      console.log('ONCLICK')
      console.log(selected.trigger)
      console.log(selected.text)
    }
    // cycleMacroKeyPosition (macroStep) {
    //   store.commit('workflow/cycleMacroStepPosition', { macroStep: macroStep })
    // }
  },
  data () {
    let navItems = [
      { icon: 'fa-keyboard-o', text: 'Keyboard', trigger: 'keyboard', selected: true },
      { icon: 'fa-file-text-o', text: 'Numpad', trigger: 'numpad' },
      { icon: 'fa-caret-square-o-up', text: 'Function', trigger: 'function' },
      { icon: 'fa-asterisk', text: 'Media', trigger: 'media' },
      { icon: 'fa-asterisk', text: 'Navigation', trigger: 'nav' },
      { icon: 'fa-universal-access', text: 'Unicode', trigger: 'unicode' }
    ]

    return { navItems }
  }
}
</script>

<style lang='sass' scoped>

  button.selector-btn
    display: flex
    flex-grow: 1
    justify-content: center

</style>
