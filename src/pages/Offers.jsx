import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Copy, Check, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { offersData } from '../data/offersData';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function Offers() {
  const navigate = useNavigate();
  const { applyPromoDiscount } = useBooking();
  const { showToast } = useToast();

  const handleCopyCode = (offer) => {
    navigator.clipboard.writeText(offer.code);
    applyPromoDiscount(offer.discountPercent, offer.code);
    showToast('gold', `Voucher code '${offer.code}' copied! ${offer.discountPercent}% discount activated.`);
  };

  const handleApplyOffer = (offer) => {
    applyPromoDiscount(offer.discountPercent, offer.code);
    showToast('success', `Offer '${offer.title}' applied! Proceeding to royal search.`);
    navigate('/search');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warm-gold)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Exclusive Privileges
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '36px',
            fontWeight: 600,
            color: 'var(--deep-olive)',
            marginTop: '2px'
          }}
        >
          Special Offers & Royal Vouchers
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
          Discover seasonal promotions, complimentary spa upgrades, and private dining discounts curated for our guests.
        </p>
      </div>

      {/* Main Hero Promotion Card */}
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          height: '400px',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '40px'
        }}
      >
        <img
          src={offersData[0].image}
          alt={offersData[0].title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(20, 18, 12, 0.88) 0%, rgba(20, 18, 12, 0.4) 50%, rgba(20, 18, 12, 0.1) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '40px 48px',
            color: '#FFFFFF'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: 'var(--deep-olive)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
                marginBottom: '14px'
              }}
            >
              <Clock size={12} />
              {offersData[0].tagline}
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '38px',
                fontWeight: 600,
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '8px'
              }}
            >
              {offersData[0].title}
            </h2>

            <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '24px', lineHeight: 1.5 }}>
              {offersData[0].discountText}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => handleCopyCode(offersData[0])}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
              >
                <Copy size={15} />
                <span>{offersData[0].code}</span>
              </button>

              <Button
                variant="gold"
                size="md"
                onClick={() => handleApplyOffer(offersData[0])}
                iconRight={<ArrowRight size={15} />}
              >
                Claim & Search Stays
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Other Exclusive Offers */}
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--deep-olive)',
            marginBottom: '20px'
          }}
        >
          More Privileges & Upgrades
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {offersData.slice(1).map((offer) => (
            <Card
              key={offer.id}
              style={{
                overflow: 'hidden',
                border: '1px solid var(--border-medium)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '180px', position: 'relative' }}>
                <img
                  src={offer.image}
                  alt={offer.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <Badge variant="olive">{offer.category}</Badge>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px',
                      fontWeight: 600,
                      color: 'var(--deep-olive)',
                      marginBottom: '6px'
                    }}
                  >
                    {offer.title}
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                    {offer.discountText}
                  </p>
                  <span style={{ fontSize: '12px', color: 'var(--aravalli-stone)', display: 'block', marginBottom: '18px' }}>
                    {offer.validUntil}
                  </span>
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
                  <button
                    onClick={() => handleCopyCode(offer)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'var(--bg-card-warm)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--deep-olive)',
                      fontSize: '13px',
                      fontWeight: 700,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer'
                    }}
                  >
                    <Copy size={14} />
                    <span>{offer.code}</span>
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApplyOffer(offer)}
                  >
                    Apply Voucher
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
