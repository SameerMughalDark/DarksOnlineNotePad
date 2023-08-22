import React from 'react'
import { useState } from 'react';
import{ useNavigate }from 'react-router-dom';

function Signup() {
    const [credentials,setCredentials]=useState({name:"",email:"",password:""})
    let navigator=useNavigate();


    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});

    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
               
            },
            body:  JSON.stringify({ name:credentials.name,email:credentials.email, password:credentials.password })
        });
        const data = await response.json();
        if(data.success===true){
          navigator('/');
          localStorage.setItem("token",data.authentication);
        //   console.log(data)
  
        }
        else{
            let err=data.errors;
          console.log("The Cause of Error:"+err[0]["msg"]);
          let errormsg=err[0]['msg'];
          alert(errormsg)
        }
      



    }
    return (
        <div className="container my-3">
                <h3>Create Your Account Here:</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} required minLength={6}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" name="password" onChange={onChange} required minLength={6}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
