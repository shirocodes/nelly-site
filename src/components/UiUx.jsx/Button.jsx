import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({label = 'Book Now', className = ''}) => {
  return (
    <Link to="/book" className={`btn btn-primary ${className}`}>
      {label}
    </Link>
  )
}

export default Button