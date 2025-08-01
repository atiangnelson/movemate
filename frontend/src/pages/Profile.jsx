import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getUserProfile(token)
      .then(data => setUser(data))
      .catch(err => console.error("Failed to load profile", err));
  }, [navigate]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="container">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
    
    </div>
  );
};

export default Profile;
