import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../Styling/movies.css";

import { Link, useNavigate } from "react-router-dom";

const Showtime = () => {
  return (
    <div className="dashboard">
      <h2>Showtime</h2>
      <div className="button-container">
        <button className="action-button">
          <Link to="/admin/AddShowtime" className="link-text">
            ADD SHOWTIMES
          </Link>{" "}
        </button>
        <button className="action-button">
          <Link to="/admin/ShowtimeList" className="link-text">
            VIEW SHOWTIMES
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Showtime;
