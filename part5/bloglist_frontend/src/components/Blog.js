import React from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => console.log("Clicked a blog")}>
        {blog.title} by {blog.author}
      </div>
    </div>
  )
  }

export default Blog