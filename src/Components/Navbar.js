import React from 'react'
// Adding Link of Routes of My Web-APP with Help of create-router-dom package
import { Link } from 'react-router-dom';
import{ useNavigate }from 'react-router-dom';

export default function Navbar() {
  let navigator=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigator('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNote-Book</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/about">About-Us</Link>
          </li>
        
       
        </ul>
        
          {
          localStorage.getItem('token')?<form className="d-flex" role="search"><Link to={"/login"} className="btn btn-outline-danger" onClick={handleLogout}>Log-out</Link>  </form>:<form className="d-flex" role="search">
          <Link to={"/login"} className="btn btn-outline-success" >Login</Link>
          <Link to={"/signup"} className="btn btn-outline-success mx-3" >Sign-Up</Link>
          </form>
        }
        
      </div>
    </div>
  </nav>
  )
}
