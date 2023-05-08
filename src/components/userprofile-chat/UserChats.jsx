import React, { useState } from 'react'
import Navbar from '../navbar/Navbar';
import { collection , query,where,getDocs } from 'firebase/firestore';
import { db } from '../../firebase/fireconfig';
import { Link } from 'react-router-dom';
import './Userchats.css';
const UserChats = (props) => {
  let loggeduser = props.userdata[0];
  const [chats, setchats] = useState([]);

const getchatlist = async() =>
{
const chatlistArray = []
const q = query(collection(db,`allchat-${loggeduser.uid}`));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  chatlistArray.push({...doc.data(),id:doc.id});
});
setchats(chatlistArray);
}
getchatlist();



  return (
    <div>
{props ? <div>
  <Navbar userdata={loggeduser} />
  <div className='big-head-1'>
<p>Userchats</p>
  </div>
  <div className='chat-list'> 
  {chats.length > 0 ? 
  
 <>
 {chats.map((chat) => (
  <Link style ={{textDecoration: 'none'}} to ={`/msgp2p/${chat.fuseruid}`}>
    <div className='chat-single'>
      <img src={chat.fprofpic} className='nav-profile-pic' alt='profiorimage'/>
      <p>{chat.fusername}</p>
</div>
  </Link>
 ))}
 </>
  : 
  <div>
    No chats
  </div>}
  </div>
</div>
: 
<div>
  <Navbar/>
  <div>you are not logged in</div>
</div>
}

    </div>
  )
}

export default UserChats