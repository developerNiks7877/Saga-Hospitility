import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon = null,
  iconRight = null,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  let variantClass = 'btn-primary';
  if (variant === 'secondary') variantClass = 'btn-secondary';
  if (variant === 'gold') variantClass = 'btn-gold';
  if (variant === 'red') variantClass = 'btn-red';
  if (variant === 'outline') variantClass = 'btn-outline';

  let sizeStyle = {
    padding: size === 'sm' ? '6px 14px' : size === 'lg' ? '14px 28px' : '10px 20px',
    fontSize: size === 'sm' ? 'var(--text-xs)' : size === 'lg' ? 'var(--text-base)' : 'var(--text-sm)',
    borderRadius: 'var(--radius-sm)'
  };

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${className}`}
      style={sizeStyle}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
          {children}
          {iconRight && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconRight}</span>}
        </>
      )}
    </button>
  );
}
