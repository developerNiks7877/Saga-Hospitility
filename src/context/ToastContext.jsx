import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((type, message, duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, type, message }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '400px',
          width: 'calc(100% - 48px)',
          pointerEvents: 'none'
        }}
      >
        {toasts.map((toast) => {
          let bg = '#FFFFFF';
          let border = 'var(--border-medium)';
          let color = 'var(--text-main)';
          let IconComponent = Info;
          let iconColor = 'var(--warm-gold)';

          if (toast.type === 'success') {
            bg = '#F2F8F4';
            border = 'rgba(14, 123, 74, 0.3)';
            color = '#155724';
            IconComponent = CheckCircle2;
            iconColor = '#155724';
          } else if (toast.type === 'error') {
            bg = '#FDF2F2';
            border = 'rgba(139, 46, 34, 0.3)';
            color = 'var(--rabari-red)';
            IconComponent = AlertCircle;
            iconColor = 'var(--rabari-red)';
          } else if (toast.type === 'gold' || toast.type === 'offer') {
            bg = '#FAF7F0';
            border = 'var(--warm-gold)';
            color = 'var(--deep-olive)';
            IconComponent = Sparkles;
            iconColor = 'var(--warm-gold)';
          }

          return (
            <div
              key={toast.id}
              style={{
                background: bg,
                border: `1px solid ${border}`,
                color: color,
                borderRadius: '12px',
                padding: '14px 18px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                pointerEvents: 'auto',
                animation: 'fadeIn 0.25s ease',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: 1.4
              }}
            >
              <IconComponent size={18} style={{ color: iconColor, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: 0.7
                }}
                aria-label="Close notification"
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
