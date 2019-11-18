import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NewBlog from './NewBlog'
import Bloglist from './Bloglist'
import Userlist from './Userlist'
import User from './User'
import Blog from './Blog'
import Togglable from './Togglable'
import { initUsers } from '../reducers/userlistReducer'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const ContentHolder = (props) => {

  const toggleRef = React.createRef()

  if (props.currentUser)
    return (
      <div>
        {console.log('hi before userlist')}
        <Router>
          <div>

            <Route
              exact path='/'
              render={() =>
                <Togglable buttonLabel='create new' ref={toggleRef}>
                  <NewBlog toggleRef={toggleRef}/>
                </Togglable>
              }
            />

            <Route
              exact path='/'
              render={() => <Bloglist />}
            />

            <Route 
              exact path="/users"
              render={() => <Userlist/>}
            />

            <Route
              path={'/users/:id'}
              render={({ match }) =>
                <User id={match.params.id} />
              }
            />

            <Route
              path={'/blogs/:id'}
              render={({ match }) =>
                <Blog id={match.params.id} />
              }
            />

          </div>
        </Router>
      </div>
    )
  else
    return null
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