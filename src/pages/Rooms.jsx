import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bed, Users, Sparkles, Check, ArrowRight, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function Rooms() {
  const navigate = useNavigate();
  const { hotel, selectRoom, searchParams, setSearchParams } = useBooking();

  const [categoryFilter, setCategoryFilter] = useState(searchParams.roomType || 'all');
  const [maxPrice, setMaxPrice] = useState(50000);

  const filteredRooms = useMemo(() => {
    return hotel.rooms.filter((room) => {
      if (categoryFilter !== 'all' && room.category !== categoryFilter) return false;
      if (room.pricePerNight > maxPrice) return false;
      return true;
    });
  }, [hotel.rooms, categoryFilter, maxPrice]);

  const handleBook = (room) => {
    selectRoom(room);
    navigate('/booking/guest');
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warm-gold)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          SAGA JAWAI Hotel
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '36px',
            fontWeight: 600,
            color: 'var(--deep-olive)',
            marginTop: '2px'
          }}
        >
          Rooms & Luxury Suites
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
          Explore our thoughtfully designed hotel rooms and luxury suites equipped with modern comfort and premier amenities.
        </p>
      </div>

      {/* Filter Bar */}
      <Card
        style={{
          padding: '18px 24px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--deep-olive)', marginRight: '4px' }}>
            Room Category:
          </span>
          {[
            { id: 'all', label: 'All Rooms' },
            { id: 'Deluxe', label: 'Deluxe' },
            { id: 'Super Deluxe', label: 'Super Deluxe' },
            { id: 'Suite', label: 'Executive Suite' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                border: categoryFilter === cat.id ? '1px solid var(--deep-olive)' : '1px solid var(--border-medium)',
                backgroundColor: categoryFilter === cat.id ? 'var(--deep-olive)' : '#FFFFFF',
                color: categoryFilter === cat.id ? 'var(--dusky-ivory)' : 'var(--text-main)',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Max Price Range */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12.5px', color: 'var(--aravalli-stone)' }}>
            Max Rate: <strong>₹{maxPrice.toLocaleString()}</strong>
          </span>
          <input
            type="range"
            min="10000"
            max="50000"
            step="2000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ accentColor: 'var(--deep-olive)', cursor: 'pointer' }}
          />
        </div>
      </Card>

      {/* Room Listing Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <Card
              key={room.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 420px) 1fr',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-medium)',
                boxShadow: 'var(--shadow-card)'
              }}
              className="room-detail-card"
            >
              {/* Image Section */}
              <div style={{ position: 'relative', minHeight: '280px' }}>
                <img
                  src={room.image}
                  alt={room.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                  <Badge variant="olive">{room.category}</Badge>
                </div>
              </div>

              {/* Content & Specs Section */}
              <div
                style={{
                  padding: '28px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '24px',
                          fontWeight: 600,
                          color: 'var(--deep-olive)'
                        }}
                      >
                        {room.name}
                      </h2>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--aravalli-stone)', marginTop: '4px' }}>
                        <span>📐 {room.size}</span>
                        <span>🛏 {room.bed}</span>
                        <span>👥 {room.occupancy}</span>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginTop: '12px',
                      marginBottom: '18px'
                    }}
                  >
                    {room.description}
                  </p>

                  {/* Amenities Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
                    {room.features.map((feat, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '12px',
                          color: 'var(--deep-olive)',
                          backgroundColor: 'var(--dusky-ivory)',
                          border: '1px solid var(--border-light)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <Check size={12} style={{ color: 'var(--warm-gold)' }} />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Booking CTA Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '18px',
                    borderTop: '1px solid var(--border-light)',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '28px',
                          fontWeight: 700,
                          color: 'var(--deep-olive)'
                        }}
                      >
                        ₹{room.pricePerNight.toLocaleString()}
                      </span>
                      {room.originalPrice && (
                        <span
                          style={{
                            fontSize: '14px',
                            color: 'var(--text-light)',
                            textDecoration: 'line-through'
                          }}
                        >
                          ₹{room.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span style={{ fontSize: '12px', color: 'var(--aravalli-stone)' }}>/ night + taxes</span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: 'var(--warm-gold)', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                      ✓ Free cancellation up to 48h before check-in
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    iconRight={<ArrowRight size={16} />}
                    onClick={() => handleBook(room)}
                  >
                    Select & Reserve
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--deep-olive)' }}>
              No rooms match your filter.
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px' }}>
              Please reset your filters or adjust the price slider.
            </p>
            <Button
              variant="outline"
              size="sm"
              style={{ marginTop: '16px' }}
              onClick={() => {
                setCategoryFilter('all');
                setMaxPrice(50000);
              }}
            >
              Reset Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
