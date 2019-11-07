import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import PresentCountries from './components/PresentCountries'

const App = () => {

  const [ allCountries, setAllCountries ] = useState([])
  const [ searchTerm, setSearchTerm] = useState('') 
  const [ showClicked, setShowClicked ] = useState('')

  const handleSearchTerm = (event) => {
    setShowClicked('')
    setSearchTerm(event.target.value)
  }

  const handleShowClicked = (event) => {
    console.log("Button clicked:", event.target.value)
    setShowClicked(event.target.value)
  }

  return (
    <div>
      {useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setAllCountries(response.data)
        })
      }, [])}
      {console.log(allCountries)}

      <SearchBar 
        searchTerm={searchTerm} 
        handleSearchTerm={handleSearchTerm}
      />
      <PresentCountries 
        allCountries={allCountries} 
        searchTerm={searchTerm} 
        showClicked={showClicked}
        handleShowClicked={handleShowClicked}
      />
    </div>
  );
}

export default App;
