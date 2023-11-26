import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Styling/seating.css";

const SeatsBooking = () => {
  const { showtime_id } = useParams();
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [updatedSeatData, setUpdated] = useState([]);
  const navigate = useNavigate();
  const url = "http://localhost:8080/seat/get";
  const updateUrl = "http://localhost:8080/seat/update";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    Axios.get(`${url}/${showtime_id}`)
      .then((response) => {
        console.log(response.data);
        setSeatData(response.data);
        setUpdated(response.data.filter((seat) => seat.is_selected == 0));
      })
      .catch((error) => {
        console.error("Error fetching seat data:", error);
      });
  };

  const Seat = ({ seatData, onSelectSeat }) => {
    const { seat_id, seat_name, is_selected } = seatData;
    const isSelected = selectedSeats.includes(seat_id); // Check if this seat_id is in the selectedSeats array
    const handleClick = () => {
      onSelectSeat(seatData);
      //   onSelectSeat(seat_id);
    };

    const seatStatusClass = is_selected ? "selected" : "reserved"; // Assuming is_selected=true means reserved, modify this based on your backend logic
    return (
      <div
        className={`seat ${isSelected ? "selected" : ""}`}
        onClick={handleClick}
      >
        {seat_name}
      </div>
    );
  };

  const SeatLayout = ({ seats, onSeatSelect }) => {
    const availableSeats = seats.filter((seat) => !seat.is_selected);

    return (
      <div className="seat-layout">
        {availableSeats.map((seat, index) => (
          <Seat
            key={index}
            className={`seat`}
            seatData={seat}
            onSelectSeat={onSeatSelect}
          />
        ))}
      </div>
    );
  };
  const handleSeatSelect = (selectedSeat) => {
    const updatedSeatDatanew = updatedSeatData.map((seat) =>
      seat.seat_id === selectedSeat.seat_id
        ? { ...seat, is_selected: !seat.is_selected }
        : seat
    );

    setUpdated(updatedSeatDatanew);
    console.log(updatedSeatDatanew);
    // Update the selected seats array
    const newSelectedSeats = updatedSeatDatanew.filter(
      (seat) => seat.is_selected
    );
    setSelectedSeats(newSelectedSeats);
  };
  const handleProceedToBooking = () => {
    if (selectedSeats.length > 0) {
      console.log(selectedSeats, "sec");
      // Make API call to update the backend with selected seats
      Axios.post(`http://localhost:8080/ticket/get`, {
        showtime_id,
        selectedSeats,
      }).then((response) => {
        console.log(response);
        var total_price = response.data[0].total_price;
        if (total_price == null) {
          total_price = 0;
        }
        const confirmationMessage = `For booking of the seats: ${selectedSeats
          .map((seat) => seat.seat_name)
          .join(", ")} The toal price is ${total_price} `;
        if (window.confirm(confirmationMessage)) {
          Axios.post(updateUrl, { showtime_id, selectedSeats })
            .then((response) => {
              console.log(response);
              // Handle success, e.g., navigate to the booking page
              // alert('Booking successful! Redirecting to booking page...');
            })
            .catch((error) => {
              console.error("Error updating seats:", error);
            });
          alert("Booking confirmed! Redirecting to booking page...");
          const encodedObject = encodeURIComponent(
            JSON.stringify(selectedSeats)
          );
          navigate(
            `/reservation/${showtime_id}/${total_price}/${encodedObject}`
          );
        } else {
          // If the user clicks "Cancel" in the confirmation dialog,
          // you can handle it here, for example, showing a message.
          alert("Booking canceled.");
        }
      });
    } else {
      alert("Please select at least one seat.");
    }
  };

  return (
    <div className="seatpicker">
      <h2>Seat Reservation</h2>
      <SeatLayout seats={seatData} onSeatSelect={handleSeatSelect} />
      <div>
        <h3>Selected Seats</h3>
        {selectedSeats.length > 0 ? (
          <ul>
            {selectedSeats.map((seat) => (
              <li key={seat.seat_id} className="">
                {seat.seat_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No seats selected</p>
        )}
      </div>
      <button
        onClick={handleProceedToBooking}
        disabled={selectedSeats.length === 0}
      >
        Proceed to Booking
      </button>
    </div>
  );
};

export default SeatsBooking;
