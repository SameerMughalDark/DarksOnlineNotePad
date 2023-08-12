import React from 'react'

export default function Login() {
  return (
    <div className="container">

    <form>
  <div class="mb-3">
    <label for="loginEmail" class="form-label">Email address</label>
    <input type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="loginPassword" class="form-label">Password</label>
    <input type="password" class="form-control" id="loginPassword"/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
