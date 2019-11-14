const initialState = ''

export const setNotification = (message, secs) => {
  return dispatch => {
    dispatch(createNotificationAction(message))
    setTimeout(() => {
      dispatch(createClearAction())
    }, secs*1000)
  }
}

const createNotificationAction = message => {
  const action = {
    type: 'NOTIFICATION',
    message: message
  }
  return action
}

const createClearAction = () => {
  const action = {
    type: 'CLEAR'
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