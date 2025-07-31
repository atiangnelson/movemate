import React, { useState } from 'react';
import { submitMoveRequest } from '../api';

const MoveRequestForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    location: '',
    date: '',
    inventory: ''
  });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await submitMoveRequest(formData, token);
    if (res.move_id) {
      setMessage('Move request submitted!');
    } else {
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="page-container">
      <h2>Request a Move</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <textarea name="inventory" placeholder="Inventory list..." value={formData.inventory} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MoveRequestForm;
