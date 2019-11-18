import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const LoggedIn = ({ name, handleLogout }) => {
  const loggedInMenuStyle = {
    backgroundColor: 'silver'
  }

  const menuLinkStyle = {
    paddingLeft: 5,
    paddingRight: 5
  }

  return (
    <div style={loggedInMenuStyle}>
      <Link to='/blogs' style={menuLinkStyle}>blogs</Link>
      <Link to='/users' style={menuLinkStyle}>users</Link>
      Logged in as {name}
      <button style={menuLinkStyle} onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LoggedIn