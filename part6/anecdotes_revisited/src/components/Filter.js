import React from 'react'
import { connect } from 'react-redux'
import { createFilterAction } from '../reducers/filterReducer'

const Filter = (props) => {

  const modifyFilter = (event) => {
    event.preventDefault()
    props.createFilterAction(event.target.value)
  }

  return (
    <div>
      filter <input onChange={modifyFilter} />
    </div>
  )
}

export default connect(null, { createFilterAction })(Filter)