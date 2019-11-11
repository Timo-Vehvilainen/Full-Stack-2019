const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    await api.post('/api/users').send(user)
  }
  let ids = await helper.usersInDb()
  let blogCounter = 0
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    blogObject.user = ids[blogCounter].id
    blogCounter = ((blogCounter + 1) % ids.length)
    await blogObject.save()
  }
})

describe('blog api requests', () => {

  describe('getting a blog', () => {

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
  })

  describe('pushing a blog', () => {

    test('a valid blog can be added ', async () => {
      userOfNewBlog = await helper.usersInDb()
      const newBlog = {
        title: 'Awaiting in Asynchrony',
        author: 'made-up author',
        url: 'coolwebsite.bro',
        userId: userOfNewBlog[0].id,
        likes: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${process.env.AUTH_KEY}`)
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

    test('blog not added with invalid authorization key', async () => {
      userOfNewBlog = await helper.usersInDb()
      const newBlog = {
        title: 'Awaiting in Asynchrony',
        author: 'made-up author',
        url: 'coolwebsite.bro',
        userId: userOfNewBlog[0].id,
        likes: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer invalidAuthorizationKey`)
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('blog not added with missing authorization key', async () => {
      userOfNewBlog = await helper.usersInDb()
      const newBlog = {
        title: 'Awaiting in Asynchrony',
        author: 'made-up author',
        url: 'coolwebsite.bro',
        userId: userOfNewBlog[0].id,
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('blog without a title is not added', async () => {
      userOfNewBlog = await helper.usersInDb()
      const newBlog = {
        author: 'made-up author',
        url: 'nosuchweb.site',
        userId: userOfNewBlog[0].id,
        likes: 10
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${process.env.AUTH_KEY}`)
        .send(newBlog)
        .expect(400)
        
      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('blog without an url is not added', async () => {
      userOfNewBlog = await helper.usersInDb()
      const newBlog = {
        title: 'made-up title',
        author: 'unknown author',
        userId: userOfNewBlog[0].id,
        likes: 10
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${process.env.AUTH_KEY}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })
  })

  describe('default behaviour', () => {

    test('id is defined', async () => {
      const blogList = await helper.blogsInDb()

      blogList.forEach(blog => {
        expect(blog.id).toBeDefined()
      })
    })

    test('blog without likes is defaults to 0 likes', async () => {
      userOfNewBlog = await helper.usersInDb()
      const newBlog = {
        title: 'totally legit title',
        author: 'made-up author',
        userId: userOfNewBlog[0].id,
        url: 'nosuchweb.site',
      }

      response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${process.env.AUTH_KEY}`)
        .send(newBlog)
        .expect(200)

      expect(response.body.likes).toBe(0)
    })
  })

  describe('putting, deleting', () => {

    test('blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const initialLikes = blogToUpdate.likes
      blogToUpdate.likes = initialLikes + 100

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `bearer ${process.env.AUTH_KEY}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

      const likes = blogsAtEnd.map(b => b.likes)
      expect(likes[0]).toBe(initialLikes + 100)
    })

    test('blog can be deleted with valid authorization key', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${process.env.AUTH_KEY}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).not.toContain(blogToDelete.title)
    })

    test('blog cant be deleted with invalid authorization key', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer invalidAuthKey`)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain(blogToDelete.title)
    })
  })
})



afterAll(() => {
  mongoose.connection.close()
})