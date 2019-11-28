import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import ModifyAuthor from './components/ModifyAuthor'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { Query, Mutation, useSubscription ,useApolloClient, useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author {
  name
  born
  bookCount
  id
}
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  genres
  author {
    ...AuthorDetails
  }
  id
}
${AUTHOR_DETAILS}
`

const ALL_BOOKS = gql`
{
  allBooks  {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const ALL_AUTHORS = gql`
{
  allAuthors  {
    ...AuthorDetails
  }
}
${AUTHOR_DETAILS}
`

const GET_USER = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const NEW_BOOK = gql`
mutation newBook($title: String!, $author: String!, $published:Int!, $genres:[String!]!) {
  addBook (
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
}
}
${BOOK_DETAILS}
`
const LOGIN = gql`
mutation signIn ($username: String!, $password: String!) {
  login (
    username: $username,
    password: $password
  ) {
    value
  }
}
`


const SET_BORN = gql`
mutation setBorn($name: String!, $setBornTo: Int!) {
  editAuthor (
    name: $name,
    setBornTo: $setBornTo
  ) {
    ...AuthorDetails
  }
}
${AUTHOR_DETAILS}
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const App = () => {
  const client = useApolloClient()
  console.log(client)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect( () => {
    async function getUser() {
      const me = await client.query({
        query: GET_USER,
      })
      console.log('me:', me)
      setUser(me.data.me)
      
    }
    getUser()
  }, [token, client])

  const handleError = (error) => {
    console.log(error.message)
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  useEffect(() => {
    const existing_token = window.localStorage.getItem('LoggedInUser')
    if (existing_token)
      setToken(existing_token)
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      window.alert(`A new book has been added:'${addedBook.title}'`)
      updateCacheWith(addedBook)
    }
  })

  const [addBook] = useMutation(NEW_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  return (
    <div>
      {errorMessage&&
        <div style={{color: 'red'}}>
          {errorMessage}
        </div>
      }
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => {
          setToken(null)
          window.localStorage.clear()
          client.resetStore()
          setUser(null)
          setPage('authors')
          }}>logout</button>}
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => 
            <div>
              <Authors show={page === 'authors'} result={result} />
              <Mutation 
                mutation={SET_BORN} 
                refetchQueries={[{ query: ALL_AUTHORS }]}
                onError={handleError}
              >
                {(setBorn) => 
                  <ModifyAuthor
                    show={page === 'authors'}
                    result={result}
                    setBorn={setBorn}
                  />
                }
              </Mutation>
            </div>
        }
      </Query>

      <Books show={page === 'books'} 
      client={client}/>
      
      <Recommend 
        show={page === 'recommend'} 
        user={user} />

      {!token &&
      <Mutation
        mutation={LOGIN}
        onError={handleError}
      >
        {(login) => 
          <LoginForm
            show={page === 'login'}
            login={login}
            setToken={(token) => setToken(token)}
            client = {client}
          />
        }
      </Mutation>}

      {token &&
      <Mutation 
        mutation={NEW_BOOK} 
        refetchQueries={[{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]}
        onError={handleError}
      >
        {(addBook) => 
          <NewBook
            show={page === 'add'}
            addBook={addBook}
            client={client}
          />
        }
      </Mutation>}

    </div>
  )
}

export default App