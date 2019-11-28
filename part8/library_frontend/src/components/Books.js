import React, { useState, useEffect } from 'react'
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
query getBooks($author: String, $genre: String){
  allBooks (
    author: $author, 
    genre: $genre
    ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
}

const Books = ({ show, client }) => {
  const [allGenres, setAllGenres] = useState([])
  const [allAuthors, setAllAuthors] = useState([])
  const [genre, setGenre] = useState('all_genres')
  const [author, setAuthor] = useState('all_authors')
  const [books, setBooks] = useState([])

   //Not probably smart, but one of the exercises was to do genre-selection
   //on the server side. It would lead to less queries, if this was done on the client
  useEffect(() => {
    async function fetchMetaData() {
      const initBooks = await client.query({
        query: ALL_BOOKS,
          variables: {
            author: 'all_authors',
            genre: 'all_genres'
          }
      })
      setAllGenres(initBooks.data.allBooks.map(b => b.genres).flat().filter(unique))
      setAllAuthors(initBooks.data.allBooks.map(b => b.author.name).filter(unique))
  }
  fetchMetaData()
  }, [])

  useEffect(() => {
    async function checkSelectedBooks() {
      const fetchedBooks = await client.query({
        query: ALL_BOOKS,
        variables: {
          author: author,
          genre: genre
        }
      })
      setBooks(fetchedBooks.data.allBooks)
    }
    checkSelectedBooks()
  }, [genre, author, client])

  if (!show) {
    return null
  }
  if (!books) {
    return <div>loading...</div>
  }

  console.log(books)


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books && books
            .map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
          )}
        </tbody>
      </table>
      {books &&
            allGenres.map(genre => { return(
            <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
            )})
          }
      <button onClick={() => setGenre('all_genres')}>all genres</button> <br/>
      {books &&
        allAuthors.map(a => { return(
        <button key={a} onClick={() => setAuthor(a)}>{a}</button>
        )})
      }
      <button onClick={() => setAuthor('all_authors')}>all authors</button>
      <p>selected genre: <b>{genre}</b> <br/>
      selected author: <b>{author}</b></p>
    </div>
  )
}

export default Books