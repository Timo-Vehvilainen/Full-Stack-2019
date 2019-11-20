import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  if (props.message)
    if (props.type === 'error')
      return (
        <div>
          <Message error >
            {props.message}
          </Message>
        </div>
      )
    else if (props.type === 'success')
      return (
        <div>
          <Message success >
            {props.message}
          </Message>
        </div>
      )
    else
      return (
        <div>
          <Message>
            {props.message}
          </Message>
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