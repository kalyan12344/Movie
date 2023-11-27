import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../Styling/movies.css";

import { Link, useNavigate } from "react-router-dom";

const Coupon = () => {
  return (
    <div className="dashboard">
      <h2>Coupons</h2>
      <div className="button-container">
        <button className="action-button">
          <Link to="/admin/addCoupon" className="link-text">
            ADD COUPON
          </Link>{" "}
        </button>
        <button className="action-button">
          <Link to="/admin/viewCoupon" className="link-text">
            VIEW COUPON
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Coupon;
