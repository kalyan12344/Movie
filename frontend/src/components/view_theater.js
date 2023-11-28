import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Styling/view_theaters.css";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:8080/theater";

const TheaterList = () => {
  const [theaters, setTheater] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${url}/get`).then((response) => {
      setTheater(response.data);
    });
  }, []);

  const handleEdit = (theaterId) => {
    navigate(`/edit-theater/${theaterId}`);
  };

  const handleDelete = (theaterId) => {
    if (window.confirm("Are you sure you want to delete this theater?")) {
      Axios.delete(`http://localhost:8080/theater/delete/${theaterId}`)
        .then(() => {
          setTheater((prevTheaters) =>
            prevTheaters.filter((theater) => theater.theater_id !== theaterId)
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="theater-list-container">
      <h2 className="theater-list-title">Theaters</h2>
      <div className="theater-list-grid">
        {theaters.map((theater) => (
          <div key={theater.theater_id} className="theater-card">
            <img
              src={theater.theater_url}
              className="theater-card-img"
              style={{ height: "200px" }}
              alt={theater.theater_name}
            />
            <div className="theater-card-body">
              <h5 className="theater-card-title">{theater.theater_name}</h5>
              <div className="buttons">
                <button
                  style={{ background: "none" }}
                  onClick={() => handleEdit(theater.theater_id)}
                >
                  <img
                    style={{ width: "25px" }}
                    src="https://www.svgrepo.com/show/503019/edit.svg"
                  />
                </button>
                <button
                  style={{ background: "none" }}
                  onClick={() => handleDelete(theater.theater_id)}
                >
                  <img
                    style={{ width: "25px" }}
                    src="https://www.svgrepo.com/show/490950/delete.svg"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterList;
