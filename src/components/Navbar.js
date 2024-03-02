import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation();
  console.log(location.pathname)
  const navigate = useNavigate()
  const handleClick =()=>{
    localStorage.setItem('token','');
    navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname ==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname ==='/about'?'active':''}`} to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname ==='/notes'?'active':''}`} to="/notes">Notes</Link>
        </li>
      </ul>
    </div>
    {
      !localStorage.getItem('token') ?<div>
         <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
         <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>:<button> </button>
    </div>:<div><button onClick={handleClick} className="btn btn-primary mx-2">LogOut</button></div>}
    </div>
</nav>
  )
}

export default Navbar
