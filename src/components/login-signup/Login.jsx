
import React, {useState} from 'react';
import Navbar from '../navbar/Navbar';
import './Loginsignup.css';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[successMsg,setSuccessMsg] = useState('');
  const [errorMsg,setErrorMsg] = useState('');
  const auth = getAuth();



  const handleSubmit =(e)=> //sign using email and password
  {
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
    //signed in
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setSuccessMsg('logged in successfully');
        setTimeout(()=>
        {
          navigate('/mainpage');
        },2000);
        //...
      })
      //...
    .catch((error) => {
      console.log(error.message);
      const errorMessage = error.message;
    
        // Handle Errors here.
        if(errorMessage === 'Firebase: Error (auth/wrong-password).')
        {
          setErrorMsg('wrong password');
          console.log('setErrorMsg')
        }
        if(errorMessage === 'Firebase: Error (auth/invalid-email).')
        {
          setErrorMsg('invalid email');

        }
      if(errorMessage === 'Firebase: Error (auth/user-not-found).')
      {
        setErrorMsg('user not found,please sign up first');
      }
      if(errorMessage === 'Firebase: Error (auth/invalid-email).')
      {
        setErrorMsg('fields cannot be empty');
      }
      setTimeout(()=>
      {
        setErrorMsg('');

      },2000);
      });
  }
 
  return (
   
    <div>
        <Navbar/>
        <div className='form-outermost'>
          <h1>Login</h1>
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
            <input onChange = {(e)=>setPassword(e.target.value)} placeholder='enter your password' type='password'/>
            <button onClick ={handleSubmit}>Submit</button>
          </form>
        </div>
    </div>

  )
}
export default Login