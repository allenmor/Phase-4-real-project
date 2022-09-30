import React from 'react'
import { useEffect } from 'react'
import './EditProfile.css'

function EditProfile({user}) {
  console.log(user.id)

  useEffect(()=>{
  fetch(`http://0.0.0.0:8080/${user.id}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
  },[])

  return (
    <div className='profile-divv'>

    <div className='profile-editt'>
      <img src={user.profile_image}/>
      <h1>{user.name}</h1>
      <button>Edit Profile</button>
    </div>

    <div className='posts-followw'>
      <h3>posts</h3>
      <h3>followers</h3>
      <h3>following</h3>
    </div>

    </div>
  )
}

export default EditProfile;
