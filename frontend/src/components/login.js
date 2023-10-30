import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; 

const Login=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("")
    const url="http://localhost:8080/user"
    const loginSubmit=(e)=>{
        e.preventDefault()
        Axios.post(`${url}/login`,{
            username:username,
            password:password,
        }).then(response=>{
            console.log(response)
        });
      

    }

    return(
        <>
        <form onSubmit={loginSubmit}>
            <div className='mb-3'>
        <label htmlFor="username"className="form-label">User Name</label>
            <input type="text" className="form-control" onChange={e=>setUsername(e.target.value)} placeholder='your username' id="username" name="username"/>
            </div>       
            <div className='mb-3'>
            <label htmlFor="password" className="form-label">password</label>
            <input type="password" className="form-control" onChange={e=>setPassword(e.target.value)} placeholder='your password' id="password" name="password"/>
            </div>
            <button type='submit' className="btn btn-primary">Log In</button>
            <button type='button' className='btn btn-primary' ><Link to="/register">Sign Up</Link> </button>

        </form>
        </>
        
    )
}

export default Login