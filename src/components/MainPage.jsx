import React, { useEffect, useState } from 'react'
import Navbar from './navbar/Navbar'
import { collection , query ,getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/fireconfig';
import PostMain from './posts/PostMain';
import './Mainpage.css';

const MainPage = (props) => {
  let curruser = props.userdata[0];
  const [posts,setPosts] = useState([]);

  //post pictures in main page 

  useEffect(()=>
  {
    const getPosts = async () =>
    {
      const postsArray = [];
      const postsref = collection(db,'posts');
      const q = query(postsref);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>
      {
        postsArray.push({...doc.data(),id:doc.id});
      });
      setPosts(postsArray);
    }
    getPosts();
  },[])

  function shuffleArray(array) // shuffle posts
  {
    for (var i =array.length - 1; i >= 0; i--)
    {
      //generate random number
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  shuffleArray(posts)


  return (
   <div>
    { props ? <div>
      <Navbar userdata={curruser} />
      
      <div className='Mainpage-outer'>
        {posts.length > 0 ? <div>
          {posts.map((post)=>
          (
            <PostMain key={post.id} postdata={post}/>
          ))}
        </div>
        :
        <div className ='big-head'>try refreshing the page...</div>}
        </div>
        </div> :
  
<div>
    <Navbar/>
    <div>Main page</div>
   </div>
}
</div>
  )
}

export default MainPage