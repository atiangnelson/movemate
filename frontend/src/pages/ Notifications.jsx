import React, { useEffect, useState } from 'react';
import { getNotifications } from '../api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const data = await getNotifications(token);
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    }

    fetchNotifications();
  }, [token]);

  return (
    <div className="page-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map(notif => (
            <li key={notif.id}>
              <strong>{notif.message}</strong> <br />
              <small>{notif.timestamp}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
