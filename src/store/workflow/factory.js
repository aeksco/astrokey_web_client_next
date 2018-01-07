import AbstractFactory from '../lib/factory'

// // // //

// Creates new AbstractFactory instance
const WorkFactory = new AbstractFactory({
  API_ROOT: '/api/workflows',
  REDIRECT_SUCCESS: '/#/workflows',
  messages: {
    CREATE_SUCCESS: 'Created Workflow.',
    UPDATE_SUCCESS: 'Updated Workflow.',
    DESTROY_SUCCESS: 'Destroyed Workflow.'
  }
})

// // // //

export default WorkFactory
