import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../Styling/EditLocation.css";

const url = "http://localhost:8080/location";

const EditLocation = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    city: "",
    state: "",
    zipcode: "",
  });

  useEffect(() => {
    Axios.get(`${url}/getLoc/${locationId}`)
      .then((response) => {
        console.log(response.data);
        setLocation(response.data);
      })
      .catch((err) => console.log(err));
  }, [locationId]);

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${url}/update/${locationId}`, location)
      .then(() => navigate("/admin/viewLocations"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="edit-location-container">
      <h2>Edit Location</h2>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={location.city}
            onChange={handleChange}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={location.state}
            onChange={handleChange}
          />
        </label>
        <label>
          Zipcode:
          <input
            type="number"
            name="zipcode"
            value={location.zipcode}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Location</button>
      </form>
    </div>
  );
};

export default EditLocation;
