import React, { useEffect, useState } from "react";
import { getBookings } from "../api";
import { getToken } from "../utils/auth";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const token = getToken();
      if (!token) {
        setError("Please log in to see your bookings.");
        setLoading(false);
        return;
      }

      const response = await getBookings(token);
      if (response.error) {
        setError(response.error);
      } else {
        setBookings(response.bookings || []);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to MoveMate</h1>

      <div className="section-title">Quick Links</div>

      <div className="card">
        <div className="card-title">Inventory Checklist</div>
        <div className="card-content">Keep track of household items to move.</div>
      </div>

      <div className="card">
        <div className="card-title">Book a Move</div>
        <div className="card-content">Schedule your move with a professional mover.</div>
      </div>

      <div className="card">
        <div className="card-title">Get a Quote</div>
        <div className="card-content">Calculate your estimated moving cost.</div>
      </div>

      <div className="section-title">Your Recent Bookings</div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <strong>{booking.item}</strong> — {booking.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
