import React from 'react'
import './NewPosts.css'

function NewPostCard({user}) {
  return (
    <div className='each-user-card'>
        <img src={user.profile_image}></img>
        <p>{user.name}</p>
    </div>
  )
}

export default NewPostCard;
