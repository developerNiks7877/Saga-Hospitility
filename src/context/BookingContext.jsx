import React, { createContext, useContext, useState, useEffect } from 'react';
import { hotelData } from '../data/hotelData';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  // Search parameters for SAGA JAWAAI
  const [searchParams, setSearchParams] = useState({
    checkIn: '2026-10-14',
    checkOut: '2026-10-17',
    guests: '2 Guests, 1 Room',
    roomType: 'all'
  });

  // Active Booking Draft (Single Hotel: SAGA JAWAAI)
  const [activeDraft, setActiveDraft] = useState({
    stay: hotelData,
    room: hotelData.rooms[0],
    dates: {
      checkIn: 'Oct 14, 2026',
      checkOut: 'Oct 17, 2026',
      nights: 3
    },
    guestDetails: {
      firstName: 'Aisha',
      lastName: 'Sharma',
      email: 'aisha.sharma@example.com',
      phone: '+91 98765 43210',
      specialRequests: '',
      preferences: ['High Floor', 'Quiet Room', 'King Bed']
    },
    pricing: {
      nightlyRate: 28500,
      nights: 3,
      roomTotal: 85500,
      taxes: 15390, // 18% GST
      resortFee: 3500,
      discount: 0,
      promoCode: null,
      total: 104390
    }
  });

  // Confirmed Reservations Store
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('saga_user_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 'SJ-9482',
        reference: 'SJ-9482',
        hotelName: 'SAGA JAWAAI Resort & Safari',
        roomName: 'Royal Jawai Safari Villa',
        location: 'Jawai Bandh, Pali District, Rajasthan',
        image: hotelData.rooms[1].image,
        checkIn: 'Oct 14, 2026',
        checkOut: 'Oct 17, 2026',
        guests: '2 Guests',
        totalAmount: 168400,
        status: 'upcoming',
        bookedOn: '2026-08-15'
      },
      {
        id: 'SJ-7391',
        reference: 'SJ-7391',
        hotelName: 'SAGA JAWAAI Resort & Safari',
        roomName: 'Deluxe Heritage Suite',
        location: 'Jawai Bandh, Pali District, Rajasthan',
        image: hotelData.rooms[0].image,
        checkIn: 'Mar 10, 2026',
        checkOut: 'Mar 13, 2026',
        guests: '2 Guests',
        totalAmount: 98500,
        status: 'completed',
        bookedOn: '2026-02-28'
      }
    ];
  });

  const [latestConfirmedBooking, setLatestConfirmedBooking] = useState(null);

  // Sync bookings to localStorage
  useEffect(() => {
    localStorage.setItem('saga_user_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Recalculate Pricing
  const recalculatePrice = (rate, nights = 3, discountPercent = 0, promoCode = null) => {
    const roomTotal = rate * nights;
    const taxes = Math.round(roomTotal * 0.18);
    const resortFee = 3500;
    const discount = discountPercent > 0 ? Math.round((roomTotal + taxes + resortFee) * (discountPercent / 100)) : 0;
    const total = roomTotal + taxes + resortFee - discount;

    return {
      nightlyRate: rate,
      nights,
      roomTotal,
      taxes,
      resortFee,
      discount,
      promoCode,
      total
    };
  };

  // Select a room directly at SAGA JAWAAI
  const selectRoom = (room, nights = 3) => {
    const pricing = recalculatePrice(room.pricePerNight, nights, activeDraft.pricing.promoCode ? 15 : 0, activeDraft.pricing.promoCode);
    setActiveDraft((prev) => ({
      ...prev,
      stay: hotelData,
      room,
      pricing
    }));
  };

  // Update guest details in draft
  const updateDraftGuests = (guestInfo) => {
    setActiveDraft((prev) => ({
      ...prev,
      guestDetails: { ...prev.guestDetails, ...guestInfo }
    }));
  };

  // Apply promo discount
  const applyPromoDiscount = (discountPercent, code) => {
    setActiveDraft((prev) => {
      const pricing = recalculatePrice(
        prev.room.pricePerNight,
        prev.dates.nights,
        discountPercent,
        code
      );
      return {
        ...prev,
        pricing
      };
    });
  };

  // Complete checkout & convert draft to booking
  const completeBooking = (paymentMethod = 'Credit Card') => {
    const randomRef = `SJ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      id: randomRef,
      reference: randomRef,
      hotelName: hotelData.name,
      roomName: activeDraft.room.name,
      location: hotelData.location,
      image: activeDraft.room.image || hotelData.heroImage,
      checkIn: activeDraft.dates.checkIn,
      checkOut: activeDraft.dates.checkOut,
      guests: activeDraft.guestDetails.guests || '2 Guests',
      totalAmount: activeDraft.pricing.total,
      paymentMethod,
      status: 'upcoming',
      bookedOn: new Date().toISOString().split('T')[0]
    };

    setBookings((prev) => [newBooking, ...prev]);
    setLatestConfirmedBooking(newBooking);
    return newBooking;
  };

  // Cancel reservation
  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  // Modify dates
  const modifyBookingDates = (bookingId, newCheckIn, newCheckOut) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, checkIn: newCheckIn, checkOut: newCheckOut }
          : b
      )
    );
  };

  return (
    <BookingContext.Provider
      value={{
        hotel: hotelData,
        searchParams,
        setSearchParams,
        activeDraft,
        selectRoom,
        updateDraftGuests,
        applyPromoDiscount,
        completeBooking,
        bookings,
        latestConfirmedBooking,
        cancelBooking,
        modifyBookingDates
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
