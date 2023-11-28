import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Styling/view_movies_adm.css";
import { useNavigate } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

const url = "http://localhost:8080/movie";

const MovieList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  console.log(movies);
  const handleDetailsClick = (movieId) => {
    console.log(movieId);
    navigate(`/user/movieDetails/${movieId}`);
  };

  const handleEdit = (movieId) => {
    navigate(`/editMovie/${movieId}`);
  };

  useEffect(() => {
    Axios.get(`${url}/getMovies`)
      .then((response) => {
        setMovies(response.data);
      })
      .then((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <h2>Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="">
            <img
              src="https://www.svgrepo.com/show/521620/edit.svg"
              className="edit"
              onClick={() => handleEdit(movie.movie_id)}
            />

            <div className="cinema-card">
              <img src={movie.poster_url} className="" alt={movie.title} />
              <div className="cinema-details">
                <h5 className="">{movie.title}</h5>
                <button onClick={() => handleDetailsClick(movie.movie_id)}>
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
