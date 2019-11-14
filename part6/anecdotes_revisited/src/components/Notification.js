import React from 'react'

const Notification = ({ store }) => {
  const message = store.getState().notification
  const style = (message === '') ?
    {} :
    {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  console.log(store.getState())
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification