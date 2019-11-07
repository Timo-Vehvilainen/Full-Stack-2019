import React from 'react'

const ShowButton = ({country, handleShowClicked}) => {
  return (
    <div>
    {country.name}
    <button value={country.name} onClick={handleShowClicked}>
      show
    </button>
    </div>
  )
}

export default ShowButton