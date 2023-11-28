import "../Styling/showcard.css";
// import { useNavigate } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

const ShowTimeCard = ({ showtime }) => {
  const navigate = useNavigate();
  const show_time = showtime;

  const handleShowTimeClick = (showTime) => {
    navigate(`/seats/${showTime.show_time_id}/${showTime.available_seats}`);
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
