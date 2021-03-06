const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id:1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = request.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ 
        error: 'token missing or invalid' 
      })
    }

    const user = await User.findById(body.userId)

    const blog = new Blog(
      {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      }
    )
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const token = request.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ 
        error: 'token missing or invalid' 
      })
    }
    blogToBeDeleted = await Blog.findById(request.params.id)

    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const token = request.token
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
    }

  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ 
        error: 'token missing or invalid' 
      })
    }
    const respondedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
    response.json(respondedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter