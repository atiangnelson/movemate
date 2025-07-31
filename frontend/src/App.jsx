import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MoveRequestForm from "./pages/MoveRequestForm";
import InventoryChecklist from "./pages/InventoryChecklist";
import QuoteApproval from "./pages/QuoteApproval";
import BookingConfirmation from "./pages/BookingConfirmation";
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import AdminPanel from "./pages/AdminPanel";
import { getToken, setToken } from "./utils/auth";
import './App.css';

function App() {
  const token = getToken();
  const isLoggedIn = !!token;

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />

        
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/move-request" element={isLoggedIn ? <MoveRequestForm /> : <Navigate to="/login" />} />
        <Route path="/inventory-checklist" element={isLoggedIn ? <InventoryChecklist /> : <Navigate to="/login" />} />
        <Route path="/quote-approval" element={isLoggedIn ? <QuoteApproval /> : <Navigate to="/login" />} />
        <Route path="/booking-confirmation" element={isLoggedIn ? <BookingConfirmation /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isLoggedIn ? <AdminPanel /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
