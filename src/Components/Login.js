import React from 'react'
import { useState } from 'react';
import{ useNavigate }from 'react-router-dom';

export default function Login() {
  const [credentials ,setCredentials]=useState({email:"",password:""})
let navigator=useNavigate();
  const onSubmit=async(e)=>{
    e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: "post",
          headers: {
              "Content-Type": "application/json",
             
          },
          body:  JSON.stringify({ email:credentials.email, password:credentials.password })
      });
      const data = await response.json();
      if(data.success===true){
        navigator('/');
        localStorage.setItem("token",data.authentication);
        // console.log(data)

      }
      else{
        console.log("The Cause of Error:"+data.error);
      }
    
  }
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]:e.target.value})

  }
  return (
    <div className="container my-3">
        <h3>Please Put Your  E-Mail and Password to Login:</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" className="form-control" id="Password" name="password" onChange={onChange}  value={credentials.password}/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
