import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Post.css'

function ExploreCard({post, userId, user }) {
    const navigate = useNavigate();
    const [comments, setComments] = useState([])
    const [firstClicked, setFirstClicked] = useState(true)
    const [showComments, setShowComments] = useState(false)
    let initalComment = {post_id: '', user_id: '', description: ''}
    const [commentInput, setCommentInput] = useState(initalComment)
    const [likes, setLikes] = useState(post.number_of_likes)

    // VIEW COMMENTS
    function handleCommentClick(){
        setShowComments(prev => !prev)
        if (firstClicked) {
            fetch(`http://127.0.0.1:3000/postcomments/${post.id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data.reverse())
                setFirstClicked(false)
            })

        }
    }


    // CREATE NEW COMMENT ADD COMMENT 

    function handleCommentChange(e){
      // console.log(e.target.value)
      setCommentInput({
        ...commentInput,
        post_id: post.id,
        description: e.target.value
      })
    }

    function handleCommentSubmit(e){
      e.preventDefault()
      fetch('http://127.0.0.1:3000/newcomment', {
            method: 'POST',
            headers: {
                token: sessionStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentInput)
        })
        .then(res => res.json())
        .then(data => {
          // console.log(commentInput)
            setComments([data, ...comments])
            console.log(data)
            setCommentInput(initalComment)
          })
          post.number_of_comments += 1
    }

    function handleLikeClicked(){
      fetch('http://127.0.0.1:3000/newlike', {
            method: 'POST',
            headers: {
                token: sessionStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post_id: post.id})
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setLikes(likes + 1)
        })
    }



    // Clicked on user in posts 

    function handleUserNameClick() {
      
    }

  return (
    <div className="each-post">
    <div onClick={()=>navigate(`/user/${post.user.id}`)} className="post-user-info">
      <img src={post.user.profile_image}></img>
      <p onClick={handleUserNameClick}>{post.user.name}</p>
    </div>
    <div  className="image-description">
      <div className="post-img" >
        <div style={{backgroundImage: `url(${post.post_image})`}} className="background-image"></div>
        <img src={post.post_image}/>
      </div>
      <button className='like-btn' onClick={handleLikeClicked}>&#x2665;</button>
      {likes === 0 ? <p></p> : <p className="likes-amount"><img className="liked-profile-img" src={user.profile_image}></img>Liked by&nbsp;<span className="likes-first-name">{user.name}</span>&nbsp;and {likes >= 1 ?  likes - 1 : likes} others</p> }
     
      <p className="post-description">
        <span>{post.user.name}</span> &nbsp;{post.description}
      </p>
      <p onClick={handleCommentClick} className="view-comments" style={post.number_of_comments == 0 ? {display: 'none'} : {display: 'block'}}>View all <span>{post.number_of_comments}</span> comments</p>
      <ul style={showComments ? {display: 'block'} : {display: 'none'}} className="comments-ul">
          {comments.map((el,i) => {
              return <li className="comments-li" key={i}><img className="comments-user-img" src={el.user.profile_image}></img><span className="comments-username">{el.user.name}</span>{el.description}</li>
          })}
      </ul>
      <div className="add-comment">
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <input value={commentInput.description} onChange={handleCommentChange} name='description' placeholder="Add a comment..." className="input-comment"></input>
          <input className="comment-post-button" type="submit" value="Post"/>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ExploreCard
