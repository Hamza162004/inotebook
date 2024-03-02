import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [cred,setcred] = useState({name : "",email:"",password:"",cpassword:""})
    const onchange = (e) =>{
        setcred({...cred , [e.target.name] : e.target.value})
    }
    const navigate = useNavigate();
    const HandleSubmit = async(e)=>{
      e.preventDefault();
      
      const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({name : cred.name,email : cred.email, password : cred.password})
    });
    const data = await response.json(); 
    console.log(data)
    if(data.success){
      localStorage.setItem('token',data.token);
      navigate('/');
      props.showAlert('Account created Successfully','success')
    }else{
      props.showAlert('Invalid Credentials','danger')
    }
  }
    
  return (
    <div className='container my-4'>
      <h2>Create an Account</h2>
      <form onSubmit={HandleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" onChange={onchange} value={cred.name} className="form-control" name="name" id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" onChange={onchange} value={cred.email} className="form-control" name="email" id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" onChange={onchange} value={cred.password} required minLength={8} className="form-control" name="password" id="password" />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" onChange={onchange} value={cred.cpassword} required minLength={8} className="form-control" name="cpassword" id="cpassword" />
        </div>

        <button type="submit" disabled={cred.password!==cred.cpassword } className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Signup
