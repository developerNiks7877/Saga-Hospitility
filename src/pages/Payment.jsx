import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CreditCard,
  QrCode,
  Building,
  Lock,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';

import BookingHeader from '../components/layout/BookingHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Payment() {
  const navigate = useNavigate();

  const {
    activeDraft,
    completeBooking,
    searchParams,
  } = useBooking();

  const { showToast } = useToast();

  const [activeMethod, setActiveMethod] =
    useState('card');

  const [loading, setLoading] =
    useState(false);

  /* =========================
     BOOKING DATA
  ========================= */

  const stay = activeDraft?.stay;
  const room = activeDraft?.room;
  const dates = activeDraft?.dates;
  const pricing = activeDraft?.pricing;
  const guestDetails =
    activeDraft?.guestDetails;

  /* =========================
     CARD FORM
  ========================= */

  const [cardForm, setCardForm] =
    useState({
      cardNumber: '',
      expiry: '',
      cvv: '',
      nameOnCard:
        guestDetails?.firstName
          ? `${guestDetails.firstName} ${
              guestDetails.lastName || ''
            }`.trim()
          : '',
    });

  /* =========================
     UPI
  ========================= */

  const [upiId, setUpiId] =
    useState('');

  /* =========================
     NET BANKING
  ========================= */

  const [
    selectedBank,
    setSelectedBank,
  ] = useState('');

  /* =========================
     SAFE PRICING
  ========================= */

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
    Number(pricing?.resortFee) ||
    3500;

  const discount =
    Number(pricing?.discount) ||
    0;

  const total =
    Number(pricing?.total) ||
    roomTotal +
      taxes +
      resortFee -
      discount;

  /* =========================
     ROOM IMAGE
  ========================= */

  const roomImage =
    room?.image ||
    stay?.heroImage ||
    stay?.images?.[0] ||
    '';

  /* =========================
     DISPLAY DATES
  ========================= */

  const displayDateRange =
    useMemo(() => {
      const checkIn =
        dates?.checkIn ||
        searchParams?.checkIn ||
        '';

      const checkOut =
        dates?.checkOut ||
        searchParams?.checkOut ||
        '';

      return `${checkIn} - ${checkOut}`;
    }, [
      dates?.checkIn,
      dates?.checkOut,
      searchParams?.checkIn,
      searchParams?.checkOut,
    ]);

  /* =========================
     CARD FORMATTER
  ========================= */

  const handleCardNumber = (
    event
  ) => {
    const raw =
      event.target.value
        .replace(/\D/g, '')
        .slice(0, 19);

    const formatted =
      raw.replace(
        /(.{4})/g,
        '$1 '
      ).trim();

    setCardForm((prev) => ({
      ...prev,
      cardNumber: formatted,
    }));
  };

  const handleExpiry = (
    event
  ) => {
    let value =
      event.target.value
        .replace(/\D/g, '')
        .slice(0, 4);

    if (value.length >= 3) {
      value = `${value.slice(
        0,
        2
      )}/${value.slice(2)}`;
    }

    setCardForm((prev) => ({
      ...prev,
      expiry: value,
    }));
  };

  /* =========================
     VALIDATION
  ========================= */

  const validateMethod = () => {
    if (activeMethod === 'card') {
      const cardDigits =
        cardForm.cardNumber.replace(
          /\s/g,
          ''
        );

      if (
        cardDigits.length < 12 ||
        !cardForm.expiry ||
        cardForm.cvv.length < 3 ||
        !cardForm.nameOnCard.trim()
      ) {
        showToast(
          'error',
          'Please enter valid card details.'
        );

        return false;
      }
    }

    if (activeMethod === 'upi') {
      if (
        !upiId.trim() ||
        !upiId.includes('@')
      ) {
        showToast(
          'error',
          'Please enter a valid UPI ID.'
        );

        return false;
      }
    }

    if (
      activeMethod ===
        'netbanking' &&
      !selectedBank
    ) {
      showToast(
        'error',
        'Please select your bank.'
      );

      return false;
    }

    return true;
  };

  /* =========================
     TEMPORARY BOOKING FLOW

     Real payment gateway will
     replace this function later.
  ========================= */

  const handleConfirm = async (
    event
  ) => {
    event.preventDefault();

    if (!room) {
      showToast(
        'error',
        'No room selected.'
      );

      navigate('/rooms');
      return;
    }

    if (!validateMethod()) {
      return;
    }

    try {
      setLoading(true);

      /*
       * PAYMENT GATEWAY NOT
       * CONNECTED YET.
       *
       * No card/UPI/bank details
       * are sent or stored.
       */

      const methodLabels = {
        card: 'Card',
        upi: 'UPI',
        netbanking:
          'Net Banking',
      };

      const booking =
        await completeBooking(
          methodLabels[
            activeMethod
          ]
        );

      if (!booking) {
        throw new Error(
          'Unable to create reservation.'
        );
      }

      showToast(
        'success',
        'Reservation created successfully.'
      );

      navigate(
        '/booking/confirmation'
      );
    } catch (error) {
      console.error(
        'Reservation error:',
        error
      );

      showToast(
        'error',
        error?.message ||
          'Unable to complete reservation.'
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     NO ROOM GUARD
  ========================= */

  if (!room) {
    return (
      <div
        style={{
          backgroundColor:
            'var(--dusky-ivory)',
          minHeight: '100vh',
        }}
      >
        <BookingHeader
          currentStep={2}
          backTo="/rooms"
          backText="Back to Rooms"
        />

        <main
  style={{
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '70px 24px 80px',
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
                fontFamily:
                  'var(--font-display)',
                color:
                  'var(--deep-olive)',
                fontSize: '26px',
              }}
            >
              No reservation found
            </h2>

            <p
              style={{
                marginTop: '8px',
                fontSize: '14px',
                color:
                  'var(--text-muted)',
              }}
            >
              Select a room before
              proceeding.
            </p>

            <Button
              variant="primary"
              size="md"
              style={{
                marginTop: '20px',
              }}
              onClick={() =>
                navigate('/rooms')
              }
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
        backgroundColor:
          'var(--dusky-ivory)',
        minHeight: '100vh',
      }}
    >
      <BookingHeader
        currentStep={2}
        backTo="/booking/guest"
        backText="Back to Guest Details"
      />

      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 24px 80px',
        }}
      >
        {/* =========================
            HEADER
        ========================= */}

        <div
          style={{
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color:
                'var(--warm-gold)',
              letterSpacing:
                '0.12em',
              textTransform:
                'uppercase',
            }}
          >
            Step 2 of 2
          </span>

          <h1
            style={{
              fontFamily:
                'var(--font-display)',
              fontSize: '36px',
              fontWeight: 600,
              color:
                'var(--deep-olive)',
              lineHeight: 1.2,
              marginTop: '4px',
            }}
          >
            Complete your reservation
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13.5px',
              color:
                'var(--text-muted)',
              marginTop: '6px',
            }}
          >
            <Lock
              size={14}
              style={{
                color:
                  'var(--warm-gold)',
              }}
            />

            <span>
              Choose your preferred
              payment method.
            </span>
          </div>
        </div>

        {/* =========================
            DEVELOPMENT NOTICE
        ========================= */}

        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',

            padding: '12px 15px',
            marginBottom: '22px',

            border:
              '1px solid var(--border-medium)',

            borderRadius:
              'var(--radius-sm)',

            backgroundColor:
              '#FFFFFF',

            fontSize: '12px',

            color:
              'var(--text-muted)',
          }}
        >
          <AlertCircle
            size={16}
            style={{
              color:
                'var(--warm-gold)',
              flexShrink: 0,
              marginTop: '1px',
            }}
          />

          <span>
            Payment gateway integration
            is currently in setup. No card,
            UPI or banking credentials are
            transmitted or stored during
            this testing flow.
          </span>
        </div>

        <div
          className="payment-content-grid"
          style={{
            display: 'grid',
            gridTemplateColumns:
              '1fr 380px',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* =========================
              PAYMENT METHODS
          ========================= */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* CARD */}

            <Card
              style={{
                padding: '0',
                overflow: 'hidden',
              }}
            >
              <div
                onClick={() =>
                  setActiveMethod(
                    'card'
                  )
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    'space-between',
                  padding: '18px 24px',

                  backgroundColor:
                    activeMethod ===
                    'card'
                      ? 'var(--bg-card-warm)'
                      : '#FFFFFF',

                  cursor: 'pointer',

                  borderBottom:
                    activeMethod ===
                    'card'
                      ? '1px solid var(--border-light)'
                      : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems:
                      'center',
                    gap: '12px',
                  }}
                >
                  <CreditCard
                    size={20}
                    style={{
                      color:
                        'var(--deep-olive)',
                    }}
                  />

                  <div>
                    <span
                      style={{
                        fontWeight:
                          600,
                        fontSize:
                          '15px',
                        color:
                          'var(--deep-olive)',
                      }}
                    >
                      Credit or Debit Card
                    </span>

                    <span
                      style={{
                        fontSize:
                          '12px',
                        color:
                          'var(--text-muted)',
                        display:
                          'block',
                      }}
                    >
                      Visa, Mastercard and
                      RuPay
                    </span>
                  </div>
                </div>

                <ChevronDown
                  size={18}
                  style={{
                    color:
                      'var(--aravalli-stone)',
                    transform:
                      activeMethod ===
                      'card'
                        ? 'rotate(180deg)'
                        : 'none',
                    transition:
                      'transform 0.2s ease',
                  }}
                />
              </div>

              {activeMethod ===
                'card' && (
                <div
                  style={{
                    padding: '24px',
                  }}
                >
                  <div
                    style={{
                      marginBottom:
                        '16px',
                    }}
                  >
                    <label className="form-label">
                      Card Number
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      className="input-control"
                      value={
                        cardForm.cardNumber
                      }
                      onChange={
                        handleCardNumber
                      }
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div
                    className="payment-form-row"
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        '1fr 1fr',
                      gap: '16px',
                      marginBottom:
                        '16px',
                    }}
                  >
                    <div>
                      <label className="form-label">
                        Expiry (MM/YY)
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        className="input-control"
                        value={
                          cardForm.expiry
                        }
                        onChange={
                          handleExpiry
                        }
                        maxLength={5}
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label className="form-label">
                        CVV
                      </label>

                      <input
                        type="password"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        maxLength={4}
                        className="input-control"
                        value={
                          cardForm.cvv
                        }
                        onChange={(
                          event
                        ) =>
                          setCardForm(
                            (
                              prev
                            ) => ({
                              ...prev,
                              cvv: event.target.value
                                .replace(
                                  /\D/g,
                                  ''
                                )
                                .slice(
                                  0,
                                  4
                                ),
                            })
                          )
                        }
                        placeholder="CVV"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">
                      Name on Card
                    </label>

                    <input
                      type="text"
                      autoComplete="cc-name"
                      className="input-control"
                      value={
                        cardForm.nameOnCard
                      }
                      onChange={(
                        event
                      ) =>
                        setCardForm(
                          (prev) => ({
                            ...prev,
                            nameOnCard:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* =========================
                UPI
            ========================= */}

            <Card
              style={{
                padding: '0',
                overflow: 'hidden',
              }}
            >
              <div
                onClick={() =>
                  setActiveMethod('upi')
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    'space-between',
                  padding: '18px 24px',

                  backgroundColor:
                    activeMethod ===
                    'upi'
                      ? 'var(--bg-card-warm)'
                      : '#FFFFFF',

                  cursor: 'pointer',

                  borderBottom:
                    activeMethod ===
                    'upi'
                      ? '1px solid var(--border-light)'
                      : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems:
                      'center',
                    gap: '12px',
                  }}
                >
                  <QrCode
                    size={20}
                    style={{
                      color:
                        'var(--deep-olive)',
                    }}
                  />

                  <div>
                    <span
                      style={{
                        fontWeight:
                          600,
                        fontSize:
                          '15px',
                        color:
                          'var(--deep-olive)',
                      }}
                    >
                      UPI
                    </span>

                    <span
                      style={{
                        fontSize:
                          '12px',
                        color:
                          'var(--text-muted)',
                        display:
                          'block',
                      }}
                    >
                      Google Pay, PhonePe,
                      Paytm and BHIM
                    </span>
                  </div>
                </div>

                <ChevronDown
                  size={18}
                  style={{
                    color:
                      'var(--aravalli-stone)',
                    transform:
                      activeMethod ===
                      'upi'
                        ? 'rotate(180deg)'
                        : 'none',
                  }}
                />
              </div>

              {activeMethod ===
                'upi' && (
                <div
                  style={{
                    padding: '24px',
                  }}
                >
                  <label className="form-label">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    className="input-control"
                    placeholder="yourname@bank"
                    value={upiId}
                    onChange={(
                      event
                    ) =>
                      setUpiId(
                        event.target
                          .value
                      )
                    }
                  />

                  <span
                    style={{
                      display: 'block',
                      marginTop: '6px',
                      fontSize: '12px',
                      color:
                        'var(--text-muted)',
                    }}
                  >
                    A payment request will
                    appear here once the
                    payment gateway is
                    connected.
                  </span>
                </div>
              )}
            </Card>

            {/* =========================
                NET BANKING
            ========================= */}

            <Card
              style={{
                padding: '0',
                overflow: 'hidden',
              }}
            >
              <div
                onClick={() =>
                  setActiveMethod(
                    'netbanking'
                  )
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent:
                    'space-between',
                  padding: '18px 24px',

                  backgroundColor:
                    activeMethod ===
                    'netbanking'
                      ? 'var(--bg-card-warm)'
                      : '#FFFFFF',

                  cursor: 'pointer',

                  borderBottom:
                    activeMethod ===
                    'netbanking'
                      ? '1px solid var(--border-light)'
                      : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems:
                      'center',
                    gap: '12px',
                  }}
                >
                  <Building
                    size={20}
                    style={{
                      color:
                        'var(--deep-olive)',
                    }}
                  />

                  <div>
                    <span
                      style={{
                        fontWeight:
                          600,
                        fontSize:
                          '15px',
                        color:
                          'var(--deep-olive)',
                      }}
                    >
                      Net Banking
                    </span>

                    <span
                      style={{
                        fontSize:
                          '12px',
                        color:
                          'var(--text-muted)',
                        display:
                          'block',
                      }}
                    >
                      Major Indian banks
                    </span>
                  </div>
                </div>

                <ChevronDown
                  size={18}
                  style={{
                    color:
                      'var(--aravalli-stone)',
                    transform:
                      activeMethod ===
                      'netbanking'
                        ? 'rotate(180deg)'
                        : 'none',
                  }}
                />
              </div>

              {activeMethod ===
                'netbanking' && (
                <div
                  style={{
                    padding: '24px',
                  }}
                >
                  <label className="form-label">
                    Select Your Bank
                  </label>

                  <select
                    className="input-control"
                    value={
                      selectedBank
                    }
                    onChange={(
                      event
                    ) =>
                      setSelectedBank(
                        event.target
                          .value
                      )
                    }
                  >
                    <option value="">
                      Select bank
                    </option>

                    <option value="State Bank of India">
                      State Bank of India
                    </option>

                    <option value="HDFC Bank">
                      HDFC Bank
                    </option>

                    <option value="ICICI Bank">
                      ICICI Bank
                    </option>

                    <option value="Axis Bank">
                      Axis Bank
                    </option>

                    <option value="Kotak Mahindra Bank">
                      Kotak Mahindra Bank
                    </option>
                  </select>
                </div>
              )}
            </Card>
          </div>

          {/* =========================
              BOOKING SUMMARY
          ========================= */}

          <Card
            style={{
              padding: '24px',
              position: 'sticky',
              top: '90px',
            }}
          >
            <h3
              style={{
                fontFamily:
                  'var(--font-display)',
                fontSize: '20px',
                fontWeight: 600,
                color:
                  'var(--deep-olive)',
                paddingBottom:
                  '14px',
                borderBottom:
                  '1px solid var(--border-light)',
                marginBottom:
                  '18px',
              }}
            >
              Booking Summary
            </h3>

            {/* ROOM */}

            <div
              style={{
                display: 'flex',
                gap: '14px',
                marginBottom: '20px',
              }}
            >
              {roomImage && (
                <img
                  src={roomImage}
                  alt={room?.name}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
              )}

              <div>
                <h4
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color:
                      'var(--deep-olive)',
                  }}
                >
                  {room?.name}
                </h4>

                <p
                  style={{
                    fontSize:
                      '12.5px',
                    color:
                      'var(--text-muted)',
                    marginTop: '3px',
                  }}
                >
                  {nights}{' '}
                  {nights === 1
                    ? 'Night'
                    : 'Nights'}
                  {' · '}
                  {searchParams?.guests ||
                    '2 Guests, 1 Room'}
                </p>

                <p
                  style={{
                    fontSize:
                      '11.5px',
                    color:
                      'var(--aravalli-stone)',
                    marginTop: '3px',
                  }}
                >
                  {displayDateRange}
                </p>
              </div>
            </div>

            {/* GUEST */}

            {guestDetails?.firstName && (
              <div
                style={{
                  paddingBottom:
                    '15px',
                  marginBottom: '15px',
                  borderBottom:
                    '1px solid var(--border-light)',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    color:
                      'var(--text-muted)',
                    textTransform:
                      'uppercase',
                    letterSpacing:
                      '0.08em',
                    marginBottom: '4px',
                  }}
                >
                  Primary Guest
                </span>

                <strong
                  style={{
                    fontSize: '13px',
                    color:
                      'var(--deep-olive)',
                  }}
                >
                  {guestDetails.firstName}{' '}
                  {guestDetails.lastName}
                </strong>
              </div>
            )}

            {/* PRICE */}

            <div
              style={{
                padding: '14px 0',

                borderTop:
                  '1px solid var(--border-light)',

                borderBottom:
                  '1px solid var(--border-light)',

                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  fontSize: '13.5px',
                  color:
                    'var(--text-muted)',
                  marginBottom: '8px',
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
                  fontSize: '13.5px',
                  color:
                    'var(--text-muted)',
                  marginBottom: '8px',
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
                  fontSize: '13.5px',
                  color:
                    'var(--text-muted)',
                  marginBottom:
                    discount > 0
                      ? '8px'
                      : '0',
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
                    fontSize:
                      '13.5px',
                    color:
                      'var(--rabari-red)',
                  }}
                >
                  <span>
                    Discount
                  </span>

                  <span>
                    −₹
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
                  paddingTop: '12px',
                  marginTop: '12px',
                  borderTop:
                    '1px solid var(--border-medium)',
                  fontWeight: 700,
                  color:
                    'var(--deep-olive)',
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
                    fontSize: '22px',
                  }}
                >
                  ₹
                  {total.toLocaleString(
                    'en-IN'
                  )}
                </span>
              </div>
            </div>

            {/* BUTTON */}

            <Button
              variant="primary"
              size="lg"
              loading={loading}
              onClick={handleConfirm}
              iconRight={
                <ArrowRight
                  size={16}
                />
              }
              style={{
                width: '100%',
                height: '48px',
                marginBottom: '14px',
              }}
            >
              Confirm Reservation
            </Button>

            <div
              style={{
                display: 'flex',
                alignItems:
                  'flex-start',
                gap: '7px',
                marginBottom: '10px',
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

              <span
                style={{
                  fontSize: '11.5px',
                  lineHeight: 1.5,
                  color:
                    'var(--text-muted)',
                }}
              >
                Your guest details are
                used only for this
                reservation.
              </span>
            </div>

            <p
              style={{
                textAlign: 'center',
                fontSize: '11.5px',
                color:
                  'var(--aravalli-stone)',
                lineHeight: 1.5,
              }}
            >
              By confirming, you agree to
              SAGA&apos;s booking
              and cancellation terms.
            </p>
          </Card>
        </div>
      </main>

      <style>
        {`
          @media (max-width: 900px) {
            .payment-content-grid {
              grid-template-columns: 1fr !important;
            }

            .payment-content-grid > div:last-child {
              position: static !important;
            }
          }

          @media (max-width: 600px) {
            .payment-form-row {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}