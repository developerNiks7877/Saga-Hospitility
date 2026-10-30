import React from 'react';

export default function HeritageOrnament({ type = 'divider', className = '' }) {
  if (type === 'divider') {
    return (
      <div
        className={`gold-divider ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <span
          style={{
            position: 'absolute',
            background: 'var(--dusky-ivory)',
            padding: '0 12px',
            color: 'var(--warm-gold)',
            fontSize: '12px'
          }}
        >
          ✦ ❖ ✦
        </span>
      </div>
    );
  }

  if (type === 'arch') {
    return (
      <svg
        width="36"
        height="18"
        viewBox="0 0 36 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'inline-block', color: 'var(--warm-gold)' }}
        className={className}
      >
        <path
          d="M1 17C1 8.16344 8.16344 1 17 1C17 1 18 1 18 1C18 1 19 1 19 1C27.8366 1 35 8.16344 35 17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="18" cy="8" r="2.5" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'mandala') {
    return (
      <div style={{ color: 'var(--warm-gold)', opacity: 0.8 }} className={className}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
          <circle cx="12" cy="12" r="3" fill="var(--warm-gold)" fillOpacity="0.2" />
        </svg>
      </div>
    );
  }

  return null;
}
