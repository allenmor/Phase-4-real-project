import React from 'react'
import { useState, useEffect } from 'react';
import './CreatePost.css'

function CreatePost({createClicked, setCreateClicked}) {
    
    let initialObj = {post_image: '', description: ''}
    const [postObj, setPostObj] = useState(initialObj)

    function handleChange(e) {
        setPostObj({
            ...postObj,
            [e.target.name]: e.target.value
        })
        // console.log(postObj)
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
        })
        setCreateClicked(false)
    }



  return (
    <div style={!createClicked ? {display: 'none'} : {display: 'block'}} className='create-post-container'>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name='post_image' value={postObj.post_image} placeholder='Image' type='text'></input>
            <input onChange={handleChange} name='description' value={postObj.description} placeholder='Description' type='text'></input>
            <input value='Submit' type='submit'></input>
        </form>
    </div>
  )
}

export default CreatePost;