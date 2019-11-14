import React from 'react'
import { createVoteAction } from '../reducers/anecdoteReducer'
import { 
  createNotificationAction,
  createClearAction } from '../reducers/notificationReducer' 

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes
  const filter = store.getState().filter

  const compareVotes = (a, b) => {
    return (b.votes - a.votes)
  }

  const vote = (id, content) => {
    store.dispatch(createVoteAction(id))
    store.dispatch(createNotificationAction(
      `you voted '${content}'`
      ))
    setTimeout(() => {
        store.dispatch(createClearAction())
      }, 5000)
  }

  return (
    <div>
      {anecdotes
        .filter(anec => 
          anec.content.toUpperCase()
            .includes(filter.toUpperCase())
        )
        .sort(compareVotes)
        .map(anec =>
        <div key={anec.id}>
          <div>
            {anec.content}
          </div>
          <div>
            has {anec.votes}
            <button onClick={() => vote(anec.id, anec.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList