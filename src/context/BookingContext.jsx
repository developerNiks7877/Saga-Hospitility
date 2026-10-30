import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { hotelData } from '../data/hotelData';
import API_BASE_URL from '../config/api';
import authFetch from '../utils/authFetch';

const BookingContext = createContext(null);

/* =========================
   ROOM TYPE MAPPING

   Backend availability currently
   filters roomType against room.name.
========================= */

const mapRoomTypeForApi = (roomType) => {
  const roomMap = {
    Deluxe: 'Deluxe Room',
    'Super Deluxe': 'Super Deluxe Room',
    Suite: 'Executive Suite',
  };

  return roomMap[roomType] || roomType || 'all';
};

/* =========================
   DATE HELPERS
========================= */

const formatDisplayDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 1;

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);

  const difference =
    end.getTime() - start.getTime();

  const nights = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  return nights > 0 ? nights : 1;
};

export const BookingProvider = ({ children }) => {
  /* =========================
     ROOMS
  ========================= */

  const [rooms, setRooms] = useState(
    hotelData.rooms || []
  );

  const [roomsLoading, setRoomsLoading] =
    useState(true);

  const [roomsError, setRoomsError] =
    useState(null);

  /* =========================
     AVAILABILITY
  ========================= */

  const [
    availabilityRooms,
    setAvailabilityRooms,
  ] = useState([]);

  const [
    availabilityLoading,
    setAvailabilityLoading,
  ] = useState(false);

  const [
    availabilityError,
    setAvailabilityError,
  ] = useState(null);

  const [
    hasCheckedAvailability,
    setHasCheckedAvailability,
  ] = useState(false);

  /* =========================
     SEARCH PARAMS
  ========================= */

  const [searchParams, setSearchParams] =
    useState({
      checkIn: '2026-10-14',
      checkOut: '2026-10-17',
      guests: '2 Guests, 1 Room',
      roomType: 'all',
    });

  /* =========================
     ACTIVE BOOKING DRAFT
  ========================= */

  const [activeDraft, setActiveDraft] =
    useState({
      stay: hotelData,

      room:
        hotelData.rooms?.[0] || null,

      dates: {
        checkIn: 'Oct 14, 2026',
        checkOut: 'Oct 17, 2026',
        nights: 3,
      },

      guestDetails: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: '',
        preferences: [],
      },

      pricing: {
        nightlyRate: 0,
        nights: 3,
        roomTotal: 0,
        taxes: 0,
        resortFee: 3500,
        discount: 0,
        promoCode: null,
        total: 3500,
      },
    });

  /* =========================
     BOOKINGS
  ========================= */

  const [bookings, setBookings] = useState(
    () => {
      const saved = localStorage.getItem(
        'saga_user_bookings'
      );

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error(
            'Failed to parse saved bookings:',
            error
          );
        }
      }

      return [];
    }
  );

  const [
    latestConfirmedBooking,
    setLatestConfirmedBooking,
  ] = useState(null);

  /* =========================
     FETCH ALL ROOMS
  ========================= */

  useEffect(() => {
    let cancelled = false;

    const fetchRooms = async () => {
      try {
        setRoomsLoading(true);
        setRoomsError(null);

        const response = await fetch(
          `${API_BASE_URL}/api/rooms`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              'Failed to fetch rooms'
          );
        }

        const backendRooms =
          result?.data?.rooms;

        if (!Array.isArray(backendRooms)) {
          throw new Error(
            'Invalid rooms response'
          );
        }

        if (cancelled) return;

        setRooms(backendRooms);

        if (backendRooms.length > 0) {
          const defaultRoom =
            backendRooms[0];

          setActiveDraft((prev) => ({
            ...prev,

            stay: {
              ...hotelData,
              rooms: backendRooms,
            },

            room: defaultRoom,

            pricing: recalculatePrice(
              defaultRoom.pricePerNight,
              prev.dates.nights
            ),
          }));
        }
      } catch (error) {
        console.error(
          'Failed to fetch rooms:',
          error
        );

        if (!cancelled) {
          setRoomsError(error.message);

          setRooms(
            hotelData.rooms || []
          );
        }
      } finally {
        if (!cancelled) {
          setRoomsLoading(false);
        }
      }
    };

    fetchRooms();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================
     HOTEL OBJECT
  ========================= */

  const hotel = {
    ...hotelData,
    rooms,
  };

  /* =========================
     LOCAL STORAGE
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      'saga_user_bookings',
      JSON.stringify(bookings)
    );
  }, [bookings]);

  /* =========================
     PRICE CALCULATION
  ========================= */

  function recalculatePrice(
    rate = 0,
    nights = 1,
    discountPercent = 0,
    promoCode = null
  ) {
    const safeRate = Number(rate) || 0;
    const safeNights =
      Number(nights) > 0
        ? Number(nights)
        : 1;

    const roomTotal =
      safeRate * safeNights;

    const taxes = Math.round(
      roomTotal * 0.18
    );

    const resortFee = 3500;

    const subtotal =
      roomTotal + taxes + resortFee;

    const discount =
      discountPercent > 0
        ? Math.round(
            subtotal *
              (discountPercent / 100)
          )
        : 0;

    const total =
      subtotal - discount;

    return {
      nightlyRate: safeRate,
      nights: safeNights,
      roomTotal,
      taxes,
      resortFee,
      discount,
      promoCode,
      total,
    };
  }

  /* =========================
     CHECK AVAILABILITY
  ========================= */

  const checkAvailability = async (
    overrideParams = {}
  ) => {
    const params = {
      ...searchParams,
      ...overrideParams,
    };

    try {
      setAvailabilityLoading(true);
      setAvailabilityError(null);

      if (
        !params.checkIn ||
        !params.checkOut
      ) {
        throw new Error(
          'Please select check-in and check-out dates.'
        );
      }

      const nights = calculateNights(
        params.checkIn,
        params.checkOut
      );

      if (nights <= 0) {
        throw new Error(
          'Check-out date must be after check-in date.'
        );
      }

      const requestBody = {
        checkIn: params.checkIn,
        checkOut: params.checkOut,
        guests: params.guests,
        roomType:
          params.roomType === 'all'
            ? 'all'
            : mapRoomTypeForApi(
                params.roomType
              ),
      };

      const response = await fetch(
        `${API_BASE_URL}/api/rooms/availability`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify(
            requestBody
          ),
        }
      );

      const result =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            'Unable to check room availability.'
        );
      }

      const data = result.data;

      const availableRooms =
        Array.isArray(data?.rooms)
          ? data.rooms
          : [];

      setSearchParams(params);

      setAvailabilityRooms(
        availableRooms
      );

      setHasCheckedAvailability(true);

      setActiveDraft((prev) => ({
        ...prev,

        dates: {
          checkIn: formatDisplayDate(
            data.checkIn
          ),

          checkOut: formatDisplayDate(
            data.checkOut
          ),

          nights:
            data.nights || nights,
        },

        guestDetails: {
          ...prev.guestDetails,
          guests:
            params.guests ||
            '2 Guests, 1 Room',
        },
      }));

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(
        'Availability API error:',
        error
      );

      setAvailabilityError(
        error.message
      );

      setAvailabilityRooms([]);

      setHasCheckedAvailability(true);

      return {
        success: false,
        message: error.message,
      };
    } finally {
      setAvailabilityLoading(false);
    }
  };

  /* =========================
     SELECT ROOM
  ========================= */

  const selectRoom = (
    room,
    nightsOverride
  ) => {
    if (!room) return;

    const nights =
      nightsOverride ||
      room.nights ||
      activeDraft.dates.nights ||
      calculateNights(
        searchParams.checkIn,
        searchParams.checkOut
      );

    const discountPercent =
      activeDraft.pricing.promoCode
        ? 15
        : 0;

    const pricing =
      recalculatePrice(
        room.pricePerNight,
        nights,
        discountPercent,
        activeDraft.pricing.promoCode
      );

    setActiveDraft((prev) => ({
      ...prev,

      stay: hotel,

      room,

      dates: {
        ...prev.dates,

        checkIn:
          prev.dates.checkIn ||
          formatDisplayDate(
            searchParams.checkIn
          ),

        checkOut:
          prev.dates.checkOut ||
          formatDisplayDate(
            searchParams.checkOut
          ),

        nights,
      },

      pricing,
    }));
  };

  /* =========================
     UPDATE GUEST DETAILS
  ========================= */

  const updateDraftGuests = (
    guestInfo
  ) => {
    setActiveDraft((prev) => ({
      ...prev,

      guestDetails: {
        ...prev.guestDetails,
        ...guestInfo,
      },
    }));
  };

  /* =========================
     PROMO
  ========================= */

  const applyPromoDiscount = (
    discountPercent,
    code
  ) => {
    setActiveDraft((prev) => {
      if (!prev.room) {
        return prev;
      }

      const pricing =
        recalculatePrice(
          prev.room.pricePerNight,
          prev.dates.nights,
          discountPercent,
          code
        );

      return {
        ...prev,
        pricing,
      };
    });
  };

  /* =========================
     COMPLETE LOCAL BOOKING
     Temporary until create-booking
     API is connected.
  ========================= */

  const completeBooking = async (
    paymentMethod = 'Credit Card'
  ) => {
    if (!activeDraft.room) {
      throw new Error('No room selected.');
    }

    const accessToken =
      localStorage.getItem('saga_access_token');

    const refreshToken =
      localStorage.getItem('saga_refresh_token');

    if (!accessToken && !refreshToken) {
      throw new Error(
        'Please login before confirming your reservation.'
      );
    }

    const guestDetails =
      activeDraft.guestDetails || {};

    if (
      !guestDetails.firstName?.trim() ||
      !guestDetails.lastName?.trim() ||
      !guestDetails.email?.trim() ||
      !guestDetails.phone?.trim()
    ) {
      throw new Error(
        'Please complete all required guest details.'
      );
    }

    const roomId =
      activeDraft.room.slug ||
      activeDraft.room.id;

    if (!roomId) {
      throw new Error(
        'Selected room information is invalid.'
      );
    }

    const checkIn =
      searchParams.checkIn;

    const checkOut =
      searchParams.checkOut;

    const guests =
      guestDetails.guests ||
      searchParams.guests ||
      '2 Guests, 1 Room';

    const response = await authFetch(
      `${API_BASE_URL}/api/bookings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          checkIn,
          checkOut,
          guests,
          guestDetails: {
            firstName:
              guestDetails.firstName.trim(),
            lastName:
              guestDetails.lastName.trim(),
            email:
              guestDetails.email
                .trim()
                .toLowerCase(),
            phone:
              guestDetails.phone.trim(),
            specialRequests:
              guestDetails.specialRequests?.trim() ||
              '',
            preferences:
              Array.isArray(
                guestDetails.preferences
              )
                ? guestDetails.preferences
                : [],
          },
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      if (response.status === 401) {
        throw new Error(
          'Your session has expired. Please login again.'
        );
      }

      if (response.status === 409) {
        throw new Error(
          result.message ||
            'This room is no longer available for the selected dates.'
        );
      }

      throw new Error(
        result.message ||
          'Unable to create reservation.'
      );
    }

    const backendBooking =
      result?.data?.booking;

    if (!backendBooking?.bookingId) {
      throw new Error(
        'Invalid booking response from server.'
      );
    }

    const newBooking = {
      id: backendBooking.bookingId,
      reference: backendBooking.bookingId,
      bookingId: backendBooking.bookingId,

      hotelName:
        hotel.name || 'SAGA',

      roomName:
        backendBooking.room?.name ||
        activeDraft.room.name,

      room: backendBooking.room,

      location:
        hotel.location ||
        'Jawai, Rajasthan',

      image:
        activeDraft.room.image ||
        hotel.heroImage,

      checkIn: backendBooking.checkIn,
      checkOut: backendBooking.checkOut,
      guests: backendBooking.guests,
      nights: backendBooking.nights,

      guestDetails:
        backendBooking.guestDetails,

      pricing:
        backendBooking.pricing,

      totalAmount:
        backendBooking.pricing?.total || 0,

      paymentMethod,

      bookingStatus:
        backendBooking.bookingStatus,

      paymentStatus:
        backendBooking.paymentStatus,

      status:
        backendBooking.bookingStatus ===
        'cancelled'
          ? 'cancelled'
          : 'upcoming',

      createdAt:
        backendBooking.createdAt,

      bookedOn:
        backendBooking.createdAt
          ? new Date(
              backendBooking.createdAt
            )
              .toISOString()
              .split('T')[0]
          : new Date()
              .toISOString()
              .split('T')[0],
    };

    setBookings((prev) => [
      newBooking,
      ...prev.filter(
        (booking) =>
          booking.id !== newBooking.id
      ),
    ]);

    setLatestConfirmedBooking(
      newBooking
    );

    return newBooking;
  };

  /* =========================
     CANCEL LOCAL BOOKING
  ========================= */

  const cancelBooking = (
    bookingId
  ) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status: 'cancelled',
            }
          : booking
      )
    );
  };

  /* =========================
     MODIFY LOCAL BOOKING
  ========================= */

  const modifyBookingDates = (
    bookingId,
    newCheckIn,
    newCheckOut
  ) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,

              checkIn: newCheckIn,
              checkOut: newCheckOut,
            }
          : booking
      )
    );
  };

  /* =========================
     CONTEXT
  ========================= */

  return (
    <BookingContext.Provider
      value={{
        hotel,

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

        activeDraft,
        selectRoom,
        updateDraftGuests,
        applyPromoDiscount,

        completeBooking,

        bookings,
        latestConfirmedBooking,

        cancelBooking,
        modifyBookingDates,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context =
    useContext(BookingContext);

  if (!context) {
    throw new Error(
      'useBooking must be used within a BookingProvider'
    );
  }

  return context;
};