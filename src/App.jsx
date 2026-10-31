import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { ToastProvider } from './context/ToastContext';

import UserLayout from './components/layout/UserLayout';

import SagaHome from "./SagaHome";

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
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <BookingProvider>
          <ToastProvider>

            <Routes>

              {/* SAGA LUXURY WEBSITE */}
              <Route
                path="/"
                element={<SagaHome />}
              />


              {/* AUTH */}
              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/signup"
                element={<Signup />}
              />


              {/* BOOKING FLOW */}
              <Route
                path="/booking/guest"
                element={<GuestDetails />}
              />

              <Route
                path="/booking/payment"
                element={<Payment />}
              />

              <Route
                path="/booking/confirmation"
                element={<BookingConfirmed />}
              />


              {/* MAIN USER / ROOM INTERFACE */}
              <Route element={<UserLayout />}>

                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />

                <Route
                  path="/rooms"
                  element={<Rooms />}
                />

                <Route
                  path="/offers"
                  element={<Offers />}
                />

                <Route
                  path="/my-bookings"
                  element={<MyBookings />}
                />

                <Route
                  path="/profile"
                  element={<MyProfile />}
                />

                <Route
                  path="/hotel"
                  element={
                    <Navigate
                      to="/rooms"
                      replace
                    />
                  }
                />

                <Route
                  path="/search"
                  element={
                    <Navigate
                      to="/rooms"
                      replace
                    />
                  }
                />

                <Route
                  path="/details/:id"
                  element={
                    <Navigate
                      to="/rooms"
                      replace
                    />
                  }
                />

              </Route>


              {/* FALLBACK */}
              <Route
                path="*"
                element={
                  <Navigate
                    to="/"
                    replace
                  />
                }
              />

            </Routes>

          </ToastProvider>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
