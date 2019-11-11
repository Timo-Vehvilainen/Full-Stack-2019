import React from 'react'


const LoginForm = ({
   handleSubmit,
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
          <form onSubmit={handleSubmit}>
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


export default LoginForm