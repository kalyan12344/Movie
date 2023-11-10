import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Styling/userdash.css";

const UserDashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState();
  const [movies, setMovies] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    // Fetch locations from the server
    Axios.get(`http://localhost:8080/location/get`).then((response) => {
      setLocations(response.data);
    });
  }, []);
  console.log(locations);
  useEffect(() => {
    // console.log(selectedLocationId);
    if (selectedLocation) {
      // Fetch movies for the selected location from the server

      Axios.post(`http://localhost:8080/userdash/get`, {
        location: selectedLocation,
      })
        .then(
          (response) => setMovies(response.data)
          // console.log(selectedLocationId)
          // console.log(response.data);
        )
        .catch((error) => console.error(error));
    } else {
      setMovies([]);
    }
  }, [selectedLocation]);
  console.log(movies);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    // window.location.reload();
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <div className="">
        <label htmlFor="location_id" className="form-label">
          Location:
        </label>
        <select
          className=""
          value={selectedLocation}
          onChange={
            handleLocationChange
            // setLocationId(e.target.value);
          }
        >
          <option value="" className="">
            Choose Location
          </option>

          {locations.map((Location) => (
            <option value={Location.city} key={Location.location_id}>
              {Location.city}
            </option>
          ))}
        </select>
      </div>

      {selectedLocation && (
        <div>
          <h3>
            Movies in {selectedLocation}
            {/* {
              locations.find((loc) => loc.location_id === selectedLocationId)
                ?.city
            } */}
          </h3>
          <div className="movie-list">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={movie.poster_url} />
                <div className="movie-details">
                  <h3>{movie.title}</h3>
                  <button>Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
