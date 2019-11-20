import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'
import { withRouter } from 'react-router-dom'
import { Header, Item, Button, Icon, ItemGroup } from 'semantic-ui-react'

const BlogNoHistory = (props) => {

  const handleLike = async () => {
    props.likeBlog(props.blog)
    props.setNotification({
      message: `Liked blog '${props.blog.title}' by ${props.blog.author}`,
      type:'success'
    }, 5)
  }

  const handleRemove = async () => {
    const ok = window.confirm(`remove blog ${props.blog.title} by ${props.blog.author}`)
    if (ok) {
      const response = props.removeBlog(props.blog)
      console.log(response)
      props.setNotification({
        message: `Removed blog '${props.blog.title}' by ${props.blog.author}`,
        type:'success'
      }, 5)
      props.history.push('/blogs')
    }
  }

  return (
    <div>
      { props.blog &&
      <span>
        <ItemGroup>
          <Header as='h1'>{props.blog.author}: {props.blog.title}</Header>
          <Item>
            <a href={props.blog.url}>{props.blog.url}</a>
          </Item>

          <Item>
            {props.blog.likes} {props.blog.likes === 1 ? 'like' : 'likes'}
            <Button id='likebutton' onClick={handleLike}><Icon name='thumbs up'/></Button>
          </Item>

          <Item>
          added by {props.blog.user.name}
          </Item>

          <Item>
            {(props.blog.user.id === props.currentUser.id) ?
              <Button primary onClick={handleRemove}>Remove</Button> :
              null}
          </Item>

          <Item>
            <Comments id={props.blog.id} />
          </Item>
        </ItemGroup>
      </span>}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog:state.blogs.find(blog => blog.id === ownProps.id),
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification
}

const Blog = withRouter(BlogNoHistory)

export default connect(mapStateToProps, mapDispatchToProps)(Blog)