import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import LoggedIn from './LoggedIn'
import { setCurrentUser, clearCurrentUser } from '../reducers/currentUserReducer'
import { setNotification } from '../reducers/notificationReducer'

const LogScreen = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      props.setCurrentUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(event.target)
    try {
      const newUser = {
        username: event.target.username.value,
        password: event.target.password.value
      }
      const response = await props.setCurrentUser(newUser)
      console.log(response)
      if (response) {
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(newUser))
        console.log(window.localStorage.getItem('loggedBlogAppUser'))
        props.setNotification(
          {
            message: `Logged in as '${newUser.username}'`,
            type: 'success'
          }, 5
        )
      } else {
        props.setNotification(
          {
            message: 'Wrong username or password',
            type: 'error'
          }, 5
        )
      }
    } catch (exception) {
      console.log(exception)
      props.setNotification(
        {
          message: exception,
          type: 'error'
        }, 5
      )
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    const username=props.currentUser.username
    props.clearCurrentUser()
    window.localStorage.removeItem('loggedBlogAppUser')
    props.setNotification({
      message:`Logged out from account '${username}'`,
      type: 'success'
    }, 5)
  }

  return (
    <div>
      {props.currentUser ?
        <LoggedIn name={props.currentUser.name} handleLogout={handleLogout}/> :
        <Login handleLogin={handleLogin} />
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    currentUser: state.currentUser
  })
}

const mapDispatchToProps = {
  setCurrentUser,
  clearCurrentUser,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LogScreen)