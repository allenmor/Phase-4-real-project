import React from 'react'
import './EditProfile.css'

function EditProfilePostCard({post, posts, setPosts}) {


  function handleDeletePostClick() {
    fetch(`http://127.0.0.1:3000/userpostdelete/${post.id}`, {
      method: "DELETE",
      headers: {
          'Content-type': 'application/json'
      }
  })
  .then(res => res.json())
  .then(data => {
    if(data['status'] == 'OK') {
      console.log(posts)
      let filtered = posts.filter(el=> el.id !== post.id)
      setPosts(filtered)
    }
  })
  }

  return (
    <div className='each-edit-post'>
        <button onClick={handleDeletePostClick} className="delete-btn">x</button>
        <img src={post.post_image}></img>
    </div>
  )
}


export default EditProfilePostCard;
