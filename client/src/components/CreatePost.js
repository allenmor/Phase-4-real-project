import React from 'react'
import { useState, useEffect } from 'react';
import './CreatePost.css'

function CreatePost({createClicked, setCreateClicked, setSubmitClicked}) {
    
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
        fetch('http://10.129.2.23:8080/newpost', {
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
    }



  return (
    <div style={!createClicked ? {display: 'none'} : {display: 'block'}} className='create-post-container'>
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