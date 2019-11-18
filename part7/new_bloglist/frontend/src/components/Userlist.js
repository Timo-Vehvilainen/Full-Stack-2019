import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/userlistReducer'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const Userlist = (props) => {

  useEffect(() => {
    console.log('hi from userlist')
    props.initUsers()
  }, [])

  return (
    <div>
      <h2>List of users:</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {props.users
            .map(user => {
              return(
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>
                      {user.name}
                    </Link>
                  </td>
                  <td>
                    {user.blogs.length}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  initUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Userlist)