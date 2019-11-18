import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  const style = {
    color: props.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (props.message)  return (
    <div style={style}>
      {props.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    message: state.notification.message,
    type: state.notification.type
  })
}

export default connect(mapStateToProps, null)(Notification)