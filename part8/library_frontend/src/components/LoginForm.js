import React from 'react'

const LoginForm = (props) => {
  if (!props.show) {
    return null
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    

    const result = await props.login({
      variables: {username, password}
    })

    if (result) {
      const token = result.data.login.value
      props.setToken(token)
      window.localStorage.setItem('LoggedInUser', token)
    }
    
    //this is so that client gets the token from localStorage into the context-header
    await props.client.resetStore() 
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        username
        <input name='username'></input> <br/>
        password
        <input type='password' name='password'></input> <br/>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}
export default LoginForm