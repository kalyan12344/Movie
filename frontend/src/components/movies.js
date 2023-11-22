import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../Styling/movies.css";
import { Link, useNavigate } from "react-router-dom";

const MoviesCard = () => {
  return (
    <div className="dashboard">
      <h2>Movies</h2>
      <div className="button-container">
        <button className="action-button">
          <Link to="/admin/addMovie" className="link-text">
            ADD MOVIE
          </Link>{" "}
        </button>
        <button className="action-button">
          <Link to="/admin/MovieList" className="link-text">
            VIEW MOVIES
          </Link>
        </button>
      </div>
    </div>
  );
};

export default MoviesCard;
