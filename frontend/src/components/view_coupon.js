import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const url = "http://localhost:8080/coupon";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    Axios.get(`${url}/get/user`)
      .then((response) => {
        setCoupons(response.data);
      })
      .then((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <h2>Coupons</h2>
      <div className="movie-list">
        {coupons.map((coupon) => (
          <div key={coupon.coupon_id} className="">
            <div className="movie-card">
              <div className="card-body">
                <h5 className="card-title">{coupon.coupon_name}</h5>
                <p className="card-subtitle  mb-2"> {coupon.coupon_discount}% of discount</p>
                <h6 className="card-title">This coupon is assigned To:-</h6>

                <div className="usernames">
                {coupon.usernames
                  .replace(/[\[\]"]/g, ' ') // Remove square brackets and double quotation marks
                  .split(/,\s*|\s+/)
                  .map((username, index) => (
                    <div key={index} className="username">{username.trim()}</div>
                ))}
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponList;
