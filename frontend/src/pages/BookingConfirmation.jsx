import React, { useEffect, useState } from 'react';
import { getMyBooking } from '../api';

const BookingConfirmation = () => {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchBooking() {
      try {
        const data = await getMyBooking(token);
        setBooking(data);
      } catch (err) {
        setError("No booking found.");
      }
    }

    fetchBooking();
  }, [token]);

  return (
    <div className="page-container">
      <h2>Booking Confirmation</h2>

      {error && <p>{error}</p>}

      {booking && (
        <div className="booking-card">
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p>
            <strong>Status:</strong>{' '}
            {booking.confirmed ? (
              <span style={{ color: 'green' }}>Confirmed ✅</span>
            ) : (
              <span style={{ color: 'orange' }}>Pending ⏳</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;
