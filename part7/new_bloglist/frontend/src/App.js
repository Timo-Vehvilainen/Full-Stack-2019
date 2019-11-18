import React from 'react'
import Notification from './components/Notification'
import LogScreen from './components/LogScreen'
import ContentHolder from './components/ContentHolder'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>
        <Notification />
        <LogScreen />
        <ContentHolder />
      </div>
    </Router>
  )
}

export default App