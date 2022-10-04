import React,{useEffect, useState} from 'react'
import IndividualPostsCard from './IndividualPostsCard';
import { useParams } from "react-router-dom";

function IndividualProfile() {

    const [individualUser, setIndividualUser] = useState({})
    const [posts, setPosts] = useState([])

    const {id } =useParams();
    useEffect(()=>{
            fetch(`http://127.0.0.1:3000/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setIndividualUser(data)
                setPosts(data.posts)
                console.log(data)
            })

    },[])
  return (
    <div className="profile-divv">
      <div className="profile-info">
        <div className="user-profile-image-div">
          <img src={individualUser.profile_image} />
        </div>
        <div className="user-profile-info">
          <div className="profile-editt">

              <h1>{individualUser.name}</h1>
          </div>

          <div className="posts-followw">
            <h3>{posts.length} Posts</h3>
            <h3>{individualUser.amount_followers} Followers</h3>
            <h3>{individualUser.amount_following} Following</h3>
          </div>
          <div className="bio">
            <h4>{individualUser.name}</h4>
            <h4>Bio {individualUser.bio}</h4>
          </div>
        </div>
      </div>
      <div className="all-edit-posts-div">
        {posts.map((el, i) => {
          return <IndividualPostsCard post={el} key={i} />;
        })}
      </div>
    </div>
  )
}

export default IndividualProfile
