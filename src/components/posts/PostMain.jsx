import React from 'react'
import './PostMain.css';



//show post in main page
function PostMain(props) {
  const currpost = props.postdata 

  return (
    <div className='post-mainpage'>
      <div className = 'section-row'>
        <img className='prp' src={currpost.profilepic} alt='profilepic'/>
        <div className = 'section-col'>
          <h1>{currpost.Username}</h1>
          <h2>{currpost.email}</h2>
          </div>
          <hr/>
          <img className='pop' src={currpost.postpic} alt='post'/>
          <hr/>
          <p><span>{currpost.Username} &nbsp; </span> {currpost.description}</p>
      </div>
    </div>
  )
}

export default PostMain;