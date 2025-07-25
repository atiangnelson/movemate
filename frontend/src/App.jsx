import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MoveRequestForm from "./pages/MoveRequestForm";
import InventoryChecklist from "./pages/InventoryChecklist";
import QuoteApproval from "./pages/QuoteApproval";
import BookingConfirmation from "./pages/BookingConfirmation";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import AdminPanel from "./pages/AdminPanel";
import { useState } from "react";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/move-request" element={<MoveRequestForm />} />
        <Route path="/inventory-checklist" element={<InventoryChecklist />} />
        <Route path="/quote-approval" element={<QuoteApproval />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
