import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import { collection,query,where,getDocs,addDoc,orderBy } from 'firebase/firestore'
import { db } from '../../firebase/fireconfig';
import { useParams,Link } from 'react-router-dom';
import './Ptopmsg.css';

function Ptopmsg(props) {
const loggeduser = props.userdata[0];
const {fuseruid} = useParams();
const[user,setUser] = useState('');


useEffect(()=>
{
  const getUsers = async()=>
  {
  const q = query(collection(db,"users"),where("uid", "==",fuseruid));
  getDocs(q).then((data)=>
   {
   setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
   })
};
getUsers();
});

let curruser = user[0];
let msgdocp2p;

useEffect(()=>{
if(loggeduser.uid > fuseruid)
{
  msgdocp2p = `${loggeduser.uid}_${fuseruid}`
}
if(loggeduser.uid < fuseruid)
{
msgdocp2p = `${fuseruid}_${loggeduser.uid}`
}
})

const[typedmsg,setTypedmsg] = useState(" "); //type msg
const [p2pmsgs,setP2pmsgs] = useState([]); //person to person msg


  const  getMessages = async ()=> //msg get from databse
  {
    const postsArray = [];
    const postsref = collection(db,`chats-${msgdocp2p}`)
    const q = query(postsref, orderBy("date","asc")); // chat show according date ascending
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>
    {
      postsArray.push({...doc.data(),id:doc.id});
    });
    setP2pmsgs(postsArray);
    console.log(postsArray);
  
  }
  getMessages();





var dateObj = new Date(); //sort post by date
var month = dateObj.getUTCMonth() + 1; //month from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var hours = dateObj.getUTCHours();
var mins = dateObj.getUTCMinutes();
var seconds = dateObj.getUTCSeconds();

const sendmsg = (e) =>
{
  e.preventDefault();
  let newdate = `${year}${month}${day}${hours}${mins}${seconds}`;
  addDoc(collection(db,`chats-${msgdocp2p}`),{
    typedmsg,from: loggeduser.uid, date: newdate
  })
  .then(()=>
  {
    console.log("msg send to db successfully");
    
  }).catch(()=>
  {
    console.log("msg send to db failed");
    
  })
setTypedmsg('');
}

  return (
    <div>
      {curruser ? <div>
        <Navbar userdata={loggeduser}/>
        <div className="p2p">
        <div className="p2p-section-1"> 
        <div className='p2p-section-1'>
        <img src={curruser.profileimage} className='nav-profile-pic'/>
        <p>{curruser.Username}</p>
        </div>
      </div> 
      <div className='p2p-section-2'>
        {p2pmsgs.length > 0 ?
        <>
  {p2pmsgs.map((msg)=>(
    <div key={msg.id}>
      {msg.from == loggeduser.uid ?

      <div className = 'right-msg'>
        <p>{msg.typedmsg}</p>
        </div>
        :
        <div className = 'left-msg'>
        <p>{msg.typedmsg}</p>
  
      </div>
}
    </div>
  ))}
        </>
        : 
        <div className='big-head'>No Messages</div>}
      </div>
      <div className='p2p-section-3'>
        <input value={typedmsg} onChange={(e) => {setTypedmsg(e.target.value)}} type='text' placeholder='type you message here'/>
        <button onClick={sendmsg}>send</button>
        </div>
      </div>
  </div>
      :
     <div>
       <div className='big-head'>Loading.... </div>
        </div>}
    </div>
  )
}

export default Ptopmsg