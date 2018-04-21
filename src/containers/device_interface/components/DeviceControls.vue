<template>

  <div class="row">
    <div class="col-lg-12">
      <OpenDeviceButton :device="device" />
      <CloseDeviceButton :device="device" />
    </div>

    <div class="col-lg-12">
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
  </div>

</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import OpenDeviceButton from '@/components/OpenDeviceButton'
import CloseDeviceButton from '@/components/CloseDeviceButton'

export default {
  props: ['device'],
  components: {
    OpenDeviceButton,
    CloseDeviceButton
  },
  created () {
    // TODO - move these into Vuex store
    this.keys = [
      { id: 'device_1_key_1', order: 0x0000, selected: false, config: { type: 'macro', macros: [] } },
      { id: 'device_1_key_2', order: 0x0001, selected: false, config: { type: 'macro', macros: [] } },
      { id: 'device_1_key_3', order: 0x0002, selected: false, config: { type: 'macro', macros: [] } },
      { id: 'device_1_key_4', order: 0x0003, selected: false, config: { type: 'macro', macros: [] } },
      { id: 'device_1_key_5', order: 0x0004, selected: false, config: { type: 'macro', macros: [] } }
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

      this.$store.dispatch('web_usb/readMacro', { device: this.device, key: key.order }).then((data) => {
      // this.$store.dispatch('chrome_usb/readMacro', { device: this.device, key: key }).then((data) => {
        console.log('READ MACRO - PARSE INTO WORKFLOW')
        console.log(data)
        this.$store.dispatch('workflow/parse', { data: data }).then((workflow) => {
          // Clean this up
          workflow._id = 'abcdefabcdef123333'
          workflow.label = 'My New Workflow'
          workflow.author = 'aeksco'
          this.$store.commit('device/selectedKeyWorkflow', { workflow })
        })
        this.$store.commit('device/selectedKey', { key })
      })
    },
    className (key) {
      let css = 'btn btn-outline-light key--child d-flex justify-content-center align-items-center mx-2 my-2'
      if (key.selected) { css = css + ' active' }
      return css
    },
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
  computed: {
    selectedKey () {
      return this.$store.getters['device/selectedKey']
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


