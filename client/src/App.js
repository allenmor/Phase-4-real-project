import './App.css';
import SignupLogin from './components/SignupLogin';
import Profile from './components/Profile';
import IndividualProfile from './components/IndividualProfile';
import EditProfile from './components/EditProfile';
import { Route, Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';
import NavBar from './components/NavBar';
import Explore from './components/Explore';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [createClicked, setCreateClicked] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({name: ''})
  const [submitClicked, setSubmitClicked] = useState(false)
  


  useEffect(() => {
    let token = sessionStorage.getItem('jwt')
    if(token && !loggedInUser.name) {
        fetch('http://10.129.2.23:3000/me', {
            headers: {
                token: token,
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {

             setLoggedInUser(data)
          })
        }

      },[])
      





  return (
    <div className='app-div'> 
    <Routes>
      <Route path='/' element={<SignupLogin loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>}/>
      <Route path='/profile' element={<>
        <NavBar setSubmitClicked={setSubmitClicked} user ={loggedInUser} setLoggedInUser={setLoggedInUser} createClicked={createClicked} setCreateClicked={setCreateClicked}/>
        <Profile submitClicked={submitClicked} setSubmitClicked={setSubmitClicked} createClicked={createClicked} setCreateClicked={setCreateClicked} setUser={setLoggedInUser} user={loggedInUser}/>
      </>}/>
      <Route path='/explore' element={<>
        <NavBar setSubmitClicked={setSubmitClicked} user ={loggedInUser} setLoggedInUser={setLoggedInUser} createClicked={createClicked} setCreateClicked={setCreateClicked}/>
        <Explore user={loggedInUser} userId={loggedInUser.id}/>
      </>}/>
      <Route path='/editprofile' element={<>
        <NavBar user ={loggedInUser} setLoggedInUser={setLoggedInUser} createClicked={createClicked} setCreateClicked={setCreateClicked}/>
        <EditProfile setUser={setLoggedInUser} user={loggedInUser}/>
      </>}/>
      <Route path='/user/:id' element={<>
        <NavBar user ={loggedInUser} setLoggedInUser={setLoggedInUser} createClicked={createClicked} setCreateClicked={setCreateClicked}/>
       <IndividualProfile/>
      </>}/>
    </Routes>
    </div>
  );
}


export default App;
