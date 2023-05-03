import React from 'react'
import logo from '../assets/download.png';
import msgicon from '../assets/Unknown.jpeg';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {db , auth} from '../../firebase/fireconfig';
import { signOut } from 'firebase/auth';
import './Navbar.css';
import { useState,useEffect } from 'react';
import { collection } from 'firebase/firestore';
import {doc , getDocs ,query ,where} from 'firebase/firestore';
import Addicon from '../assets/download-1.png';
import Homeicon from '../assets/download-2.png';
const Navbar = (props) => {
  let curruser = props.userdata;
  const navigate = useNavigate();
  const logout = () =>
  {
    signOut(auth).then(()=> // for logout 
    {
      setTimeout(()=>
      {
        navigate('/login');
      },2000);
    }).catch((error)=>
    {
      console.log(error.message)
    })

  }
 
  
  return (
    <div> 
        <nav>
            <div className='left'>
<img src={logo} alt='logo-image'/>
            </div>
            

            {curruser !== undefined ?
            
              <div className='right'>
                <Link to='/mainpage'> 
                <img src={Homeicon} className='nav-profile-pic add-icon'/> </Link>

<Link to='/addpost'> 
                <img src={Addicon} className='nav-profile-pic add-icon'/> </Link>
                
              <Link to='/userchats'>
                <img src={msgicon} className='nav-profile-pic'/> </Link>
<Link to='/userprofile'>
  <img src={curruser.profileimage} className='nav-profile-pic'/> </Link>
  <button onClick={logout}>logout</button>
</div>
            :
            <div className='right'>
              <Link to='/login'><button>Login</button> </Link>
<Link to='/signup'><button>SignUp</button> </Link>
</div>}
        </nav>
        <hr/>
    </div>
  )
}

export default Navbar