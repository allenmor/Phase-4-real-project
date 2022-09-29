import React from 'react'
import {useState, useEffect} from 'react';
import './Profile.css'
import Posts from './Posts';
import CreatePost from './CreatePost';



function Profile({setUser, user}) {

    const [submitClicked, setSubmitClicked] = useState(false)
    const [createClicked, setCreateClicked] = useState(false)




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
