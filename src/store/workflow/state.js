
// Workflow Module State
const state = {
  collection: [
    {
      _id: 'abcdefabcdef123123',
      label: 'My New Workflow',
      steps: [
        { order: 1, type: 'text', value: 'Hello, AstroKey!' },
        { order: 2, type: 'macro', value: [{ key: 'A' }, { key: 'SHIFT' }] },
        { order: 3, type: 'delay', value: 500 }
      ]
    }
  ],
  current: {},
  fetching: false
}

export default state
