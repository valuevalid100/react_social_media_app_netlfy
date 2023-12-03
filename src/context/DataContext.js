import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/posts'
import {format} from 'date-fns'

const DataContext = createContext({})

export const DataProvider = ({children}) => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch (err) {
        if(err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(err.message)
        }
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter(post => (
      ((post.body).toLowerCase()).includes(search.toLowerCase()) || 
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    ))
    setSearchResults(filteredResults.reverse())
  }, [posts, search])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? (posts[posts.length - 1].id) + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {id, title: postTitle, datetime, body: postBody}
    try {
      const response = await api.post('/posts', newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleUpdate = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = {id, title: editTitle, datetime, body: editBody}
    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => (
        (post.id).toString() === id.toString() 
        ? {...response.data}
        : post
      )))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postsAfterDelete = posts.filter(post => post.id.toString() !== id.toString())
      setPosts(postsAfterDelete)
      navigate('/')
    }catch(err) {
      console.log(err.message)
    }
    
  }
    return (
        <DataContext.Provider
            value={{
                search, setSearch, searchResults, 
                handleSubmit, postTitle,  
                setPostTitle, postBody, 
                setPostBody,
                posts, handleUpdate, editBody, 
                setEditBody, editTitle, setEditTitle, 
                handleDelete
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataContext