import React from "react";
import { useState, useEffect } from "react";
import "./SignupLogin.css";
import Profile from "./Profile";

function SignupLogin() {
    let initialSignup = {name: '', password: ''}
    const [signUp, setSignUp] = useState(initialSignup)
    const [logIn, setLogIn] = useState(initialSignup)
    const [user, setUser] = useState({name: ""})

    function handleSignUpChange(e) {
        setSignUp({
            ...signUp,
            [e.target.name]: e.target.value
        })
        console.log(signUp)
    }

    function handleSignUpSubmit(e){
        e.preventDefault()
        fetch('http://127.0.0.1:3000/newuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUp)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setSignUp(initialSignup)
        })
    }

    function handleLogInChange(e){
        setLogIn({
            ...logIn,
            [e.target.name]: e.target.value
        })
    }


    // LOG IN
    function handleLogInSubmit(e) {
        e.preventDefault()
        fetch('http://127.0.0.1:3000/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logIn)
        })
        .then(res => res.json())
        .then(data => {
            sessionStorage.setItem("jwt", data.token)
            // console.log(data)
            setUser({
                ...user,
                name: data.user.name,
                bio: data.user.bio,
                posts: data.user.posts,
                profile_image: data.user.posts
            })
        })
    }
    



  return (
      <>
      <Profile setUser={setUser} user={user} />
    <div style={ user.name ? {display: 'none'} : {display: 'block'}} className="with-letters">
      <div className="signup-page">
        <img
          className="back-phone"
          src="https://niceload.online/assets/images/niceload/top_block.png"
        ></img>
        <div className="login-signup-form-div">
          <div className="login-div">
            <h2 className="login-title">Chatter</h2>
            <form onSubmit={handleLogInSubmit} className="login-form">
              <label>
                <input className="input-field" onChange={handleLogInChange} name='name' value={logIn.name} type="text" placeholder="Name" />
              </label>
              <label>
                <input className="input-field" onChange={handleLogInChange} name='password' value={logIn.password} type="text" placeholder="Password" />
              </label>
              <label>
                <input className="login-btn" type="submit" value='Log In' placeholder="Submit" />
              </label>
            </form>
          </div>
          <div className="signup-div">
            <p className="signup-title"> Dont't Have An Account? <span>Sign up</span></p>
            <form onSubmit={handleSignUpSubmit} className="sign-up-form">
              <label><input className="input-field" onChange={handleSignUpChange} type="text" name="name" value={signUp.name} placeholder="Name" /></label>
              <label><input className="input-field" onChange={handleSignUpChange} type="text" name='password'value={signUp.password}placeholder="Password" /></label>
              <label><input className="login-btn" value='Sign up' type="submit" placeholder="Submit" /></label>
            </form>
          </div>
          <div className="get-app">
            <h4 className="app-title">Get the app.</h4>
            <div className="app-pics">
              <img
                className="app-img"
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
              ></img>
              <img
                className="app-img"
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
              ></img>
            </div>
          </div>
        </div>
      </div>

      <p className="text-under">
        Shmeta About Blog Jobs Help API Privacy Terms Top Accounts Hashtags
        Locations Chatter Lite Contact Uploading & Non-Users Dance Food &
        Drink Home & Garden Music Visual Arts 
      </p>
        <p className="text-under">English © 2022 Chatter from Shmeta</p>
    </div>
    </>
  );
}

export default SignupLogin;
