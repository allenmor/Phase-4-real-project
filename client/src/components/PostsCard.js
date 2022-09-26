import React from "react";
import { useState, useEffect } from "react";
import "./Post.css";

function PostsCard({ post }) {

    const [comments, setComments] = useState([])
    const [firstClicked, setFirstClicked] = useState(true)
    const [showComments, setShowComments] = useState(false)

    function handleCommentClick(){
        setShowComments(prev => !prev)
        if (firstClicked) {
            fetch(`http://127.0.0.1:3000/postcomments/${post.id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
                setFirstClicked(false)
                console.log(data)
            })

        }
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
      </div>
    </div>
  );
}

export default PostsCard;
