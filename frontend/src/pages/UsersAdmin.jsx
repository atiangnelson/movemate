import React, { useEffect, useState } from "react";
import { getAdminUsers } from "../../api";
import { useNavigate } from "react-router-dom";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getAdminUsers(token)
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users", err));
  }, [navigate]);

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="p-3 border rounded shadow-sm">
            <strong>{user.name}</strong> - {user.email} {user.is_admin && "(Admin)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersAdmin;
