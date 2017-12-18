
// Workflow Module State
const state = {
  collection: [
    {
      _id: 'abcdefabcdef123123',
      label: 'My New Workflow',
      steps: [
        { id: 2, order: 2, icon: 'fa-play-circle-o', type: 'MACRO', label: 'Run Macro', value: [{ key: 'SHIFT', position: 1 }, { key: 'a', position: 3 }, { key: 'SHIFT', position: 2 }] },
        { id: 3, order: 3, type: 'KEY_UP', label: 'Delay until Key Release' },
        { id: 4, order: 4, icon: 'fa-clock-o', type: 'DELAY', label: 'Delay', value: 2 },
        { id: 5, order: 5, icon: 'fa-paragraph', type: 'TEXT', label: 'Type', value: 'Hello, AstroKey!' },
        { id: 6, order: 6, icon: 'fa-cube', type: 'KEY', value: 'ENTER' }
      ]
    }
  ],
  current: {},
  selectedStep: null,
  fetching: false
}

export default state
