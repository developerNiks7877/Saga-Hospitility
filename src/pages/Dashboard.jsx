import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  Bed,
  Tag,
  Calendar,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Phone,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import SearchWidget from '../components/common/SearchWidget';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hotel, selectRoom, bookings } = useBooking();

  const container = useRef(null);
  const heroImgRef = useRef(null);

  const upcomingBooking = bookings.find((b) => b.status === 'upcoming');

  const handleBookRoom = (room) => {
    selectRoom(room);
    navigate('/booking/guest');
  };

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.set(['.entry-reveal-text', '.entry-reveal-badge', heroImgRef.current, '.hero-content-reveal', '.section-heading', '.room-card-reveal', '.search-widget-reveal'], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // 1. Cinematic Entry Sequence
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set('.entry-reveal-text', { y: 30, opacity: 0 });
    gsap.set('.entry-reveal-badge', { scale: 0.95, opacity: 0 });
    gsap.set(heroImgRef.current, { scale: 1.05, opacity: 0 });
    gsap.set('.hero-content-reveal', { y: 20, opacity: 0 });

    tl.to('.entry-reveal-text', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      delay: 0.1
    })
    .to('.entry-reveal-badge', {
      scale: 1,
      opacity: 1,
      duration: 1
    }, "-=0.8")
    .to(heroImgRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.8,
      ease: 'power2.out'
    }, "-=1.0")
    .to('.hero-content-reveal', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1
    }, "-=1.4");

    // 2. Parallax effect for Hero Image
    gsap.to(heroImgRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-container',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // 3. Scroll reveal for section headings
    gsap.utils.toArray('.section-heading').forEach((heading) => {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // 4. Scroll reveal for Search Widget
    gsap.from('.search-widget-reveal', {
      scrollTrigger: {
        trigger: '.search-widget-reveal',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // 5. Scroll reveal for Room Cards (staggered)
    gsap.from('.room-card-reveal', {
      scrollTrigger: {
        trigger: '.rooms-grid',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });

  }, { scope: container });

  return (
    <div ref={container} style={{ maxWidth: '1240px', margin: '0 auto', overflowX: 'hidden' }}>
      {/* Hero Welcome Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <span
            className="entry-reveal-text"
            style={{
              fontSize: '11.5px',
              fontWeight: 700,
              color: 'var(--warm-gold)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '4px'
            }}
          >
            <Sparkles size={14} />
            {hotel.name} • Jawai, Rajasthan
          </span>
          <h1
            className="entry-reveal-text"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              fontWeight: 600,
              color: 'var(--deep-olive)',
              lineHeight: 1.15
            }}
          >
            Welcome to SAGA, {user?.fullName?.split(' ')[0] || user?.firstName || 'Guest'}
          </h1>
          <p className="entry-reveal-text" style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Premier luxury hotel offering world-class comfort, elegant accommodations, and personalized hospitality.
          </p>
        </div>

        {/* Location & Star Rating Badge */}
        <div
          className="entry-reveal-badge"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <span style={{ fontSize: '13px', color: 'var(--leopard-ochre)', fontWeight: 700 }}>
            ★★★★★
          </span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--deep-olive)' }}>
            4.95 Rating (348+ Reviews)
          </span>
        </div>
      </div>

      {/* Hero Property Showcase Banner */}
      <div
        className="hero-container"
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          height: '340px',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        {/* Wrap image in a div for Parallax without breaking bounds */}
        <div style={{ position: 'absolute', inset: -40, overflow: 'hidden' }}>
          <img
            ref={heroImgRef}
            src={hotel.heroImage}
            alt={hotel.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(20, 18, 12, 0.88) 0%, rgba(20, 18, 12, 0.3) 50%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '32px 36px',
            color: '#FFFFFF'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <span
              className="hero-content-reveal"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--warm-gold)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '6px',
                display: 'block'
              }}
            >
              Jawai Bandh, Pali • Rajasthan, India
            </span>
            <h2
              className="hero-content-reveal"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: '10px'
              }}
            >
              {hotel.tagline}
            </h2>
            <div className="hero-content-reveal" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/rooms">
                <Button variant="gold" size="sm" iconRight={<ArrowRight size={14} />}>
                  Explore Hotel Rooms & Rates
                </Button>
              </Link>
              <Link to="/offers">
                <Button variant="outline" size="sm" style={{ borderColor: 'rgba(255, 255, 255, 0.6)', color: '#FFFFFF' }}>
                  View Special Offers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Date & Room Availability Search Card */}
      <div className="search-widget-reveal" style={{ marginBottom: '40px' }}>
        <SearchWidget />
      </div>

      {/* Upcoming Stay Alert Card (if any) */}
      {upcomingBooking && (
        <Card
          className="section-heading"
          style={{
            padding: '20px 24px',
            backgroundColor: 'var(--bg-card-warm)',
            border: '1.5px solid var(--warm-gold)',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--deep-olive)',
                color: 'var(--warm-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Calendar size={22} />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warm-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Your Upcoming Stay
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: 'var(--deep-olive)' }}>
                {upcomingBooking.roomName} • Ref: {upcomingBooking.reference}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Check-in: <strong>{upcomingBooking.checkIn}</strong> • Check-out: <strong>{upcomingBooking.checkOut}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/my-bookings')}
            >
              Manage Booking
            </Button>
          </div>
        </Card>
      )}

      {/* Hotel Rooms Showcase */}
      <div style={{ marginBottom: '48px' }}>
        <div
          className="section-heading"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '20px'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warm-gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Accommodations
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                fontWeight: 600,
                color: 'var(--deep-olive)',
                marginTop: '2px'
              }}
            >
              Hotel Rooms & Suites
            </h2>
          </div>
          <Link
            to="/rooms"
            style={{
              fontSize: '13.5px',
              fontWeight: 600,
              color: 'var(--deep-olive)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            View all room details <ArrowRight size={14} />
          </Link>
        </div>

        <div
          className="rooms-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px'
          }}
        >
          {hotel.rooms.map((room) => (
            <Card
              key={room.id}
              className="room-card-reveal"
              style={{
                overflow: 'hidden',
                border: '1px solid var(--border-medium)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                const img = e.currentTarget.querySelector('.room-img');
                if (img) img.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                const img = e.currentTarget.querySelector('.room-img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                <img
                  className="room-img"
                  src={room.image}
                  alt={room.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <Badge variant="olive">{room.category}</Badge>
                </div>
              </div>

              <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: 'var(--deep-olive)' }}>
                      {room.name}
                    </h3>
                  </div>

                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                    {room.description}
                  </p>

                  <div style={{ display: 'flex', gap: '14px', fontSize: '12.5px', color: 'var(--aravalli-stone)', marginBottom: '18px' }}>
                    <span>📐 {room.size}</span>
                    <span>🛏 {room.bed}</span>
                    <span>👥 {room.occupancy}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-light)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--aravalli-stone)', textTransform: 'uppercase', display: 'block' }}>Rate per night</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--deep-olive)' }}>
                      ₹{room.pricePerNight.toLocaleString()}
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    iconRight={<ArrowRight size={14} />}
                    onClick={() => handleBookRoom(room)}
                  >
                    Select & Book
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
