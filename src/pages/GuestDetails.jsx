import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CalendarCheck, Check, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import BookingHeader from '../components/layout/BookingHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function GuestDetails() {
  const navigate = useNavigate();
  const { activeDraft, updateDraftGuests } = useBooking();
  const { showToast } = useToast();

  const [guestForm, setGuestForm] = useState({
    firstName: activeDraft.guestDetails?.firstName || 'Aisha',
    lastName: activeDraft.guestDetails?.lastName || 'Sharma',
    email: activeDraft.guestDetails?.email || 'aisha.sharma@example.com',
    phone: activeDraft.guestDetails?.phone || '+91 98765 43210',
    specialRequests: activeDraft.guestDetails?.specialRequests || ''
  });

  const [preferences, setPreferences] = useState(
    activeDraft.guestDetails?.preferences || ['King Bed', 'High Floor']
  );

  const roomPreferencesList = ['High Floor', 'Quiet Room', 'King Bed', 'Palace Courtyard View', 'Late Check-out'];

  const togglePreference = (pref) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!guestForm.firstName.trim() || !guestForm.email.trim() || !guestForm.phone.trim()) {
      showToast('error', 'Please fill in all required guest information.');
      return;
    }

    updateDraftGuests({
      ...guestForm,
      preferences
    });

    navigate('/booking/payment');
  };

  const stay = activeDraft.stay;
  const room = activeDraft.room;
  const pricing = activeDraft.pricing;

  return (
    <div style={{ backgroundColor: 'var(--dusky-ivory)', minHeight: '100vh' }}>
      <BookingHeader currentStep={1} backTo={`/details/${stay?.id || 'umaid-palace-retreat'}`} backText="Back to Room Details" />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warm-gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Step 1 of 2
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              fontWeight: 600,
              color: 'var(--deep-olive)',
              lineHeight: 1.2,
              marginTop: '4px'
            }}
          >
            Complete your guest details
          </h1>
          <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Please provide your details below to finalize your royal stay at {stay?.name || 'Saga Javaai'}.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '36px',
            alignItems: 'start'
          }}
          className="guest-content-grid"
        >
          {/* Left Form Card */}
          <Card style={{ padding: '32px' }}>
            <form onSubmit={handleContinue}>
              {/* Names */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '20px'
                }}
                className="form-row-2col"
              >
                <div>
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    className="input-control"
                    value={guestForm.firstName}
                    onChange={(e) => setGuestForm({ ...guestForm, firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className="input-control"
                    value={guestForm.lastName}
                    onChange={(e) => setGuestForm({ ...guestForm, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '24px'
                }}
                className="form-row-2col"
              >
                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="input-control"
                    value={guestForm.email}
                    onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="input-control"
                    value={guestForm.phone}
                    onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div style={{ marginBottom: '28px' }}>
                <label className="form-label">Special Requests (Optional)</label>
                <textarea
                  className="input-control"
                  style={{ height: '90px', padding: '12px 14px', resize: 'vertical' }}
                  placeholder="Dietary requirements, anniversary celebration, arrival notes..."
                  value={guestForm.specialRequests}
                  onChange={(e) => setGuestForm({ ...guestForm, specialRequests: e.target.value })}
                />
              </div>

              {/* Room Preferences */}
              <div style={{ marginBottom: '32px' }}>
                <span className="form-label" style={{ display: 'block', marginBottom: '10px' }}>
                  Suite Preferences
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {roomPreferencesList.map((pref) => {
                    const isSelected = preferences.includes(pref);
                    return (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => togglePreference(pref)}
                        style={{
                          padding: '7px 14px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          border: isSelected ? '1px solid var(--deep-olive)' : '1px solid var(--border-medium)',
                          backgroundColor: isSelected ? 'var(--deep-olive)' : '#FFFFFF',
                          color: isSelected ? 'var(--dusky-ivory)' : 'var(--text-main)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {isSelected && <Check size={13} />}
                        <span>{pref}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={16} />}
                style={{ width: '100%', height: '48px' }}
              >
                Continue to Payment
              </Button>
            </form>
          </Card>

          {/* Right Summary Card */}
          <Card style={{ padding: '0', overflow: 'hidden', position: 'sticky', top: '90px' }}>
            {/* Image Header */}
            <div style={{ height: '170px', position: 'relative' }}>
              <img
                src={stay?.images[0]}
                alt={stay?.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20, 18, 12, 0.75) 0%, transparent 100%)',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#FFFFFF'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600 }}>
                  {stay?.name}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--warm-gold)' }}>{room?.name}</span>
              </div>
            </div>

            {/* Summary Details */}
            <div style={{ padding: '20px 24px' }}>
              {/* Dates */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border-light)',
                  marginBottom: '16px'
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--aravalli-stone)', textTransform: 'uppercase', display: 'block' }}>
                    Check-in
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-olive)' }}>Oct 14, 2026</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>From 3:00 PM</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--aravalli-stone)', textTransform: 'uppercase', display: 'block' }}>
                    Check-out
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-olive)' }}>Oct 17, 2026</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Until 11:00 AM</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div style={{ backgroundColor: 'var(--dusky-ivory)', borderRadius: 'var(--radius-sm)', padding: '14px 16px', marginBottom: '18px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--deep-olive)', marginBottom: '10px' }}>
                  Price Breakdown
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  <span>₹{pricing.nightlyRate.toLocaleString()} × 3 nights</span>
                  <span>₹{pricing.roomTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  <span>Taxes & GST (18%)</span>
                  <span>₹{pricing.taxes.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  <span>Luxury Heritage Resort Fee</span>
                  <span>₹{pricing.resortFee.toLocaleString()}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-medium)',
                    color: 'var(--deep-olive)',
                    fontWeight: 700
                  }}
                >
                  <span style={{ fontSize: '14px' }}>Total Amount</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px' }}>
                    ₹{pricing.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust Notes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={15} style={{ color: 'var(--warm-gold)', flexShrink: 0 }} />
                  <span>Encrypted 256-bit secure reservation.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <CalendarCheck size={15} style={{ color: 'var(--warm-gold)', flexShrink: 0 }} />
                  <span>Free cancellation up to 48 hours prior to check-in.</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
