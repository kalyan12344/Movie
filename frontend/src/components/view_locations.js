import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Styling/view_location.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:8080/location";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${url}/get`)
      .then((response) => {
        setLocations(response.data);
      })
      .then((err) => console.log(err));
  }, []);

  const handleEdit = (locationId) => {
    console.log(locationId);
    navigate(`/edit-location/${locationId}`);
  };

  const handleDelete = (locationId) => {
    Axios.delete(`${url}/delete-location/${locationId}`)
      .then(() => {
        setLocations(
          locations.filter((location) => location.location_id !== locationId)
        );
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="location-list-container">
      <h2>Locations</h2>
      <div className="location-list">
        {locations.map((location) => (
          <div key={location.location_id} className="location-card">
            <div className="card-body">
              <h5 className="card-title">{location.city}</h5>
              <h5 className="card-title">{location.state}</h5>
              <h5 className="card-title">{location.zipcode}</h5>
            </div>
            <div className="buttons">
              <button
                style={{ background: "none" }}
                onClick={() => handleEdit(location.location_id)}
              >
                <img
                  style={{ width: "25px" }}
                  src="https://www.svgrepo.com/show/503019/edit.svg"
                />
              </button>
              <button
                style={{ background: "none" }}
                onClick={() => handleDelete(location.location_id)}
              >
                <img
                  style={{ width: "25px" }}
                  src="https://www.svgrepo.com/show/490950/delete.svg"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
