import React, { useState ,useEffect} from 'react'
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { getAuth , createUserWithEmailAndPassword} from 'firebase/auth';
import { storage, db } from '../../firebase/fireconfig';
import { collection,getDocs,query,where,addDoc,serverTimestamp } from 'firebase/firestore';
import { getDownloadURL,ref , uploadBytes } from 'firebase/storage';

function Addpost(props) {
  let curruser = props.userdata[0];
  
  var dateObj = new Date(); //sort post by date
  var month = dateObj.getUTCMonth() + 1; //month from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var hours = dateObj.getUTCHours();
  var mins = dateObj.getUTCMinutes();
  var seconds = dateObj.getUTCSeconds();

  //create hooks 
   const[description,setDescription] = useState();
   const[postpic,setPostpic] = useState();
   const[successMsg,setSuccessMsg] = useState('');
   const[errorMsg,setErrorMsg] = useState('');
   const navigate = useNavigate();
   const auth = getAuth();

// create function for post image
 const handleProductImg = (e) =>
 {
  let selectedFile = e.target.files[0];
  if(selectedFile)
  {
    setPostpic(selectedFile);
    
  }
  else{
    setErrorMsg('Please select an image');
  }
 }

 //create function for add post in database
 const handleSubmit = (e) =>
 {
  e.preventDefault();
  const user = curruser;
  let newdate = `${year}${month}${day}${hours}${mins}${seconds}`;


  const storageRef = ref(storage,`posts/${newdate}`);
  uploadBytes(storageRef,postpic).then(()=>
  {
    getDownloadURL(storageRef).then(url=>
      {
        addDoc(collection(db,`posts`),{
          email: user.email, description, Username: user.Username, profilepic: user.profileimage,
          postpic: url, post_user_uid:user.uid, date:parseInt(newdate)
        })

        .then(()=>{
          setSuccessMsg('posted successfully');
          setTimeout(()=>
          {
            setSuccessMsg();
        },2000);
      }).catch((error)=>{
      setErrorMsg(error.message);
      setTimeout(()=>
      {
        setErrorMsg(' ');
      },2000);
      
      });
  })
 })
 .catch((error)=>
  {
    console.log(error.message);
  })

 }


  return (
    <div>
    {props ? <div>
      <Navbar userdata={curruser} />
      
      <div className='form-outermost'>
        <h1>Add Post</h1>
        <form className='form-inner'>
        {successMsg && 
            <>
            <div className='success-msg'>{successMsg} </div>
</>}

{errorMsg && 
            <>
            <div className='error-msg'>{errorMsg} </div>
</>}
            
          <input onChange={handleProductImg} type='file' accept='image/png,image/jpeg,image/gif,image/jpg' placeholder='choose a profile picture'/>
        <input onChange={(e) => setDescription(e.target.value)} placeholder='Enter description'/>
        <button onClick={handleSubmit}>Submit</button>
        
        </form>
      </div>
        </div> :
  
<div>
    <Navbar/>
    <div>Not logged In</div>
   </div>
}
</div>
  )
}
export default Addpost;