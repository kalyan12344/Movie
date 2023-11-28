import React, { useEffect, useState } from "react";
import Axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useParams, useNavigate } from "react-router-dom";
import "../Styling/edit_theater.css"; // Make sure the path is correct

const EditTheater = () => {
  const [theaterData, setTheaterData] = useState({
    theater_name: "",
    description: "",
    theater_url: "",
    location_id: "",
  });
  const [locations, setLocations] = useState([]);
  const { theaterId } = useParams();
  const navigate = useNavigate();
  const theaterUrl = `http://localhost:8080/theater/${theaterId}`;
  const updateTheater = `http://localhost:8080/theater/update/${theaterId}`;
  const locUrl = "http://localhost:8080/location";

  useEffect(() => {
    Axios.get(`${locUrl}/get`).then((response) => {
      setLocations(response.data);
    });

    Axios.get(theaterUrl).then((response) => {
      setTheaterData(response.data);
    });
  }, [theaterId, locUrl, theaterUrl]);

  const handleChange = (e) => {
    setTheaterData({ ...theaterData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    Axios.post(updateTheater, {
      ...theaterData,
      admin_id: secureLocalStorage.getItem("admin_id"),
    })
      .then(() => navigate("/admin/viewTheaters")) // Adjust the route as needed
      .catch((err) => console.log(err));
  };

  return (
    <div className="edit-theater-container">
      <h2>Edit Theater</h2>
      <form onSubmit={handleEditSubmit} className="edit-theater-form">
        <div className="">
          <label htmlFor="theater_name">Theater Name</label>
          <input
            type="text"
            className="form-control"
            id="theater_name"
            name="theater_name"
            value={theaterData.theater_name}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={theaterData.description}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <label htmlFor="theater_url">Theater Picture URL</label>
          <input
            type="text"
            className="form-control"
            id="theater_url"
            name="theater_url"
            value={theaterData.theater_url}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <label htmlFor="location_id">Location</label>
          <select
            className="form-control"
            id="location_id"
            name="location_id"
            value={theaterData.location_id}
            onChange={handleChange}
          >
            <option value="">Select a Location</option>
            {locations.map((location) => (
              <option key={location.location_id} value={location.location_id}>
                {location.city}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-edit-theater">
          Update Theater
        </button>
      </form>
    </div>
  );
};

export default EditTheater;
