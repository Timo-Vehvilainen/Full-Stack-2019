import React from 'react'

const SearchBar = ({searchTerm, handleSearchTerm}) => {
  return (
    <form>
      Find countries: 
      <input value={searchTerm} onChange={handleSearchTerm}/>
    </form>
  )
}

export default SearchBar