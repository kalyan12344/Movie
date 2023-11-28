import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "../Styling/movie_details.css";
import TheaterCard from "./theaterCard";

const TheaterInLoc = () => {
  const { loc, movieId } = useParams();
  const [theaters, setTheaters] = useState();

  useEffect(() => {
    // Fetch movie details based on movieId
    Axios.get(
      `http://localhost:8080/theater/getTheatersInLoc/${loc}/${movieId}`
    )
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Theaters</h1>
      {theaters ? (
        <div className="movie-list">
          {theaters.map((theater) => (
            <TheaterCard
              key={theater.theater_id}
              theater={theater}
              movieId={movieId}
              loc={loc}
            />
          ))}
        </div>
      ) : (
        <p>Loading Theater details...</p>
      )}
    </div>
  );
};

export default TheaterInLoc;
