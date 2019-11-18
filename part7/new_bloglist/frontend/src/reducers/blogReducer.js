import blogService from '../services/blogs'

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log(blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}


export const addBlog = (blogObject) => {
  return async dispatch => {
    const blogWithLikes = { ...blogObject, likes:0 }
    const returnedBlog = await blogService.create(blogWithLikes)
    dispatch({
      type: 'ADD_BLOG',
      data: { ...blogWithLikes, id:returnedBlog.id }
    })
  }
}

export const likeBlog = (blogObject) => {
  return async dispatch => {
    const updatedBlog = {
      ...blogObject,
      likes: (blogObject.likes + 1)
    }
    await blogService.update(updatedBlog)
    console.log(updatedBlog)
    dispatch({
      type: 'LIKE',
      id: updatedBlog.id,
      data: updatedBlog
    })
  }
}

export const removeBlog = (blogObject) => {
  return async dispatch => {
    const response = await blogService.remove(blogObject)
    console.log(response)
    dispatch({
      type: 'REMOVE',
      id: blogObject.id
    })
    return (response)
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'LIKE':
    console.log(action)
    return state.map(blog => (blog.id === action.id) ? action.data : blog)
  case 'REMOVE':
    return state.filter(blog => blog.id !== action.id)
  default:
    return state
  }
}

export default blogReducer