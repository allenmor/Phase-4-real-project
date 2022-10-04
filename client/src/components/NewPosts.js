import React from 'react'
import NewPostCard from './NewPostCard'
import { useState, useEffect } from 'react'
import './NewPosts.css'

function NewPosts() {
    const [newPostUsers, setNewPostUsers] = useState([])

    useEffect(() => {
    fetch('http://127.0.0.1:3000/newposts', {
        headers: {
            token: sessionStorage.getItem('jwt'),
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            setNewPostUsers(data)
            console.log(data)
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