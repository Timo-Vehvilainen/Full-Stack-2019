const initialState = ''

export const createFilterAction = (filter) => {
  const action = {
    type: 'FILTER',
    filter: filter
  }
  return action
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.filter
    default:
      return state
  }
}

export default filterReducer