import React from 'react'
import {useState, useEffect} from 'react';
import './Profile.css'
import Posts from './Posts';
// import CreatePost from './CreatePost';



function Profile({setUser, user, createClicked, setCreateClicked, submitClicked, setSubmitClicked}) {




    function handleClick() {
        setCreateClicked(false)
    }


  return (
    // style={user.name ? {display: 'flex'} : {display: 'none'}}
    <>
        {/* <CreatePost setSubmitClicked={setSubmitClicked} setCreateClicked={setCreateClicked} createClicked={createClicked}/> */}
    <div onClick={handleClick} className='profile-div'>
        <Posts user={user} submitClicked={submitClicked} createClicked={createClicked} setCreateClicked={setCreateClicked} userId={user.id}/>
        <p>suggestion</p>
        </div>
    </>
  )
}

export default Profile;
