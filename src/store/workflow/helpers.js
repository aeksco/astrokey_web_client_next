import _ from 'lodash'

// Accepts an array and splits it
// into pairs of [position, character_id]
export const randomId = (prefix = 'wfst_') => {
  return prefix + Math.floor((Math.random() * 100000000000000) + 1)
}

// cloneKey
// clones an object from KEYS
export const cloneKey = (macro, attrs = { position: 3 }) => {
  // Clones and returns the macro object
  return _.merge(_.clone(macro), attrs)
}
