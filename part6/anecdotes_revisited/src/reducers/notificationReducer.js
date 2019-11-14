const initialState = ''

export const createNotificationAction = (message) => {
  const action = {
    type: 'NOTIFICATION',
    message: message
  }
  return action
}

export const createClearAction = () => {
  const action = {
    type: 'CLEAR',
    message: ''
  }
  return action
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.message
    case 'CLEAR':
      return  ''
    default:
      return state
  }
}

export default notificationReducer