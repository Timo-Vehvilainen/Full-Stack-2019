import React, { useState } from 'react'

const ModifyAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }
  if (props.result.loading) {
    return <div>loading...</div>
  }

  const authors = props.result.data.allAuthors

  const setBirthYear = async (event) => {
    event.preventDefault()

    const setBornTo = parseInt(born)
    console.log(setBornTo)
    console.log('modify birthyear...')
    await props.setBorn({
      variables: { name, setBornTo }
    })

    setName('')
    setBorn('')

  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={setBirthYear}>
        name
        <select value={name} onChange={({target}) => setName(target.value)}>
          {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
        </select> <br/>
        born
        <input 
        value={born} 
        onChange={({ target }) => setBorn(target.value)} /> <br/>
        <button type='submit' >update author</button>
      </form>
    </div>
  )
}

export default ModifyAuthor