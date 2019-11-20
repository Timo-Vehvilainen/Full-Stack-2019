import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const Login = ({ handleLogin }) => {

  return (
    <div>
      <h2>Blog-App</h2>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Username:</label>
          <input id='username' type='text' name='username' />
        </Form.Field>
        <Form.Field>
          <label>Password:</label>
          <input id='password' type='password' name='password' />
        </Form.Field>
        <Button type="submit">
          Log in
        </Button>
      </Form>
    </div>
  )
}

export default Login