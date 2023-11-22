import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const url = "http://localhost:8080/theater";

const TheaterList = () => {
  const [theaters, setTheater] = useState([]);

  useEffect(() => {
    Axios.get(`${url}/get`)
      .then((response) => {
        setTheater(response.data);
        console.log(response.data)

      })
      
  }, []);
  return (
    <div className="">
      <h2>Theaters</h2>
      <div className="movie-list">
        {theaters.map((theater) => (
          <div key={theater.theater_id} className="">
  
            <div className="movie-card" style={{ width: '300px', height: '300px' }}>
              <img
                src={theater.theater_url}
                className="card-img"
                alt={theater.theater_name}
              />
              <div className="card-body">
                <h5 className="card-title">{theater.theater_name}</h5>
                <p>{theater.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
  
};

export default TheaterList;
