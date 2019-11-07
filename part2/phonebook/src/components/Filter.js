import React from 'react'

const Filter = ({searchTerm, handleFilter}) => {
  return(
    <form>
      Filter shown with: <input value={searchTerm} onChange={handleFilter}/>
    </form>
  )
}

export default Filter