import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import "../Styling/reservation.css"
const Reservation = () => {
  const { showtime_id, total_price, encodedObject } = useParams();
  
  const decodedObject = JSON.parse(decodeURIComponent(encodedObject));
  const navigate = useNavigate();
  const [reserved, setReserved] = useState([]);
  const count = Object.keys(decodedObject).length
  const user_id= secureLocalStorage.getItem("user_id");
  const current_date=new Date();
  const booking_date = current_date.getDate();
      
      const total_amount=total_price;
      const num_tickets=count;
  useEffect(() => {
    // Fetch movie details based on movieId
    Axios.post(
      `http://localhost:8080/ticket/reserve`,{booking_date,total_amount,num_tickets,user_id,showtime_id,decodedObject})
      .then((response) => {
        setReserved(response.data);
        console.log(response.data,"reserved")
      })
      .catch((error) => console.error(error));
}, []);

return (
    <div>
      <div className="reservation-container">
        <h2>Your Reserved Ticket</h2>
        <div className="movie-list">
          {reserved.map((reserve) => (
            <div key={reserve.reservation_id} className="movie-card">
              <div className="card-body">
              <div className="info-item">
                  <span className="label">Booked:</span>
                  <span className="value">{reserve.booking_date}</span>
                </div>
                <div className="info-item">
                  <span className="label">Movie:</span>
                  <span className="value">{reserve.title}</span>
                </div>
                <div className="info-item">
                  <span className="label">Theater:</span>
                  <span className="value">{reserve.theater_name}</span>
                </div>
                <div className="info-item">
                  <span className="label">City:</span>
                  <span className="value">{reserve.city}</span>
                </div>
                <div className="info-item">
                  <span className="label">Show at:</span>
                  <span className="value">{reserve.show_name}</span>
                </div>
                <div className="info-item">
                  <span className="label">Tickets booked:</span>
                  <span className="value">{reserve.num_tickets}</span>
                </div>
                <div className="info-item">
                  <span className="label">Total amount:</span>
                  <span className="value">{reserve.total_amount}</span>
                </div>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
  
};

export default Reservation;
