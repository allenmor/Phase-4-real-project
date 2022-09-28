import React from 'react'
import PostsCard from './PostsCard';
import NewPosts from './NewPosts';
import './Post.css'
import { useEffect, useState } from 'react';

function Posts({userId, createClicked, setCreateClicked}) {

    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        fetch('http://10.129.2.23:8080/posts')
        .then(res => res.json())
        .then(data => {
            setPosts(data.reverse())
            console.log(data)
        })
    },[createClicked])


  return (
    <div style={createClicked ? {display: 'none'} : {display: 'block'}} className='posts-container'>
        <NewPosts />
        {posts.map((el, i) => {
            return <PostsCard userId={userId} post={el} key={i}/>
        })}
    </div>
  )
}

export default Posts;
