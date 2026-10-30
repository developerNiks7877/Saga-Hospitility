import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';

const INTERESTS = ['Luxury', 'Heritage', 'Business', 'Family', 'Beach', 'Nature', 'Desert Safaris'];

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState(['Heritage', 'Luxury']);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const getStrength = (pwd) => {
    if (!pwd) return { level: 0, label: '' };
    if (pwd.length < 6) return { level: 1, label: 'Weak', color: 'var(--rabari-red)' };
    if (pwd.length < 10) return { level: 2, label: 'Fair', color: 'var(--leopard-ochre)' };
    return { level: 3, label: 'Strong', color: '#155724' };
  };

  const strength = getStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      showToast('error', 'Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    if (!form.fullName.trim() || !form.email.trim() || !form.password) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await signup({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phone
      });

      showToast('success', res.message || 'Account created successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      showToast('error', err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--dusky-ivory)'
      }}
      className="signup-page-container"
    >
      {/* Left Atmospheric Heritage Panel */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          minWidth: 0,
          backgroundColor: 'var(--deep-olive)',
          overflow: 'hidden',
          display: 'flex'
        }}
        className="signup-left-panel"
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.48) contrast(1.1)',
            zIndex: 0
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(44, 42, 28, 0.45) 0%, rgba(30, 28, 18, 0.65) 50%, rgba(18, 16, 10, 0.88) 100%)',
            zIndex: 1
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '52px 60px',
            color: 'var(--dusky-ivory)'
          }}
        >
          {/* Top Logo */}
          <div style={{ maxWidth: '420px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/SAGA-JAWAI-LOGO.png"
              alt="SAGA"
              style={{ width: '48px', height: '48px', objectFit: 'contain' }}
            />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  letterSpacing: '0.1em',
                  color: 'var(--warm-gold)',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              >
                SAGA
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(245, 240, 228, 0.7)' }}>
                Wild by Nature, Rooted in Purpose
              </span>
            </div>
          </div>

          {/* Bottom Headline */}
          <div style={{ maxWidth: '440px' }}>
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--warm-gold)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              Exclusive Guest Membership
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '44px',
                fontWeight: 500,
                lineHeight: 1.15,
                color: 'var(--dusky-ivory)',
                marginBottom: '16px'
              }}
            >
              Stay somewhere<br />unforgettable.
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(245, 240, 228, 0.82)', lineHeight: 1.5 }}>
              Experience wilderness luxury, private granite villas, and ancestral Rajasthani hospitality.
            </p>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div
        style={{
          width: '560px',
          flexShrink: 0,
          backgroundColor: 'var(--bg-card-warm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 48px',
          borderLeft: '1px solid var(--border-light)',
          overflowY: 'auto'
        }}
        className="signup-right-panel"
      >
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <img
                src="/SAGA-JAWAI-LOGO.png"
                alt="SAGA"
                style={{ width: '36px', height: '36px', objectFit: 'contain' }}
              />
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: 'var(--deep-olive)',
                  textTransform: 'uppercase'
                }}
              >
                Guest Registration
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 600,
                color: 'var(--deep-olive)',
                lineHeight: 1.2,
                marginTop: '4px'
              }}
            >
              Join SAGA
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Create an account to unlock direct booking privileges and private safari itineraries.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={{ marginBottom: '14px' }}>
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User
                  size={17}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    color: 'var(--aravalli-stone)',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  type="text"
                  name="fullName"
                  className="input-control"
                  style={{ paddingLeft: '40px' }}
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '14px' }}>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail
                  size={17}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    color: 'var(--aravalli-stone)',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  type="email"
                  name="email"
                  className="input-control"
                  style={{ paddingLeft: '40px' }}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '14px' }}>
              <label className="form-label">Phone Number</label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  height: '46px',
                  padding: '0 12px'
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--deep-olive)', paddingRight: '8px', borderRight: '1px solid var(--border-light)', marginRight: '10px' }}>
                  🇮🇳 +91
                </span>
                <Phone size={16} style={{ color: 'var(--aravalli-stone)', marginRight: '8px' }} />
                <input
                  type="tel"
                  name="phone"
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    color: 'var(--text-main)',
                    flex: 1
                  }}
                  placeholder="98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock
                  size={17}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    color: 'var(--aravalli-stone)',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="input-control"
                  style={{ paddingLeft: '40px', paddingRight: '40px' }}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--aravalli-stone)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {/* Password strength */}
              {form.password && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
                    <div style={{ height: '4px', flex: 1, borderRadius: '2px', backgroundColor: strength.level >= 1 ? strength.color : '#E8E2D7' }} />
                    <div style={{ height: '4px', flex: 1, borderRadius: '2px', backgroundColor: strength.level >= 2 ? strength.color : '#E8E2D7' }} />
                    <div style={{ height: '4px', flex: 1, borderRadius: '2px', backgroundColor: strength.level >= 3 ? strength.color : '#E8E2D7' }} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: strength.color }}>{strength.label}</span>
                </div>
              )}
            </div>

            {/* Interests */}
            <div style={{ marginBottom: '18px' }}>
              <span className="form-label" style={{ display: 'block', marginBottom: '8px' }}>
                Travel Preferences (Optional)
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {INTERESTS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '12.5px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        border: isSelected ? '1px solid var(--deep-olive)' : '1px solid var(--border-medium)',
                        backgroundColor: isSelected ? 'var(--deep-olive)' : '#FFFFFF',
                        color: isSelected ? 'var(--dusky-ivory)' : 'var(--text-muted)',
                        transition: 'all 0.15s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {isSelected && <Check size={12} />}
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terms checkbox */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '22px' }}>
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ marginTop: '3px', accentColor: 'var(--deep-olive)', cursor: 'pointer' }}
              />
              <label htmlFor="agree-terms" style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                I agree to the <a href="#" style={{ color: 'var(--deep-olive)', fontWeight: 600, textDecoration: 'underline' }}>Terms of Service</a> & <a href="#" style={{ color: 'var(--deep-olive)', fontWeight: 600, textDecoration: 'underline' }}>Privacy Policy</a>.
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              iconRight={<ArrowRight size={16} />}
              style={{ width: '100%', height: '48px' }}
            >
              Create Account
            </Button>
          </form>

          {/* Switch to login */}
          <div
            style={{
              marginTop: '22px',
              textAlign: 'center',
              fontSize: '13.5px',
              color: 'var(--text-muted)'
            }}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: 'var(--deep-olive)',
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
