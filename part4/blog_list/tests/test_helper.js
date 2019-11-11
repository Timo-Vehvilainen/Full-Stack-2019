const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    "username": "vehvilt1",
    "name": "Timo Vehvilainen",
    "password": "galaksipersekissa"
  },
  {
    "username": "N00bM4ST3R69",
    "name": "Mark Zuccerberg",
    "password": "password"
  },
  {
    "username": "MusicalGenius",
    "name": "Adam Collier",
    "password": "defgecd"
  },
]

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialUsers,
  initialBlogs,
  blogsInDb,
  usersInDb
}