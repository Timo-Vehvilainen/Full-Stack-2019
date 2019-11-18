import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const Bloglist = (props) => {
  console.log(props)
  useEffect(() => {
    props.initBlogs()
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      {console.log(props.blogs)}
      {props.blogs.sort(byLikes).map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

const mapStatetoProps = (state) => {
  return ({
    blogs: state.blogs,
    user: state.currentUser
  })
}

const mapDispatchToProps = {
  initBlogs
}

export default connect(mapStatetoProps, mapDispatchToProps)(Bloglist)