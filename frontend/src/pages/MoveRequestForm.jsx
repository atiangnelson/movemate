import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MoveRequestForm = () => {
  const [formData, setFormData] = useState({
    from_location: "",
    to_location: "",
    move_date: "",
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/move-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Move request submitted successfully!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Failed to submit move request.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error.");
    }
  };

  return (
    <div className="container">
      <h2>Request a Move</h2>
      <form onSubmit={handleSubmit}>
        <label>
          From:
          <input
            type="text"
            name="from_location"
            value={formData.from_location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          To:
          <input
            type="text"
            name="to_location"
            value={formData.to_location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Move Date:
          <input
            type="date"
            name="move_date"
            value={formData.move_date}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default MoveRequestForm;
