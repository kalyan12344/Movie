import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../Styling/editMovie.css";

const EditMovie = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    poster_url: "",
    description: "",
    director: "",
    duration: "",
    release_date: "",
    end_date: "",
    is_completed: false,
  });

  useEffect(() => {
    Axios.get(`http://localhost:8080/movie/${movieId}`)
      .then((response) => {
        const data = response.data;
        data.release_date = formatDate(data.release_date);
        data.end_date = formatDate(data.end_date);
        setMovieDetails(response.data);
      })
      .catch((err) => console.log(err));
  }, [movieId]);


  const handleChange = (event) => {
    setMovieDetails({
      ...movieDetails,
      [event.target.name]: event.target.value,
    });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.put(`http://localhost:8080/movie/${movieId}`, movieDetails)
      .then(() => {
        navigate("/admin/MovieList");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="edit-movie-container">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            className="form-input"
            value={movieDetails.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Poster URL:
          <input
            type="text"
            name="poster_url"
            className="form-input"
            value={movieDetails.poster_url}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            className="form-textarea"
            value={movieDetails.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Director:
          <input
            type="text"
            name="director"
            className="form-input"
            value={movieDetails.director}
            onChange={handleChange}
          />
        </label>
        <label>
          Duration:
          <input
            type="text"
            name="duration"
            className="form-input"
            value={movieDetails.duration}
            onChange={handleChange}
          />
        </label>
        <label>
          Release Date:
          <input
            type="date"
            name="release_date"
            className="form-input"
            value={movieDetails.release_date}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="end_date"
            className="form-input"
            value={movieDetails.end_date}
            onChange={handleChange}
          />
        </label>
        <label>
          Is Completed:
          <input
            type="checkbox"
            name="is_completed"
            className="form-checkbox"
            checked={movieDetails.is_completed}
            onChange={() =>
              setMovieDetails({
                ...movieDetails,
                is_completed: !movieDetails.is_completed,
              })
            }
          />
        </label>
        <button type="submit" className="form-button">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
