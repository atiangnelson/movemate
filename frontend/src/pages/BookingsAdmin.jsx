import React, { useEffect, useState } from "react";
import { getAdminBookings } from "../../api";

const BookingsAdmin = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getAdminBookings(token)
      .then(data => setBookings(data))
      .catch(err => console.error("Error fetching bookings", err));
  }, []);

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      <ul className="space-y-2">
        {bookings.map(b => (
          <li key={b.id} className="p-3 border rounded shadow-sm">
            Booking #{b.id} — Date: {b.date} @ {b.time} {b.confirmed ? "confirmed" : "waiting"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsAdmin;
