import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

const LoggedIn = ({ name, handleLogout }) => {

  return (
    <div>
      <Menu inverted>
        <Menu.Item link>
          <Link to='/blogs'>blogs</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to='/users'>users</Link>
        </Menu.Item>
        <Menu.Item>
          Logged in as {name}
        </Menu.Item>
        <Button onClick={handleLogout}>
          Log out
        </Button>
      </Menu>
    </div>
  )
}

export default LoggedIn