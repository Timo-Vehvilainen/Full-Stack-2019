const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const createVoteAction = (id) => {
  const action = {
    type: 'VOTE',
    id: id
  }
  return action
}

export const createAnecdoteAction = (content) => {
  const action = {
    type: 'NEW_ANECDOTE',
    data: asObject(content)
  }
  return action
}

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE':
      const foundAnec = state.find(anec => anec.id === action.id)
      const changedAnec = {...foundAnec, votes: (foundAnec.votes + 1)}
      return state.map(anec => anec.id === action.id ? changedAnec : anec)
    default:
      return state
  }
}

export default anecdoteReducer