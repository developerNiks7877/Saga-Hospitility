import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, Building, Lock, ChevronDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import BookingHeader from '../components/layout/BookingHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Payment() {
  const navigate = useNavigate();
  const { activeDraft, completeBooking } = useBooking();
  const { showToast } = useToast();

  const [activeMethod, setActiveMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  // Card Form State
  const [cardForm, setCardForm] = useState({
    cardNumber: '4532 •••• •••• 8821',
    expiry: '12/28',
    cvv: '882',
    nameOnCard: activeDraft.guestDetails?.firstName
      ? `${activeDraft.guestDetails.firstName} ${activeDraft.guestDetails.lastName}`
      : 'Aisha Sharma'
  });

  // UPI State
  const [upiId, setUpiId] = useState('aisha@okhdfcbank');

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const stay = activeDraft.stay;
  const room = activeDraft.room;
  const pricing = activeDraft.pricing;

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      let paymentDetail = 'Credit Card ending in 8821';
      if (activeMethod === 'upi') paymentDetail = `UPI (${upiId})`;
      if (activeMethod === 'netbanking') paymentDetail = `Net Banking (${selectedBank})`;

      completeBooking(paymentDetail);
      setLoading(false);
      showToast('success', 'Payment successful! Your royal stay is confirmed.');
      navigate('/booking/confirmation');
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: 'var(--dusky-ivory)', minHeight: '100vh' }}>
      <BookingHeader currentStep={2} backTo="/booking/guest" backText="Back to Guest Details" />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warm-gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Step 2 of 2
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              fontWeight: 600,
              color: 'var(--deep-olive)',
              lineHeight: 1.2,
              marginTop: '4px'
            }}
          >
            Secure your royal booking
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
            <Lock size={14} style={{ color: 'var(--warm-gold)' }} />
            <span>Encrypted 256-bit payment gateway. Your data is strictly confidential.</span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '36px',
            alignItems: 'start'
          }}
          className="payment-content-grid"
        >
          {/* Left Payment Methods Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 1. Credit / Debit Card */}
            <Card style={{ padding: '0', overflow: 'hidden' }}>
              <div
                onClick={() => setActiveMethod('card')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 24px',
                  backgroundColor: activeMethod === 'card' ? 'var(--bg-card-warm)' : '#FFFFFF',
                  cursor: 'pointer',
                  borderBottom: activeMethod === 'card' ? '1px solid var(--border-light)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CreditCard size={20} style={{ color: 'var(--deep-olive)' }} />
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--deep-olive)' }}>
                      Credit or Debit Card
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
                      Visa, Mastercard, RuPay, American Express
                    </span>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  style={{
                    color: 'var(--aravalli-stone)',
                    transform: activeMethod === 'card' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease'
                  }}
                />
              </div>

              {activeMethod === 'card' && (
                <div style={{ padding: '24px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className="input-control"
                      value={cardForm.cardNumber}
                      onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                      placeholder="4532 0000 0000 8821"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label className="form-label">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        className="input-control"
                        value={cardForm.expiry}
                        onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                        placeholder="12/28"
                      />
                    </div>
                    <div>
                      <label className="form-label">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        className="input-control"
                        value={cardForm.cvv}
                        onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                        placeholder="882"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Name on Card</label>
                    <input
                      type="text"
                      className="input-control"
                      value={cardForm.nameOnCard}
                      onChange={(e) => setCardForm({ ...cardForm, nameOnCard: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* 2. UPI */}
            <Card style={{ padding: '0', overflow: 'hidden' }}>
              <div
                onClick={() => setActiveMethod('upi')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 24px',
                  backgroundColor: activeMethod === 'upi' ? 'var(--bg-card-warm)' : '#FFFFFF',
                  cursor: 'pointer',
                  borderBottom: activeMethod === 'upi' ? '1px solid var(--border-light)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <QrCode size={20} style={{ color: 'var(--deep-olive)' }} />
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--deep-olive)' }}>
                      UPI / Instant QR
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
                      Google Pay, PhonePe, Paytm, BHIM UPI
                    </span>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  style={{
                    color: 'var(--aravalli-stone)',
                    transform: activeMethod === 'upi' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease'
                  }}
                />
              </div>

              {activeMethod === 'upi' && (
                <div style={{ padding: '24px' }}>
                  <label className="form-label">Virtual Payment Address (UPI ID)</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="yourname@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                    A payment request will be triggered to your UPI app.
                  </span>
                </div>
              )}
            </Card>

            {/* 3. Net Banking */}
            <Card style={{ padding: '0', overflow: 'hidden' }}>
              <div
                onClick={() => setActiveMethod('netbanking')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 24px',
                  backgroundColor: activeMethod === 'netbanking' ? 'var(--bg-card-warm)' : '#FFFFFF',
                  cursor: 'pointer',
                  borderBottom: activeMethod === 'netbanking' ? '1px solid var(--border-light)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Building size={20} style={{ color: 'var(--deep-olive)' }} />
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--deep-olive)' }}>
                      Net Banking
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
                      All Major Indian Banks Supported
                    </span>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  style={{
                    color: 'var(--aravalli-stone)',
                    transform: activeMethod === 'netbanking' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease'
                  }}
                />
              </div>

              {activeMethod === 'netbanking' && (
                <div style={{ padding: '24px' }}>
                  <label className="form-label">Select Your Bank</label>
                  <select
                    className="input-control"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}
            </Card>
          </div>

          {/* Right Summary Card */}
          <Card style={{ padding: '24px', position: 'sticky', top: '90px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 600,
                color: 'var(--deep-olive)',
                paddingBottom: '14px',
                borderBottom: '1px solid var(--border-light)',
                marginBottom: '18px'
              }}
            >
              Booking Summary
            </h3>

            {/* Room Info */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
              <img
                src={stay?.images[0]}
                alt={stay?.name}
                style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--deep-olive)' }}>
                  {stay?.name}
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  {room?.name} • 3 Nights
                </p>
                <p style={{ fontSize: '11.5px', color: 'var(--aravalli-stone)' }}>
                  Oct 14 - Oct 17, 2026
                </p>
              </div>
            </div>

            {/* Price rows */}
            <div style={{ padding: '14px 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                <span>Room Rate (3 nights)</span>
                <span>₹{pricing.roomTotal.toLocaleString()}</span>
              </div>
              {pricing.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: 'var(--rabari-red)', marginBottom: '8px' }}>
                  <span>Voucher Discount</span>
                  <span>-₹{pricing.discount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                <span>Taxes & GST (18%)</span>
                <span>₹{pricing.taxes.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                <span>Resort Fee</span>
                <span>₹{pricing.resortFee.toLocaleString()}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-medium)',
                  fontWeight: 700,
                  color: 'var(--deep-olive)'
                }}
              >
                <span style={{ fontSize: '14px' }}>Total Amount</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px' }}>
                  ₹{pricing.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <Button
              variant="primary"
              size="lg"
              loading={loading}
              onClick={handlePay}
              icon={<Lock size={16} />}
              style={{ width: '100%', height: '48px', marginBottom: '14px' }}
            >
              Pay ₹{pricing.total.toLocaleString()}
            </Button>

            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--aravalli-stone)', lineHeight: 1.4 }}>
              By confirming, you agree to SAGA JAWAAI's Terms of Service & Cancellation Policy.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
