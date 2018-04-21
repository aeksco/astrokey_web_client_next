import _ from 'lodash'
import store from '@/store'
import router from '@/routers'

// // // //

export default {
  // fetchCollection: ({ commit }) => ProjectFactory.fetchCollection({ commit }),

  // fetchModel: ({ commit }, id) => ProjectFactory.fetchModel({ commit }, id),

  // create: ({ commit }, attributes) => ProjectFactory.create({ commit }, attributes),

  // update: ({ commit }, attributes) => ProjectFactory.update({ commit }, attributes),

  // destroy: ({ commit }, id) => ProjectFactory.destroy({ commit }, id)

  // connect
  // Invoked with store.commit('device/connect', { device })
  // TODO - change device to device.id, move into state
  connect: ({ commit }, { device }) => {
    // TODO - ACTIONS should be constantized
    // TODO - API for WebUSB and WebBluetooth should be consistent

    // Handles WebUSB & WebBluetooth devices
    // TODO - constantize 'web_usb'
    if (device.type === 'web_usb') {
      return store.dispatch('web_usb/openDevice', { device })
    }

    if (device.type === 'chrome_usb') {
      return store.dispatch('chrome_usb/openDevice', { device })
    }

    // Handles WebUSB & WebBluetooth devices
    // TODO - constantize 'web_bluetooth'
    if (device.type === 'web_bluetooth') {
      return store.dispatch('web_bluetooth/openDevice', { device: device })
    }
  },

  // disconnect
  // Invoked with store.commit('device/disconnect', { device })
  disconnect: ({ commit }, { device }) => {
    // Handles WebUSB & WebBluetooth devices
    // TODO - constantize 'web_usb'
    if (device.type === 'web_usb') {
      return store.dispatch('web_usb/closeDevice', { device: device })
    }

    // Handles WebUSB & WebBluetooth devices
    // TODO - constantize 'web_bluetooth'
    if (device.type === 'web_bluetooth') {
      return store.dispatch('web_bluetooth/closeDevice', { device: device })
    }
  },

  // showDeveloperInterface
  // Sets state.selectedDevice & navigates to /devices/developer
  showDeveloperInterface ({ commit }, device) {
    commit('selectedDevice', device)
    router.push('/devices/developer')
  },

  // showWorkflowInterface
  // Sets state.selectedDevice & navigates to /devices/interface
  showWorkflowInterface ({ commit }, device) {
    commit('selectedDevice', device)
    router.push('/devices/interface')
  },

  // ensureSelectedDevice
  // Redirects unless state.selectedDevice is defined
  ensureSelectedDevice ({ state }) {
    if (!state.selectedDevice.id) {
      router.push('/devices')
    }
  },

  // clearSelectedDevice
  // Clears state.selectedDevice
  clearSelectedDevice ({ commit }) {
    commit('selectedKey', {})
    commit('selectedDevice', {})
  },

  // selectKey
  // Sets state.selectedKey
  selectKey ({ state, commit, dispatch }, key) {
    // Stores state.selectedDevice
    let device = state.selectedDevice

    // Updates key.selected
    device.keys = _.map(device.keys, (k) => {
      if (k.id === key.id) {
        k.selected = true
      } else {
        k.selected = false
      }
      return k
    })

    // // // //
    // TODO - move all of this into an action that reads ALL macros from the device
    dispatch('web_usb/readMacro', { device: device, key: key.order }, { root: true }).then((data) => {
      console.log('READ MACRO - PARSE INTO WORKFLOW')
      console.log(data)
      dispatch('workflow/parse', { data: data }, { root: true }).then((workflow) => {
        // Clean this up
        workflow._id = 'abcdefabcdef123333'
        workflow.label = 'My New Workflow'
        workflow.author = 'aeksco'

        // TODO - should be workflow/selectedWorkflow
        commit('selectedKeyWorkflow', workflow)
      })

      // Updates state.selectedKey
      commit('selectedKey', key)
    })
  }
}
