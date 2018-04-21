<template>
  <div class="row mt-4 align-items-center">
    <div class="col-lg-12">
      <div class="row">
        <div class="col-lg-12" v-if="!selectedStep">
          <!-- <button class="btn btn-sm btn-outline-light" v-if="!selectedStep" @click="clearSelectedKey"> -->
            <!-- <i class="fa fa-fw fa-times mr-1"></i> -->
            <!-- Back -->
          <!-- </button> -->

          <button class="btn btn-sm btn-outline-success mr-2" @click="writeSelectedKey">
            <i class="fa fa-fw fa-save mr-1"></i>
            Save Workflow
          </button>
        </div>
        <div class="col-lg-12">
          <WorkflowEditor :workflow="selectedKeyWorkflow" />
        </div>
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import WorkflowEditor from '../../workflow_edit/components/layout.vue'

export default {
  props: ['device'],
  components: {
    WorkflowEditor
  },
  methods: {
    writeSelectedKey () {
      // TODO - must of this should be managed in the Vuex store
      // Isolate order and workflow variables
      let key = this.$store.getters['device/selectedKey']
      let workflow = this.$store.getters['device/selectedKeyWorkflow']

      this.$store.dispatch('workflow/serialize', { workflow }).then((workflowPacket) => {
        // if (!this.device.opened) return
        // return this.$store.dispatch('web_usb/writeMacro', { device: this.device.instance, key: order, data: workflowPacket })
        console.log(workflowPacket)
        return this.$store.dispatch('chrome_usb/writeMacro', { device: this.device, key: key, data: workflowPacket })
      })
      this.clearSelectedKey()
    },
    clearSelectedKey: () => {
      return this.$store.commit('device/clearSelectedKey', { device: this.device })
    }
  },
  computed: mapGetters({
    selectedKeyWorkflow: 'device/selectedKeyWorkflow',
    selectedStep: 'workflow/selectedStep'
  })
}
</script>
