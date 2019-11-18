import React from 'react'
import { connect } from 'react-redux'
import { initBlogs, likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const BlogNoHistory = (props) => {

  const handleLike = async () => {
    props.likeBlog(props.blog)
    props.setNotification({
      message: `Liked blog '${props.blog.title}' by ${props.blog.author}`,
      type:'success'
    }, 5)
  }

  const handleRemove = async () => {
    const ok = window.confirm(`remove blog ${props.blog.title} by ${props.blog.author}`)
    if (ok) {
      const response = props.removeBlog(props.blog)
      console.log(response)
      props.setNotification({
        message: `Removed blog '${props.blog.title}' by ${props.blog.author}`,
        type:'success'
      }, 5)
      props.history.push('/blogs')
    }
  }

  if (props.blog)
    return (
      <div>
        <h1>{props.blog.author}: {props.blog.title}</h1>
        {props.blog.url} <br/>
        {props.blog.likes} {props.blog.likes === 1 ? 'like' : 'likes'}
        <button onClick={handleLike}>like</button> <br/>
        added by {props.blog.user.name} <br/>
        {(props.blog.user.id === props.currentUser.id) ?
          <button onClick={handleRemove}>Remove</button> :
          <div></div>}
      </div>
    )
  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog:state.blogs.find(blog => blog.id === ownProps.id),
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification
}

const Blog = withRouter(BlogNoHistory)

export default connect(mapStateToProps, mapDispatchToProps)(Blog)