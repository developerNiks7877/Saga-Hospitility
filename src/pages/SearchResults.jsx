import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, LayoutGrid, List, Star, Waves, Sparkles, Utensils, RotateCcw } from 'lucide-react';
import { staysData } from '../data/staysData';
import PropertyCard from '../components/common/PropertyCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function SearchResults() {
  const [urlParams] = useSearchParams();
  const destQuery = urlParams.get('destination') || 'Jodhpur, Rajasthan';

  const [maxPrice, setMaxPrice] = useState(70000);
  const [selectedTypes, setSelectedTypes] = useState(['Heritage Hotel', 'Luxury Villa', 'Boutique Resort']);
  const [minRating, setMinRating] = useState('all');
  const [selectedAmenities, setSelectedAmenities] = useState(['pool', 'dining']);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((a) => a !== amenityId) : [...prev, amenityId]
    );
  };

  const resetFilters = () => {
    setMaxPrice(70000);
    setSelectedTypes(['Heritage Hotel', 'Luxury Villa', 'Boutique Resort']);
    setMinRating('all');
    setSelectedAmenities(['pool', 'dining']);
    setSortBy('popularity');
  };

  // Filtered & Sorted Stays
  const filteredStays = useMemo(() => {
    return staysData
      .filter((stay) => {
        // Price Filter
        if (stay.pricePerNight > maxPrice) return false;

        // Type Filter
        if (selectedTypes.length > 0 && !selectedTypes.includes(stay.type)) return false;

        // Rating Filter
        if (minRating === '4.8' && stay.rating < 4.8) return false;
        if (minRating === '4.5' && stay.rating < 4.5) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.pricePerNight - b.pricePerNight;
        if (sortBy === 'price-high') return b.pricePerNight - a.pricePerNight;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount; // popularity
      });
  }, [maxPrice, selectedTypes, minRating, sortBy]);

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          gap: '36px',
          alignItems: 'flex-start',
          flexWrap: 'wrap'
        }}
        className="search-results-container"
      >
        {/* Left Filter Sidebar */}
        <aside
          style={{
            width: '280px',
            flexShrink: 0,
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-medium)',
            padding: '24px 20px',
            boxShadow: 'var(--shadow-card)'
          }}
          className="search-filter-sidebar"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--deep-olive)'
              }}
            >
              Filter Stays
            </h3>
            <button
              onClick={resetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--aravalli-stone)',
                fontSize: '12px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* Max Price Slider */}
          <div style={{ marginBottom: '24px' }}>
            <span className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Nightly Budget</span>
              <span style={{ color: 'var(--deep-olive)', fontWeight: 700 }}>₹{maxPrice.toLocaleString()}</span>
            </span>
            <input
              type="range"
              min="15000"
              max="110000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--deep-olive)',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--aravalli-stone)', marginTop: '4px' }}>
              <span>₹15,000</span>
              <span>₹1,10,000+</span>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-light)', margin: '18px 0' }} />

          {/* Property Types */}
          <div style={{ marginBottom: '24px' }}>
            <span className="form-label">Property Category</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {['Heritage Hotel', 'Luxury Villa', 'Boutique Resort'].map((type) => (
                <label
                  key={type}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '13.5px',
                    color: 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    style={{ accentColor: 'var(--deep-olive)', width: '16px', height: '16px' }}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-light)', margin: '18px 0' }} />

          {/* Rating */}
          <div style={{ marginBottom: '24px' }}>
            <span className="form-label">Guest Rating</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {[
                { id: 'all', label: 'All Ratings' },
                { id: '4.8', label: '★ 4.8 & above (Exceptional)' },
                { id: '4.5', label: '★ 4.5 & above (Wonderful)' }
              ].map((r) => (
                <label
                  key={r.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '13px',
                    color: 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="guest-rating"
                    checked={minRating === r.id}
                    onChange={() => setMinRating(r.id)}
                    style={{ accentColor: 'var(--deep-olive)' }}
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-light)', margin: '18px 0' }} />

          {/* Amenities */}
          <div>
            <span className="form-label">Amenities & Features</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {[
                { id: 'pool', label: 'Swimming Pool' },
                { id: 'spa', label: 'Ayurvedic Spa' },
                { id: 'dining', label: 'Fine Dining Restaurant' },
                { id: 'butler', label: '24/7 Butler Service' }
              ].map((am) => (
                <label
                  key={am.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '13.5px',
                    color: 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(am.id)}
                    onChange={() => toggleAmenity(am.id)}
                    style={{ accentColor: 'var(--deep-olive)', width: '16px', height: '16px' }}
                  />
                  <span>{am.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Search Results Main Stage */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 600,
                  color: 'var(--deep-olive)'
                }}
              >
                {filteredStays.length} Stays in {destQuery}
              </h1>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Oct 14 – Oct 17 • 2 Guests • 1 Room
              </p>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {/* Sort by */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--aravalli-stone)' }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--deep-olive)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="popularity">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Guest Rating</option>
                </select>
              </div>

              {/* View Toggle */}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px 10px',
                    background: viewMode === 'list' ? 'var(--deep-olive)' : 'transparent',
                    color: viewMode === 'list' ? 'var(--dusky-ivory)' : 'var(--aravalli-stone)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px 10px',
                    background: viewMode === 'grid' ? 'var(--deep-olive)' : 'transparent',
                    color: viewMode === 'grid' ? 'var(--dusky-ivory)' : 'var(--aravalli-stone)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Stays List */}
          {filteredStays.length === 0 ? (
            <Card style={{ padding: '60px 20px', textAlign: 'center' }}>
              <Sparkles size={36} style={{ color: 'var(--warm-gold)', margin: '0 auto 12px' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--deep-olive)' }}>
                No stays matching current filters
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px', marginBottom: '20px' }}>
                Try adjusting your price range slider or resetting active amenity selections.
              </p>
              <Button variant="secondary" onClick={resetFilters}>
                Reset All Filters
              </Button>
            </Card>
          ) : (
            <div
              style={
                viewMode === 'grid'
                  ? {
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                      gap: '24px'
                    }
                  : { display: 'flex', flexDirection: 'column', gap: '20px' }
              }
            >
              {filteredStays.map((stay) => (
                <PropertyCard key={stay.id} stay={stay} viewMode={viewMode} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              marginTop: '40px'
            }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                backgroundColor: '#FFFFFF',
                color: 'var(--deep-olive)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              ‹
            </button>
            <button
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--deep-olive)',
                backgroundColor: 'var(--deep-olive)',
                color: 'var(--dusky-ivory)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              1
            </button>
            <button
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                backgroundColor: '#FFFFFF',
                color: 'var(--deep-olive)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              2
            </button>
            <button
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                backgroundColor: '#FFFFFF',
                color: 'var(--deep-olive)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              3
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                backgroundColor: '#FFFFFF',
                color: 'var(--deep-olive)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
