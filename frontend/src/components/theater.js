import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../Styling/movies.css";

import { Link, useNavigate } from "react-router-dom";

const Theater = () => {
  return (
    <div className="dashboard">
      <h2>Theater</h2>
      <div className="button-container">
        <button className="action-button">
          <Link to="/admin/addTheater" className="link-text">
            ADD THEATER
          </Link>{" "}
        </button>
        <button className="action-button">
          <Link to="/admin/viewTheaters" className="link-text">
            VIEW THEATERS
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Theater;
