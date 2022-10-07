import React from 'react'
import ExploreCard from './ExploreCard'
import { useEffect, useState } from 'react'
function Explore({user, userId}) {

    const [allPosts, setAllPosts] = useState([])

    useEffect(()=>{
    fetch('http://127.0.0.1:3000/explore')
    .then(res => res.json())
    .then(data => {
        setAllPosts(data)
    })
    },[])

  return (
    <div style={{'margin-right': '24vw'}} className='posts-container'>
    {allPosts.map((el, i) => {
        return <ExploreCard user={user} userId={userId} post={el} key={i}/>
    })}
</div>
  )
}

export default Explore
