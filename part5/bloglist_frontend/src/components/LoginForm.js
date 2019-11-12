import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
  handleLogin,
  handleLogout,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  user
}) => {
  return(
    <div>
      {(user === null) ?
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
              />
            </div>
            <div>
                  password:
              <input
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">Log in</button>
          </form>
        </div> :
        <div>
          <p>Logged in as {user.username}<br/>
            <button onClick={handleLogout}>
              Log out
            </button>
          </p>
        </div>
      }
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm