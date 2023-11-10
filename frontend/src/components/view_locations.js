import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Styling/view_movies.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const url = "http://localhost:8080/location";

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    Axios.get(`${url}/get`)
      .then((response) => {
        setLocations(response.data);
      })
      .then((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <h2>Locations</h2>
      <div className="movie-list">
        {locations.map((location) => (
          <div key={location.location_id} className="">
            <div className="movie-card">
              <div className="card-body">
                <h5 className="card-title">{location.city}</h5>
                <h5 className="card-title">{location.state}</h5>
                <h5 className="card-title">{location.zipcode}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
