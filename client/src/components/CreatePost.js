import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {Form, Button} from 'react-bootstrap';

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

 
       
  return (
    <div className='create-post-container'>
        <h2 className='h2-create-post'>Create Post</h2>
        <Form  onSubmit={handleSubmit} style={{ width: '35rem' }} className="text-center mt-4 mb-4">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label><h5>Post's Link</h5></Form.Label>
                <Form.Control type="text"  placeholder='Image' name='post_image' value={postObj.post_image} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label><h5>Your Post</h5></Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Write you post here" value={postObj.description} name='description' onChange={handleChange}/>
            </Form.Group>
            <div className="col-md-12 text-center btn-group" style={{ width: '100%'}}>
                <Button variant="dark" type="submit">
                    Post
                </Button>
            </div>
          
        </Form> 
    </div>
  )
}

export default CreatePost;


