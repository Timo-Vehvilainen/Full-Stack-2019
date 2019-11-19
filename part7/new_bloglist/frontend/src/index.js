import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const hello = name => {
  console.log(`hello ${name}`)
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)