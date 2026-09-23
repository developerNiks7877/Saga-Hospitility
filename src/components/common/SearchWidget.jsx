import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, BedDouble, ArrowRight, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import Button from '../ui/Button';

export default function SearchWidget() {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useBooking();

  const [dates, setDates] = useState({
    checkIn: '2026-10-14',
    checkOut: '2026-10-17'
  });
  const [guests, setGuests] = useState('2 Guests, 1 Room');
  const [suiteCategory, setSuiteCategory] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      ...dates,
      guests,
      roomType: suiteCategory
    });
    navigate('/rooms');
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-card)',
        padding: '24px 28px',
        position: 'relative'
      }}
    >
      {/* Top Banner Tag */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} style={{ color: 'var(--leopard-ochre)' }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--deep-olive)', letterSpacing: '0.04em' }}>
            Direct Booking Privilege • Best Rate Guaranteed at SAGA
          </span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--aravalli-stone)' }}>
          ✦ Includes Complimentary Gourmet Breakfast
        </span>
      </div>

      <form
        onSubmit={handleSearch}
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.2fr 1.2fr 1.2fr auto',
          gap: '14px',
          alignItems: 'center'
        }}
        className="single-hotel-search-form"
      >
        {/* Check-In */}
        <div
          style={{
            backgroundColor: 'var(--bg-card-warm)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px'
          }}
        >
          <label style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--aravalli-stone)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
            Check-In
          </label>
          <input
            type="date"
            value={dates.checkIn}
            onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '13.5px',
              fontWeight: 600,
              color: 'var(--deep-olive)',
              outline: 'none',
              width: '100%',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Check-Out */}
        <div
          style={{
            backgroundColor: 'var(--bg-card-warm)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px'
          }}
        >
          <label style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--aravalli-stone)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
            Check-Out
          </label>
          <input
            type="date"
            value={dates.checkOut}
            onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '13.5px',
              fontWeight: 600,
              color: 'var(--deep-olive)',
              outline: 'none',
              width: '100%',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Guests & Rooms */}
        <div
          style={{
            backgroundColor: 'var(--bg-card-warm)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px'
          }}
        >
          <label style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--aravalli-stone)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
            Guests & Rooms
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '13.5px',
              fontWeight: 600,
              color: 'var(--deep-olive)',
              outline: 'none',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            <option value="1 Guest, 1 Room">1 Guest, 1 Room</option>
            <option value="2 Guests, 1 Room">2 Guests, 1 Room</option>
            <option value="3 Guests, 1 Room">3 Guests, 1 Room</option>
            <option value="4 Guests, 2 Rooms">4 Guests, 2 Rooms</option>
            <option value="Family Suite (4-6 Guests)">Family Suite (4-6 Guests)</option>
          </select>
        </div>

        {/* Suite Category */}
        <div
          style={{
            backgroundColor: 'var(--bg-card-warm)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px'
          }}
        >
          <label style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--aravalli-stone)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
            Suite Category
          </label>
          <select
            value={suiteCategory}
            onChange={(e) => setSuiteCategory(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '13.5px',
              fontWeight: 600,
              color: 'var(--deep-olive)',
              outline: 'none',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Rooms & Suites</option>
            <option value="Deluxe Room">Deluxe Rooms</option>
            <option value="Super Deluxe Room">Super Deluxe Rooms</option>
            <option value="Executive Suite">Executive Suites</option>
          </select>
        </div>

        {/* Submit CTA */}
        <div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            iconRight={<ArrowRight size={16} />}
            style={{ height: '48px', padding: '0 24px' }}
          >
            Check Availability
          </Button>
        </div>
      </form>
    </div>
  );
}
