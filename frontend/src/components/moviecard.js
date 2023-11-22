import React from "react";
import "../Styling/view_movies.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleDetailsClick = (movieId) => {
    console.log(movieId);
    navigate(`/user/movieDetails/${movie.movie_id}`);
  };
  const handleCardClick = () => {
    // You can add additional logic here if needed
    console.log(`Clicked on ${movie.title}`);
    navigate(`/user/movieDetails/${movie.movie_id}`);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
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
