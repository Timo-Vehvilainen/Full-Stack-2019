import React from 'react'
import { connect } from 'react-redux'
import { createVoteAction } from '../reducers/anecdoteReducer'
import { createNotificationAction,
  createClearAction } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (id) => {
    props.createVoteAction(id)
    props.createNotificationAction(
      `you voted '${props.anecdotesToShow
        .find(anec =>anec.id === id)
        .content}'`)
    setTimeout(() => {
        props.createClearAction()
      }, 5000)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => 
              vote(anecdote.id)}>
                vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    return (
      anecdotes.filter(anec => 
        anec.content.toUpperCase()
        .includes(filter.toUpperCase())
      )
      .sort((a, b) => {return (b.votes - a.votes)})
    )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    anecdotesToShow: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  createVoteAction,
  createNotificationAction,
  createClearAction
}

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedNotes