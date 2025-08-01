import React, { useEffect, useState } from "react";
import { getAdminMoveRequests } from "../../api";

const MoveRequestsAdmin = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getAdminMoveRequests(token)
      .then(data => setRequests(data))
      .catch(err => console.error("Error fetching move requests", err));
  }, []);

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">All Move Requests</h2>
      <ul className="space-y-2">
        {requests.map(r => (
          <li key={r.id} className="p-3 border rounded shadow-sm">
            {r.from} → {r.to} on {r.move_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoveRequestsAdmin;
