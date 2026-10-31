import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, Lock } from 'lucide-react';

export default function BookingHeader({ currentStep = 1, backTo = '/search', backText = 'Back to Stays' }) {
  const navigate = useNavigate();

  const steps = [
    { step: 1, label: 'Guest Details' },
    { step: 2, label: 'Payment' },
    { step: 3, label: 'Confirmation' }
  ];

  return (
    <header
      className="booking-flow-header"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-light)',
        padding: '18px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 800
      }}
    >
      <div
        className="booking-flow-header-inner"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        {/* Back Link */}
        <button
          className="booking-flow-back"
          onClick={() => navigate(backTo)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--deep-olive)',
            cursor: 'pointer',
            padding: '4px 0'
          }}
        >
          <ArrowLeft size={16} />
          <span>{backText}</span>
        </button>

        {/* Brand Center */}
        <Link
          className="booking-flow-brand"
          to="/dashboard"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'var(--deep-olive)',
            textDecoration: 'none',
            textTransform: 'uppercase'
          }}
        >
          SAGA JAWAAI
        </Link>

        {/* Step Indicator */}
        <div className="booking-flow-steps" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {steps.map((s, idx) => {
            const isCompleted = currentStep > s.step;
            const isActive = currentStep === s.step;

            return (
              <React.Fragment key={s.step}>
                <div
                  className={`booking-flow-step${isActive ? ' is-active' : ''}${isCompleted ? ' is-completed' : ''}`}
                  aria-current={isActive ? 'step' : undefined}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <div
                    className="booking-flow-step-circle"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted
                        ? 'var(--deep-olive)'
                        : isActive
                        ? 'var(--warm-gold)'
                        : 'var(--dusky-ivory)',
                      color: isCompleted
                        ? 'var(--dusky-ivory)'
                        : isActive
                        ? 'var(--deep-olive)'
                        : 'var(--aravalli-stone)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: isActive ? '1px solid var(--warm-gold)' : '1px solid var(--border-medium)'
                    }}
                  >
                    {isCompleted ? <Check size={14} /> : s.step}
                  </div>
                  <span
                    className="booking-flow-step-label"
                    style={{
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--deep-olive)' : 'var(--text-muted)',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className="booking-flow-step-connector"
                    style={{
                      width: '24px',
                      height: '1px',
                      backgroundColor: isCompleted ? 'var(--deep-olive)' : 'var(--border-medium)'
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </header>
  );
}
