import React from 'react'
import Notification from './components/Notification'
import LogScreen from './components/LogScreen'
import ContentHolder from './components/ContentHolder'

const App = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <LogScreen />
      <ContentHolder />
    </div>
  )
}

export default App