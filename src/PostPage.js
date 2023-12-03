import React, { useContext } from 'react'
import {Link, useParams} from 'react-router-dom'
import DataContext from './context/DataContext'

function PostPage() {
  const {posts, handleDelete} = useContext(DataContext)
  const {id} = useParams()
  const post = posts.find(post => (post.id).toString() === id.toString())
  return (
    <main className='PostPage'>
      <article className='post'>
        {
          post && (
            <>
              <h2>{post.title}</h2>
              <p className='postDate'>{post.datetime}</p>
              <p className='postBody'>{post.body}</p>
              <Link to={`/post/edit/${post.id}`}>
                <button
                  type='button' 
                  className='editButton' 
                >
                  Edit Post
                </button>
              </Link>
              <button 
                type='button' 
                className='deleteButton'
                onClick={() => handleDelete(post.id)}
              >
                Delete Post
              </button>
            </>
          )
        }
        {
          !post && (
            <>
              <h2>Post Not Found...</h2>
            </>
          )
        }
      </article>
    </main>
  )
}

export default PostPage

