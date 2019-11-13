import React from 'react'

const BlogCreator = ({
  title,
  author,
  url,
  handleNewBlog
}) => {
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title: <input {...title} />
        </div>
        <div>
          author: <input {...author} />
        </div>
        <div>
          url: <input {...url} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogCreator