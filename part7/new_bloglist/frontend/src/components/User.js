import React from 'react'
import { connect } from 'react-redux'

const User = ({ chosenUser }) => {
  if (chosenUser)
    return (
      <div>
        {console.log('chosenuser:',chosenUser)}
        <h1>{chosenUser.name}</h1>
        <h2>Added blogs</h2>
        <ul>
          {chosenUser.blogs
            .map(blog => <li key={blog.id}> {blog.title} </li>
            )
          }
        </ul>
      </div>
    )
  return null
}

const mapStateToProps = (state, ownProps) => {
  return {
    chosenUser: state.users.find(user => user.id === ownProps.id)
  }
}

export default connect(mapStateToProps, null)(User)