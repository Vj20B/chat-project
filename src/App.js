
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Signup from './components/login-signup/Signup';
import Login from './components/login-signup/Login';
import MainPage from './components/MainPage';
import Fof from './components/Fof';
import UserChats from './components/userprofile-chat/UserChats';
import UserProfile from './components/userprofile-chat/UserProfile';
import { useState,useEffect } from 'react';
import { collection } from 'firebase/firestore';
import { db, auth } from './firebase/fireconfig';
import {doc, getDocs , query ,where} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Addpost from './components/posts/Addpost';


function App() {
  const[user,setUser] = useState(' ');
  const[successMsg,setSuccessMsg] = useState(' ');
  const[errorMsg,setErrorMsg] = useState(' ');

function GetCurrentusers() {
  useEffect(()=>
  {
    auth.onAuthStateChanged(userlogged =>{
      if(userlogged)
      {
const getUser = async()=>
{
  const q = query(collection(db,"users"),where("uid","==",userlogged.uid))
  const data = await getDocs(q);
  setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
};
getUser();
      }
      else{
        setUser(null);
      }
    })
  },[])
  return user
}
GetCurrentusers();
//console.log(user[0]);
  return (
    <div>
      {user ? <div> 
        <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/mainpage' element={<MainPage userdata={user}/>}/>
      <Route path='/' element={<MainPage userdata={user}/>}/>
      <Route path='/userchats' element={<UserChats userdata={user}/>}/>
      <Route path='/userprofile' element={<UserProfile userdata={user}/>}/>
      <Route path='/addpost' element={<Addpost userdata={user}/>}/>

      


      <Route path='*' element={<Fof userdata={user}/>}/>
    </Routes>
    </BrowserRouter>
      </div>:
      <div>
      <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
        
        </div>}
    </div>



  );
}

export default App;
