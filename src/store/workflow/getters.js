import { KEYS } from './keys'

// Project Module Getters
const getters = {
  collection: state => {
    return state.collection
  },
  current: state => {
    return state.current
  },
  fetching: state => {
    return state.fetching
  },
  recording: state => {
    return state.recording
  },
  selectedStep: state => {
    return state.selectedStep
  },
  keys: state => {
    return KEYS
  }
}

export default getters
