import { publicAsset } from '../../utils/publicAsset';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bell,
  Menu,
  MapPin,
  Calendar,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { hotel } = useBooking();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Voucher SUMMER25 Active',
      desc: '25% off applies automatically on all Luxury Safari Villa bookings.',
      time: '1h ago',
      type: 'offer'
    },
    {
      id: 2,
      title: 'Special Privileges Active',
      desc: 'Direct booking includes complimentary breakfast and concierge assistance.',
      time: '5h ago',
      type: 'service'
    }
  ];

  return (
    <header
      className="user-topbar"
      style={{
        height: 'var(--topbar-height)',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-light)',
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Left: Mobile Toggle & Big Clean Logo */}
      <div className="user-topbar-brand-group" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onMenuClick}
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--deep-olive)',
            cursor: 'pointer',
            padding: '6px'
          }}
          aria-label="Toggle Navigation"
        >
          <Menu size={22} />
        </button>

        {/* Big Official Logo Display */}
        <Link className="user-topbar-brand" to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <img
            src={publicAsset('/assets/logo/saga-hospitality-logo.png')}
            alt="SAGA"
            style={{
              height: '56px',
              maxWidth: '220px',
              objectFit: 'contain'
            }}
          />
          <span
            style={{
              fontSize: '12.5px',
              color: 'var(--aravalli-stone)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              borderLeft: '1px solid var(--border-light)',
              paddingLeft: '14px'
            }}
          >
            <MapPin size={12} style={{ color: 'var(--warm-gold)' }} />
            Jawai Bandh, Rajasthan
          </span>
        </Link>
      </div>

      {/* Right Controls: Availability CTA, Notifications & User Avatar */}
      <div className="user-topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '18px', position: 'relative' }}>
        {/* Fast Booking CTA */}
        <Link
          to="/rooms"
          className="user-topbar-availability"
          style={{
            backgroundColor: 'var(--bg-card-warm)',
            border: '1px solid var(--border-medium)',
            color: 'var(--deep-olive)',
            fontSize: '13px',
            fontWeight: 600,
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none'
          }}
        >
          <Calendar size={14} style={{ color: 'var(--warm-gold)' }} />
          <span>Check Availability</span>
        </Link>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--dusky-ivory)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--deep-olive)',
              cursor: 'pointer',
              position: 'relative'
            }}
            aria-label="Notifications"
          >
            <Bell size={17} />
            <span
              style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--rabari-red)'
              }}
            />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '320px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-dropdown)',
                border: '1px solid var(--border-light)',
                padding: '16px',
                zIndex: 110,
                animation: 'fadeIn 0.2s ease'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '10px',
                  borderBottom: '1px solid var(--border-light)',
                  marginBottom: '10px'
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--deep-olive)' }}>
                  Notifications
                </span>
                <span style={{ fontSize: '11px', color: 'var(--warm-gold)', fontWeight: 600 }}>
                  2 New
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: 'var(--dusky-ivory)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12.5px'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: 'var(--deep-olive)', marginBottom: '2px' }}>
                      {n.title}
                    </div>
                    <div style={{ color: 'var(--text-muted)', lineHeight: 1.4 }}>{n.desc}</div>
                    <span style={{ fontSize: '10.5px', color: 'var(--aravalli-stone)', marginTop: '4px', display: 'block' }}>
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Popover Button */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((user?.fullName || `${user?.fullName?.split(' ')[0] || user?.firstName || 'Guest'} ${user?.lastName || ''}`.trim()))}&background=5f5c3a&color=ffffff&size=100`}
              alt=""
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--warm-gold)'
              }}
            />
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--deep-olive)' }}>
                {user?.fullName?.split(' ')[0] || user?.firstName || 'Guest'}
              </div>
              <span style={{ fontSize: '11px', color: 'var(--aravalli-stone)' }}>Guest</span>
            </div>
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '210px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-dropdown)',
                border: '1px solid var(--border-light)',
                padding: '8px 0',
                zIndex: 110,
                animation: 'fadeIn 0.2s ease'
              }}
            >
              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  fontSize: '13.5px',
                  color: 'var(--deep-olive)',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                <User size={15} style={{ color: 'var(--warm-gold)' }} />
                <span>My Profile</span>
              </Link>

              <Link
                to="/my-bookings"
                onClick={() => setShowProfileMenu(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  fontSize: '13.5px',
                  color: 'var(--deep-olive)',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                <Calendar size={15} style={{ color: 'var(--warm-gold)' }} />
                <span>My Bookings</span>
              </Link>

              <div style={{ height: '1px', background: 'var(--border-light)', margin: '6px 0' }} />

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                  navigate('/login');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 18px',
                  fontSize: '13.5px',
                  color: 'var(--rabari-red)',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
