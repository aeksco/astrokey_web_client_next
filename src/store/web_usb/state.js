import _ from 'lodash'
import { DEFAULT_CONTROL_TRANSFER } from './constants'

// USB Module State
const state = {
  collection: [], // TODO - rename to 'devices' (?)
  fetching: false,
  transferPayload: _.clone(DEFAULT_CONTROL_TRANSFER),
  transferResponse: {}
}

export default state
