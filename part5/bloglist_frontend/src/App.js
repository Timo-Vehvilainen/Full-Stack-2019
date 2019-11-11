import React, { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Bloglist from './components/Bloglist'
import BlogCreator from './components/BlogCreator'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'

import './App.css';


function App() {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async ()  => {
      try {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
        console.log('Successfully retrieved initial blogs')
      } catch (exception) {
        setErrorMessage('Error retrieving initialBlogs.')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    fetchBlogs();
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON !== null && loggedUserJSON !== "null") {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [notificationMessage])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const userLogin = await loginService.login({
        username, password,
      })
      console.log(userLogin)
      blogService.setToken(userLogin.token)
      setUser(userLogin)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(userLogin)
      ) 
      setNotificationMessage(`Successfully logged in as ${username}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    setUser(null)
    window.localStorage.setItem(
      'loggedBloglistUser', "null"
    ) 
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    console.log('Creating a new log', title, author, url)
    try {
      const createdBlog = {
        'title': title, 
        'author':author, 
        'url':url,
        'userId':user.id
      }
      await blogService.create(createdBlog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotificationMessage(`Created a new blog: ${title} by ${author}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Failed to create new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = ({target}) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({target}) => {
    setPassword(target.value)
  }
  const handleTitleChange = ({target}) => {
    setTitle(target.value)
  }

  const handleAuthorChange = ({target}) => {
    setAuthor(target.value)
  }

  const handleUrlChange = ({target}) => {
    setUrl(target.value)
  }

    return (
      <div>
        <h1>Bloglist</h1>

        <Notification message = {notificationMessage}/>
        <Error message={errorMessage} />

       
            <LoginForm 
              handleSubmit={handleSubmit}
              handleLogout={handleLogout}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
              username={username}
              password={password}
              user = {user}
            /> 
            {(user === null) ? 
              <div></div> :
              <div>
                <h2>Blogs:</h2>
                <Togglable buttonLabel='New Blog'>
                  <BlogCreator 
                    title={title}
                    author={author}
                    url={url}
                    handleNewBlog={handleNewBlog}
                    handleTitleChange={handleTitleChange}
                    handleAuthorChange={handleAuthorChange}
                    handleUrlChange={handleUrlChange}
                  /> 
                </Togglable> <br/>
                <Bloglist 
                  user={user}
                  blogs={blogs}
                /> 
              </div>
            }
      </div>
    )
}

export default App;
