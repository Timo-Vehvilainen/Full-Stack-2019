import React from 'react'
import PromisePolyfill from 'promise-polyfill'
import Notification from './components/Notification'
import LogScreen from './components/LogScreen'
import ContentHolder from './components/ContentHolder'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

const App = () => {
  return (
    <Container>
      <Router>
        <div>
          <Notification />
          <LogScreen />
          <ContentHolder />
        </div>
      </Router>
    </Container>
  )
}

export default App