import React, { useState } from 'react'

const Blog = ({
  blog,
  handleLikeButton,
  handleDeleteButton,
  currentUserID
}) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetailVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div onClick={toggleDetailVisibility}>
        <b><i>{blog.title}</i></b> by <b>{blog.author}</b>
      </div>
      {detailsVisible ? 
        <div>
          <a href={blog.url}>{blog.url}</a> <br/>
          {blog.likes} {blog.likes === 1 ? 'like' : 'likes'} <br/>
          <button
            value={JSON.stringify(blog)}
            onClick={handleLikeButton}>Add like
          </button> <br/>
          added by {blog.user.name} <br />
          {(currentUserID === blog.user.id) ?
            <button
              value={JSON.stringify(blog)}
              onClick={handleDeleteButton}>Remove
            </button> :
            <div></div>
          }
        </div> :
        <div></div>
      }
    </div>
  )
}

export default Blog