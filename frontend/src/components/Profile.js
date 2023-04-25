import React from "react";
import { useNavigate } from 'react-router-dom'
import { Button } from "react-bootstrap";

function Profile() {

  const navigate = useNavigate()

  function handleLogout(e){
    e.preventDefault()
    
    localStorage.removeItem("token")

    navigate('/')
    
  }

    return (
      <div>
        <h3>This will be your profile page</h3>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    )
    
  }
  
export default Profile;