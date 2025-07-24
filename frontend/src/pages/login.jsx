import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  };

  return (
   <div className="auth-container">
  <div className="auth-logo">
    <img src="/your-truck-logo.png" alt="Logo" style={{ width: '60%', height: '60%' }} />
  </div>
  <h2 className="auth-title">Login To MoveMate</h2>

  <input
    className="auth-input"
    type="text"
    placeholder="email/username"
    name="username"
  />
  <input
    className="auth-input"
    type="password"
    placeholder="password"
    name="password"
  />

  <button className="auth-button">LOGIN</button>

  <p className="auth-footer-text">
    Don’t have an account?
    <a href="/signup"> Sign Up</a>
  </p>
  <p className="auth-footer-text">
    Already have an account?
    <a href="/login"> Login</a>
  </p>
</div>

  );
}

export default Login;








