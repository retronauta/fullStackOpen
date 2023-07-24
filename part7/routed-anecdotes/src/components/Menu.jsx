import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import AnecdoteList from './AnecdoteList'
import CreateNew from './CreateNew'
import About from './About'

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
      <Routes>
        <Route path="/" element={<AnecdoteList />} />
        <Route path="/new" element={<CreateNew />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default Menu
