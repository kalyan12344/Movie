import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../Styling/add_movies.css";
import secureLocalStorage from "react-secure-storage";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster_url, setPosterUrl] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState("");
  const [release_date, setReleaseDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [is_completed, setIsCompleted] = useState(false);
  const url = "http://localhost:8080/movie";
  const navigate = useNavigate();

  const MovieSubmit = (e) => {
    e.preventDefault();
    const movie = {
      title: title,
      description: description,
      poster_url: poster_url,
      director: director,
      duration: duration,
      release_date: release_date,
      end_date: end_date,
      is_completed: is_completed,
      admin_id: secureLocalStorage.getItem("admin_id"),
    };
    console.log("request body is here", movie);
    Axios.post(`${url}/create`, movie)
      .then((response) => {
        navigate("/admin/showtime");
      })
      .then((err) => console.log(err));
  };
  const returnHome = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <div className="form-container">
      <form onSubmit={MovieSubmit}>
        <div className="">
          <h2>ADD MOVIE</h2>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            id="title"
            name="title"
          />

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              id="description"
              name="description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="poster_url" className="form-label">
              Poster URL
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setPosterUrl(e.target.value)}
              placeholder="Enter Poster URL"
              id="poster_url"
              name="poster_url"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="director" className="form-label">
              Director
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDirector(e.target.value)}
              placeholder="Enter Director"
              id="director"
              name="director"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              Duration
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter Duration"
              id="duration"
              name="duration"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="release_date" className="form-label">
              Release Date
            </label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setReleaseDate(e.target.value)}
              id="release_date"
              name="release_date"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="end_date" className="form-label">
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setEndDate(e.target.value)}
              id="end_date"
              name="end_date"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="is_completed" className="form-check-label">
              Is Completed
            </label>
            <input
              type="checkbox"
              className="form-check-input"
              onChange={(e) => setIsCompleted(e.target.checked)}
              id="is_completed"
              name="is_completed"
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Movie
          </button>
          <button type="butoon" onClick={returnHome} className="button">
            Return Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
