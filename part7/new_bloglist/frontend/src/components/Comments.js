import React from 'react'
import { connect } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Header, Comment, Form, Button } from 'semantic-ui-react'

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
        type: 'neutral'
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
        <Comment.Group minimal>
          <Header as='h2' dividing>Comments:</Header>
          {props.blog.comments
            .map(comment => { return(
              <div key={comment}>
                <Comment>
                  <Comment.Avatar src='https://cdn.onlinewebfonts.com/svg/img_569204.png' />
                  <Comment.Content>
                    <Comment.Text>{comment}</Comment.Text>
                  </Comment.Content>
                </Comment> <br/>
              </div>
            )})
          }
          <Form onSubmit={handleComment}>
            <Form.TextArea name='comment' /> <br/>
            <Button primary type='submit'>Add Comment</Button>
          </Form>
        </Comment.Group>
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