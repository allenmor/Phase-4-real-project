import React from 'react'
import PostsCard from './PostsCard';
import NewPosts from './NewPosts';
import './Post.css'
import { useEffect, useState } from 'react';

function Posts({userId, user, createClicked, submitClicked}) {

    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        fetch('http://127.0.0.1:3000/posts')
        .then(res => res.json())
        .then(data => {
            setPosts(data.reverse())
        })
    },[submitClicked])


  return (
    <div className='posts-container'>
        <NewPosts />
        {posts.map((el, i) => {
            return <PostsCard user={user} userId={userId} post={el} key={i}/>
        })}
    </div>
  )
}

export default Posts;
