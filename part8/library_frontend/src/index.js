import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloProvider } from '@apollo/react-hooks'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: { reconnect: true }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  console.log('headers:', headers)
  const token = localStorage.getItem('LoggedInUser')
  console.log('token:',token)
  const return_val = {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
  console.log('after adding auth:', return_val)
  return return_val
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink),
)

console.log('authLink:',authLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

console.log('client',client)

ReactDOM.render(
  <ApolloProvider client={client} >
    <App />, 
  </ApolloProvider>,
  document.getElementById('root')
)