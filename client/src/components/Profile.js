import React from 'react'
import {useState, useEffect} from 'react';
import './Profile.css'
import SuggestionsCard from './SuggestionsCard';
import Posts from './Posts';
import './Suggestions.css'
// import CreatePost from './CreatePost';



function Profile({setUser, user, createClicked, setCreateClicked, submitClicked, setSubmitClicked}) {

const [suggestions, setSuggestions] = useState([])

  useEffect(()=>{
    fetch('http://127.0.0.1:3000/suggestions', {
      headers: {
          token: sessionStorage.getItem('jwt'),
          'Content-Type': 'application/json'
      }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    setSuggestions(data)
  })
  },[])



    function handleClick() {
        setCreateClicked(false)
    }


  return (
    <>
    <div onClick={handleClick} className='profile-div'>
        <Posts user={user} submitClicked={submitClicked} createClicked={createClicked} setCreateClicked={setCreateClicked} userId={user.id}/>
        <div className='suggestions-div'>
          <div className='suggestions-user-info'>
            <img src={user.profile_image}/>
            <p>{user.name}</p>
          </div>
          <p className='suggestions-for-you'>Suggestions For You</p>
        {suggestions.map((el, i) => {
          return <SuggestionsCard suggestion={el} key={i}/>
        })}
        </div>
        </div>
    </>
  )
}

export default Profile;
