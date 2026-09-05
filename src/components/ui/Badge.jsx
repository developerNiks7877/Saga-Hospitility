import React from 'react';

export default function Badge({
  children,
  variant = 'olive',
  icon = null,
  className = '',
  style = {}
}) {
  let badgeClass = 'badge-olive';
  if (variant === 'gold') badgeClass = 'badge-gold';
  if (variant === 'ochre') badgeClass = 'badge-ochre';
  if (variant === 'red') badgeClass = 'badge-red';
  if (variant === 'stone') badgeClass = 'badge-stone';

  return (
    <span className={`badge ${badgeClass} ${className}`} style={style}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  );
}
