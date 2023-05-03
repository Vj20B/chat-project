import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import './UserProfile.css';
import { collection,query,where,getDocs,orderBy } from 'firebase/firestore';
import { db } from '../../firebase/fireconfig';
import PostProfile from '../posts/PostProfile';

const UserProfile = (props) => {
  let curruser = props.userdata[0]
  //console.log(curruser);
 const[posts,setposts] = useState([]);

 
//push all post in user profile
 useEffect(()=>
 {
  const getposts = async () =>
  {
    const postsArray = [];
    const postsref = collection(db,'posts')
    const q = query(postsref,where("post_user_uid" ,"==",curruser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      postsArray.push({...doc.data(),id: doc.id})
    });
    setposts(postsArray);
    console.log(postsArray);
  }
  getposts();
 })

 posts.sort((a,b)=>
 {
  return b.date - a.date;
 })


  return (
    <div className='userprofile'>
      { props ? <div>
<Navbar userdata={curruser}/>
<div className='section1'>
  <div className='left'>
<img src={curruser.profileimage} alt='profile imaage' className='userprofile-image' />
  </div>
  <div className='right'>
<h1>{curruser.Username}</h1>
<h2>{curruser.email}</h2>
  </div>

</div>
<div className='userpost-head'>
<p>YOUR POST</p>
  </div>
<div className='section2'>
{posts.length > 0 ? <>

{posts.map((post) => (

  <PostProfile key={post.id} postdata = {post}/>
))}


</>
:
<div className='big-head'>No post</div>}
</div>
</div>:
      <div>
<Navbar/>
<div>Not logged in</div>
      </div>}
      
      </div>
      
  )
}

export default UserProfile