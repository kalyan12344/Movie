import React from "react";
import "../Styling/view_movies.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleDetailsClick = (movieId) => {
    console.log(movieId);
    navigate(`/user/movieDetails/${movie.movie_id}`);
  };

  return (
    <div className="movie-card">
      <img src={movie.poster_url} alt={movie.title} />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <button onClick={() => handleDetailsClick(movie.movie_id)}>
          Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
