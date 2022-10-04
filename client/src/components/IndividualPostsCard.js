import React from 'react'

function IndividualPostsCard({post}) {
  return (
    <div className='each-edit-post'>
    <img src={post.post_image}></img>
</div>
  )
}

export default IndividualPostsCard
