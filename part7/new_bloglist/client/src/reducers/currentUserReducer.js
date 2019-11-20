import loginService from '../services/login'
import blogService from '../services/blogs'

export const setCurrentUser = (userObject) => {
  return async dispatch => {
    try {
      console.log('trying to login', userObject)
      const response = await loginService.login({
        username: userObject.username,
        password: userObject.password
      })
      console.log('received_response', response)
      if (response) {
        blogService.setToken(response.token)
        const newUser = {
          username: response.user.username,
          name: response.user.name,
          id: response.user.id
        }
        dispatch({
          type: 'SET_CURRENT_USER',
          data: newUser
        })
        return newUser
      }
    } catch (exception) {
      console.log(exception)
      return null
    }
  }
}

export const clearCurrentUser = () => {
  return dispatch => {
    blogService.destroyToken()
    dispatch({
      type: 'CLEAR_CURRENT_USER'
    })
  }
}

const currentUserReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_CURRENT_USER':
    return action.data
  case 'CLEAR_CURRENT_USER':
    return null
  default:
    return state
  }
}

export default currentUserReducer