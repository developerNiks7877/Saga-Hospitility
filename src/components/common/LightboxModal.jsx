import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({ isOpen, onClose, images = [], initialIndex = 0, title = 'Photo Gallery' }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(15, 14, 11, 0.95)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px'
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--dusky-ivory)',
          zIndex: 10
        }}
      >
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 500 }}>{title}</h3>
          <span style={{ fontSize: '13px', opacity: 0.7 }}>
            Photo {currentIndex + 1} of {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            border: 'none',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.15s ease'
          }}
          aria-label="Close photo gallery"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          maxWidth: '1100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 0'
        }}
      >
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '12px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: '#FFFFFF',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background 0.15s ease'
          }}
          aria-label="Previous photo"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Active Image */}
        <img
          src={images[currentIndex]}
          alt={`View ${currentIndex + 1}`}
          style={{
            maxWidth: '100%',
            maxHeight: '72vh',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: '#FFFFFF',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background 0.15s ease'
          }}
          aria-label="Next photo"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnail Bar */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          maxWidth: '1000px',
          padding: '10px',
          zIndex: 10
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            onClick={() => setCurrentIndex(i)}
            style={{
              width: '64px',
              height: '48px',
              objectFit: 'cover',
              borderRadius: '6px',
              cursor: 'pointer',
              border: currentIndex === i ? '2px solid var(--warm-gold)' : '2px solid transparent',
              opacity: currentIndex === i ? 1 : 0.6,
              transition: 'all 0.15s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}
