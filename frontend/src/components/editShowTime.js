import React, { useEffect, useState } from "react";
import Axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useParams, useNavigate } from "react-router-dom";
import "../Styling/editST.css";

const EditShowtime = () => {
  const { showId } = useParams();
  const [showtimeData, setShowtimeData] = useState({
    show_name: "",
    start_time: "",
    end_time: "",
    available_seats: 0,
    theater_id: 0,
    movie_id: 0,
  });
  const [theaterList, setTheaterList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const showtimeUrl = `http://localhost:8080/showtime/${showId}`;
  const theaterUrl = "http://localhost:8080/theater";
  const movieUrl = "http://localhost:8080/movie";

  useEffect(() => {
    Axios.get(theaterUrl + "/get").then((response) => {
      setTheaterList(response.data);
    });
    Axios.get(movieUrl + "/getMovies").then((response) => {
      setMovieList(response.data);
    });
    Axios.get(showtimeUrl).then((response) => {
      setShowtimeData(response.data);
    });
  }, [showtimeId, theaterUrl, movieUrl, showtimeUrl]);

  const handleChange = (e) => {
    setShowtimeData({ ...showtimeData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    Axios.put(showtimeUrl, {
      ...showtimeData,
      admin_id: secureLocalStorage.getItem("admin_id"),
    })
      .then(() => navigate("/admin/ShowtimeList"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="st_container">
      <h2 className="st-title">Edit Showtime</h2>
      <form onSubmit={handleEditSubmit} className="st-form">
        <div className="">
          <label htmlFor="show_name" className="form-label">
            Show Name
          </label>
          <input
            type="text"
            className="form-control"
            value={showtimeData.show_name}
            onChange={handleChange}
            id="show_name"
            name="show_name"
            required
          />
        </div>

        <div className="">
          <label htmlFor="start_time" className="form-label">
            Start Time
          </label>
          <input
            type="time"
            className="form-control"
            value={showtimeData.start_time}
            onChange={handleChange}
            id="start_time"
            name="start_time"
          />
        </div>

        <div className="">
          <label htmlFor="end_time" className="form-label">
            End Time
          </label>
          <input
            type="time"
            className="form-control"
            value={showtimeData.end_time}
            onChange={handleChange}
            id="end_time"
            name="end_time"
          />
        </div>

        <div className="">
          <label htmlFor="available_seats" className="form-label">
            Available Seats
          </label>
          <input
            type="number"
            className="form-control"
            value={showtimeData.available_seats}
            onChange={handleChange}
            id="available_seats"
            name="available_seats"
          />
        </div>

        <div className="">
          <label htmlFor="theater_id" className="form-label">
            Theater
          </label>
          <select
            className="form-control"
            value={showtimeData.theater_id}
            onChange={handleChange}
            id="theater_id"
            name="theater_id"
          >
            <option value="">Choose Theater</option>
            {theaterList.map((theater) => (
              <option key={theater.theater_id} value={theater.theater_id}>
                {theater.theater_name}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <label htmlFor="movie_id" className="form-label">
            Movie
          </label>
          <select
            className="form-control"
            value={showtimeData.movie_id}
            onChange={handleChange}
            id="movie_id"
            name="movie_id"
          >
            <option value="">Choose Movie</option>
            {movieList.map((movie) => (
              <option key={movie.movie_id} value={movie.movie_id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-st">
          Update Showtime
        </button>
      </form>
    </div>
  );
};

export default EditShowtime;
