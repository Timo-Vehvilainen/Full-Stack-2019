import userService from '../services/users'

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERLIST',
      data: users
    }
    )
  }
}

const userlistReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERLIST':
    return action.data
  default:
    return state
  }
}

export default userlistReducer