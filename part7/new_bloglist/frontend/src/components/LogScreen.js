import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import LoggedIn from './LoggedIn'
import { setCurrentUser, clearCurrentUser } from '../reducers/currentUserReducer'
import { setNotification } from '../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'

const LogScreenNoHistory = (props) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      props.setCurrentUser(user)
      props.history.push('/blogs')
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
            message: `Welcome ${response.name}`,
            type: 'success'
          }, 5
        )
        props.history.push('/blogs')
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
      type: 'neutral'
    }, 5)
    props.history.push('/')
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

const LogScreen = withRouter(LogScreenNoHistory)

export default connect(mapStateToProps, mapDispatchToProps)(LogScreen)