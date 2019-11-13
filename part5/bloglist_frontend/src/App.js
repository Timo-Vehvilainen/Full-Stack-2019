import React, { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Bloglist from './components/Bloglist'
import BlogCreator from './components/BlogCreator'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'

import './App.css'


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
  const blogCreatorRef = React.createRef()

  useEffect(() => {
    const fetchBlogs = async ()  => {
      try {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
        console.log('Successfully retrieved blogs')
      } catch (exception) {
        setErrorMessage('Error retrieving blogs.')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const checkAlreadyLoggedIn = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

      if (loggedUserJSON !== null &&
          loggedUserJSON !== 'null' &&
          loggedUserJSON !== undefined) {
        const loggedUserObject = JSON.parse(loggedUserJSON)
        setUser(loggedUserObject)
        blogService.setToken(loggedUserObject.token)
      }
    }
    checkAlreadyLoggedIn()
  }, [notificationMessage])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const userLogin = await loginService.login({
        username, password,
      })
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

  const handleLogout = () => {
    setUser(null)
    window.localStorage.setItem(
      'loggedBloglistUser', 'null'
    )
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    blogCreatorRef.current.toggleVisibility()
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

  const handleLikeButton = async (event) => {
    event.preventDefault()
    const blog = JSON.parse(event.target.value)
    const updatedBlog = {
      ...blog,
      user:blog.user.id,
      likes: blog.likes+1
    }
    try {
      await blogService.update(updatedBlog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotificationMessage(`Added a like to blog: ${updatedBlog.title}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    } catch (exception) {
      console.log(exception)
      setErrorMessage('Failed to add like to blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteButton = async (event) => {
    event.preventDefault()
    const blog = JSON.parse(event.target.value)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs)
        setNotificationMessage(`Removed blog: ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

      } catch (exception) {
        console.log(exception)
        setErrorMessage('Failed to remove blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }
  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }

  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value)
  }

  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }

  return (
    <div>
      <h1>Bloglist</h1>

      <Notification message = {notificationMessage}/>
      <Error message={errorMessage} />


      <LoginForm
        handleLogin={handleLogin}
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
          <Togglable
            buttonLabel='New Blog'
            ref={blogCreatorRef}>
            <BlogCreator
              title={title}
              author={author}
              url={url}
              handleNewBlog={handleNewBlog}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleUrlChange={handleUrlChange}
              currentUser={user}
            /> 
          </Togglable> <br/>
          <Bloglist
            currentUserID={user.id}
            blogs={blogs}
            handleLikeButton={handleLikeButton}
            handleDeleteButton={handleDeleteButton}
          />
        </div>
      }
    </div>
  )
}

export default App
