import React from "react";
import "../Styling/view_movies.css";
import { useNavigate } from "react-router-dom";

const TheaterCard = ({ theater }) => {
  const navigate = useNavigate();
  //   const handleDetailsClick = (movieId) => {
  //     console.log(movieId);
  //     // navigate(`/user/movieDetails/${movie.movie_id}`);
  //   };

  return (
    <div className="movie-card">
      <img src={theater.theater_url} alt={theater.theater_name} />
      <div className="movie-details">
        <h3>{theater.theater_name}</h3>
      </div>
    </div>
  );
};

export default TheaterCard;
