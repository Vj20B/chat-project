import React,{useEffect,useState} from 'react'
import Navbar from '../navbar/Navbar';
import { collection , query ,where, getDocs,orderBy, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/fireconfig';
import PostProfile from '../posts/PostProfile';
import { useParams,Link } from 'react-router-dom';
import './Friendprofile.css';


const Friendprofile = (props) => {

const {fuseruid} = useParams();//searched friend (show in page)
const [user,setUser] = useState("");
const loggeduser = props.userdata[0]; //login user (show in navbar)
const[posts,setPosts] = useState([]);


const getUsers = async()=>
{
    const q = query(collection(db,"users"),where("uid", "==",fuseruid));
   getDocs(q).then((data)=>
    {
    setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    const getposts = async () =>
  {
    const postsArray = [];
    const postsref = collection(db,'posts')
    const q = query(postsref,where("post_user_uid" ,"==",user[0].uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      postsArray.push({...doc.data(),id: doc.id})
    })
    setPosts(postsArray);
  }
  getposts();
  })
}
getUsers();

posts.sort((a,b) =>
{
return b.date - a.date;
})
let curruser = user[0];
const addtouserchats = () =>
{
  const addftologged =()=> //add friend to logged user chat
  {
const q = query(collection(db,`allchat-${loggeduser.uid}`),where("fuseruid","==",fuseruid))
getDocs(q).then((data)=>
{
  console.log(data.docs);
  if(data.docs.length !=0)
  {
    console.log("user already added to chat list");
  }
  else{
    addDoc(collection(db,`allchat-${loggeduser.uid}`),{fuseruid:curruser.uid,fprofpic:curruser.profileimage,fusername:curruser.Username})
  }
  }).then(()=>
  {
    console.log("user added to chat section");
  }).catch(()=>
  {
    console.log("user not added to chat section");
  })
}
  const addloffedtof =()=>{ //add to friend to logged 
    const q = query(collection(db,`allchat-${fuseruid}`),where("fuseruid","==",loggeduser.uid))
    getDocs(q).then((data)=>
    {
      console.log(data.docs);
      if(data.docs.length !==0)
      {
        console.log("user already added to chat list");
      }
      else{
        addDoc(collection(db,`allchat-${fuseruid}`),{fuseruid:loggeduser.uid,fprofpic:loggeduser.profileimage,fusername:loggeduser.Username})
      }
      }).then(()=>
      {
        console.log("user added to chat section");
      }).catch(()=>
      {
        console.log("user not added to chat section");
      })

  }
  addftologged();
  addloffedtof();
}

  return (
   <div className='userprofile'>
    {user?
    <div>
        <Navbar userdata={loggeduser} />
        <div className='section1'>
  <div className='left'>
<img src={curruser.profileimage} alt='profile imaage' className='userprofile-image' />
  </div>
  <div className='right'>
<h1>{curruser.Username}</h1>
<h2>{curruser.email}</h2>
  </div>
  {loggeduser.uid != curruser.uid ? 
  <Link to={`/msgp2p/${curruser.uid}`}>
    <button className='msg-btn-profile' onClick={addtouserchats}>message</button>
    </Link>
  :<> </>}
  
    </div>
    <div className='userpost-head'>
        <p>{curruser.Username}'sPosts</p>
        
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
   </div> : <div>
    <Navbar/>
    <div className='big-head'>Loading...</div>
    
    </div>}
   </div>

  )
}

export default Friendprofile