import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, Download, ArrowLeft, MapPin, Calendar, Star, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';


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

export default function BookingConfirmed() {
  const navigate = useNavigate();
  const { latestConfirmedBooking, activeDraft } = useBooking();
  const { showToast } = useToast();

  const booking = latestConfirmedBooking || {
    id: 'BKG-8472',
    reference: 'SJ-284731',
    hotelName: activeDraft.stay?.name || 'Umaid Palace Retreat',
    roomName: activeDraft.room?.name || 'Royal Heritage Suite',
    location: activeDraft.stay?.location || 'Jodhpur, Rajasthan',
    image: activeDraft.stay?.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    checkIn: 'Oct 14, 2026',
    checkOut: 'Oct 17, 2026',
    guests: '2 Guests',
    totalAmount: activeDraft.pricing.total || 85000
  };

  const handleDownload = () => {
    showToast('success', `Voucher ${booking.reference} prepared. Printing preview...`);
    window.print();
  };

  return (
    <div className="booking-confirmation-page"
      style={{
        backgroundColor: 'var(--dusky-ivory)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 20px'
      }}
    >
      {/* Golden Heritage Success Icon */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'rgba(236, 189, 114, 0.25)',
          border: '2px solid var(--warm-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 8px 24px rgba(236, 189, 114, 0.3)'
        }}
      >
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'var(--deep-olive)',
            color: 'var(--warm-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Check size={26} strokeWidth={3} />
        </div>
      </div>

      {/* Confirmation Headline */}
      <h1 className="booking-confirmation-title"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '36px',
          fontWeight: 600,
          color: 'var(--deep-olive)',
          textAlign: 'center',
          marginBottom: '8px',
          lineHeight: 1.15
        }}
      >
        Your reservation has been received
      </h1>

      <p
        style={{
          fontSize: '15px',
          color: 'var(--text-muted)',
          textAlign: 'center',
          maxWidth: '460px',
          lineHeight: 1.6,
          marginBottom: '36px'
        }}
      >
        We look forward to welcoming you to SAGA JAWAAI. A formal confirmation voucher and concierge itinerary have been dispatched to your email.
      </p>

      {/* Booking Receipt Card */}
      <Card className="booking-confirmation-card"
        style={{
          width: '100%',
          maxWidth: '520px',
          overflow: 'hidden',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '28px'
        }}
      >
        {/* Reference Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-card-warm)'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--aravalli-stone)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Booking Reference
            </span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 700, color: 'var(--deep-olive)' }}>
              {booking.reference}
            </div>
          </div>
          <Badge variant="olive">Confirmed</Badge>
        </div>

        {/* Property Section */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            padding: '22px 24px',
            borderBottom: '1px solid var(--border-light)'
          }}
        >
          <img
            src={booking.image}
            alt={booking.hotelName}
            style={{ width: '76px', height: '76px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
          />
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: 'var(--deep-olive)', marginBottom: '4px' }}>
              {booking.hotelName}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <MapPin size={13} style={{ color: 'var(--warm-gold)' }} />
              <span>{booking.location}</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <Badge variant="gold">★ {booking.roomName}</Badge>
              <Badge variant="stone">👥 {booking.guests}</Badge>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-light)'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--aravalli-stone)', textTransform: 'uppercase', display: 'block' }}>
              Check-in
            </span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--deep-olive)' }}>{formatBookingDate(booking.checkIn)}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>From 3:00 PM</span>
          </div>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--aravalli-stone)', textTransform: 'uppercase', display: 'block' }}>
              Check-out
            </span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--deep-olive)' }}>{formatBookingDate(booking.checkOut)}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Until 11:00 AM</span>
          </div>
        </div>

        {/* Total Amount */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 24px',
            backgroundColor: 'var(--bg-card-warm)'
          }}
        >
          <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--deep-olive)' }}>
            Total Amount
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--deep-olive)' }}>
            ₹{booking.totalAmount.toLocaleString()}
          </span>
        </div>
      </Card>

      {/* Buttons */}
      <div className="booking-confirmation-actions" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button variant="primary" size="md" onClick={() => navigate('/my-bookings')}>
          View My Bookings
        </Button>
        <Button variant="secondary" size="md" icon={<Download size={15} />} onClick={handleDownload}>
          Download Reservation Summary
        </Button>
      </div>

      {/* Return Link */}
      <Link
        to="/dashboard"
        style={{
          marginTop: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13.5px',
          color: 'var(--deep-olive)',
          fontWeight: 600,
          textDecoration: 'none'
        }}
      >
        <ArrowLeft size={15} />
        <span>Return to Royal Dashboard</span>
      </Link>
    </div>
  );
}
