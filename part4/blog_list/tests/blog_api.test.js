const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('blog api requests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Awaiting in Asynchrony',
      author: 'made-up author',
      url: 'coolwebsite.bro',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).toContain(
      'Awaiting in Asynchrony'
    )
  })

  test('blog without a title is not added', async () => {
    const newBlog = {
      author: 'made-up author',
      url: 'nosuchweb.site',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('blog without an url is not added', async () => {
    const newBlog = {
      title: 'made-up title',
      author: 'unknown author',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('id is defined', async () => {
    const blogList = await helper.blogsInDb()

    blogList.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

  test('blog without likes is defaults to 0 likes', async () => {
    const newBlog = {
      title: 'totally legit title',
      author: 'made-up author',
      url: 'nosuchweb.site',
    }

    response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    expect(response.body.likes).toBe(0)
  })

  test('blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const initialLikes = blogToUpdate.likes
    blogToUpdate.likes = initialLikes + 100

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes[0]).toBe(initialLikes + 100)
  })

  test('blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

})



afterAll(() => {
  mongoose.connection.close()
})