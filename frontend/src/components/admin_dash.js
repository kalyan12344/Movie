import React from "react";
import "../Styling/admin_dash.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AdminDashboard = () => {
  let { username } = useParams();

  const categories = [
    { id: 1, title: "Movies" },
    { id: 2, title: "Locations" },
    { id: 3, title: "Coupons" },
    { id: 4, title: "Theaters" },
  ];
  const navigate = useNavigate();
  const handleCardClick = (category) => {
    switch (category) {
      case "Movies":
        console.log("MOVIES");
        navigate("/admin/movies");

        break;
      case "Locations":
        // Navigate to Locations page
        navigate("/admin/location");
        break;
      case "Coupons":
        // Navigate to Coupons page
        navigate("/admin/Coupons");
        break;
      case "Theaters":
        // Navigate to Theaters page
        navigate("/admin/theater");
        break;
      default:
        // Handle default case (if needed)
        break;
    }
  };
  return (
    <div className="admin-dashboard">
      <h2>Welcome</h2>
      <div className="card-container">
        <div className="card" onClick={() => handleCardClick("Movies")}>
          <h3>Movies</h3>
          <img
            src="https://www.svgrepo.com/show/62033/movie.svg"
            className="img"
          ></img>
        </div>
        <div className="card" onClick={() => handleCardClick("Locations")}>
          <h3>Locations</h3>
          <img
            src="https://www.svgrepo.com/show/532539/location-pin.svg"
            className="img"
          ></img>
        </div>

        <div className="card" onClick={() => handleCardClick("Theaters")}>
          <h3>Theaters</h3>
          <img
            src="https://www.svgrepo.com/show/289363/seats-cinema.svg"
            className="img"
          ></img>
        </div>
        <div className="card" onClick={() => handleCardClick("Coupons")}>
          <h3>Coupons</h3>
          <img
            src="https://www.svgrepo.com/show/530240/coupons.svg"
            className="img"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
