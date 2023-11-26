import React, { useState, useEffect } from "react";
import Axios from "axios";
// import "../Styling/view_movies.css";
import "bootstrap/dist/css/bootstrap.min.css";

const url = "http://localhost:8080/showtime";

const ShowtimeList = () => {
  const [showtimes, setShowtime] = useState([]);
  const [movieNames, setMovieNames] = useState({});
  const arrayMovies = [];

  useEffect(() => {
    Axios.get(`${url}/movie`).then((response) => {
      setShowtime(response.data);
    });
  }, []);
  return (
    <div className="">
      <p></p>
      <p></p>
      <h2>ShowTimes</h2>
      <div className="row">
        {showtimes.map((showtime) => (
          <div key={showtime.show_time_id} className="col-md-4 mb-4">
            <div className="" style={{ height: "200px", width: "300px" }}>
              <div className="show-card">
                <div className="card-body">
                  <h5 className="card-subtitle" style={{ fontSize: "1.2rem" }}>
                    {showtime.title}
                  </h5>
                  <h5 className="card-title">{showtime.show_name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    START AT: {showtime.start_time}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    END AT: {showtime.end_time}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Total seats: {showtime.available_seats}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowtimeList;
