import React from 'react'
import './EditProfile.css'

function EditProfilePostCard({post}) {
  return (
    <div className='each-edit-post'>
        <img src={post.post_image}></img>
    </div>
  )
}


export default EditProfilePostCard;
