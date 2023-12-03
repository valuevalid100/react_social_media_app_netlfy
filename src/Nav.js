import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import DataContext from './context/DataContext'

function Nav() {
  const {search, setSearch} = useContext(DataContext)
  return (
    <nav className='Nav'>
      <form className='searchForm' onClick={(e) => e.preventDefault()}>
        <label htmlFor="Search">
          Search Post
        </label>
        <input 
          type="text" 
          value={search} 
          id="search" 
          placeholder="Search Posts"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/post">Post</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  )
}

export default Nav