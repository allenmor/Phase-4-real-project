import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import './NavBar.css'

function NavBar({createClicked, setLoggedInUser,setCreateClicked, user}) {

  const navigate = useNavigate();


  function handleCreateClicked(){
    setCreateClicked(true)
  }

  function handleHomeClick() {
    setCreateClicked(false)
  }

  function handleLogoutClick() {
    sessionStorage.clear();
    setLoggedInUser({name: ""})
    navigate(`/`);
  }

  function editProfileClick(){
    navigate(`/editprofile`);
  }
  useEffect(()=>{
    console.log(user);
  if (user.name){
    console.log("here");
    navigate("/profile")
  }
  },[user])
  return (
    <div className='other-nav-div'>
        <div className='nav-bar'>
        <h1 onClick={handleHomeClick} className='nav-title'>Chatter</h1>
        <h2 className='home-link' onClick={handleHomeClick}><span className='home-symbol'>&#x2302;</span> Home</h2>
        <h2><span className='magnify-symbol'>&#x1F50D;</span> Explore</h2>
        <h2><span className='plane-symbol'>&#x2709;</span> Messages</h2>
        <h2><span className='heart-symbol'>&#9829;</span> Notifications</h2>
        <h2 className='create-link' onClick={handleCreateClicked}><span className='plus-symbol'>&#43;</span> Create</h2>
        <h2 onClick={editProfileClick}><img className='nav-img' src={user.profile_image}></img>Profile</h2>
        <h2 onClick={handleLogoutClick} className='logout-btn'>Logout</h2>
        </div>
    </div>
  )
}

export default NavBar;
