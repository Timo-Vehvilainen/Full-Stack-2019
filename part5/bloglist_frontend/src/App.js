import React, { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Bloglist from './components/Bloglist'
import BlogCreator from './components/BlogCreator'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import { useField } from './hooks'

import './App.css'


function App() {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
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
    console.log('logging in with', username.value, password.value)
    try {
      const userLogin = await loginService.login({
        'username': username.value, 'password': password.value,
      })
      blogService.setToken(userLogin.token)
      setUser(userLogin)
      username.reset()
      password.reset()
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(userLogin)
      )
      setNotificationMessage(`Successfully logged in as ${username.value}`)
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
    console.log('Creating a new log', title.value, author.value, url.value)
    try {
      const createdBlog = {
        'title': title.value,
        'author':author.value,
        'url':url.value,
        'userId':user.id
      }
      await blogService.create(createdBlog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotificationMessage(`Created a new blog: ${title.value} by ${author.value}`)
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

  const omitReset = (value) => {  //probably not very elegant to handle it like this, 
    const { reset, ...others } = value
    return others
  }

  return (
    <div>
      <h1>Bloglist</h1>

      <Notification message = {notificationMessage}/>
      <Error message={errorMessage} />


      <LoginForm
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        username={omitReset(username)}
        password={omitReset(password)}
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
              title={omitReset(title)}
              author={omitReset(author)}
              url={omitReset(url)}
              handleNewBlog={handleNewBlog}
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
