import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ShieldCheck,
  CalendarCheck,
  Check,
  ArrowRight,
} from 'lucide-react';

import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';

import BookingHeader from '../components/layout/BookingHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function GuestDetails() {
  const navigate = useNavigate();

  const {
    activeDraft,
    updateDraftGuests,
    searchParams,
  } = useBooking();

  const { showToast } = useToast();

  const stay = activeDraft?.stay;
  const room = activeDraft?.room;
  const dates = activeDraft?.dates;
  const pricing = activeDraft?.pricing;

  /* =========================
     FORM STATE
  ========================= */

  const [guestForm, setGuestForm] = useState({
    firstName:
      activeDraft?.guestDetails?.firstName || '',

    lastName:
      activeDraft?.guestDetails?.lastName || '',

    email:
      activeDraft?.guestDetails?.email || '',

    phone:
      activeDraft?.guestDetails?.phone || '',

    specialRequests:
      activeDraft?.guestDetails?.specialRequests || '',
  });

  const [preferences, setPreferences] = useState(
    activeDraft?.guestDetails?.preferences || []
  );

  const roomPreferencesList = [
    'High Floor',
    'Quiet Room',
    'King Bed',
    'Near Pool',
    'Late Check-out',
  ];

  /* =========================
     HELPERS
  ========================= */

  const formatDate = (dateValue) => {
    if (!dateValue) return '—';

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const displayCheckIn =
    dates?.checkIn ||
    formatDate(searchParams?.checkIn);

  const displayCheckOut =
    dates?.checkOut ||
    formatDate(searchParams?.checkOut);

  const nights =
    Number(dates?.nights) ||
    Number(pricing?.nights) ||
    1;

  const nightlyRate =
    Number(pricing?.nightlyRate) ||
    Number(room?.pricePerNight) ||
    0;

  const roomTotal =
    Number(pricing?.roomTotal) ||
    nightlyRate * nights;

  const taxes =
    Number(pricing?.taxes) ||
    Math.round(roomTotal * 0.18);

  const resortFee =
    Number(pricing?.resortFee) || 3500;

  const discount =
    Number(pricing?.discount) || 0;

  const total =
    Number(pricing?.total) ||
    roomTotal +
      taxes +
      resortFee -
      discount;

  const roomImage =
    room?.image ||
    stay?.heroImage ||
    stay?.images?.[0] ||
    '';

  /* =========================
     FORM HANDLERS
  ========================= */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setGuestForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePreference = (pref) => {
    setPreferences((prev) =>
      prev.includes(pref)
        ? prev.filter((item) => item !== pref)
        : [...prev, pref]
    );
  };

  const handleContinue = (event) => {
    event.preventDefault();

    if (
      !guestForm.firstName.trim() ||
      !guestForm.lastName.trim() ||
      !guestForm.email.trim() ||
      !guestForm.phone.trim()
    ) {
      showToast(
        'error',
        'Please fill in all required guest information.'
      );

      return;
    }

    updateDraftGuests({
      ...guestForm,
      preferences,
      guests:
        searchParams?.guests ||
        activeDraft?.guestDetails?.guests ||
        '2 Guests, 1 Room',
    });

    navigate('/booking/payment');
  };

  /* =========================
     NO SELECTED ROOM
  ========================= */

  if (!room) {
    return (
      <div
        style={{
          backgroundColor: 'var(--dusky-ivory)',
          minHeight: '100vh',
        }}
      >
        <BookingHeader
          currentStep={1}
          backTo="/rooms"
          backText="Back to Rooms"
        />

        <main
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '80px 24px',
          }}
        >
          <Card
            style={{
              padding: '50px',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                color: 'var(--deep-olive)',
              }}
            >
              No room selected
            </h2>

            <p
              style={{
                marginTop: '8px',
                color: 'var(--text-muted)',
                fontSize: '14px',
              }}
            >
              Please select an available room before
              continuing with your reservation.
            </p>

            <Button
              variant="primary"
              size="md"
              style={{ marginTop: '22px' }}
              onClick={() => navigate('/rooms')}
            >
              View Rooms
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--dusky-ivory)',
        minHeight: '100vh',
      }}
    >
      <BookingHeader
        currentStep={1}
        backTo="/rooms"
        backText="Back to Rooms"
      />

      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 24px 80px',
        }}
      >
        {/* =========================
            PAGE HEADER
        ========================= */}

        <div style={{ marginBottom: '32px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--warm-gold)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Step 1 of 2
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              fontWeight: 600,
              color: 'var(--deep-olive)',
              lineHeight: 1.2,
              marginTop: '4px',
            }}
          >
            Complete your guest details
          </h1>

          <p
            style={{
              fontSize: '14.5px',
              color: 'var(--text-muted)',
              marginTop: '4px',
            }}
          >
            Please provide your details below to
            continue your reservation at SAGA.
          </p>
        </div>

        {/* =========================
            CONTENT GRID
        ========================= */}

        <div
          className="guest-content-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* =========================
              LEFT FORM
          ========================= */}

          <Card style={{ padding: '32px' }}>
            <form onSubmit={handleContinue}>
              {/* NAMES */}

              <div
                className="form-row-2col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <label className="form-label">
                    First Name *
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="input-control"
                    value={guestForm.firstName}
                    onChange={handleInputChange}
                    autoComplete="given-name"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">
                    Last Name *
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    className="input-control"
                    value={guestForm.lastName}
                    onChange={handleInputChange}
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>

              {/* EMAIL + PHONE */}

              <div
                className="form-row-2col"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '24px',
                }}
              >
                <div>
                  <label className="form-label">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="input-control"
                    value={guestForm.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    className="input-control"
                    value={guestForm.phone}
                    onChange={handleInputChange}
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              {/* SPECIAL REQUESTS */}

              <div style={{ marginBottom: '28px' }}>
                <label className="form-label">
                  Special Requests (Optional)
                </label>

                <textarea
                  name="specialRequests"
                  className="input-control"
                  style={{
                    height: '90px',
                    padding: '12px 14px',
                    resize: 'vertical',
                  }}
                  placeholder="Dietary requirements, anniversary celebration, arrival notes..."
                  value={guestForm.specialRequests}
                  onChange={handleInputChange}
                />
              </div>

              {/* PREFERENCES */}

              <div style={{ marginBottom: '32px' }}>
                <span
                  className="form-label"
                  style={{
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  Room Preferences
                </span>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  {roomPreferencesList.map((pref) => {
                    const isSelected =
                      preferences.includes(pref);

                    return (
                      <button
                        key={pref}
                        type="button"
                        onClick={() =>
                          togglePreference(pref)
                        }
                        style={{
                          padding: '7px 14px',
                          borderRadius:
                            'var(--radius-full)',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: 'pointer',

                          border: isSelected
                            ? '1px solid var(--deep-olive)'
                            : '1px solid var(--border-medium)',

                          backgroundColor: isSelected
                            ? 'var(--deep-olive)'
                            : '#FFFFFF',

                          color: isSelected
                            ? 'var(--dusky-ivory)'
                            : 'var(--text-main)',

                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition:
                            'all 0.15s ease',
                        }}
                      >
                        {isSelected && (
                          <Check size={13} />
                        )}

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
                iconRight={
                  <ArrowRight size={16} />
                }
                style={{
                  width: '100%',
                  height: '48px',
                }}
              >
                Continue to Payment
              </Button>
            </form>
          </Card>

          {/* =========================
              BOOKING SUMMARY
          ========================= */}

          <Card
            style={{
              padding: '0',
              overflow: 'hidden',
              position: 'sticky',
              top: '90px',
            }}
          >
            {/* IMAGE */}

            <div
              style={{
                height: '170px',
                position: 'relative',
              }}
            >
              {roomImage ? (
                <img
                  src={roomImage}
                  alt={room?.name || 'SAGA Room'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background:
                      'var(--deep-olive)',
                  }}
                />
              )}

              <div
                style={{
                  position: 'absolute',
                  inset: 0,

                  background:
                    'linear-gradient(to top, rgba(20, 18, 12, 0.75) 0%, transparent 100%)',

                  padding: '16px 20px',

                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',

                  color: '#FFFFFF',
                }}
              >
                <h3
                  style={{
                    fontFamily:
                      'var(--font-display)',

                    fontSize: '18px',

                    fontWeight: 600,
                  }}
                >
                  SAGA
                </h3>

                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--warm-gold)',
                  }}
                >
                  {room?.name}
                </span>
              </div>
            </div>

            {/* SUMMARY CONTENT */}

            <div style={{ padding: '20px 24px' }}>
              {/* DATES */}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  paddingBottom: '16px',
                  borderBottom:
                    '1px solid var(--border-light)',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '11px',
                      color:
                        'var(--aravalli-stone)',

                      textTransform:
                        'uppercase',

                      display: 'block',
                    }}
                  >
                    Check-in
                  </span>

                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color:
                        'var(--deep-olive)',
                    }}
                  >
                    {displayCheckIn}
                  </span>

                  <span
                    style={{
                      fontSize: '11px',
                      color:
                        'var(--text-muted)',

                      display: 'block',
                    }}
                  >
                    From 3:00 PM
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      fontSize: '11px',
                      color:
                        'var(--aravalli-stone)',

                      textTransform:
                        'uppercase',

                      display: 'block',
                    }}
                  >
                    Check-out
                  </span>

                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color:
                        'var(--deep-olive)',
                    }}
                  >
                    {displayCheckOut}
                  </span>

                  <span
                    style={{
                      fontSize: '11px',
                      color:
                        'var(--text-muted)',

                      display: 'block',
                    }}
                  >
                    Until 11:00 AM
                  </span>
                </div>
              </div>

              {/* GUESTS */}

              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  fontSize: '12px',
                }}
              >
                <span
                  style={{
                    color:
                      'var(--text-muted)',
                  }}
                >
                  Guests
                </span>

                <strong
                  style={{
                    color:
                      'var(--deep-olive)',
                  }}
                >
                  {searchParams?.guests ||
                    '2 Guests, 1 Room'}
                </strong>
              </div>

              {/* =========================
                  PRICE BREAKDOWN
              ========================= */}

              <div
                style={{
                  backgroundColor:
                    'var(--dusky-ivory)',

                  borderRadius:
                    'var(--radius-sm)',

                  padding: '14px 16px',

                  marginBottom: '18px',
                }}
              >
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,

                    color:
                      'var(--deep-olive)',

                    marginBottom: '10px',
                  }}
                >
                  Price Breakdown
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',

                    fontSize: '13px',

                    color:
                      'var(--text-muted)',

                    marginBottom: '6px',

                    gap: '12px',
                  }}
                >
                  <span>
                    ₹
                    {nightlyRate.toLocaleString(
                      'en-IN'
                    )}{' '}
                    × {nights}{' '}
                    {nights === 1
                      ? 'night'
                      : 'nights'}
                  </span>

                  <span>
                    ₹
                    {roomTotal.toLocaleString(
                      'en-IN'
                    )}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',

                    fontSize: '13px',

                    color:
                      'var(--text-muted)',

                    marginBottom: '6px',
                  }}
                >
                  <span>
                    Taxes & GST (18%)
                  </span>

                  <span>
                    ₹
                    {taxes.toLocaleString(
                      'en-IN'
                    )}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',

                    fontSize: '13px',

                    color:
                      'var(--text-muted)',

                    marginBottom:
                      discount > 0
                        ? '6px'
                        : '8px',
                  }}
                >
                  <span>
                    Resort Fee
                  </span>

                  <span>
                    ₹
                    {resortFee.toLocaleString(
                      'en-IN'
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        'space-between',

                      fontSize: '13px',

                      color:
                        'var(--warm-gold)',

                      marginBottom: '8px',
                    }}
                  >
                    <span>
                      Discount
                    </span>

                    <span>
                      − ₹
                      {discount.toLocaleString(
                        'en-IN'
                      )}
                    </span>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',

                    alignItems:
                      'baseline',

                    paddingTop: '10px',

                    borderTop:
                      '1px solid var(--border-medium)',

                    color:
                      'var(--deep-olive)',

                    fontWeight: 700,

                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                    }}
                  >
                    Total Amount
                  </span>

                  <span
                    style={{
                      fontFamily:
                        'var(--font-display)',

                      fontSize: '20px',
                    }}
                  >
                    ₹
                    {total.toLocaleString(
                      'en-IN'
                    )}
                  </span>
                </div>
              </div>

              {/* TRUST NOTES */}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',

                    fontSize: '12px',

                    color:
                      'var(--text-muted)',
                  }}
                >
                  <ShieldCheck
                    size={15}
                    style={{
                      color:
                        'var(--warm-gold)',

                      flexShrink: 0,
                    }}
                  />

                  <span>
                    Secure reservation and
                    protected guest details.
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',

                    fontSize: '12px',

                    color:
                      'var(--text-muted)',
                  }}
                >
                  <CalendarCheck
                    size={15}
                    style={{
                      color:
                        'var(--warm-gold)',

                      flexShrink: 0,
                    }}
                  />

                  <span>
                    Free cancellation up to
                    48 hours before check-in.
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* =========================
          RESPONSIVE
      ========================= */}

      <style>
        {`
          @media (max-width: 900px) {
            .guest-content-grid {
              grid-template-columns: 1fr !important;
            }

            .guest-content-grid > div:last-child {
              position: static !important;
            }
          }

          @media (max-width: 640px) {
            .form-row-2col {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}