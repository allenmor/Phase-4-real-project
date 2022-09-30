import React from 'react'
import NewPostCard from './NewPostCard'
import { useState, useEffect } from 'react'
import './NewPosts.css'

function NewPosts() {
    const [newPostUsers, setNewPostUsers] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:3000/users')
        .then(res => res.json())
        .then(data => {
            setNewPostUsers(data)
        })
    },[])

  return (
    <div className='container'>
        {newPostUsers.map((el, i) => {
            return <NewPostCard key={i} user={el}/>
        })}
    </div>
  )
}

export default  NewPosts