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

import SagaHome from "./SagaHome";

import ComingSoon from './pages/ComingSoon';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <AuthProvider>
        <BookingProvider>
          <ToastProvider>

            <Routes>

              {/* SAGA LUXURY WEBSITE */}
              <Route
                path="/"
                element={<SagaHome />}
              />


              {/* BOOKING NOTICE */}
              <Route
                path="/coming-soon"
                element={<ComingSoon />}
              />

              {/* JOURNAL */}
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/blog" element={<Blog />} />

              {/* ACCOUNT AND BOOKING ARE PAUSED UNTIL THE BACKEND IS READY. */}
              <Route path="/login" element={<Navigate to="/coming-soon" replace />} />
              <Route path="/signup" element={<Navigate to="/coming-soon" replace />} />
              <Route path="/booking/*" element={<Navigate to="/coming-soon" replace />} />
              <Route path="/dashboard" element={<Navigate to="/coming-soon" replace />} />
              <Route path="/my-bookings" element={<Navigate to="/coming-soon" replace />} />
              <Route path="/profile" element={<Navigate to="/coming-soon" replace />} />
              <Route path="/rooms" element={<Navigate to="/coming-soon" replace />} />
              <Route path="/offers" element={<Navigate to="/coming-soon" replace />} />
              <Route path="/hotel" element={<Navigate to="/coming-soon" replace />} />
              <Route path="/search" element={<Navigate to="/coming-soon" replace />} />
              <Route path="/details/:id" element={<Navigate to="/coming-soon" replace />} />

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
