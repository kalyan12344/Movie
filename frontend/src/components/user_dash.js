import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Styling/userdash.css";
import MovieCard from "./moviecard";
import "../Styling/view_movies.css";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState();
  const [movies, setMovies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:8080/location/get`).then((response) => {
      setLocations(response.data);
    });
  }, []);
  useEffect(() => {
    if (selectedLocation) {
      Axios.post(`http://localhost:8080/userdash/get`, {
        location: selectedLocation,
      })
        .then(
          (response) => setMovies(response.data)
        )
        .catch((error) => console.error(error));
    } else {
      setMovies([]);
    }
  }, [selectedLocation]);

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
              <MovieCard
                key={movie.movie_id}
                movie={movie}
                location={selectedLocation}
              />
            ))}
          </div>
        </div>
      )}

      {selectedMovie && navigate("/movieDetails/{movie}")}
    </div>
  );
};

export default UserDashboard;
