const dummy = (blogs) => {
  return (1)
}

const totalLikes = (blogs) => {
  return (blogs.reduce((total, blog) => {
    total = total + blog.likes
    return (total)
  }, 0))
}

module.exports = {
  dummy,
  totalLikes
}