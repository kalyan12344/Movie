import React, { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";


const AddCoupon = () => {
  const [coupon_discount, setCoupon_discount] = useState("");
  const [is_expired, setIs_expired] = useState(0);
  const [coupon_name, setCoupon_name] = useState("");

  const navigate = useNavigate();
  const url = "http://localhost:8080/coupon";
  const couponSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${url}/create`, {
      coupon_name: coupon_name,
      coupon_discount: coupon_discount,
      is_expired: is_expired,
      admin_id: secureLocalStorage.getItem("admin_id"),
    }).then((response) => {
      alert("Coupon added successfully")
    });
  };

  const returnHome = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <>
   <br/>
   <br/>
   <br/>
   <br/>
    <div className="form-container">
      <form onSubmit={couponSubmit}>
      <h2>Add Coupon</h2>
      <div className="mb-3">
        <label htmlFor="c_name" className="label">
          Coupon's Name
        </label>
        <input
          type="text"
          className="input"
          value={coupon_name}
          onChange={(e) => setCoupon_name(e.target.value)}
          placeholder="The Coupon's Name"
          id="c_name"
          name="c_name"
        />
        </div>
        <div className="mb-3">
        <label htmlFor="discount" className="label">
          Coupon's Discount
        </label>
        <input
          type="text"
          className="input"
          value={coupon_discount}
          onChange={(e) => {setCoupon_discount(e.target.value)}}
          placeholder="The Coupon's Discount"
          id="discount"
          name="discount"
        />
        </div>
        <div className="mb-3 form-check"> {/* Added form-check class here */}
        <input
            type="checkbox"
            className="form-check-input"
            onChange={(e) => {setIs_expired(e.target.checked)}}
            id="is_expired"
            name="is_expired"
          />
          <label htmlFor="is_expired" className="form-check-label ml-2">
            Is Expired
          </label>
       
        </div>
        <button type="submit" className="button">
          Add the coupon
        </button>
        <button type="butoon" onClick={returnHome} className="button">
          Return Home
        </button>
      </form>
      </div>
    </>
  );
};

export default AddCoupon;
