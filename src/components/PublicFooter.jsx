import React from 'react';
import { Link } from 'react-router-dom';
import { publicAsset } from '../utils/publicAsset';

export default function PublicFooter() {
  return (
    <footer className="public-footer">
      <Link className="public-footer-brand" to="/" aria-label="SAGA Hospitality home">
        <img src={publicAsset('/assets/logo/saga-hospitality-logo.png')} alt="SAGA Hospitality" />
      </Link>

      <div className="public-footer-copy">
        <span>WILD BY NATURE · ROOTED IN PURPOSE</span>
        <Link to="/coming-soon">PLAN YOUR STAY <span aria-hidden="true">↗</span></Link>
      </div>

      <div className="public-footer-contacts">
        <a href="tel:+919783100471" className="public-footer-contact-link">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          97831 00471
        </a>
        <a href="https://maps.app.goo.gl/YPB5FwdaUbc15dZm8" target="_blank" rel="noopener noreferrer" className="public-footer-contact-link">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          SAGA Jawai, Rajasthan
        </a>
        <a href="https://www.instagram.com/sagajawai" target="_blank" rel="noopener noreferrer" className="public-footer-contact-link">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          @sagajawai
        </a>
        <a href="https://www.facebook.com/share/1E5a864iTp/" target="_blank" rel="noopener noreferrer" className="public-footer-contact-link">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          SAGA Jawai
        </a>
      </div>
    </footer>
  );
}
