import React from 'react';
import { LuShieldCheck, LuZap, LuHeadphones, LuGift } from "react-icons/lu";

export default function Caption() {

  function IconShield() {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  
  function IconZap() {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  
  function IconHeadphones() {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    );
  }
  
  function IconGift() {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    );
  }


  return (
    <div className="features-strip m-4! " role="region" aria-label="Platform features">
    <div className="feature-item">
      <div className="feature-icon"><IconShield /></div>
      <div className="feature-text">
        <h4>Secure &amp; Safe</h4>
        <p>Your data is 100% protected</p>
      </div>
    </div>
    <div className="feature-item">
      <div className="feature-icon"><IconZap /></div>
      <div className="feature-text">
        <h4>Instant Access</h4>
        <p>Start playing right away</p>
      </div>
    </div>
    <div className="feature-item">
      <div className="feature-icon"><IconHeadphones /></div>
      <div className="feature-text">
        <h4>24/7 Support</h4>
        <p>We&apos;re here to help anytime</p>
      </div>
    </div>
    <div className="feature-item">
      <div className="feature-icon"><IconGift /></div>
      <div className="feature-text">
        <h4>Member Benefits</h4>
        <p>Exclusive perks &amp; rewards</p>
      </div>
    </div>
  </div>
  );
}