import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault();
    
    if (persons.map(person => person.name).includes(newName)) { 
        const changeID = persons
          .filter(person => person.name === newName)[0].id

        const changedPerson = {
          name: newName,
          number: newNumber,
          id: changeID
        }

        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(changeID, changedPerson)
          .then(response => {
            setPersons(persons.map(person =>
              person.id !== changeID ? person : response))
            setMessage(`Modified ${newName}'s number.`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        }
    }else{ 
      const newPerson = {
        name: newName, 
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setMessage(`Added new person: ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(error.response.data.message)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })  
      }  
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleDelete = (event) => {
    const deleteID = event.target.value
    console.log(deleteID)
    const deletedPersonName = persons.filter(
      person => person.id === deleteID)[0].name
    
      if (window.confirm(`Delete ${deletedPersonName}?`)) {
      personService.remove(deleteID)
        .then(response => {
          setPersons(persons.filter(person =>
            person.id !== deleteID))})
        .catch(error => {
          setErrorMessage(`Information of ${deletedPersonName} has already been removed from server.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        personService
          .getAll()
          .then(response => {
            setPersons(response)
          })
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Error message={errorMessage}/>
      <Notification message={message}/>
      <Filter 
        searchTerm={searchTerm} handleFilter={handleFilter}
      />
      <h3>Add a new person</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} handleNewName= {handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        searchTerm={searchTerm}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App