import React from 'react'
import { connect } from 'react-redux'
import { createAnecdoteAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    props.createAnecdoteAction(event.target.anecdote.value)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(null, { createAnecdoteAction })(AnecdoteForm)