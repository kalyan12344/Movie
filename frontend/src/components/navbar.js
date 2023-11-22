import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import secureLocalStorage from "react-secure-storage";

const Navbar = () => {
   const [logged,SetLogged]=useState(0);
   
   useEffect(() => {
    if (secureLocalStorage.getItem("admin_id") || secureLocalStorage.getItem("user_id")) {
        SetLogged(1);
    } else {
        SetLogged(0);
    }
}, [logged]);
    const handleLogout = (e) => {
        // e.preventDefault();
        console.log('Logout clicked');
        if (secureLocalStorage.getItem("admin_id")) {
            secureLocalStorage.removeItem("admin_id");
        }
        else {
            secureLocalStorage.removeItem("user_id")
        }
        SetLogged(0)

    };

    return (
        <nav className="navbar fixed-top navbar-light bg-primary">
            <div className="container-fluid">
                {logged ?
                    (<><Link className="nav-link" to="/" onClick={handleLogout} style={{ color: 'white' }}>
                        Logout
                    </Link></>)
                    : (<><Link className="nav-link" to="/"  style={{ color: 'white' }}>
                        Login
                    </Link>
                        <Link className="nav-link" to="/register" style={{ color: 'white' }}>
                            Register
                        </Link></>)
                }

            </div>


        </nav>

    );
};

export default Navbar;
