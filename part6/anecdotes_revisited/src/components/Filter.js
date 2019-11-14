import React from 'react'
import { createFilterAction } from '../reducers/filterReducer'

const Filter = ({ store }) => {

  const modifyFilter = (event) => {
    event.preventDefault()
    store.dispatch(
      createFilterAction(event.target.value)
    )
  }

  return (
    <div>
      filter <input onChange={modifyFilter} />
    </div>
  )
}

export default Filter