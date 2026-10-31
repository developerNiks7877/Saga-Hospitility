import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Check,
  ArrowRight,
  CalendarDays,
  Users,
  BedDouble,
  Search,
} from 'lucide-react';

import { useBooking } from '../context/BookingContext';

import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function Rooms() {
  const navigate = useNavigate();

  const {
    rooms,
    roomsLoading,
    roomsError,

    searchParams,
    setSearchParams,

    availabilityRooms,
    availabilityLoading,
    availabilityError,
    hasCheckedAvailability,
    checkAvailability,

    selectRoom,
  } = useBooking();

  /* =========================
     LOCAL SEARCH FORM
  ========================= */

  const [formData, setFormData] = useState({
    checkIn:
      searchParams?.checkIn ||
      '2026-10-14',

    checkOut:
      searchParams?.checkOut ||
      '2026-10-17',

    guests:
      searchParams?.guests ||
      '2 Guests, 1 Room',

    roomType:
      searchParams?.roomType ||
      'all',
  });

  const [maxPrice, setMaxPrice] =
    useState(50000);

  /* =========================
     SYNC SEARCH PARAMS
  ========================= */

  useEffect(() => {
    setFormData({
      checkIn:
        searchParams?.checkIn ||
        '2026-10-14',

      checkOut:
        searchParams?.checkOut ||
        '2026-10-17',

      guests:
        searchParams?.guests ||
        '2 Guests, 1 Room',

      roomType:
        searchParams?.roomType ||
        'all',
    });
  }, [searchParams]);

  /* =========================
     SOURCE OF ROOM CARDS
  ========================= */

  const roomSource =
    hasCheckedAvailability
      ? availabilityRooms
      : rooms;

  /* =========================
     PRICE FILTER
  ========================= */

  const filteredRooms = useMemo(() => {
    return roomSource.filter((room) => {
      if (
        room.pricePerNight > maxPrice
      ) {
        return false;
      }

      return true;
    });
  }, [roomSource, maxPrice]);

  /* =========================
     FORM HANDLER
  ========================= */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     CHECK AVAILABILITY
  ========================= */

  const handleAvailability =
    async (event) => {
      event.preventDefault();

      const result =
        await checkAvailability(
          formData
        );

      if (result?.success) {
        setSearchParams(formData);
      }
    };

  /* =========================
     BOOK ROOM
  ========================= */

  const handleBook = (
    room
  ) => {
    if (
      hasCheckedAvailability &&
      room.available === false
    ) {
      return;
    }

    selectRoom(
      room,
      room.nights
    );

    navigate('/booking/guest');
  };

  /* =========================
     ROOM AVAILABILITY TEXT
  ========================= */

  const getAvailabilityText = (
    room
  ) => {
    if (
      !hasCheckedAvailability
    ) {
      return `${room.totalRooms || 3} rooms in this category`;
    }

    if (room.available === false) {
      return 'Sold out for selected dates';
    }

    if (
      room.remainingRooms === 1
    ) {
      return 'Only 1 room left';
    }

    if (
      room.remainingRooms > 1
    ) {
      return `${room.remainingRooms} rooms available`;
    }

    return 'Availability confirmed';
  };

  /* =========================
     LOADING ROOMS
  ========================= */

  if (roomsLoading) {
    return (
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          minHeight: '60vh',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          style={{
            padding: '48px 60px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',

              border:
                '2px solid var(--border-medium)',

              borderTopColor:
                'var(--deep-olive)',

              borderRadius: '50%',

              margin:
                '0 auto 20px',

              animation:
                'roomsSpin 0.8s linear infinite',
            }}
          />

          <h2
            style={{
              fontFamily:
                'var(--font-display)',

              color:
                'var(--deep-olive)',

              fontSize: '22px',

              marginBottom: '6px',
            }}
          >
            Preparing your stay
          </h2>

          <p
            style={{
              color:
                'var(--text-muted)',

              fontSize: '13px',
            }}
          >
            Loading SAGA rooms.
          </p>

          <style>
            {`
              @keyframes roomsSpin {
                to {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </Card>
      </div>
    );
  }

  /* =========================
     ROOMS ERROR
  ========================= */

  if (
    roomsError &&
    rooms.length === 0
  ) {
    return (
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          minHeight: '60vh',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          style={{
            padding: '50px',
            textAlign: 'center',
            maxWidth: '520px',
          }}
        >
          <h2
            style={{
              fontFamily:
                'var(--font-display)',

              fontSize: '24px',

              color:
                'var(--deep-olive)',
            }}
          >
            Rooms could not be loaded
          </h2>

          <p
            style={{
              color:
                'var(--text-muted)',

              marginTop: '10px',

              lineHeight: 1.6,

              fontSize: '14px',
            }}
          >
            {roomsError}
          </p>

          <Button
            variant="primary"
            size="md"
            style={{
              marginTop: '22px',
            }}
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="rooms-booking-page"
      style={{
        maxWidth: '1240px',
        margin: '0 auto',
      }}
    >
      {/* =========================
          PAGE HEADER
      ========================= */}

      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,

            color:
              'var(--warm-gold)',

            letterSpacing:
              '0.14em',

            textTransform:
              'uppercase',
          }}
        >
          SAGA
        </span>

        <h1
          style={{
            fontFamily:
              'var(--font-display)',

            fontSize:
              'clamp(30px, 4vw, 42px)',

            fontWeight: 600,

            color:
              'var(--deep-olive)',

            marginTop: '3px',
          }}
        >
          Find Your Stay
        </h1>

        <p
          style={{
            fontSize: '14px',

            color:
              'var(--text-muted)',

            marginTop: '5px',

            maxWidth: '700px',

            lineHeight: 1.6,
          }}
        >
          Choose your dates and discover
          available rooms for your time
          in Jawai.
        </p>
      </div>

      {/* =========================
          AVAILABILITY SEARCH
      ========================= */}

      <Card className="rooms-search-card"
        style={{
          marginBottom: '30px',

          padding: '24px',

          border:
            '1px solid var(--border-medium)',

          boxShadow:
            'var(--shadow-card)',

          backgroundColor:
            '#FFFFFF',
        }}
      >
        <form
          onSubmit={
            handleAvailability
          }
        >
          <div
            style={{
              display: 'grid',

              gridTemplateColumns:
                'repeat(4, minmax(150px, 1fr)) auto',

              gap: '14px',

              alignItems: 'end',
            }}
            className="availability-search-grid"
          >
            {/* CHECK IN */}

            <div>
              <label
                style={{
                  display: 'flex',

                  alignItems:
                    'center',

                  gap: '6px',

                  fontSize:
                    '11px',

                  fontWeight: 700,

                  color:
                    'var(--deep-olive)',

                  letterSpacing:
                    '0.08em',

                  textTransform:
                    'uppercase',

                  marginBottom:
                    '8px',
                }}
              >
                <CalendarDays
                  size={14}
                />
                Check In
              </label>

              <input
                type="date"
                name="checkIn"
                value={
                  formData.checkIn
                }
                onChange={
                  handleChange
                }
                required
                style={{
                  width: '100%',

                  minHeight:
                    '46px',

                  border:
                    '1px solid var(--border-medium)',

                  borderRadius:
                    'var(--radius-sm)',

                  padding:
                    '0 12px',

                  fontFamily:
                    'inherit',

                  fontSize:
                    '13px',

                  color:
                    'var(--text-main)',

                  backgroundColor:
                    '#FFFFFF',

                  outline: 'none',
                }}
              />
            </div>

            {/* CHECK OUT */}

            <div>
              <label
                style={{
                  display: 'flex',

                  alignItems:
                    'center',

                  gap: '6px',

                  fontSize:
                    '11px',

                  fontWeight: 700,

                  color:
                    'var(--deep-olive)',

                  letterSpacing:
                    '0.08em',

                  textTransform:
                    'uppercase',

                  marginBottom:
                    '8px',
                }}
              >
                <CalendarDays
                  size={14}
                />
                Check Out
              </label>

              <input
                type="date"
                name="checkOut"
                value={
                  formData.checkOut
                }
                min={
                  formData.checkIn
                }
                onChange={
                  handleChange
                }
                required
                style={{
                  width: '100%',

                  minHeight:
                    '46px',

                  border:
                    '1px solid var(--border-medium)',

                  borderRadius:
                    'var(--radius-sm)',

                  padding:
                    '0 12px',

                  fontFamily:
                    'inherit',

                  fontSize:
                    '13px',

                  color:
                    'var(--text-main)',

                  backgroundColor:
                    '#FFFFFF',

                  outline: 'none',
                }}
              />
            </div>

            {/* GUESTS */}

            <div>
              <label
                style={{
                  display: 'flex',

                  alignItems:
                    'center',

                  gap: '6px',

                  fontSize:
                    '11px',

                  fontWeight: 700,

                  color:
                    'var(--deep-olive)',

                  letterSpacing:
                    '0.08em',

                  textTransform:
                    'uppercase',

                  marginBottom:
                    '8px',
                }}
              >
                <Users
                  size={14}
                />
                Guests
              </label>

              <select
                name="guests"
                value={
                  formData.guests
                }
                onChange={
                  handleChange
                }
                style={{
                  width: '100%',

                  minHeight:
                    '46px',

                  border:
                    '1px solid var(--border-medium)',

                  borderRadius:
                    'var(--radius-sm)',

                  padding:
                    '0 12px',

                  fontFamily:
                    'inherit',

                  fontSize:
                    '13px',

                  color:
                    'var(--text-main)',

                  backgroundColor:
                    '#FFFFFF',

                  outline: 'none',
                }}
              >
                <option value="1 Guest, 1 Room">
                  1 Guest, 1 Room
                </option>

                <option value="2 Guests, 1 Room">
                  2 Guests, 1 Room
                </option>

                <option value="3 Guests, 1 Room">
                  3 Guests, 1 Room
                </option>

                <option value="4 Guests, 1 Room">
                  4 Guests, 1 Room
                </option>

                <option value="2 Guests, 2 Rooms">
                  2 Guests, 2 Rooms
                </option>

                <option value="4 Guests, 2 Rooms">
                  4 Guests, 2 Rooms
                </option>
              </select>
            </div>

            {/* ROOM TYPE */}

            <div>
              <label
                style={{
                  display: 'flex',

                  alignItems:
                    'center',

                  gap: '6px',

                  fontSize:
                    '11px',

                  fontWeight: 700,

                  color:
                    'var(--deep-olive)',

                  letterSpacing:
                    '0.08em',

                  textTransform:
                    'uppercase',

                  marginBottom:
                    '8px',
                }}
              >
                <BedDouble
                  size={14}
                />
                Room Type
              </label>

              <select
                name="roomType"
                value={
                  formData.roomType
                }
                onChange={
                  handleChange
                }
                style={{
                  width: '100%',

                  minHeight:
                    '46px',

                  border:
                    '1px solid var(--border-medium)',

                  borderRadius:
                    'var(--radius-sm)',

                  padding:
                    '0 12px',

                  fontFamily:
                    'inherit',

                  fontSize:
                    '13px',

                  color:
                    'var(--text-main)',

                  backgroundColor:
                    '#FFFFFF',

                  outline: 'none',
                }}
              >
                <option value="all">
                  All Rooms
                </option>

                <option value="Deluxe">
                  Deluxe
                </option>

                <option value="Super Deluxe">
                  Super Deluxe
                </option>

                <option value="Suite">
                  Executive Suite
                </option>
              </select>
            </div>

            {/* SEARCH BUTTON */}

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={
                availabilityLoading
              }
              iconRight={
                availabilityLoading
                  ? null
                  : (
                    <Search
                      size={16}
                    />
                  )
              }
              style={{
                minHeight:
                  '46px',

                whiteSpace:
                  'nowrap',

                padding:
                  '0 24px',
              }}
            >
              {availabilityLoading
                ? 'Checking...'
                : 'Check Availability'}
            </Button>
          </div>
        </form>

        {/* API ERROR */}

        {availabilityError && (
          <div
            style={{
              marginTop:
                '16px',

              padding:
                '12px 14px',

              border:
                '1px solid rgba(155, 61, 43, 0.22)',

              borderRadius:
                'var(--radius-sm)',

              backgroundColor:
                'rgba(155, 61, 43, 0.06)',

              fontSize:
                '12.5px',

              color:
                '#843D31',
            }}
          >
            {
              availabilityError
            }
          </div>
        )}

        {/* SUCCESS SUMMARY */}

        {hasCheckedAvailability &&
          !availabilityError && (
            <div
              style={{
                marginTop:
                  '16px',

                paddingTop:
                  '15px',

                borderTop:
                  '1px solid var(--border-light)',

                display:
                  'flex',

                alignItems:
                  'center',

                justifyContent:
                  'space-between',

                flexWrap:
                  'wrap',

                gap: '10px',
              }}
            >
              <div>
                <strong
                  style={{
                    fontSize:
                      '13px',

                    color:
                      'var(--deep-olive)',
                  }}
                >
                  Availability updated
                </strong>

                <span
                  style={{
                    display:
                      'block',

                    marginTop:
                      '3px',

                    fontSize:
                      '12px',

                    color:
                      'var(--text-muted)',
                  }}
                >
                  {
                    formData.checkIn
                  }{' '}
                  →{' '}
                  {
                    formData.checkOut
                  }{' '}
                  ·{' '}
                  {
                    formData.guests
                  }
                </span>
              </div>

              <span
                style={{
                  fontSize:
                    '12px',

                  color:
                    'var(--warm-gold)',

                  fontWeight: 600,
                }}
              >
                {
                  availabilityRooms.filter(
                    (room) =>
                      room.available
                  ).length
                }{' '}
                room types available
              </span>
            </div>
          )}
      </Card>

      {/* =========================
          RATE FILTER
      ========================= */}

      <Card
        style={{
          padding:
            '16px 22px',

          marginBottom:
            '28px',

          display: 'flex',

          justifyContent:
            'space-between',

          alignItems:
            'center',

          flexWrap: 'wrap',

          gap: '15px',
        }}
      >
        <div>
          <span
            style={{
              fontSize:
                '12px',

              color:
                'var(--text-muted)',
            }}
          >
            {hasCheckedAvailability
              ? `${filteredRooms.length} results for your selected stay`
              : `${filteredRooms.length} room categories`}
          </span>
        </div>

        <div
          style={{
            display: 'flex',

            alignItems:
              'center',

            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize:
                '12.5px',

              color:
                'var(--aravalli-stone)',
            }}
          >
            Max Rate:{' '}

            <strong>
              ₹
              {maxPrice.toLocaleString(
                'en-IN'
              )}
            </strong>
          </span>

          <input
            type="range"
            min="10000"
            max="50000"
            step="2000"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(
                Number(
                  event.target
                    .value
                )
              )
            }
            style={{
              accentColor:
                'var(--deep-olive)',

              cursor: 'pointer',
            }}
          />
        </div>
      </Card>

      {/* =========================
          ROOM CARDS
      ========================= */}

      <div
        style={{
          display: 'flex',

          flexDirection:
            'column',

          gap: '28px',
        }}
      >
        {filteredRooms.length >
        0 ? (
          filteredRooms.map(
            (room) => {
              const soldOut =
                hasCheckedAvailability &&
                room.available ===
                  false;

              return (
                <Card
                  key={room.id}
                  className="room-detail-card"
                  style={{
                    display:
                      'grid',

                    gridTemplateColumns:
                      'minmax(300px, 420px) 1fr',

                    borderRadius:
                      'var(--radius-lg)',

                    overflow:
                      'hidden',

                    border:
                      '1px solid var(--border-medium)',

                    boxShadow:
                      'var(--shadow-card)',

                    opacity:
                      soldOut
                        ? 0.68
                        : 1,
                  }}
                >
                  {/* IMAGE */}

                  <div
                    style={{
                      position:
                        'relative',

                      minHeight:
                        '280px',
                    }}
                  >
                    <img
                      src={
                        room.image
                      }
                      alt={
                        room.name
                      }
                      loading="lazy"
                      style={{
                        width:
                          '100%',

                        height:
                          '100%',

                        objectFit:
                          'cover',

                        filter:
                          soldOut
                            ? 'grayscale(35%)'
                            : 'none',
                      }}
                    />

                    <div
                      style={{
                        position:
                          'absolute',

                        top:
                          '14px',

                        left:
                          '14px',
                      }}
                    >
                      <Badge
                        variant="olive"
                      >
                        {
                          room.category
                        }
                      </Badge>
                    </div>

                    {soldOut && (
                      <div
                        style={{
                          position:
                            'absolute',

                          inset: 0,

                          display:
                            'flex',

                          alignItems:
                            'center',

                          justifyContent:
                            'center',

                          background:
                            'rgba(20,20,18,0.28)',
                        }}
                      >
                        <span
                          style={{
                            padding:
                              '8px 15px',

                            backgroundColor:
                              '#FFFFFF',

                            borderRadius:
                              'var(--radius-sm)',

                            fontSize:
                              '11px',

                            fontWeight:
                              700,

                            letterSpacing:
                              '0.1em',

                            textTransform:
                              'uppercase',

                            color:
                              'var(--deep-olive)',
                          }}
                        >
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}

                  <div
                    style={{
                      padding:
                        '28px 32px',

                      display:
                        'flex',

                      flexDirection:
                        'column',

                      justifyContent:
                        'space-between',

                      backgroundColor:
                        '#FFFFFF',
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontFamily:
                            'var(--font-display)',

                          fontSize:
                            '24px',

                          fontWeight:
                            600,

                          color:
                            'var(--deep-olive)',
                        }}
                      >
                        {
                          room.name
                        }
                      </h2>

                      <div
                        style={{
                          display:
                            'flex',

                          gap:
                            '16px',

                          flexWrap:
                            'wrap',

                          fontSize:
                            '13px',

                          color:
                            'var(--aravalli-stone)',

                          marginTop:
                            '6px',
                        }}
                      >
                        <span>
                          {
                            room.size
                          }
                        </span>

                        <span>
                          {
                            room.bed
                          }
                        </span>

                        <span>
                          {
                            room.occupancy
                          }
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize:
                            '14px',

                          color:
                            'var(--text-muted)',

                          lineHeight:
                            1.6,

                          marginTop:
                            '14px',

                          marginBottom:
                            '18px',
                        }}
                      >
                        {
                          room.description
                        }
                      </p>

                      <div
                        style={{
                          display:
                            'flex',

                          flexWrap:
                            'wrap',

                          gap: '8px',

                          marginBottom:
                            '22px',
                        }}
                      >
                        {room.features?.map(
                          (
                            feature,
                            index
                          ) => (
                            <span
                              key={`${room.id}-${index}`}
                              style={{
                                fontSize:
                                  '12px',

                                color:
                                  'var(--deep-olive)',

                                backgroundColor:
                                  'var(--dusky-ivory)',

                                border:
                                  '1px solid var(--border-light)',

                                padding:
                                  '4px 10px',

                                borderRadius:
                                  'var(--radius-sm)',

                                display:
                                  'flex',

                                alignItems:
                                  'center',

                                gap:
                                  '5px',
                              }}
                            >
                              <Check
                                size={
                                  12
                                }
                                style={{
                                  color:
                                    'var(--warm-gold)',
                                }}
                              />

                              {
                                feature
                              }
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* =========================
                        PRICE + AVAILABILITY
                    ========================= */}

                    <div
                      style={{
                        paddingTop:
                          '18px',

                        borderTop:
                          '1px solid var(--border-light)',
                      }}
                    >
                      {hasCheckedAvailability && (
                        <div
                          style={{
                            display:
                              'flex',

                            alignItems:
                              'center',

                            justifyContent:
                              'space-between',

                            flexWrap:
                              'wrap',

                            gap:
                              '10px',

                            marginBottom:
                              '13px',
                          }}
                        >
                          <span
                            style={{
                              fontSize:
                                '12px',

                              fontWeight:
                                700,

                              color:
                                soldOut
                                  ? '#914A3C'
                                  : room.remainingRooms ===
                                      1
                                    ? '#A16A25'
                                    : 'var(--deep-olive)',
                            }}
                          >
                            {getAvailabilityText(
                              room
                            )}
                          </span>

                          {room.nights && (
                            <span
                              style={{
                                fontSize:
                                  '11.5px',

                                color:
                                  'var(--text-muted)',
                              }}
                            >
                              {
                                room.nights
                              }{' '}
                              night
                              {room.nights >
                              1
                                ? 's'
                                : ''}
                            </span>
                          )}
                        </div>
                      )}

                      <div
                        style={{
                          display:
                            'flex',

                          alignItems:
                            'center',

                          justifyContent:
                            'space-between',

                          flexWrap:
                            'wrap',

                          gap:
                            '16px',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display:
                                'flex',

                              alignItems:
                                'baseline',

                              gap:
                                '8px',

                              flexWrap:
                                'wrap',
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  'var(--font-display)',

                                fontSize:
                                  '28px',

                                fontWeight:
                                  700,

                                color:
                                  'var(--deep-olive)',
                              }}
                            >
                              ₹
                              {room.pricePerNight?.toLocaleString(
                                'en-IN'
                              )}
                            </span>

                            {room.originalPrice && (
                              <span
                                style={{
                                  fontSize:
                                    '14px',

                                  color:
                                    'var(--text-light)',

                                  textDecoration:
                                    'line-through',
                                }}
                              >
                                ₹
                                {room.originalPrice.toLocaleString(
                                  'en-IN'
                                )}
                              </span>
                            )}

                            <span
                              style={{
                                fontSize:
                                  '12px',

                                color:
                                  'var(--aravalli-stone)',
                              }}
                            >
                              /
                              night
                              +
                              taxes
                            </span>
                          </div>

                          {hasCheckedAvailability &&
                            room.estimatedRoomTotal !==
                              undefined && (
                              <span
                                style={{
                                  display:
                                    'block',

                                  marginTop:
                                    '4px',

                                  fontSize:
                                    '11.5px',

                                  color:
                                    'var(--warm-gold)',

                                  fontWeight:
                                    600,
                                }}
                              >
                                Estimated
                                room
                                total:{' '}
                                ₹
                                {Number(
                                  room.estimatedRoomTotal
                                ).toLocaleString(
                                  'en-IN'
                                )}
                              </span>
                            )}

                          {!hasCheckedAvailability && (
                            <span
                              style={{
                                display:
                                  'block',

                                marginTop:
                                  '4px',

                                fontSize:
                                  '11.5px',

                                color:
                                  'var(--warm-gold)',

                                fontWeight:
                                  600,
                              }}
                            >
                              {
                                room.totalRooms ||
                                3
                              }{' '}
                              rooms
                              in
                              this
                              category
                            </span>
                          )}
                        </div>

                        <Button
                          variant="primary"
                          size="md"
                          disabled={
                            soldOut
                          }
                          iconRight={
                            !soldOut ? (
                              <ArrowRight
                                size={
                                  16
                                }
                              />
                            ) : null
                          }
                          onClick={() =>
                            handleBook(
                              room
                            )
                          }
                        >
                          {soldOut
                            ? 'Unavailable'
                            : 'Select & Reserve'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            }
          )
        ) : (
          <Card
            style={{
              textAlign:
                'center',

              padding:
                '60px 20px',
            }}
          >
            <h3
              style={{
                fontFamily:
                  'var(--font-display)',

                fontSize:
                  '20px',

                color:
                  'var(--deep-olive)',
              }}
            >
              No rooms found.
            </h3>

            <p
              style={{
                fontSize:
                  '14px',

                color:
                  'var(--text-muted)',

                marginTop:
                  '6px',
              }}
            >
              Try changing your dates,
              room type, or maximum
              nightly rate.
            </p>

            <Button
              variant="outline"
              size="sm"
              style={{
                marginTop:
                  '16px',
              }}
              onClick={() => {
                setMaxPrice(50000);

                setFormData({
                  checkIn:
                    '2026-10-14',

                  checkOut:
                    '2026-10-17',

                  guests:
                    '2 Guests, 1 Room',

                  roomType:
                    'all',
                });
              }}
            >
              Reset Search
            </Button>
          </Card>
        )}
      </div>

      {/* =========================
          RESPONSIVE CSS
      ========================= */}

      <style>
        {`
          @media (max-width: 1050px) {
            .availability-search-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .availability-search-grid > button {
              width: 100%;
            }
          }

          @media (max-width: 760px) {
            .availability-search-grid {
              grid-template-columns: 1fr !important;
            }

            .room-detail-card {
              grid-template-columns: 1fr !important;
            }

            .room-detail-card > div:first-child {
              min-height: 240px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
