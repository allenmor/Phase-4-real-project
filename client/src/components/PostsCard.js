import React from "react";
import { useState, useEffect } from "react";
import "./Post.css";

function PostsCard({ post, userId }) {

    const [comments, setComments] = useState([])
    const [firstClicked, setFirstClicked] = useState(true)
    const [showComments, setShowComments] = useState(false)
    let initalComment = {post_id: '', user_id: '', description: ''}
    const [commentInput, setCommentInput] = useState(initalComment)

    // VIEW COMMENTS
    function handleCommentClick(){
        setShowComments(prev => !prev)
        if (firstClicked) {
            fetch(`http://127.0.0.1:3000/postcomments/${post.id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
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
        user_id: userId,
        description: e.target.value
      })
    }

    function handleCommentSubmit(e){
      e.preventDefault()
      fetch('http://127.0.0.1:3000/newcomment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentInput)
        })
        .then(res => res.json())
        .then(data => {
          // console.log(commentInput)
            setComments([...comments, data])
            setCommentInput(initalComment)
          })
          post.number_of_comments += 1
    }



  return (
    <div className="each-post">
      <div className="post-user-info">
        <img src={post.user.profile_image}></img>
        <p>{post.user.name}</p>
      </div>
      <div className="image-description">
        <img className="post-img" src={post.post_image}></img>
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
  );
}

export default PostsCard;
