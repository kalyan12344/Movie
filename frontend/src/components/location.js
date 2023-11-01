import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate } from "react-router-dom"; 

const Location=()=>{
    const [zipcode,setZipcode]=useState("");
    const [city,setcity]=useState("")
    const [state,setstate]=useState("")
    const navigate=useNavigate();
    const url="http://localhost:8080/location"
    const locationSubmit=(e)=>{
        e.preventDefault()
        Axios.post(`${url}/create`,{
            zipcode:zipcode,
            city:city,
            state:state
        }).then(response=>{
            console.log(response)
            navigate("/admin/theater")
        });
      

    }

    return(
        <>
        <form onSubmit={locationSubmit}>
            <div className='mb-3'>
        <label htmlFor="zipcode"className="form-label">Zipcodee</label>
            <input type="text" className="form-control" onChange={e=>setZipcode(e.target.value)} placeholder='Enter the zipcode' id="zipcode" name="zipcode"/>
            </div>       
            <div className='mb-3'>
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" onChange={e=>setcity(e.target.value)} placeholder='Enter the city' id="city" name="city"/>
            </div>
            <div className='mb-3'>
            <label htmlFor="state" className="form-label">State</label>
            <input type="text" className="form-control" onChange={e=>setstate(e.target.value)} placeholder='Enter the state' id="state" name="state"/>
            </div>
            <button type='submit' className="btn btn-primary">Add the location</button>
        </form>
        </>
        
    )
}

export default Location