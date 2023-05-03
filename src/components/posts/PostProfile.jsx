import React from 'react';

//show post in user profile
function PostProfile(props) {
  let currpost = props.postdata;

  return (
    <div className='post-profile'>
      <img src={currpost.postpic} alt='post'/>

    </div>
  )
}

export default PostProfile;