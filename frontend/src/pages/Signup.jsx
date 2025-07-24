function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account created!");
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <img src="/your-truck-logo.png" alt="Logo" style={{ width: '60%', height: '60%' }} />
      </div>

      <h2 className="auth-title">Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className="auth-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          required
        />

        <button type="submit" className="auth-button">Sign Up</button>
      </form>

      <p className="auth-footer-text">
        Already have an account?
        <a href="/login"> Login</a>
      </p>
    </div>
  );
}

export default Signup;
