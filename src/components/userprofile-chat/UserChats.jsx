import React from 'react'
import Navbar from '../navbar/Navbar';

const UserChats = (props) => {
  let curruser = props.userdata[0];
  return (
    <div>
{props ? <div>
  <Navbar userdata={curruser} />
  <div>userchats</div>
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