
// Workflow Module State
const state = {
  collection: [
    {
      _id: 'abcdefabcdef123123',
      label: 'My New Workflow',
      steps: [
        { id: -1, order: -1, type: 'KEY_DOWN', label: 'Press Key' }, // TODO - rename to 'ASTROKEY_DOWN'
        { id: 0, order: 0, icon: 'fa-play-circle-o', type: 'MACRO', label: 'Run Macro', value: [{ key: 'SHIFT', position: 1 }, { key: 'a', position: 3 }, { key: 'SHIFT', position: 2 }] },
        { id: 1, order: 1, type: 'KEY_UP', label: 'Delay until Key Release' },
        { id: 2, order: 2, icon: 'fa-clock-o', type: 'DELAY', label: 'Delay', value: 2 },
        { id: 3, order: 3, icon: 'fa-paragraph', type: 'TEXT', label: 'Type', value: 'Hello, AstroKey!' },
        { id: 4, order: 4, icon: 'fa-cube', type: 'KEY', value: 'ENTER' },
        { id: 5, order: 5, type: 'FINISH' }
      ]
    }
  ],
  current: {},
  fetching: false
}

export default state
