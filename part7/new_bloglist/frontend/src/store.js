import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import currentUserReducer from './reducers/currentUserReducer'
import userlistReducer from './reducers/userlistReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  currentUser: currentUserReducer,
  users: userlistReducer,
  notification: notificationReducer
})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
console.log('initial state of store:', store.getState())

export default store