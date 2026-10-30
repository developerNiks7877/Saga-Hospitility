export const hotelData = {
  id: 'saga-jawai',
  name: 'SAGA',
  tagline: 'Wild by Nature, Rooted in Purpose',
  location: 'Jawai Bandh, Pali District, Rajasthan 306126, India',
  phone: '+91 98765 43210',
  email: 'reservations@sagajawai.com',
  rating: 4.95,
  reviewsCount: 348,
  checkInTime: '2:00 PM',
  checkOutTime: '11:00 AM',
  logo: '/SAGA-JAWAI-LOGO.png',
  heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
  images: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&q=80',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1000&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000&q=80'
  ],
  description: 'SAGA is a premier luxury hotel located in Jawai, Rajasthan. We offer world-class hospitality, elegantly appointed rooms, fine dining, and personalized guest service for an exceptional stay.',
  amenities: [
    { id: 'pool', name: 'Swimming Pool', icon: 'Waves', desc: 'Temperature-controlled outdoor pool with sun loungers' },
    { id: 'dining', name: 'Multi-Cuisine Restaurant', icon: 'Utensils', desc: 'Authentic Rajasthani and global delicacies' },
    { id: 'wifi', name: 'High-Speed Wi-Fi', icon: 'Wifi', desc: 'Complimentary high-speed internet across the property' },
    { id: 'service', name: '24/7 Room Service', icon: 'Clock', desc: 'Round-the-clock in-room dining and housekeeping' },
    { id: 'parking', name: 'Valet Parking', icon: 'ShieldCheck', desc: 'Secure on-site complimentary guest parking' },
    { id: 'concierge', name: 'Concierge & Front Desk', icon: 'UserCheck', desc: 'Dedicated 24-hour reception and travel assistance' }
  ],
  rooms: [
    {
      id: 'deluxe-room',
      name: 'Deluxe Room',
      category: 'Deluxe',
      pricePerNight: 12500,
      originalPrice: 15000,
      size: '420 sq ft',
      bed: '1 King Bed',
      occupancy: '2 Adults, 1 Child',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      description: 'Elegantly appointed hotel room featuring comfortable king bedding, garden view window, premium ensuite bathroom, and modern amenities.',
      features: ['Garden View', 'Air Conditioning', 'Smart LED TV', 'Tea & Coffee Maker', 'Free High-Speed Wi-Fi', '24/7 Room Service']
    },
    {
      id: 'super-deluxe-room',
      name: 'Super Deluxe Room',
      category: 'Super Deluxe',
      pricePerNight: 18500,
      originalPrice: 22000,
      size: '580 sq ft',
      bed: '1 King Bed',
      occupancy: '3 Guests',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      description: 'Spacious premium hotel room with a private balcony, plush seating area, luxury marble bathroom with bathtub, and scenic views.',
      features: ['Private Balcony', 'Marble Bath & Tub', 'Air Conditioning', 'Mini Refrigerator', 'Smart LED TV', 'Complimentary Breakfast']
    },
    {
      id: 'executive-suite',
      name: 'Executive Suite',
      category: 'Suite',
      pricePerNight: 28500,
      originalPrice: 34000,
      size: '850 sq ft',
      bed: '1 Master King Bed',
      occupancy: '4 Guests',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      description: 'Ultra-luxurious master hotel suite with a separate living room, dining lounge, luxury king bedroom, and personalized hotel services.',
      features: ['Separate Living Room', 'Dining Area', 'Luxury Bathtub & Shower', 'Balcony with Views', 'Complimentary Breakfast', 'Express Check-in']
    }
  ]
};
