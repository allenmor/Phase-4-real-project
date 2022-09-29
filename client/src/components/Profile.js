import React from 'react'
import {useState, useEffect} from 'react';
import './Profile.css'
import Posts from './Posts';
import CreatePost from './CreatePost';



function Profile({setUser, user}) {

    const [submitClicked, setSubmitClicked] = useState(false)
    const [createClicked, setCreateClicked] = useState(false)



    useEffect(() => {
        let token = sessionStorage.getItem('jwt')
        if(token && !user.name) {
            fetch('http://10.129.2.23:8080/me', {
                headers: {
                    token: token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
               console.log(data)
                setUser({
                    ...user,
                    id: data.id,
                    name: data.name,
                    bio: data.bio,
                    posts: data.posts,
                    profile_image: data.profile_image
                })
            })
        }
    },[])

  return (
    // style={user.name ? {display: 'flex'} : {display: 'none'}}
    <div className='profile-div'>
        {/* <NavBar user ={user}createClicked={createClicked} setCreateClicked={setCreateClicked}/> */}
        <CreatePost setSubmitClicked={setSubmitClicked} setCreateClicked={setCreateClicked} createClicked={createClicked}/>
        <Posts user={user} submitClicked={submitClicked} createClicked={createClicked} setCreateClicked={setCreateClicked} userId={user.id}/>
        <p>suggestion</p>
        </div>
  )
}

export default Profile;
