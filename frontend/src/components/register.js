import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const Register=()=>{
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [mobile_no,setMobileno]=useState("")
    const [age,setAge]=useState(0)
    const url="http://localhost:8080/user"
    const handleSubmit=(e)=>{
        e.preventDefault()
        Axios.post(`${url}/register`,{
            username:username,
            email:email,
            password:password,
            mobile_no:mobile_no,
            age:age
        }).then(response=>{
            console.log(response)
        });
      

    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
        <label htmlFor="username"className="form-label">User Name</label>
            <input type="text" className="form-control" onChange={e=>setUsername(e.target.value)} placeholder='your username' id="username" name="username"/>
            </div>       
            <div className='mb-3'>     
            <label htmlFor="email" className="form-label">email</label>
            <input type="email" className="form-control" onChange={e=>setEmail(e.target.value)} placeholder='your email' id="email" name="email"/>
            </div>
            <div className='mb-3'>
            <label htmlFor="password" className="form-label">password</label>
            <input type="password" className="form-control" onChange={e=>setPassword(e.target.value)} placeholder='your password' id="password" name="password"/>
            </div>
            <div className='mb-3'>
            <label htmlFor="mobile_no" className="form-label">Mobile No</label>
            <input type="text" className="form-control" onChange={e=>setMobileno(e.target.value)} placeholder='your mobileno.' id="mobile" name="mobile"/>
            </div>
            <div className='mb-3'>
            <label htmlFor="age" className="form-label">Age</label>
            <input type="number" className="form-control" onChange={e=>setAge(e.target.value)} placeholder='your age' id="age" name="age"/>
            </div>
            <button type='button' className="btn btn-primary">Register</button>

        </form>
        </>
        
    )
}

export default Register