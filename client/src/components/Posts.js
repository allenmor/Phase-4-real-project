import React from 'react'
import PostsCard from './PostsCard';
import NewPosts from './NewPosts';
import './Post.css'
import { useEffect, useState } from 'react';

function Posts({user}) {

    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        fetch('http://127.0.0.1:3000/posts')
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        })
    },[])

  return (
    <div className='posts-container'>
        <NewPosts />
        {posts.map((el, i) => {
            return <PostsCard post={el} key={i}/>
        })}
    </div>
  )
}

export default Posts;
