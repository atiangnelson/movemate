import { useEffect, useState } from "react";
import { getQuoteByUser, approveQuoteById } from "../api";
import { getUserIdFromToken } from "../utils/auth"; 

function QuoteApproval() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState(false);
  const [error, setError] = useState(null);

  const userId = getUserIdFromToken();

  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    getQuoteByUser(userId)
      .then((data) => {
        setQuote(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load quote.");
        setLoading(false);
      });
  }, [userId]);

  const handleApprove = () => {
    if (!quote?.id) {
      setError("No quote to approve.");
      return;
    }

    approveQuoteById(quote.id)
      .then(() => setApproved(true))
      .catch(() => setError("Could not approve quote. Please try again."));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (approved) return <p className="success">Quote approved successfully!</p>;

  return (
    <div className="page-container">
      <h2>Quote Approval</h2>
      <p>Estimated Cost: Ksh {quote?.estimated_cost}</p>
      <button className="button-primary" onClick={handleApprove}>
        Approve Quote
      </button>
    </div>
  );
}

export default QuoteApproval;
