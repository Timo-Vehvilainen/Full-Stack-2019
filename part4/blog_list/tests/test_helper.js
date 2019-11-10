const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "The Work",
    "author": "A Great Writer",
    "url": "www.imaginarywebsite.com",
    "likes": 101
  },
  {
    "title": "The Second Work",
    "author": "A Motivated Writer",
    "url": "www.imaginarywebsite.com",
    "likes": 99
  },
  {
    "title": "The Third...'work'",
    "author": "A Less Motivated Writer",
    "url": "www.imaginarywebsite.com",
    "likes": 9001
  },
  {
    "title": "Fourth",
    "author": "A Writer",
    "url": "www.imaginarywebsite.com",
    "likes": 1
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}