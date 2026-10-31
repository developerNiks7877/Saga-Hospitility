import { publicAsset } from '../../utils/publicAsset';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Compass,
  Bed,
  Tag,
  CalendarCheck,
  User,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import Button from '../ui/Button';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { bookings } = useBooking();
  const navigate = useNavigate();

  const upcomingCount = bookings.filter((b) => b.status === 'upcoming').length;

  const navLinks = [
    { label: 'Overview', path: '/dashboard', icon: <Compass size={18} /> },
    { label: 'Rooms & Suites', path: '/rooms', icon: <Bed size={18} /> },
    { label: 'Special Offers', path: '/offers', icon: <Tag size={18} />, badge: '3 Active' },
    { label: 'My Bookings', path: '/my-bookings', icon: <CalendarCheck size={18} />, count: upcomingCount },
    { label: 'My Profile', path: '/profile', icon: <User size={18} /> }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(20, 18, 12, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 999
          }}
        />
      )}

      {/* Main Deep Olive Luxury Sidebar */}
      <aside
        className={`sidebar-nav ${isOpen ? 'mobile-drawer-open' : ''}`}
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--deep-olive)',
          color: 'var(--dusky-ivory)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
          position: 'sticky',
          top: 0,
          flexShrink: 0,
          borderRight: '1px solid rgba(236, 189, 114, 0.2)',
          boxShadow: '4px 0 24px rgba(28, 26, 20, 0.15)',
          zIndex: 100,
          transition: 'transform var(--transition-normal)'
        }}
      >
        {/* Transparent Big Logo Header */}
        <div>
          <div
            style={{
              padding: '24px 20px 20px',
              borderBottom: '1px solid rgba(236, 189, 114, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {/* Transparent Large Logo */}
            <div
              onClick={() => {
                navigate('/dashboard');
                if (onClose) onClose();
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '4px 0'
              }}
            >
              <img
                src={publicAsset('/assets/logo/saga-hospitality-logo.png')}
                alt="SAGA"
                style={{
                  width: '100%',
                  maxHeight: '88px',
                  objectFit: 'contain',
                  filter: 'brightness(1.12) drop-shadow(0 3px 10px rgba(0, 0, 0, 0.35))'
                }}
              />
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="mobile-menu-btn"
              style={{
                position: 'absolute',
                top: '16px',
                right: '12px',
                background: 'none',
                border: 'none',
                color: 'var(--dusky-ivory)',
                cursor: 'pointer',
                padding: '4px'
              }}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '20px 14px' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navLinks.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#FFFFFF' : 'var(--dusky-ivory)',
                      backgroundColor: isActive ? 'var(--leopard-ochre)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all var(--transition-fast)',
                      letterSpacing: '0.01em',
                      boxShadow: isActive ? '0 2px 8px rgba(220, 129, 51, 0.35)' : 'none'
                    })}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {item.badge && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            backgroundColor: 'rgba(220, 129, 51, 0.35)',
                            color: '#FFFFFF',
                            padding: '2px 7px',
                            borderRadius: 'var(--radius-full)'
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.count > 0 && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            backgroundColor: 'var(--rabari-red)',
                            color: '#FFFFFF',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {item.count}
                        </span>
                      )}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Quick Booking CTA & User Profile Footer */}
        <div style={{ padding: '16px 14px', borderTop: '1px solid rgba(236, 189, 114, 0.18)' }}>
          <Button
            variant="gold"
            size="md"
            style={{ width: '100%', marginBottom: '16px' }}
            onClick={() => {
              navigate('/rooms');
              if (onClose) onClose();
            }}
          >
            ✦ Book a Room
          </Button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(0, 0, 0, 0.15)'
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              onClick={() => {
                navigate('/profile');
                if (onClose) onClose();
              }}
            >
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((user?.fullName || `${user?.firstName || 'Guest'} ${user?.lastName || ''}`.trim()))}&background=5f5c3a&color=ffffff&size=100`}
                alt={user?.fullName || user?.firstName || 'User'}
                style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--warm-gold)' }}
              />
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dusky-ivory)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {user ? (user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Guest') : 'Guest'}
                </div>
                <span style={{ fontSize: '11px', color: 'var(--warm-gold)' }}>{user ? 'Royal Guest' : 'Guest'}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(245, 240, 228, 0.6)',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
