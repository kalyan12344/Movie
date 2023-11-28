import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../Styling/navbar.css";
import secureLocalStorage from "react-secure-storage";

const Navbar = () => {
  const [logged, SetLogged] = useState(0);

  useEffect(() => {
    if (
      secureLocalStorage.getItem("admin_id") ||
      secureLocalStorage.getItem("user_id")
    ) {
      SetLogged(1);
    } else {
      SetLogged(0);
    }
  }, [logged]);
  const handleLogout = (e) => {
    // e.preventDefault();
    if (secureLocalStorage.getItem("admin_id")) {
      secureLocalStorage.removeItem("admin_id");
    } else {
      secureLocalStorage.removeItem("user_id");
    }
    SetLogged(0);
  };
  return logged ? (
    <nav className="custom-navbar">
      <div className="nav-container">
        <Link className="nav-item logout-link" to="/" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </nav>
  ) : null;
};

export default Navbar;
