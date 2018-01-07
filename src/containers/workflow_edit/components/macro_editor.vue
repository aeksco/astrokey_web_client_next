
<template>
  <div class="row">

    <!-- Macro -->
    <div class="col-lg-12">
      <draggable v-model='editing.value' element="ul" class='list-unstyled d-flex px-4 my-2 d-flex justify-content-center align-items-center flex-row flex-wrap'>
        <MacroStep v-for="item in editing.value" :key="item.order" :item="item" />
      </draggable>
    </div>

    <!-- Break -->
    <div class="col-lg-12">
      <hr>
    </div>

    <!-- Keyboard Layouts -->
    <div class="col-lg-12">
      <hr>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'
import MacroStep from './macro_step'
import draggable from 'vuedraggable'

export default {
  props: ['editing'],
  components: {
    draggable,
    MacroStep
  },
  methods: {
    cycleMacroKeyPosition (macroStep) {
      store.commit('workflow/cycleMacroStepPosition', { macroStep: macroStep })
    }
  }
}
</script>
