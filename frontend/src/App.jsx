import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuoteApproval from "./pages/QuoteApproval";
import InventoryChecklist from "./pages/InventoryChecklist";
import Notifications from "./pages/Notifications";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import UsersAdmin from "./pages/admin/UsersAdmin";
import MoveRequestsAdmin from "./pages/admin/MoveRequestsAdmin";
import QuotesAdmin from "./pages/admin/QuotesAdmin";
import BookingsAdmin from "./pages/admin/BookingsAdmin";
import MoveRequestForm from "./pages/MoveRequestForm";


const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request-move" element={<MoveRequestForm />} />

        
        <Route
          path="/"
          element={token ? <QuoteApproval /> : <Navigate to="/login" />}
        />
        <Route
          path="/inventory"
          element={token ? <InventoryChecklist /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={token ? <Notifications /> : <Navigate to="/login" />}
        />
        <Route
          path="/booking"
          element={token ? <Booking /> : <Navigate to="/login" />}
        />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/users" element={<UsersAdmin />} />
        <Route path="/admin/move-requests" element={<MoveRequestsAdmin />} />
        <Route path="/admin/quotes" element={<QuotesAdmin />} />
        <Route path="/admin/bookings" element={<BookingsAdmin />} />



        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Route
               path="/profile"
                element={token ? <Profile /> : <Navigate to="/login" />}
       
       
/>
    </Router>
  );
};

export default App;
