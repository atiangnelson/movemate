import React, { useEffect, useState } from "react";
import { getUserQuotes, approveQuote } from "../api";
import { useNavigate } from "react-router-dom";

const QuoteApproval = () => {
  const [quotes, setQuotes] = useState([]);
  const [approvedId, setApprovedId] = useState(null);
  const navigate = useNavigate();

  const fetchQuotes = () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getUserQuotes(token)
      .then(data => setQuotes(data))
      .catch(err => console.error("Failed to fetch quotes", err));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleApprove = (quoteId) => {
    const token = localStorage.getItem("token");
    approveQuote(quoteId, token)
      .then(() => {
        setApprovedId(quoteId);
        fetchQuotes(); // refresh
      })
      .catch(err => console.error("Failed to approve quote", err));
  };

  return (
    <div className="container">
      <h2>Your Quotes</h2>
      {quotes.length === 0 ? (
        <p>No quotes available.</p>
      ) : (
        quotes.map((quote) => (
          <div key={quote.id} className="quote-card">
            <p><strong>Amount:</strong> {quote.amount}</p>
            <p><strong>Status:</strong> {quote.status}</p>
            <button
              disabled={quote.status === "approved" || quote.id === approvedId}
              onClick={() => handleApprove(quote.id)}
            >
              {quote.status === "approved" || quote.id === approvedId ? "Approved" : "Approve Quote"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default QuoteApproval;
