import React from 'react'
import { createAnecdoteAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(
      createAnecdoteAction(event.target.anecdote.value)
      )
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

export default AnecdoteForm