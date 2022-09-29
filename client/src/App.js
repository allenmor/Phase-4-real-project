import './App.css';
import SignupLogin from './components/SignupLogin';
import Profile from './components/Profile';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';


function App() {

  const [loggedInUser, setLoggedInUser] = useState({name: ''})
  
  return (
    <Routes>
      <Route path='/' element={<SignupLogin setLoggedInUser={setLoggedInUser}/>}/>
      <Route path='/profile' element={<Profile setUser={setLoggedInUser} user={loggedInUser}/>}/>
    </Routes>
  );
}
{/* <Profile setUser={setUser} user={user} /> */}

export default App;
