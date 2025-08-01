import React, { useEffect, useState } from "react";
import { getApprovedQuote, bookMove } from "../api";
import { useNavigate } from "react-router-dom";

const BookMove = () => {
  const [quote, setQuote] = useState(null);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getApprovedQuote(token)
      .then(data => setQuote(data))
      .catch(err => console.error("Failed to fetch approved quote", err));
  }, [navigate]);

  const handleBook = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await bookMove({ quote_id: quote.id, move_date: date }, token);
      setMessage("Booking confirmed for " + res.move_date);
    } catch (err) {
      console.error("Booking failed", err);
      setMessage("Booking failed. Please try again.");
    }
  };

  if (!quote) return <p>Loading approved quote...</p>;

  return (
    <div className="container">
      <h2>Book Your Move</h2>
      <p><strong>Quote Amount:</strong> KES {quote.amount}</p>

      <form onSubmit={handleBook}>
        <label>Select a date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Confirm Booking</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default BookMove;
