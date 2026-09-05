import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_BASE = 'https://saga-javaai.onrender.com';
const LOGIN_URL = `${API_BASE}/api/saga/login`;
const SIGNUP_URL = `${API_BASE}/api/saga/signup`;

const DEFAULT_USER = {
  fullName: 'Aisha Sharma',
  firstName: 'Aisha',
  lastName: 'Sharma',
  email: 'aisha.sharma@example.com',
  phoneNumber: '+91 98765 43210',
  address: '123 Serenity Lane, Bandra West, Mumbai, MH',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  twoFactorEnabled: false,
  preferences: {
    room: ['High Floor', 'Quiet Room', 'Extra Pillows', 'Palace View'],
    dining: ['Vegetarian', 'Gluten-Free', 'Ayurvedic Herbals'],
    wellness: ['Spa Access', 'Yoga Classes', 'Morning Meditation']
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || 'demo-jwt-token');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_USER, ...parsed };
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      });

      let data = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }
      }

      if (!response.ok) {
        const msg = (data && (data.message || data.error || data.msg)) || `Login failed (${response.status})`;
        throw new Error(msg);
      }

      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
      }

      const receivedUser = data.response || data.user || {
        fullName: email.split('@')[0],
        email: email
      };

      const parts = (receivedUser.fullName || '').split(' ');
      const enrichedUser = {
        ...DEFAULT_USER,
        ...receivedUser,
        firstName: parts[0] || 'Guest',
        lastName: parts.slice(1).join(' ') || ''
      };

      setUser(enrichedUser);
      localStorage.setItem('user', JSON.stringify(enrichedUser));
      return { success: true, user: enrichedUser, message: data.message || 'Login successful' };
    } catch (err) {
      // Fallback for development/testing when CORS or remote API is unavailable
      if (
        err.message.includes('Network / CORS') ||
        err.message.includes('Failed to fetch') ||
        err.message.includes('NetworkError')
      ) {
        // Allow mock demo login
        const mockUser = {
          ...DEFAULT_USER,
          email: email,
          fullName: email.split('@')[0]
        };
        setUser(mockUser);
        setToken('mock-jwt-token');
        return { success: true, user: mockUser, message: 'Signed in with demo access' };
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    try {
      const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          fullName: payload.fullName.trim(),
          email: payload.email.trim().toLowerCase(),
          password: payload.password,
          phoneNumber: payload.phoneNumber ? payload.phoneNumber.trim() : ''
        })
      });

      let data = {};
      try {
        data = await response.json();
      } catch (e) {
        // Non-JSON
      }

      if (!response.ok) {
        const msg = data.message || data.error || `Registration failed (${response.status})`;
        throw new Error(msg);
      }

      const parts = payload.fullName.split(' ');
      const newUser = {
        ...DEFAULT_USER,
        fullName: payload.fullName,
        firstName: parts[0] || payload.fullName,
        lastName: parts.slice(1).join(' ') || '',
        email: payload.email,
        phoneNumber: payload.phoneNumber || ''
      };

      setUser(newUser);
      return { success: true, message: data.message || 'Account created successfully!' };
    } catch (err) {
      if (
        err.message.includes('Failed to fetch') ||
        err.message.includes('NetworkError')
      ) {
        const parts = payload.fullName.split(' ');
        const newUser = {
          ...DEFAULT_USER,
          fullName: payload.fullName,
          firstName: parts[0],
          lastName: parts.slice(1).join(' '),
          email: payload.email,
          phoneNumber: payload.phoneNumber
        };
        setUser(newUser);
        return { success: true, message: 'Account created (Demo Mode)' };
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedData };
      localStorage.setItem('user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
