import React from 'react';

export default function Card({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  style = {},
  onClick,
  ...props
}) {
  let cardClass = 'heritage-card';
  if (variant === 'ivory') cardClass = 'heritage-card-ivory';
  if (variant === 'olive') cardClass = 'heritage-card-olive';

  return (
    <div
      className={`${cardClass} ${className}`}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        ...(hoverable ? { transition: 'all var(--transition-normal)' } : {}),
        ...style
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
