import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";              
import { setToken } from "../utils/auth";    

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await login(email, password);

    if (response.token) {
      setToken(response.token);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      setError(response.message || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
