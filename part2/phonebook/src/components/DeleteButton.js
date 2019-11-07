import React from 'react'

const DeleteButton = ({id, handleDelete}) => {
  return (
    <button value={id} onClick={handleDelete}>
      delete
    </button>
  )
}

export default DeleteButton