import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/userlistReducer'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Userlist = (props) => {

  useEffect(() => {
    console.log('hi from userlist')
    props.initUsers()
  }, [])

  return (
    <div>
      <h2>List of users:</h2>
      <Table striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              blogs created
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users
            .map(user => {
              return(
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <Link id={user.username} to={`/users/${user.id}`}>
                      {user.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {user.blogs.length}
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
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