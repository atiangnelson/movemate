import React, { useEffect, useState } from 'react';
import { getAllMoveRequests, getAllAdminQuotes, getAllBookings } from '../api';

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const [moveData, quoteData, bookingData] = await Promise.all([
          getAllMoveRequests(token),
          getAllAdminQuotes(token),
          getAllBookings(token),
        ]);
        setRequests(moveData);
        setQuotes(quoteData);
        setBookings(bookingData);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    }

    fetchData();
  }, [token]);

  return (
    <div className='page-container'>
      <h2>Admin Panel</h2>
      <p>Manage all move requests, quotes and bookings.</p>

      <section>
        <h3>Move Requests</h3>
        <ul>
          {requests.map(req => (
            <li key={req.id}>
              {req.full_name} — {req.location} — {req.date}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Quotes</h3>
        <ul>
          {quotes.map(quote => (
            <li key={quote.id}>
              User {quote.user_id} — Ksh {quote.quote_amount} — {quote.is_approved ? "✅ Approved" : "❌ Pending"}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Bookings</h3>
        <ul>
          {bookings.map(book => (
            <li key={book.id}>
              Booking #{book.id} — {book.status} — {book.date}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
