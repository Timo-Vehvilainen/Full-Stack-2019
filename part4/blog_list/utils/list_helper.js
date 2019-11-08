const dummy = (blogs) => {
  return (1)
}

const totalLikes = (blogs) => {
  return (blogs.reduce((total, blog) => {
    total = total + blog.likes
    return (total)
  }, 0))
}

const favouriteBlog = (blogs) => {
  return (
    blogs.reduce((mostLikedBlog, blog) => {
      if (blog.likes > mostLikedBlog.likes) {
          return ((({ title, author, likes}) => ({ title, author, likes }))(blog))
      } 
      return (mostLikedBlog)
  }, {likes:-1})
  )
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}