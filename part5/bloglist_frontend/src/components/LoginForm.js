import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
  handleLogin,
  handleLogout,
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
            username: <input {...username} /> <br />
            password: <input {...password} /> <br />
            <button type="submit">Log in</button>
          </form>
        </div>
        :
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
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm