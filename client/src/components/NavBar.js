import React from 'react'
import './NavBar.css'

function NavBar() {
  return (
    <div className='nav-div'>
        <div className='nav-bar'>
        <h1 className='nav-title'>Chatter</h1>
        <h2>Home</h2>
        <h2>Explore</h2>
        <h2>Messages</h2>
        <h2>Notifications</h2>
        <h2>Create</h2>
        <h2>Profile</h2>
        </div>
    </div>
  )
}

export default NavBar;
