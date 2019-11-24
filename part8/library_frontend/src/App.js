import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import ModifyAuthor from './components/ModifyAuthor'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author {
      name
      born
      bookCount
      id
    }
    published
    genres
    id
  }
}
`

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
    id
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
    title
    author {
      name 
      born 
      bookCount 
      id
    }
    published
    genres
    id
  }
}
`

const SET_BORN = gql`
mutation setBorn($name: String!, $setBornTo: Int!) {
  editAuthor (
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
    bookCount
    id
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    console.log(error.message)
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

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
        <button onClick={() => setPage('add')}>add book</button>
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

      <Query query={ALL_BOOKS}>
        {(result) => <Books show={page === 'books'} result={result} />}
      </Query>

      <Mutation 
        mutation={NEW_BOOK} 
        refetchQueries={[{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]}
        onError={handleError}
      >
        {(addBook) => 
          <NewBook
            show={page === 'add'}
            addBook={addBook}
          />
        }
      </Mutation>

    </div>
  )
}

export default App