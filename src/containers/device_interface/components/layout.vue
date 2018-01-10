
<template>
  <div class="container-fluid">

    <!-- Interface Header -->
    <div class="row d-flex align-items-center">
      <div class="col-lg-6">
        <h2>Device Interface</h2>
      </div>
      <div class="col-lg-6">
        <!-- Open Device -->
        <button class='btn btn-sm btn-outline-success' v-if="device.instance && !device.opened && !device.loading" @click="openDevice(device)">
          <i class="fa fa-check-circle-o mr-1"></i>
          Open
        </button>

        <!-- Loading -->
        <span class='badge badge-dark' v-if="device.instance && device.loading">
          <i class="p-1 fa fa-spinner fa-spin"></i>
        </span>

        <!-- Scan -->
        <button class='btn btn-sm btn-outline-primary' v-if="!device.instance.gatt && device.type === 'web_bluetooth'" @click="scanBluetooth()">
          <i class="fa fa-bluetooth-b mr-1"></i>
          Scan
        </button>

        <!-- Close Device -->
        <button class='btn btn-sm btn-outline-warning' v-if="device.instance && device.opened" @click="closeDevice(device)">
          <i class="fa fa-times-circle-o mr-1"></i>
          Close
        </button>
      </div>
      <div class="col-lg-12">
        <hr>
      </div>
    </div>

    <!-- Interface Body -->
    <div class="row">

      <!-- Device Mockup -->
      <div class="col-lg-4 d-flex justify-content-center">

        <div class="row">
          <div class="px-3 py-3 d-flex align-items-center">
            <div class="key--list--wrapper px-3 pb-2 d-flex">
              <small class='pt-3 pl-2 d-flex flex-row align-items-center'>
                <img class="logo" src="/static/icon_white.svg"></img>
                AstroKey
              </small>
              <ul class="list-unstyled key--list d-flex">
                <li :class="className(key)" v-for="key in keys" :key="key.id" @click="onKeyClick(key)"></li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <!-- Selected Key UI -->
      <!-- No Key Selected message -->
      <div class="col-lg-8 selected-key-detail">
        <div class="row">
          <div class="col-lg-6">
            <p class="lead" v-if="selectedKey">Key {{ selectedKey.order }}</p>
          </div>
          <div class="col-lg-6">
            <button class="btn btn-sm btn-outline-light" v-if="!selectedStep" @click="clearSelectedKey">
              <i class="fa fa-fw fa-times mr-1"></i>
              Back
            </button>

            <button class="btn btn-sm btn-outline-success mr-2" v-if="!selectedStep" @click="writeSelectedKey">
              <i class="fa fa-fw fa-save mr-1"></i>
              Save
            </button>
          </div>
        </div>
        <WorkflowEditor :workflow="selectedKeyWorkflow" v-if="selectedKey" />
        <p class="lead" v-if="!selectedKey">No Key Selected</p>
      </div>

    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import store from '@/store'
import WorkflowEditor from '../../workflow_edit/components/layout.vue'

export default {
  props: ['device'],
  components: {
    WorkflowEditor
  },
  created () {
    this.keys = [
      { id: 'device_1_key_1', order: '0x0000', selected: false, config: { type: 'macro', macros: [] } },
      { id: 'device_1_key_2', order: '0x0001', selected: false, config: { type: 'macro', macros: [] } },
      { id: 'device_1_key_3', order: '0x0002', selected: false, config: { type: 'macro', macros: [] } },
      { id: 'device_1_key_4', order: '0x0003', selected: false, config: { type: 'macro', macros: [] } },
      { id: 'device_1_key_5', order: '0x0004', selected: false, config: { type: 'macro', macros: [] } }
    ]
  },
  data () {
    return { keys: this.keys }
  },
  methods: {
    onKeyClick (key) {
      // TODO - keys should be managed in store
      this.keys = _.map(this.keys, (k) => {
        if (k.id === key.id) {
          k.selected = true
        } else {
          k.selected = false
        }
        return k
      })

      store.dispatch('web_usb/readMacro', { device: this.device.instance, key: key.order }).then((data) => {
        store.dispatch('workflow/parse', { data: data }).then((workflow) => {
          // Clean this up
          workflow._id = 'abcdefabcdef123333'
          workflow.label = 'My New Workflow'
          workflow.author = 'aeksco'
          store.commit('device/selectedKeyWorkflow', { workflow })
        })
        store.commit('device/selectedKey', { key })
      })
    },
    className (key) {
      let css = 'btn btn-outline-light key--child d-flex justify-content-center align-items-center mx-2 my-2'
      if (key.selected) { css = css + ' active' }
      return css
    },
    scanBluetooth () {
      return store.dispatch('web_bluetooth/requestDevices')
    },
    openDevice: (device) => {
      return store.dispatch('device/connect', { device: device })
    },
    closeDevice: (device) => {
      return store.dispatch('device/disconnect', { device: device })
    },
    writeSelectedKey () {
      // TODO - must of this should be managed in the Vuex store
      // Isolate order and workflow variables
      let order = store.getters['device/selectedKey'].order
      let workflow = store.getters['device/selectedKeyWorkflow']

      store.dispatch('workflow/serialize', { workflow }).then((workflowPacket) => {
        if (!this.device.opened) return
        return store.dispatch('web_usb/writeMacro', { device: this.device.instance, key: order, data: workflowPacket })
      })
    },
    clearSelectedKey: () => {
      return store.commit('device/clearSelectedKey', { device: this.device })
    }
  },
  computed: {
    selectedKey () {
      return store.getters['device/selectedKey']
    },
    selectedKeyWorkflow () {
      return store.getters['device/selectedKeyWorkflow'] // TODO - remove
    },
    selectedStep () {
      return store.getters['device/selectedStep']
    }
  }
}
</script>

<style lang="sass" scoped>

// TODO - move <MOST> if not all of this into the DeviceMockup component
@import '../../../sass/vendor.sass'

// AstroKey Selector Styles
$astrokey_child_size: 3rem

.selected-key-detail
  border-left: 1px solid theme-color('light')

.key-selector-wrapper
  height: 100%
  justify-content: center

.key--list--wrapper
  display: flex
  flex-direction: column
  border: 2px solid theme-color('light')
  border-radius: .25rem

  img.logo
    margin-right: .3rem
    height: 1rem

  ul.list-unstyled.key--list
    justify-content: space-between
    align-items: center
    flex-direction: row
    margin: 0

    li.key--child
      height: $astrokey_child_size
      width: $astrokey_child_size
      cursor: pointer
      border-width: 2px

      span
        font-size: 0.75rem
        position: relative
        bottom: 0
        left: 0

    &.active
      color: $gray-800
</style>


