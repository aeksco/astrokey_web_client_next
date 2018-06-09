// Accepts an array and splits it
// into pairs of [position, character_id]
export const randomId = (prefix = 'wfst_') => {
  return prefix + Math.floor((Math.random() * 100000000000000) + 1)
}

// Accepts an array and splits it
// into pairs of [position, character_id]
export const pairArray = (a) => {
  let temp = a.slice()
  let arr = []

  while (temp.length) {
    arr.push(temp.splice(0, 2))
  }

  return arr
}
