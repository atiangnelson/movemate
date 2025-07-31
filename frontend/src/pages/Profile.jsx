import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../api';

const Profile = () => {
  const [profile, setProfile] = useState({ full_name: "", email: "" });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile(token);
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile, token);
      setMessage(" Profile updated successfully");
    } catch (err) {
      console.error(err);
      setMessage(" Error updating profile");
    }
  };

  return (
    <div className='page-container'>
      <h2>My Profile</h2>

      <form onSubmit={handleSubmit} className='form'>
        <label>
          Full Name:
          <input
            type="text"
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Save Changes</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
