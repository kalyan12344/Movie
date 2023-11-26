import "../Styling/theaterCard.css";
// import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TheaterCard = ({ theater, movieId, loc }) => {
  const navigate = useNavigate();
  const [showTime, setShowTime] = useState();
  const theaterId = theater.theater_id;
  const theaterName = theater.theater_name;

  const handleMovieCardClick = (theater) => {
    console.log(theater, movieId, loc);
    navigate(
      `/user/showtimetheater/${loc}/${movieId}/${theaterId}/${theaterName}`
    );
  };

  return (
    <div className="theater-card" onClick={() => handleMovieCardClick(theater)}>
      <img src={theater.theater_url} alt={theater.theater_name} />

      <div className="theater-details">
        <h3>{theater.theater_name}</h3>
      </div>
    </div>
  );
};

export default TheaterCard;
