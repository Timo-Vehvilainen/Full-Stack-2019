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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) 
    return ({})
  
  return(_.sortBy(
            _.toPairs(
              _.countBy(blogs, 'author')
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

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return {}
  grouped_blogs = _.groupBy(blogs, 'author')
  like_counts = {}
  for (let [key, value] of Object.entries(grouped_blogs)) {
    like_counts[key] = value.reduce((sum, it) => {return (sum+it.likes)}, 0)
  }
  return (
    _.sortBy(_.toPairs(like_counts), 1)
    .map(entry => {
      return (
        {
          author: entry[0],
          likes: entry[1]
        }
      )
    })
    .reverse()[0]
  )
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}