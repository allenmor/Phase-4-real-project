import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import './CreatePost.css'

function CreatePost({setCreateClicked, setSubmitClicked}) {
    const navigate = useNavigate();

    let initialObj = {post_image: '', description: ''}
    const [postObj, setPostObj] = useState(initialObj)

    function handleChange(e) {
        setPostObj({
            ...postObj,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://127.0.0.1:3000/newpost', {
            method: 'POST',
            headers: {
                token: sessionStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postObj)
        })
        .then(res => res.json())
        .then(data => {
            setPostObj(initialObj)
            setSubmitClicked(prev => !prev)
        })
        setCreateClicked(false)
        navigate(`/profile`);
    }

    // style={!createClicked ? {display: 'none'} : {display: 'block'}}
  return (
    <div className='create-post-container'>
        <h2 className='h2-create-post'>Create Post</h2>
        <form onSubmit={handleSubmit}>
            <input className='post-input' onChange={handleChange} name='post_image' value={postObj.post_image} placeholder='Image' type='text'></input>
            <input className='post-input' onChange={handleChange} name='description' value={postObj.description} placeholder='Description' type='text'></input>
            <input className='submit-post' value='Submit' type='submit'></input>
        </form>
    </div>
  )
}

export default CreatePost;