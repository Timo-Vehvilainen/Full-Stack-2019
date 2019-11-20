import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Header, Item, ItemGroup } from 'semantic-ui-react'

const Bloglist = (props) => {
  console.log(props)
  useEffect(() => {
    props.initBlogs()
  }, [])

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Header as='h2'>List of blogs</Header>
      {console.log(props.blogs)}
      <ItemGroup divided>
        {props.blogs.sort(byLikes).map(blog => {
          return (
            <Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              ({blog.likes} {blog.likes === 1 ? 'like' : 'likes'})
            </Item>
          )}
        )}
      </ItemGroup>
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