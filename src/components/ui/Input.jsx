import React from 'react';

export default function Input({
  label,
  error,
  icon = null,
  iconRight = null,
  className = '',
  id,
  type = 'text',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <span
            style={{
              position: 'absolute',
              left: '14px',
              color: 'var(--aravalli-stone)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            {icon}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          className="input-control"
          style={{
            paddingLeft: icon ? '42px' : '14px',
            paddingRight: iconRight ? '42px' : '14px',
            borderColor: error ? 'var(--rabari-red)' : undefined,
            ...(error ? { boxShadow: '0 0 0 2px rgba(139, 46, 34, 0.15)' } : {})
          }}
          {...props}
        />
        {iconRight && (
          <div
            style={{
              position: 'absolute',
              right: '12px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {iconRight}
          </div>
        )}
      </div>
      {error && (
        <span
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--rabari-red)',
            marginTop: '4px',
            fontWeight: 500
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
