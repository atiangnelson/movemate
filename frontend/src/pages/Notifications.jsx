import React, { useEffect, useState } from "react";
import { getNotifications } from "../api";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const fetchNotifications = () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getNotifications(token)
      .then(data => setNotifications(data.notifications || []))
      .catch(err => console.error("Failed to fetch notifications", err));
  };

  useEffect(() => {
    fetchNotifications(); // initial fetch

    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000); // fetch every 10 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul>
          {notifications.map((note, index) => (
            <li key={index}>
              <strong>{note.title}</strong>: {note.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
