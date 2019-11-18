const initialState = {
  message: null,
  type: 'success'
}

export const setNotification = (notification, secs) => {
  return dispatch => {
    dispatch(createNotificationAction(notification))
    setTimeout(() => {
      dispatch(createClearAction())
    }, secs*1000)
  }
}

const createNotificationAction = notification => {
  return ({
    type: 'NOTIFICATION',
    data: { ...notification }
  })
}

const createClearAction = () => {
  return ({
    type: 'CLEAR'
  })
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.data
  case 'CLEAR':
    return  initialState
  default:
    return state
  }
}

export default notificationReducer