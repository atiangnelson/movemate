function Signup() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Account created");
    };
    return(
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit" className="button-primary">Sign Up</button>
            </form>
        </div>

    );

}
export default Signup;