import React from 'react'
import { useNavigate } from 'react-router-dom';
import './NewPosts.css'

function NewPostCard({user}) {
  const navigate = useNavigate();
  return (
    <div  onClick={()=>navigate(`/user/${user.id}`)} className='each-user-card'>
        <img src={user.profile_image}></img>
        <p>{user.name}</p>
    </div>
  )
}

export default NewPostCard;
