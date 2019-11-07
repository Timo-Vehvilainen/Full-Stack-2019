import React from 'react'
import DeleteButton from './DeleteButton'

const Persons = ({persons, searchTerm, handleDelete}) => {
  return (
      persons.filter(
        person => 
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(
        person => 
          <div key={person.name}>
            {person.name} {person.number} 
            <DeleteButton 
              id={person.id}
              handleDelete={handleDelete}
            />
          </div>
      )
  )
}

export default Persons