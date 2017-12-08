
// Workflow Module State
const state = {
  collection: [
    {
      _id: 'abcdefabcdef123123',
      label: 'My New Workflow',
      steps: [
        { order: 1, type: 'text', value: 'Hello, AstroKey!' },
        { order: 2, type: 'macro', value: [{ key: 'SHIFT', position: 1 }, { key: 'a', position: 3 }, { key: 'SHIFT', position: 2 }] },
        { order: 3, type: 'delay', value: 2 }
      ]
    }
  ],
  current: {},
  fetching: false
}

export default state
