import React, { useEffect, useState } from "react";
import { getAdminQuotes } from "../../api";

const QuotesAdmin = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getAdminQuotes(token)
      .then(data => setQuotes(data))
      .catch(err => console.error("Error fetching quotes", err));
  }, []);

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">All Quotes</h2>
      <ul className="space-y-2">
        {quotes.map(q => (
          <li key={q.id} className="p-3 border rounded shadow-sm">
            Quote: {q.quote_amount} — {q.is_approved ? "✅ Approved" : "⏳ Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuotesAdmin;
