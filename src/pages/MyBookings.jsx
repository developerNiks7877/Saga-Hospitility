import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Eye, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import API_BASE_URL from '../config/api';
import authFetch from '../utils/authFetch';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

export default function MyBookings() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState(null);

  const formatBookingDate = (value) => {
    if (!value) return '';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const mapBooking = (booking) => {
    const bookingStatus =
      booking.bookingStatus || 'pending';

    let status = 'upcoming';

    if (bookingStatus === 'cancelled') {
      status = 'cancelled';
    } else if (bookingStatus === 'completed') {
      status = 'completed';
    }

    return {
      id: booking.bookingId,
      reference: booking.bookingId,

      hotelName: 'SAGA',
      location: 'Jawai, Rajasthan',

      image: booking.room?.image || '',
      roomName: booking.room?.name || 'SAGA Room',

      checkIn: booking.checkIn,
      checkOut: booking.checkOut,

      guests: booking.guests,
      nights: booking.nights,

      guestDetails: booking.guestDetails,

      pricing: booking.pricing,
      totalAmount: booking.pricing?.total || 0,

      bookingStatus,
      paymentStatus: booking.paymentStatus || 'pending',
      paymentMethod: booking.paymentMethod,

      status,

      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  };

  const fetchMyBookings = async () => {
    try {
      setBookingsLoading(true);
      setBookingsError(null);

      const accessToken =
        localStorage.getItem('saga_access_token');

      if (!accessToken) {
        throw new Error(
          'Please login to view your bookings.'
        );
      }

      const response = await authFetch(
        `${API_BASE_URL}/api/bookings/my`,
        {
          method: 'GET',
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (response.status === 401) {
          throw new Error(
            'Your session has expired. Please login again.'
          );
        }

        throw new Error(
          result.message ||
            'Unable to fetch your bookings.'
        );
      }

      const backendBookings =
        Array.isArray(result?.data?.bookings)
          ? result.data.bookings
          : [];

      setBookings(
        backendBookings.map(mapBooking)
      );
    } catch (error) {
      console.error(
        'My bookings API error:',
        error
      );

      setBookingsError(error.message);
      setBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState(null);
  const [selectedBookingForModify, setSelectedBookingForModify] = useState(null);
  const [selectedBookingForView, setSelectedBookingForView] = useState(null);

  const [newCheckIn, setNewCheckIn] = useState('');
  const [newCheckOut, setNewCheckOut] = useState('');

  const filteredBookings = bookings.filter((b) => b.status === activeTab);

  const upcomingCount = bookings.filter((b) => b.status === 'upcoming').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;
  const cancelledCount = bookings.filter((b) => b.status === 'cancelled').length;

  const handleConfirmCancel = async () => {
    if (!selectedBookingForCancel) {
      return;
    }

    try {
      const accessToken =
        localStorage.getItem('saga_access_token');

      if (!accessToken) {
        throw new Error(
          'Please login again before cancelling this reservation.'
        );
      }

      const response = await authFetch(
        `${API_BASE_URL}/api/bookings/${selectedBookingForCancel.id}/cancel`,
        {
          method: 'PATCH',
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            'Unable to cancel reservation.'
        );
      }

      showToast(
        'success',
        `Reservation ${
          selectedBookingForCancel.reference ||
          selectedBookingForCancel.id
        } has been cancelled.`
      );

      setSelectedBookingForCancel(null);

      await fetchMyBookings();
    } catch (error) {
      console.error(
        'Cancel booking error:',
        error
      );

      showToast(
        'error',
        error.message ||
          'Unable to cancel reservation.'
      );
    }
  };

  const handleConfirmModify = async () => {
    if (
      !selectedBookingForModify ||
      !newCheckIn ||
      !newCheckOut
    ) {
      showToast(
        'error',
        'Please select valid check-in and check-out dates.'
      );
      return;
    }

    try {
      const accessToken =
        localStorage.getItem('saga_access_token');

      if (!accessToken) {
        throw new Error(
          'Please login again before modifying this reservation.'
        );
      }

      const response = await authFetch(
        `${API_BASE_URL}/api/bookings/${selectedBookingForModify.id}/dates`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            checkIn: newCheckIn,
            checkOut: newCheckOut,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            'Unable to modify reservation dates.'
        );
      }

      showToast(
        'success',
        'Reservation dates updated successfully.'
      );

      setSelectedBookingForModify(null);
      setNewCheckIn('');
      setNewCheckOut('');

      await fetchMyBookings();
    } catch (error) {
      console.error(
        'Modify booking error:',
        error
      );

      showToast(
        'error',
        error.message ||
          'Unable to modify reservation dates.'
      );
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warm-gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Reservations Manager
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '34px',
            fontWeight: 600,
            color: 'var(--deep-olive)',
            marginTop: '2px'
          }}
        >
          My Royal Bookings
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
          Manage your upcoming stays, review past royal experiences, and oversee your hospitality reservations.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '28px',
          borderBottom: '1px solid var(--border-medium)',
          marginBottom: '32px'
        }}
      >
        <button
          onClick={() => setActiveTab('upcoming')}
          style={{
            padding: '12px 0',
            fontSize: '14.5px',
            fontWeight: activeTab === 'upcoming' ? 600 : 500,
            color: activeTab === 'upcoming' ? 'var(--deep-olive)' : 'var(--aravalli-stone)',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            position: 'relative',
            borderBottom: activeTab === 'upcoming' ? '2.5px solid var(--deep-olive)' : '2.5px solid transparent',
            marginBottom: '-1px'
          }}
        >
          Upcoming ({upcomingCount})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          style={{
            padding: '12px 0',
            fontSize: '14.5px',
            fontWeight: activeTab === 'completed' ? 600 : 500,
            color: activeTab === 'completed' ? 'var(--deep-olive)' : 'var(--aravalli-stone)',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            position: 'relative',
            borderBottom: activeTab === 'completed' ? '2.5px solid var(--deep-olive)' : '2.5px solid transparent',
            marginBottom: '-1px'
          }}
        >
          Completed ({completedCount})
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          style={{
            padding: '12px 0',
            fontSize: '14.5px',
            fontWeight: activeTab === 'cancelled' ? 600 : 500,
            color: activeTab === 'cancelled' ? 'var(--deep-olive)' : 'var(--aravalli-stone)',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            position: 'relative',
            borderBottom: activeTab === 'cancelled' ? '2.5px solid var(--deep-olive)' : '2.5px solid transparent',
            marginBottom: '-1px'
          }}
        >
          Cancelled ({cancelledCount})
        </button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <Card style={{ padding: '60px 20px', textAlign: 'center' }}>
          <Clock size={36} style={{ color: 'var(--warm-gold)', margin: '0 auto 12px' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--deep-olive)' }}>
            No {activeTab} bookings found
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px', marginBottom: '20px' }}>
            Discover our handpicked collection of heritage havelis and royal palace suites.
          </p>
          <Button variant="primary" onClick={() => navigate('/search')}>
            Find a Stay Now
          </Button>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredBookings.map((b) => (
            <Card
              key={b.id}
              style={{
                display: 'flex',
                overflow: 'hidden',
                border: '1px solid var(--border-medium)',
                boxShadow: 'var(--shadow-card)'
              }}
              className="mybooking-card"
            >
              {/* Hotel Photo */}
              <div
                style={{
                  width: '280px',
                  minHeight: '210px',
                  flexShrink: 0,
                  position: 'relative',
                  backgroundColor: '#E8E2D7'
                }}
              >
                <img
                  src={b.image}
                  alt={b.hotelName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  {b.status === 'upcoming' && (
                    <Badge variant={b.bookingStatus === 'confirmed' ? 'olive' : 'gold'}>
                      {b.bookingStatus === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </Badge>
                  )}
                  {b.status === 'completed' && <Badge variant="gold">Completed</Badge>}
                  {b.status === 'cancelled' && <Badge variant="red">Cancelled</Badge>}
                </div>
              </div>

              {/* Booking Information */}
              <div
                style={{
                  flex: 1,
                  padding: '24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '22px',
                        fontWeight: 600,
                        color: 'var(--deep-olive)'
                      }}
                    >
                      {b.hotelName}
                    </h2>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--aravalli-stone)' }}>
                      #{b.id}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '2px', marginBottom: '18px' }}>
                    <MapPin size={13} style={{ color: 'var(--warm-gold)' }} />
                    <span>{b.location}</span>
                  </div>

                  {/* Details Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '16px',
                      marginBottom: '16px'
                    }}
                    className="booking-specs-grid"
                  >
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--aravalli-stone)', textTransform: 'uppercase', display: 'block' }}>Check-in</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-olive)' }}>{formatBookingDate(b.checkIn)}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--aravalli-stone)', textTransform: 'uppercase', display: 'block' }}>Check-out</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-olive)' }}>{formatBookingDate(b.checkOut)}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--aravalli-stone)', textTransform: 'uppercase', display: 'block' }}>Guests</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-olive)' }}>{b.guests}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--aravalli-stone)', textTransform: 'uppercase', display: 'block' }}>Suite</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-olive)' }}>{b.roomName}</span>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-light)',
                    marginTop: '12px'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-olive)' }}>
                    Total: ₹{Number(b.totalAmount || 0).toLocaleString('en-IN')}
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    {b.status === 'upcoming' && (
                      <>
                        <button
                          onClick={() => setSelectedBookingForCancel(b)}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: 'var(--rabari-red)',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          Cancel Stay
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBookingForModify(b);
                            setNewCheckIn(b.checkIn?.slice(0, 10) || '');
                            setNewCheckOut(b.checkOut?.slice(0, 10) || '');
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: 'var(--deep-olive)',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          Modify Dates
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setSelectedBookingForView(b)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--deep-olive)',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      View Voucher
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={!!selectedBookingForCancel}
        onClose={() => setSelectedBookingForCancel(null)}
        title="Cancel Reservation?"
        subtitle={`Booking #${selectedBookingForCancel?.id} — ${selectedBookingForCancel?.hotelName}`}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(139, 46, 34, 0.08)',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--rabari-red)',
              fontSize: '13.5px',
              marginBottom: '20px'
            }}
          >
            <AlertTriangle size={20} style={{ flexShrink: 0 }} />
            <span>
              Are you sure you want to cancel this booking? A 100% refund of ₹{selectedBookingForCancel?.totalAmount?.toLocaleString()} will be refunded to your original payment method.
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button variant="secondary" size="md" onClick={() => setSelectedBookingForCancel(null)}>
              Keep Reservation
            </Button>
            <Button variant="red" size="md" onClick={handleConfirmCancel}>
              Confirm Cancellation
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modify Dates Modal */}
      <Modal
        isOpen={!!selectedBookingForModify}
        onClose={() => setSelectedBookingForModify(null)}
        title="Modify Stay Dates"
        subtitle={selectedBookingForModify?.hotelName}
      >
        <div>
          <div style={{ marginBottom: '16px' }}>
            <label className="form-label">New Check-In Date</label>
            <input
              type="date"
              className="input-control"
              value={newCheckIn}
              onChange={(e) => setNewCheckIn(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label">New Check-Out Date</label>
            <input
              type="date"
              className="input-control"
              value={newCheckOut}
              onChange={(e) => setNewCheckOut(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button variant="secondary" size="md" onClick={() => setSelectedBookingForModify(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleConfirmModify}>
              Save New Dates
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Voucher Modal */}
      <Modal
        isOpen={!!selectedBookingForView}
        onClose={() => setSelectedBookingForView(null)}
        title="Official Stay Voucher"
        subtitle={`Reference: ${selectedBookingForView?.reference || selectedBookingForView?.id}`}
      >
        {selectedBookingForView && (
          <div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <img
                src={selectedBookingForView.image}
                alt=""
                style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--deep-olive)' }}>
                  {selectedBookingForView.hotelName}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{selectedBookingForView.roomName}</p>
                <p style={{ fontSize: '12px', color: 'var(--aravalli-stone)' }}>{selectedBookingForView.location}</p>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--dusky-ivory)', padding: '16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Dates:</span>
                <span style={{ fontWeight: 600, color: 'var(--deep-olive)' }}>
                  {selectedBookingForView.checkIn} – {selectedBookingForView.checkOut}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Guests:</span>
                <span style={{ fontWeight: 600, color: 'var(--deep-olive)' }}>{selectedBookingForView.guests}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amount Paid:</span>
                <span style={{ fontWeight: 700, color: 'var(--deep-olive)' }}>₹{selectedBookingForView.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button variant="secondary" size="md" onClick={() => window.print()}>
                Print Voucher
              </Button>
              <Button variant="primary" size="md" onClick={() => setSelectedBookingForView(null)}>
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
