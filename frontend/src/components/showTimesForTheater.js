import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "../Styling/movie_details.css";
import ShowTimeCard from "./showtime_card";

const ShowTimesTheater = () => {
  const { loc, movieId, theaterId, theaterName } = useParams();
  const [showTime, setShowTime] = useState();
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((oldBlink) => !oldBlink);
    }, 500); // Blink every 500ms

    return () => clearInterval(blinkInterval); // Clean up on unmount
  }, []);
  const blinkingStyle = {
    opacity: blink ? 1 : 0,
    transition: "opacity 1s linear",
  };
  useEffect(() => {
    // Fetch movie details based on movieId
    Axios.get(
      `http://localhost:8080/showtime/getTheatersInLoc/${loc}/${movieId}/${theaterId}`
    )
      .then((response) => {
        setShowTime(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style={{ marginTop: "50px", justifyContent: "center" }}>
      <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
        SHOW TIMINGS at <h1 style={blinkingStyle}>{theaterName}</h1>
      </h1>
      {showTime ? (
        <div className="movie-list">
          {showTime.map((show) => (
            <ShowTimeCard
              key={show.show_time_id}
              showtime={show}
              theaterName={theaterName}
            />
          ))}
        </div>
      ) : (
        <p>Loading Theater details...</p>
      )}
    </div>
  );
};

export default ShowTimesTheater;
