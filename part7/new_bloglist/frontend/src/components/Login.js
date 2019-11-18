import React from 'react'

const Login = ({ handleLogin }) => {

  return (
    <div>
      <h2>blogs</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input name='username'/>
        </div>
        <div>
          Password:
          <input type='password' name='password' />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login