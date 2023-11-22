import React from "react";
import "../Styling/view_movies.css";
import { useNavigate } from "react-router-dom";

const TheaterCard = ({ theater }) => {
  const navigate = useNavigate();
  const handleMovieCardClick = (theater) => {
console.log(theater.show_time_id,"log")
    navigate(`/seats/${theater.show_time_id}`)
  };

  return (
    <div className="movie-card" style={{ height: "300px", width: "300px" }} onClick={() => handleMovieCardClick(theater)}>
      <img src={theater.theater_url} alt={theater.theater_name} />
      <div className="card-body">
        <h6 className="card-title">{theater.title} </h6>
        <p className="card-subtitle">Show At - {theater.start_time}({theater.show_name})</p>
        <p className="card-subtitle">Available seats -  {theater.available_seats}</p>
      </div>
      <div className="movie-details">

        <h3>{theater.theater_name}</h3>
      </div>
    </div>
  );
};

export default TheaterCard;
