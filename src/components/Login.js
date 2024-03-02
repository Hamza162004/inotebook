import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [cred,setcred] = useState({email:"",password:""})
    const onchange = (e) =>{
        setcred({...cred , [e.target.name] : e.target.value})
    }
    const navigate = useNavigate();

    const HandleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({email : cred.email, password : cred.password})
      });
      const data = await response.json(); 
      if(data.success){
        localStorage.setItem('token', data.token);
        props.showAlert('Logged In Successfully','success')
        navigate('/');
      }
      else{
        props.showAlert('Invalid Credentials','danger')
      }
    }

    return (
        <div className='container my-4'>
            <h2>Login To InoteBook</h2>
            <form onSubmit={HandleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={onchange} value={cred.email} className="form-control" name="email" id="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={onchange} value={cred.password} className="form-control" name="password" id="password"/>
                </div>
               
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
