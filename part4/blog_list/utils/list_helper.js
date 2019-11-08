const _ = require('lodash')

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

      if ( blog === blogs[0] || blog.likes > mostLikedBlog.likes) {
          return ((({ title, author, likes}) => ({ title, author, likes }))(blog))
      } 
      return (mostLikedBlog)
  }, {})
  )
}

const mostBlogs = (all_blogs) => {
  if (all_blogs.length === 0) 
    return ({})
  
  return(_.sortBy(
            _.toPairs(
              _.countBy(all_blogs, 'author')
            ), 1
          )
          .map(entry => {
            return (
              {
                author: entry[0],
                blogs: entry[1]
              }
            )
          })
          .reverse()[0])
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}