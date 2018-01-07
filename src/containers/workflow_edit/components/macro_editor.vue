
<template>
  <div class="row">

    <!-- Macro -->
    <div class="col-lg-12">

      <!-- MacroList -->
      <draggable v-if="editing.value.length" v-model='editing.value' :options="sortableOptions()" element="ul" class='list-unstyled d-flex px-4 my-2 d-flex justify-content-center align-items-center flex-row flex-wrap'>
          <MacroStep v-for="item in editing.value" :key="item.order" :item="item" :macro="editing" />
      </draggable>

      <!-- Empty View -->
      <p class="lead" v-else>EMPTY</p>

    </div>

    <!-- Break -->
    <div class="col-lg-12">
      <hr>
    </div>

    <!-- Keyboard Layouts -->
    <div class="col-lg-12">
      <KeyboardSelector :macro="editing" />
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'
import MacroStep from './macro_step'
import KeyboardSelector from './keyboard_selector'
import draggable from 'vuedraggable'

export default {
  props: ['editing'],
  components: {
    draggable,
    MacroStep,
    KeyboardSelector
  },
  methods: {
    cycleMacroKeyPosition (macroStep) {
      store.commit('workflow/cycleMacroStepPosition', { macroStep: macroStep })
    },
    sortableOptions () {
      return {
        animation: 150,
        handle: '.key',
        ghostClass: 'ghost', // Class name for the drop placeholder
        chosenClass: 'chosen', // Class name for the chosen item
        dragClass: 'drag', // Class name for the dragging item
        // # group:
        // #   name: 'macro'
        // #   pull: false
        // #   put:  true
        fallbackTolerance: 100
      }
    }
  }
}
</script>


<style lang='sass'>


</style>
