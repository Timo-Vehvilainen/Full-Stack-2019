import React from 'react'

const Recommend = (props) => {
  if (!props.show) {
    return null
  }
  if (props.result.loading) {
    return <div>loading...</div>
  }

  const books = props.result.data.allBooks
  const favoriteGenre = props.user.favoriteGenre

  return (
    <div>
      <h1>Recommendations</h1>
      <p>books in yout favorite genre <b>{favoriteGenre}</b>:</p>
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
              .filter(b => b.genres.includes(favoriteGenre))
              .map(b =>
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend