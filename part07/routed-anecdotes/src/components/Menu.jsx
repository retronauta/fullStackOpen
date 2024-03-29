import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to="/" style={padding}>
        Anecdotes
      </Link>
      <Link to="/new" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  )
}

export default Menu
