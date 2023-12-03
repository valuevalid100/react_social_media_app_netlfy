import React, { useContext } from 'react'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import DataContext from './context/DataContext'

function EditPost() {
    const {
        posts, handleUpdate, editBody, setEditBody, editTitle, setEditTitle
    } = useContext(DataContext)
    
    const {id} = useParams()
    const post = posts.find(post => (post.id).toString() === id.toString())
    useEffect(() => {
      if(post) {
        setEditTitle(post.title)
        setEditBody(post.body)
      }
    }, [post, setEditTitle, setEditBody])
    
    return (
        <main className='NewPost'>{
            editTitle && 
            <>
                <h2>Edit Post</h2>
                <form onSubmit={(e) => e.preventDefault()} className="newPostForm">
                    <label htmlFor="postTitle"></label>
                    <input 
                        type="text" 
                        value={editTitle} 
                        id="postTitle" 
                        onChange={(e) => setEditTitle(e.target.value)} 
                        required
                    />
                    <label htmlFor="postBody">Post</label>
                    <textarea 
                        id="postBody" 
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        required 
                    />
                    <button 
                        type='submit'
                        onClick={() => handleUpdate(post.id)}
                    >
                        Submit
                    </button>
                </form>
            </>
        }</main>
    )
}

export default EditPost