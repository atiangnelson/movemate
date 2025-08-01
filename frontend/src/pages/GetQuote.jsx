import React, { useState } from "react";
import { calculateQuote } from "../api";
import { useNavigate } from "react-router-dom";

const GetQuote = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    if (!origin || !destination) {
      setError("Please enter both origin and destination.");
      return;
    }

    try {
      const data = await calculateQuote({ origin, destination }, token);
      setQuote(data.amount);
      setError("");
    } catch (err) {
      console.error("Failed to calculate quote", err);
      setError("Failed to fetch quote. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Get a Moving Quote</h2>
      <form onSubmit={handleSubmit} className="quote-form">
        <div>
          <label>Origin:</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter pickup address"
          />
        </div>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination address"
          />
        </div>
        <button type="submit">Get Quote</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {quote && (
        <div className="quote-result">
          <h3>Estimated Quote:</h3>
          <p>KES {quote}</p>
        </div>
      )}
    </div>
  );
};

export default GetQuote;
