import React, { useEffect, useState } from "react";
import { getUserQuotes, bookMove } from "../api";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [approvedQuote, setApprovedQuote] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getUserQuotes(token)
      .then(data => {
        const approved = data.find(q => q.status === "approved");
        setApprovedQuote(approved || null);
      })
      .catch(err => console.error("Failed to load quotes", err));
  }, [navigate]);

  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!approvedQuote) return;

    bookMove(approvedQuote.id, { date, time }, token)
      .then(() => {
        setMessage("Booking successful!");
        setDate("");
        setTime("");
      })
      .catch(() => setMessage("Booking failed. Try again."));
  };

  if (!approvedQuote) {
    return <div className="container"><p>No approved quote found.</p></div>;
  }

  return (
    <div className="container">
      <h2>Book Your Move</h2>
      <p><strong>Quote Amount:</strong> {approvedQuote.amount}</p>
      <div>
        <label>Date:</label><br />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div>
        <label>Time:</label><br />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      </div>
      <button onClick={handleBooking}>Confirm Booking</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Booking;
