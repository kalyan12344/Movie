import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Styling/view_movies.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const url = "http://localhost:8080/movie";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

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
            <div className="movie-card">
              <img
                src={movie.poster_url}
                className="card-img"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
