import React from 'react'
import Blog from './Blog'

const Bloglist = ({
  blogs,
  handleLikeButton,
  handleDeleteButton,
  currentUserID
}) => {

  const compareLikes = (a, b) => {
    return (b.likes-a.likes)
  }
  return(
    <div>
      {blogs.sort(compareLikes).map(blog =>
        <Blog 
          key={blog.id}
          blog={blog}
          handleLikeButton={handleLikeButton}
          handleDeleteButton={handleDeleteButton}
          currentUserID={currentUserID}
        />
      )}
    </div>
  )
}

export default Bloglist