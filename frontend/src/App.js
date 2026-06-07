import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import pages
import Home from './pages/customer/Home';
import Login from './pages/customer/Login';
import Register from './pages/customer/Register';
import SearchVendors from './pages/customer/SearchVendors';
import VendorResults from './pages/customer/VendorResults';   // ✅ new results page
import VendorDetails from './pages/customer/VendorDetails';
import BookingHistory from './pages/customer/BookingHistory';
import CustomerDashboard from './pages/customer/Dashboard';
import CustomerProfile from './pages/customer/Profile';

import VendorLogin from './pages/vendor/VendorLogin';
import VendorDashboard from './pages/vendor/VendorDashboard';
//import ManageProfile from './pages/vendor/MangeProfile';
import ManageServices from './pages/vendor/ManageServices';
import VendorReviews from './pages/vendor/Reviews';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import VendorVerification from './pages/admin/VendorVerification';
import UserManagement from './pages/admin/UserManagement';
import Analytics from './pages/admin/Analytics';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar user={user} onLogout={logout} />
        
        <main className="flex-grow-1 py-4">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />

            {/* ✅ Always available customer-facing routes */}
            <Route path="/search" element={<SearchVendors />} />
            <Route path="/vendors" element={<VendorResults />} />   {/* now always accessible */}
            <Route path="/vendor/:id" element={<VendorDetails />} />

            {/* Customer-only routes */}
            {user?.role === 'customer' && (
              <>
                <Route path="/bookings" element={<BookingHistory />} />
                <Route path="/dashboard" element={<CustomerDashboard />} />
                <Route path="/profile" element={<CustomerProfile />} />
              </>
            )}

            {/* Vendor routes */}
            {user?.role === 'vendor' && (
              <>
                <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                {/*<Route path="/vendor/profile" element={<ManageProfile />} />*/}
                <Route path="/vendor/services" element={<ManageServices />} />
                <Route path="/vendor/reviews" element={<VendorReviews />} />
              </>
            )}

            {/* Admin routes */}
            {user?.role === 'admin' && (
              <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/verify-vendors" element={<VendorVerification />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/analytics" element={<Analytics />} />
              </>
            )}

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </Router>
  );
}

export default App;
