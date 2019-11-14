import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { createInitAction } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    props.createInitAction()
  })

  return (
    <div>
      <h2>Programming anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default connect(null, { createInitAction })(App)