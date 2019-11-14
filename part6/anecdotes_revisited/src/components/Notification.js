import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = (props.notification === '') ?
    {} :
    {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  console.log(props.notification)
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

export default connect(
  (state)=>{return {notification: state.notification}}, null
  )(Notification)