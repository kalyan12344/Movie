import React from "react";
import "../Styling/view_movies.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, location }) => {
  const navigate = useNavigate();
  const loc = location;
  console.log(movie, loc);
  const handleDetailsClick = (movieId) => {
    console.log(movieId);
    navigate(`/user/movieDetails/${movie.movie_id}`);
  };
  const handleMovieCardClick = () => {
    console.log(loc, movie.movie_id);
    navigate(`/user/theaters/${loc}/${movie.movie_id}`);
  };

  return (
    <div className="cinema-card">
      <img
        src={movie.poster_url}
        alt={movie.title}
        onClick={() => handleMovieCardClick(loc, movie.movie_id)}
      />
      <div className="cinema-details">
        <h3>{movie.title}</h3>
        <button onClick={() => handleDetailsClick()}>Details</button>
      </div>
    </div>
  );
};

export default MovieCard;
