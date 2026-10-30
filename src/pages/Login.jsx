import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      showToast(
        'success',
        res.message || 'Welcome back to SAGA JAWAAI'
      );
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.message ||
          'Login failed. Please check your credentials.'
      );
      showToast(
        'error',
        err.message || 'Invalid email or password.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse?.credential;

      if (!credential) {
        throw new Error('Google credential was not received');
      }

      const result = await googleLogin(credential);

      showToast(
        'success',
        result?.message || 'Google login successful'
      );

      navigate('/dashboard');
    } catch (err) {
      showToast(
        'error',
        err.message || 'Google login failed'
      );
    }
  };

  const handleGoogleError = () => {
    console.log('Google Login Failed');

    showToast(
      'error',
      'Google login failed'
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--dusky-ivory)'
      }}
      className="login-page-container"
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
        className="login-left-panel"
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5) contrast(1.1)',
            zIndex: 0
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(44, 42, 28, 0.45) 0%, rgba(30, 28, 18, 0.65) 50%, rgba(18, 16, 10, 0.88) 100%)',
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
          <div
            style={{
              maxWidth: '420px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <img
              src="/assets/logo/saga-hospitality-logo.png"
              alt="SAGA"
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain'
              }}
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

              <span
                style={{
                  fontSize: '11px',
                  color: 'rgba(245, 240, 228, 0.7)'
                }}
              >
                Wild by Nature, Rooted in Purpose
              </span>
            </div>
          </div>

          {/* Bottom Heading */}
          <div style={{ maxWidth: '460px' }}>
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
              Royal Gateway
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '44px',
                fontWeight: 500,
                lineHeight: 1.1,
                color: 'var(--dusky-ivory)',
                marginBottom: '16px'
              }}
            >
              Welcome
              <br />
              Back.
            </h1>

            <p
              style={{
                fontSize: '15px',
                color: 'rgba(245, 240, 228, 0.82)',
                lineHeight: 1.5
              }}
            >
              Enter your credentials to access your sanctuary
              stays and exclusive rates.
            </p>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div
        style={{
          width: '520px',
          flexShrink: 0,
          backgroundColor: 'var(--bg-card-warm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 56px',
          borderLeft: '1px solid var(--border-light)'
        }}
        className="login-right-panel"
      >
        <div
          style={{
            width: '100%',
            maxWidth: '360px'
          }}
        >
          <div style={{ marginBottom: '28px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}
            >
              

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: 'var(--deep-olive)',
                  textTransform: 'uppercase'
                }}
              >
                Sign In
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '30px',
                fontWeight: 600,
                color: 'var(--deep-olive)',
                lineHeight: 1.2,
                marginTop: '4px'
              }}
            >
              Access SAGA
            </h2>

            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                marginTop: '6px'
              }}
            >
              Sign in to manage your reservations and explore
              exclusive rates.
            </p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: 'rgba(139, 46, 34, 0.08)',
                border: '1px solid rgba(139, 46, 34, 0.25)',
                color: 'var(--rabari-red)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                marginBottom: '18px',
                lineHeight: 1.4
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">
                Email Address
              </label>

              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    color: 'var(--aravalli-stone)',
                    pointerEvents: 'none'
                  }}
                />

                <input
                  type="email"
                  className="input-control"
                  style={{ paddingLeft: '42px' }}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '12px' }}>
              <label className="form-label">
                Password
              </label>

              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Lock
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    color: 'var(--aravalli-stone)',
                    pointerEvents: 'none'
                  }}
                />

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  className="input-control"
                  style={{
                    paddingLeft: '42px',
                    paddingRight: '42px'
                  }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
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
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '24px'
              }}
            >
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();

                  showToast(
                    'info',
                    'Password reset instructions sent to your registered email.'
                  );
                }}
                style={{
                  fontSize: '12.5px',
                  color: 'var(--deep-olive)',
                  fontWeight: 500
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              iconRight={
                <ArrowRight size={16} />
              }
              style={{
                width: '100%',
                height: '48px'
              }}
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '24px 0 18px',
              gap: '12px'
            }}
          >
            <div
              style={{
                flex: 1,
                height: '1px',
                backgroundColor:
                  'var(--border-medium)'
              }}
            />

            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--aravalli-stone)',
                letterSpacing: '0.08em'
              }}
            >
              OR CONTINUE WITH
            </span>

            <div
              style={{
                flex: 1,
                height: '1px',
                backgroundColor:
                  'var(--border-medium)'
              }}
            />
          </div>

          {/* Google Login */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              width="360"
              text="continue_with"
              shape="rectangular"
            />
          </div>

          {/* Switch to Signup */}
          <div
            style={{
              marginTop: '28px',
              textAlign: 'center',
              fontSize: '13.5px',
              color: 'var(--text-muted)'
            }}
          >
            Don't have an account?{' '}

            <Link
              to="/signup"
              style={{
                color: 'var(--deep-olive)',
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}