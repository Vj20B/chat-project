import React, { useState,useEffect } from 'react'
import Navbar from '../navbar/Navbar';
import {createUserWithEmailAndPassword , getAuth} from 'firebase/auth';
import {doc, setDoc} from "firebase/firestore";
import { db,storage } from '../../firebase/fireconfig';
import { collection,getDocs,query,where,addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL , ref , uploadBytes} from 'firebase/storage';
import './Loginsignup.css';


const Signup = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [dob,setDob] = useState();
  const [profilepic ,setProfilepic] = useState();
  const [Username,setUsername] = useState();
  const[successMsg,setSuccessMsg] = useState('');
  const [errorMsg,setErrorMsg] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

const handleProductImg = (e) => { //set profile picture
  let selectedFile  = e.target.files[0];

  if(selectedFile)
  {
    setProfilepic(selectedFile)

  }
  else{
    setErrorMsg('please select your profile picture')
  }
}




const handleSubmit = (e) =>  //when the form is submitted
{
  e.preventDefault();
  createUserWithEmailAndPassword(auth,email,password)
  .then((userCredentials) =>{ //when the user email and password are correct
    const user = userCredentials.user;
    const storageRef = ref(storage,`profile-images/${Date.now()}`); //profile picture store in storage

    //after that upload profile picture in database

    uploadBytes(storageRef,profilepic).then(() =>
    {
      getDownloadURL(storageRef).then(url => {
        addDoc(collection(db , `users`),{
          email,
        password,
        dob,
        profileimage:url,
        Username,
        uid:user.uid
  
      }).then(()=>
      {
        setSuccessMsg('User created successfully');
        console.log('user added successfully');
        setTimeout(()=>
        {
          navigate('/login');
        },2000);
      }).catch((error)=>
      {
        setErrorMsg(error.message);
        setTimeout(()=>
        {
          setErrorMsg('');
        },4000);
      })
    })

  })
  .catch((error)=>
  {
    console.log(error.message);
  })


})
.catch((error)=>{
  console.log(error.message);
  
  if(error.message == 'Firebase: Error (auth/admin-restricted-operation).'){
   
    setErrorMsg('please fill all required fields');
   
  }
  if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
    setErrorMsg('User already in use');
}
setTimeout(()=>{
  setErrorMsg('');
  },2000);
})
}


  return (
    <div>
        <Navbar />
        <div className='form-outermost'>
          <h1>Signup</h1>
          <form className='form-inner'>
            {successMsg && 
            <>
            <div className='success-msg'>{successMsg} </div>
</>}
            {errorMsg && 
            <>
            <div className='error-msg'>{errorMsg} </div>
</>}

            <input onChange = {(e)=>setEmail(e.target.value)} placeholder='enter your email addres' type='email'/>
            <input onChange={(e)=>setUsername(e.target.value)} placeholder='enter your username' type='text'/>
            <input onChange = {(e)=>setPassword(e.target.value)} placeholder='enter your password' type='password'/>
            <input onChange = {(e)=>setDob(e.target.value)} placeholder='enter your date of birth' type='date'/>
            <input onChange = {handleProductImg} type='file' accept='image/png , image/jpg , image/gif ,image/jpeg' placeholder='Choose a profile picture'/>
            <button onClick ={handleSubmit}>Submit</button>
          </form>



          
        </div>
    </div>
  )
}

export default Signup