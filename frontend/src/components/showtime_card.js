import "../Styling/showcard.css";
// import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ShowTimeCard = ({ showtime }) => {
  const navigate = useNavigate();
  const show_time = showtime;
  console.log(show_time);

  const handleShowTimeClick = (showTime) => {
    navigate(`/seats/${showTime.show_time_id}`);
  };

  return (
    <div className="show-card" onClick={() => handleShowTimeClick(show_time)}>
      <div className="show-name">{showtime.show_name}</div>
      <div className="show-time">
        <span className="start-time">{showtime.start_time}</span> -
        <span className="end-time">{showtime.end_time}</span>
        <span className="seats"> TotalSeats : {showtime.available_seats}</span>
      </div>
    </div>
  );
};

export default ShowTimeCard;
