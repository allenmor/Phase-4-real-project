import React from 'react'
import './EditProfile.css'

function EditProfile({user}) {
  console.log(user)
  return (
    <div className='profile-div'>

    <div className='profile-edit'>
      <img src={user.profile_image}/>
      <h1>{user.name}</h1>
      <button>Edit Profile</button>
    </div>

    <div className='posts-follow'>
      <h3>posts</h3>
      <h3>followers</h3>
      <h3>following</h3>
    </div>

    </div>
  )
}

export default EditProfile;
