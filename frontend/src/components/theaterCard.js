import "../Styling/theaCard.css";
// import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TheaterCard = ({ theater, movieId, loc }) => {
  const navigate = useNavigate();
  const [showTime, setShowTime] = useState();
  const theaterId = theater.theater_id;
  const theaterName = theater.theater_name;
  const [parkingDetails, setParkingDetails] = useState();

  let parkingCapacity =
    parkingDetails && parkingDetails.length > 0
      ? parkingDetails[0].capacity
      : "N/A";

  useEffect(() => {
    Axios.get(`http://localhost:8080/parking/get/${theaterId}`)
      .then((response) => {
        setParkingDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, [theaterId]);

  console.log(parkingDetails);

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
        <h6>Total Parking Slots : {parkingCapacity}</h6>
      </div>
    </div>
  );
};

export default TheaterCard;
