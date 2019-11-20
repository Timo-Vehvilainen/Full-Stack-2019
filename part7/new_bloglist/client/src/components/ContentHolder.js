import React from 'react'
import { connect } from 'react-redux'
import NewBlog from './NewBlog'
import Bloglist from './Bloglist'
import Userlist from './Userlist'
import User from './User'
import Blog from './Blog'
import Togglable from './Togglable'
import { initUsers } from '../reducers/userlistReducer'
import { Route } from 'react-router-dom'
import { Item, Header, ItemGroup } from 'semantic-ui-react'

const ContentHolder = (props) => {

  const toggleRef = React.createRef()

  return (
    <div>
      {props.currentUser &&
      <span>
        <Header as='h3'>Blog-App</Header>
        <ItemGroup>
          <Route
            exact path='/blogs'
            render={() =>
              <Item>
                <Togglable buttonLabel='Create new blog' ref={toggleRef}>
                  <NewBlog toggleRef={toggleRef}/>
                </Togglable>
              </Item>
            }
          />

          <Route
            exact path='/blogs'
            render={() =>
              <Item>
                <Bloglist />
              </Item>}
          />

          <Route
            exact path="/users"
            render={() =>
              <Item>
                <Userlist/>
              </Item>}
          />

          <Route
            path={'/users/:id'}
            render={({ match }) =>
              <Item>
                <User id={match.params.id} />
              </Item>
            }
          />

          <Route
            path={'/blogs/:id'}
            render={({ match }) =>
              <Item>
                <Blog id={match.params.id} />
              </Item>
            }
          />
        </ItemGroup>
      </span>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentHolder)