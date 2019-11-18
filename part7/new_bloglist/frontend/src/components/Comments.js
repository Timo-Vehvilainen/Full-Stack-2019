import React from 'react'
import { connect } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Comments = (props) => {

  const handleComment = (event) => {
    event.preventDefault()
    console.log('hello from handleComment')
    console.log(event.target.comment.value)
    const comment = event.target.comment.value
    try {
      console.log(props.blog)
      const response = props.commentBlog(props.blog, comment)
      console.log(response)
      event.target.comment.value = ''
      props.setNotification({
        message: `Added comment '${comment}' to blog '${props.blog.title}'`,
        type: 'success'
      }, 5)
    } catch (exception) {
      props.setNotification({
        message: 'Failed to add comment',
        type: 'error'
      }, 5)
    }
  }


  if (props.blog)
    return (
      <div>
        <h2>Comments:</h2>
        <ul>
          {props.blog.comments
            .map(comment =>
              <li key={comment}>{comment}</li>
            )
          }
        </ul>
        <form onSubmit={handleComment}>
          <textarea rows='4' cols='50' name='comment' /> <br/>
          <button type='submit'>add comment</button>
        </form>
      </div>
    )
  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(blog => blog.id === ownProps.id)
  }
}

const mapDispatchToProps = {
  commentBlog,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)