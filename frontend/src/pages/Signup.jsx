import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password });
      setMessage("Signup successful! You can now log in.");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/login"), 2000); // redirect after 2s
    } catch (err) {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
