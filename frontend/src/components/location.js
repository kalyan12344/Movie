import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../Styling/movies.css";

import { Link, useNavigate } from "react-router-dom";

const Location = () => {
  return (
    <div className="dashboard">
      <h2>Location</h2>
      <div className="button-container">
        <button className="action-button">
          <Link to="/admin/addLocation" className="link-text">
            ADD LOCATION
          </Link>{" "}
        </button>
        <button className="action-button">
          <Link to="/admin/viewLocations" className="link-text">
            VIEW LOCATIONS
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Location;
