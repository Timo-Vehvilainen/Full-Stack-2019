import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
    if (loggedUserJSON !== "null") {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [notificationMessage])

  const handleLogin = async (event) => {
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

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
            <div>
              username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password:
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          <button type="submit">login</button>
      </form>
    </div>
  )

  const blogsForm = () => (
    <div>
      <p>Logged in as {user.username}</p>
      <button onClick={() => {
        window.localStorage.setItem('loggedBloglistUser', "null")
        setUser(null) 
      }}>
        Logout
      </button>
      <h2>Create new blog</h2>
      <form onSubmit={handleNewBlog}>
      <div>
              title:
                <input
                type="text"
                value={title}
                name="Username"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author
                <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
                <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit">Create</button>
      </form>
      <h2>Blogs:</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

    return (
      <div>
        <h1>Bloglist</h1>

        <Notification message = {notificationMessage}/>
        <Error message={errorMessage} />

        {user === null ? 
          loginForm() : 
          blogsForm()}
        
      </div>
    )
}

export default App;
