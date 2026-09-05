import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import UserLayout from './components/layout/UserLayout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import GuestDetails from './pages/GuestDetails';
import Payment from './pages/Payment';
import BookingConfirmed from './pages/BookingConfirmed';
import MyBookings from './pages/MyBookings';
import MyProfile from './pages/MyProfile';
import Offers from './pages/Offers';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <ToastProvider>
            <Routes>
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Dedicated Single-Hotel Booking & Checkout Flow */}
              <Route path="/booking/guest" element={<GuestDetails />} />
              <Route path="/booking/payment" element={<Payment />} />
              <Route path="/booking/confirmation" element={<BookingConfirmed />} />

              {/* Main SAGA JAWAAI User Panel Portal */}
              <Route element={<UserLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/profile" element={<MyProfile />} />

                {/* Compatibility redirects for old URLs */}
                <Route path="/hotel" element={<Navigate to="/rooms" replace />} />
                <Route path="/search" element={<Navigate to="/rooms" replace />} />
                <Route path="/details/:id" element={<Navigate to="/rooms" replace />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </ToastProvider>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
