import React from 'react'
import './nav.css'
const navbar = () => {
  return (
    <div className='nav'>
      <h1>iTask</h1>
      <ul>
        <li className="list">Home</li>
        <li className="list">Your tasks</li>
      </ul>
    </div>
  )
}

export default navbar
