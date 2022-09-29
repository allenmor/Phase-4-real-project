import './App.css';
import SignupLogin from './components/SignupLogin';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import { Route, Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';
import NavBar from './components/NavBar';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [createClicked, setCreateClicked] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({name: ''})
  // const pathname = window.location.pathname 
  // console.log(pathname);
  // if (pathname === "/" && loggedInUser.name){
  //   navigate("/profile")
  // }

  useEffect(() => {
    let token = sessionStorage.getItem('jwt')
    if(token && !loggedInUser.name) {
        fetch('http://10.129.2.23:8080/me', {
            headers: {
                token: token,
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
           console.log(data)
           setLoggedInUser({...data})
        })
    }
},[])
  return (
    <div className='app-div'> 
    <Routes>
      <Route path='/' element={<SignupLogin setLoggedInUser={setLoggedInUser}/>}/>
      <Route path='/profile' element={<>
        <NavBar user ={loggedInUser} setLoggedInUser={setLoggedInUser} createClicked={createClicked} setCreateClicked={setCreateClicked}/>
        <Profile setUser={setLoggedInUser} user={loggedInUser}/>
      </>}/>
      <Route path='/editprofile' element={<>
        <NavBar user ={loggedInUser} setLoggedInUser={setLoggedInUser} createClicked={createClicked} setCreateClicked={setCreateClicked}/>
        <EditProfile setUser={setLoggedInUser} user={loggedInUser}/>
      </>}/>
    </Routes>
    </div>
  );
}
{/* <Profile setUser={setUser} user={user} /> */}
{/* <NavBar user ={user}createClicked={createClicked} setCreateClicked={setCreateClicked}/> */}

export default App;
