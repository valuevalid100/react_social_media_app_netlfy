import React, { useContext } from 'react'
import DataContext from './context/DataContext'

function NewPost() {

  const {
    handleSubmit, postTitle, setPostTitle, postBody, setPostBody
  } = useContext(DataContext)
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit} className="newPostForm">
        <label htmlFor="postTitle">Title : </label>
        <input 
          type="text" 
          id="postTitle" 
          value={postTitle} 
          onChange={(e) => setPostTitle(e.target.value)} 
          required
        />
        <label htmlFor="postBody">Post: </label>
        <textarea 
          id="postBody" 
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)} 
          required
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost