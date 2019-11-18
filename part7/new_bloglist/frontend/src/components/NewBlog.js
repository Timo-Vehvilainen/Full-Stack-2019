import React from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = (props) => {

  const createBlog = (event) => {
    event.preventDefault()

    const blogToAdd = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      user: props.user
    }
    props.addBlog(blogToAdd)
    props.setNotification(
      {
        message: `Added new blog '${blogToAdd.title}' by ${blogToAdd.author}`,
        type: 'success'
      }, 5
    )

    //Toggle off visibility of NewBlog
    console.log(props.toggleRef)
    props.toggleRef.current.toggleVisibility()

    //Clean input fields
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={createBlog}>
        <div>
          title:
          <input name='title' />
        </div>
        <div>
          author:
          <input name='author' />
        </div>
        <div>
          url:
          <input name='url' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDetachToProps = {
  addBlog,
  setNotification
}

export default connect(mapStateToProps, mapDetachToProps)(NewBlog)