import React from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'

const NewBlog = (props) => {

  const createBlog = (event) => {
    event.preventDefault()
    console.log(props.currentUser)
    const blogToAdd = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      user: props.currentUser
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

      <Form onSubmit={createBlog}>

        <Form.Field>
          <label>title:</label>
          <input id='title' type='text' name='title' />
        </Form.Field>

        <Form.Field>
          <label>author:</label>
          <input id='author' type='text' name='author' />
        </Form.Field>

        <Form.Field>
          <label>url:</label>
          <input id='url' type='text' name='url' />
        </Form.Field>

        <Button id='createNewButton' primary type='submit'>Create</Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDetachToProps = {
  addBlog,
  setNotification
}

export default connect(mapStateToProps, mapDetachToProps)(NewBlog)