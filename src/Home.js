import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

function Home() {
  const {searchResults} = useContext(DataContext)
  return (
    <main className='Home'>
      {
        searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p style={{marginTop: '2rem'}}>
            No posts availble.
          </p>
        )
      }
    </main>
  )
}

export default Home