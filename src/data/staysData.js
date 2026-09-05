export const staysData = [
  {
    id: 'umaid-palace-retreat',
    name: 'Umaid Palace Retreat',
    type: 'Heritage Hotel',
    location: 'Jodhpur, Rajasthan, India',
    city: 'jodhpur',
    distance: '2.5 km from Mehrangarh Fort',
    rating: 4.9,
    reviewsCount: 184,
    badge: 'Heritage Masterpiece',
    featured: true,
    pricePerNight: 35000,
    originalPrice: 42000,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'
    ],
    tags: ['Heritage Property', 'Award Winning Spa', 'Fine Dining', 'Royal Courtyard'],
    description: 'Set against the dramatic backdrop of the Aravalli hills, Umaid Palace Retreat is a masterpiece of architectural grandeur. Originally constructed in the early 20th century, this majestic estate has been meticulously restored to offer a transcendent hospitality experience that seamlessly weaves ancestral warmth with contemporary luxury.',
    secondaryDescription: 'Wander through vast courtyards echoing with history, rejuvenate in our world-renowned spa utilizing ancient Ayurvedic principles, and dine under the stars in settings that evoke the splendor of a bygone era. Every corner of the retreat is designed to provide a deep sense of calm and exclusivity.',
    amenities: [
      { id: 'pool', name: 'Infinity Royal Pool', icon: 'Waves' },
      { id: 'spa', name: 'Ayurvedic Spa & Wellness', icon: 'Sparkles' },
      { id: 'dining', name: '3 Heritage Restaurants', icon: 'Utensils' },
      { id: 'bar', name: 'Maharaja Lounge Bar', icon: 'GlassWater' },
      { id: 'gym', name: 'State-of-the-art Fitness', icon: 'Dumbbell' },
      { id: 'wifi', name: 'High-Speed Fiber Wi-Fi', icon: 'Wifi' },
      { id: 'butler', name: '24/7 Dedicated Butler', icon: 'UserCheck' },
      { id: 'concierge', name: 'Curated Desert Safari', icon: 'Compass' }
    ],
    rooms: [
      {
        id: 'deluxe-king',
        name: 'Deluxe King Room',
        pricePerNight: 35000,
        size: '450 sq ft',
        bed: '1 King Bed',
        occupancy: 'Up to 3 guests',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
        description: 'Overlooking the serene inner courtyard, our Deluxe King rooms offer a tranquil retreat with custom hand-carved furnishings, a marble en-suite bathroom, and exclusive butler service.',
        features: ['Courtyard View', 'Marble En-suite Bath', 'Artisanal Minibar', 'Pillow Menu']
      },
      {
        id: 'heritage-suite',
        name: 'Royal Heritage Suite',
        pricePerNight: 65000,
        size: '850 sq ft',
        bed: '1 Grand King Bed',
        occupancy: 'Up to 4 guests',
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80',
        description: 'Experience uncompromised luxury in our expansive Heritage Suites, featuring a separate living salon, panoramic hill vistas, antique brass fittings, and dedicated butler service.',
        features: ['Panoramic Hill Views', 'Private Balcony', 'Separate Living Salon', 'Jacuzzi Tub', '24/7 Butler']
      },
      {
        id: 'maharani-suite',
        name: 'Maharani Presidential Suite',
        pricePerNight: 110000,
        size: '1400 sq ft',
        bed: '2 King Beds',
        occupancy: 'Up to 6 guests',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
        description: 'The pinnacle of Rajasthani opulence. Featuring gold-leaf ceilings, private plunge pool terrace, bespoke dining chamber, and private chauffeur transfers.',
        features: ['Private Plunge Pool', 'Gold-leaf Ceilings', 'Dining Chamber', 'Chauffeur Airport Transfer']
      }
    ]
  },
  {
    id: 'the-palace-residency',
    name: 'The Palace Residency',
    type: 'Heritage Hotel',
    location: 'Jodhpur, Rajasthan, India',
    city: 'jodhpur',
    distance: '1.8 km from Clock Tower',
    rating: 4.8,
    reviewsCount: 142,
    badge: 'Popular Pick',
    featured: false,
    pricePerNight: 28500,
    originalPrice: 35000,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Boutique Heritage', 'Rooftop Fort View', 'Courtyard Pool'],
    description: 'An intimate 19th-century royal mansion converted into a boutique haven with traditional jharokha balconies and sunset fort terraces.',
    amenities: [
      { id: 'pool', name: 'Courtyard Pool', icon: 'Waves' },
      { id: 'spa', name: 'Spa & Steam', icon: 'Sparkles' },
      { id: 'dining', name: 'Rooftop Fort Dining', icon: 'Utensils' },
      { id: 'wifi', name: 'Wi-Fi', icon: 'Wifi' }
    ],
    rooms: [
      {
        id: 'palace-deluxe',
        name: 'Heritage Deluxe Room',
        pricePerNight: 28500,
        size: '420 sq ft',
        bed: '1 King Bed',
        occupancy: '2 guests',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
        description: 'Classic Rajasthani frescoes and antique brass detailing with serene courtyard outlooks.',
        features: ['Jharokha Seating', 'Marble Bath', 'Complimentary Breakfast']
      }
    ]
  },
  {
    id: 'royal-heritage-villa',
    name: 'Royal Heritage Villa',
    type: 'Luxury Villa',
    location: 'Udaipur, Rajasthan, India',
    city: 'udaipur',
    distance: 'Beside Lake Pichola',
    rating: 4.95,
    reviewsCount: 210,
    badge: 'Top Rated',
    featured: true,
    pricePerNight: 42000,
    originalPrice: 55000,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Lakefront Villa', 'Private Boat Access', 'Heritage Gardens'],
    description: 'Private waterfront villa sanctuary with direct boat access across Lake Pichola, fragrant jasmine gardens, and bespoke dining pavilions.',
    amenities: [
      { id: 'pool', name: 'Private Plunge Pool', icon: 'Waves' },
      { id: 'spa', name: 'Holistic Spa', icon: 'Sparkles' },
      { id: 'dining', name: 'Private Chef Dining', icon: 'Utensils' },
      { id: 'boat', name: 'Private Sunset Cruise', icon: 'Compass' }
    ],
    rooms: [
      {
        id: 'lake-villa',
        name: 'Waterfront Royal Villa',
        pricePerNight: 42000,
        size: '720 sq ft',
        bed: '1 King Bed',
        occupancy: '2 Guests',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        description: 'Spectacular floor-to-ceiling vistas of Lake Pichola with private veranda and butler service.',
        features: ['Direct Lake Views', 'Private Veranda', 'Evening High Tea']
      }
    ]
  },
  {
    id: 'boutique-garden-retreat',
    name: 'Boutique Garden Retreat',
    type: 'Boutique Resort',
    location: 'Jaipur, Rajasthan, India',
    city: 'jaipur',
    distance: '3.2 km from Amber Fort',
    rating: 4.7,
    reviewsCount: 98,
    badge: 'Serene Oasis',
    featured: false,
    pricePerNight: 18500,
    originalPrice: 22000,
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Peacock Gardens', 'Yoga Pavilion', 'Organic Farm Dining'],
    description: 'Surrounded by lush bougainvillea and ancient banyan trees, this retreat is a tranquil refuge of understated Rajasthani luxury.',
    amenities: [
      { id: 'pool', name: 'Garden Swimming Pool', icon: 'Waves' },
      { id: 'dining', name: 'Farm-to-Table Restaurant', icon: 'Utensils' },
      { id: 'garden', name: 'Botanical Courtyard', icon: 'Sparkles' }
    ],
    rooms: [
      {
        id: 'garden-cottage',
        name: 'Heritage Garden Cottage',
        pricePerNight: 18500,
        size: '380 sq ft',
        bed: '1 Queen/King Bed',
        occupancy: '2 Guests',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80',
        description: 'Charming standalone cottage with private patio overlooking lush royal gardens.',
        features: ['Garden Patio', 'Artisan Coffee Bar', 'Morning Yoga Included']
      }
    ]
  }
];
