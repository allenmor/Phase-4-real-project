import React from 'react'
import {useState, useEffect} from 'react';
import './Profile.css'
import NavBar from './NavBar';
import Posts from './Posts';
import { Route, Routes } from 'react-router-dom';


function Profile({setUser, user}) {


    useEffect(() => {
        let token = sessionStorage.getItem('jwt')
        if(token && !user.name) {
            fetch('http://127.0.0.1:3000/me', {
                headers: {
                    token: token,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
               
                setUser({
                    ...user,
                    id: data.id,
                    name: data.name,
                    bio: data.bio,
                    posts: data.posts,
                    profile_image: data.posts
                })
            })
        }
    },[])



  return (
    <div className='profile-div' style={user.name ? {display: 'flex'} : {display: 'none'}}>
        <NavBar />
        <Posts userId={user.id}/>
        <p>suggestion</p>
        </div>
  )
}

export default Profile;
