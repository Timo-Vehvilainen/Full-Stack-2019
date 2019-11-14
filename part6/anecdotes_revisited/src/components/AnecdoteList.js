import React from 'react'
import { createVoteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState()

  const compareVotes = (a, b) => {
    return (b.votes - a.votes)
  }

  const vote = (id) => {
    store.dispatch(createVoteAction(id))
  }

  return (
    <div>
      {anecdotes.sort(compareVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList