import React, { useEffect, useState } from "react";
import { getUserProfile, getUserQuotes, getUserBookings } from "../api";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [profile, setProfile] = useState({});
  const [quotes, setQuotes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getUserProfile(token).then(setProfile);
    getUserQuotes(token).then(setQuotes);
    getUserBookings(token).then(setBookings);
  }, [navigate]);

  return (
    <div className="container">
      <h2>Welcome, {profile.name}</h2>

      <section>
        <h3>Profile</h3>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
      </section>

      <section>
        <h3>Your Bookings</h3>
        {bookings.length === 0 ? <p>No bookings yet.</p> : (
          <ul>
            {bookings.map(b => (
              <li key={b.id}>{b.date} - {b.status}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Your Quotes</h3>
        {quotes.length === 0 ? <p>No quotes yet.</p> : (
          <ul>
            {quotes.map(q => (
              <li key={q.id}>Ksh {q.amount} - {q.status}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
