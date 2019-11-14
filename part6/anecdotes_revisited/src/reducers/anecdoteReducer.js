import anecdoteService from '../services/anecdotes'

export const createVoteAction = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(
      {...anecdote, votes: (anecdote.votes + 1)}
    )
    dispatch({
      type: 'VOTE',
      id: newAnecdote.id
    })
  }
}

export const createAnecdoteAction = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const createInitAction = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE':
      const foundAnec = state.find(anec => anec.id === action.id)
      const changedAnec = {...foundAnec, votes: (foundAnec.votes + 1)}
      return state.map(anec => anec.id === action.id ? changedAnec : anec)
    case 'INIT_ANECDOTES':
      return action.data 
    default:
      return state
  }
}

export default anecdoteReducer