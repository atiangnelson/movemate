function Login({ setIsLoggedIn }) {
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    alert("Logged in successfully");
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="button-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;









