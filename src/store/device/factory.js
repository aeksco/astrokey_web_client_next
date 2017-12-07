import AbstractFactory from '../lib/factory'

// // // //

// Creates new AbstractFactory instance
// TODO - abstract into ./factory.js?
const ProjectFactory = new AbstractFactory({
  API_ROOT: '/api/projects',
  REDIRECT_SUCCESS: '/#/projects',
  messages: {
    CREATE_SUCCESS: 'Created Project.',
    UPDATE_SUCCESS: 'Updated Project.',
    DESTROY_SUCCESS: 'Destroyed Project.'
  }
})

// // // //

export default ProjectFactory
