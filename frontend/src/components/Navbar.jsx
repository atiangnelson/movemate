import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/inventory">Inventory</Link>
      <Link to="/quotes">Quotes</Link>
      <Link to="/notifications">Notifications</Link>
      <Link to="/request-move" className="btn btn-primary">
  Request a Move
</Link>

      <Link to="/booking">Booking</Link>
      {user?.is_admin && (
  <Link to="/admin/users" className="px-4 py-2">Admin Panel</Link>
)}

       <li><a href="/profile">Profile</a></li>
       {token && <li><Link to="/dashboard">Dashboard</Link></li>}
       <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
