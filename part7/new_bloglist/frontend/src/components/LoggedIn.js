import React from 'react'

const LoggedIn = ({ name, handleLogout }) => {

  return (
    <div>
      <p>Logged in as {name}</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LoggedIn