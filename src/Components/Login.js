import React from 'react'

export default function Login() {
  return (
    <div className="container">

    <form>
  <div className="mb-3">
    <label htmlFor="loginEmail" className="form-label">Email address</label>
    <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="loginPassword" className="form-label">Password</label>
    <input type="password" className="form-control" id="loginPassword"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
