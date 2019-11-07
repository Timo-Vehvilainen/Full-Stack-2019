import React from 'react'
import Fulldata from './Fulldata'
import ShowButton from './ShowButton'

const PresentCountries = ({allCountries, searchTerm, showClicked, handleShowClicked}) => {

  let matchedCountries = allCountries
    .filter(
      country => 
      country.name.toLowerCase()
      .includes(searchTerm.toLowerCase())
    )

  if (showClicked !== '') {
    return (
      <Fulldata country={allCountries.filter(country => country.name === showClicked)[0]}/>
    )
  }

  if (matchedCountries.length > 10){
    return <div>Too many matches, specify another filter.</div>
  }

  return (
    <div>
      {(matchedCountries.length === 1 ) 
        ? 
          (<Fulldata country={matchedCountries[0]}/>) 
        : 
          (matchedCountries.map(
            country => 
            <div key={country.numericCode}>
              <ShowButton 
                country={country} 
                handleShowClicked={handleShowClicked}
              />
            </div>
          ))
      }
    </div>
  )
}

export default PresentCountries