import AbstractFactory from '../lib/factory'

// // // //

// Creates new AbstractFactory instance
const PostFactory = new AbstractFactory({
  API_ROOT: '/api/posts',
  REDIRECT_SUCCESS: '/#/posts',
  messages: {
    CREATE_SUCCESS: 'Created Post.',
    UPDATE_SUCCESS: 'Updated Post.',
    DESTROY_SUCCESS: 'Destroyed Post.'
  }
})

// // // //

export default PostFactory
