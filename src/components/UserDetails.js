import React, { useState } from 'react'

const userDetails = () => {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const userDetails= async()=>{
        const response = await fetch(`http://localhost/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setName(json.name)
        setEmail(json.email)
    }
    userDetails();
  return (
    <div className='container'>
      <h1 className='my-5'>Profile</h1>
      <span className="fs-5 fw-bolder">Name:&nbsp;&nbsp;</span><span className='fs-3 fw-bold'>{name}</span>
      <div className='my-3'></div>
      <span className="fs-5 fw-bolder">Email:&nbsp;&nbsp;</span><span className='fs-3 fw-bold'>{email}</span>
    </div>
  )
}

export default userDetails
