'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Mail, Gamepad2, Trophy, Zap, ArrowRight, Smartphone, ChevronRight, Star, Sparkles } from 'lucide-react';

export default function SubFooter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('You are subscribed to GameX drops and exclusive deals!', {
      position: 'bottom-right',
      autoClose: 3000,
    });
    setEmail('');
  };

  return (
    <section className="subfooter-section">
      <div className="subfooter-grid">
        <div className="subfooter-card">
          <div className="subfooter-card__watermark">
            <Image
              src="/games/GamesX-1.png"
              alt="Gaming artwork"
              fill
              sizes="(max-width: 768px) 320px, 380px"
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="subfooter-card__content">
            <div className="subfooter-card__header">
              <div className="subfooter-icon-badge">
                <Mail size={22} />
              </div>
              <div>
                <span className="subfooter-eyebrow">NEWSLETTER</span>
                <span className="subfooter-subtext">50,000+ gamers subscribed</span>
              </div>
            </div>

            <h2 className="subfooter-title">
              Never Miss a
              <br />
              <span className="subfooter-gradient-text">Major Game Drop</span>
            </h2>

            <p className="subfooter-description">
              Weekly releases, exclusive discounts, and member-only bundles delivered straight to your inbox.
            </p>

            <div className="subfooter-feature-grid">
              <div className="subfooter-feature">
                <Gamepad2 size={18} />
                <div>
                  <strong>New Releases</strong>
                  <span>Every week</span>
                </div>
              </div>
              <div className="subfooter-feature">
                <Zap size={18} />
                <div>
                  <strong>Flash Deals</strong>
                  <span>Early access</span>
                </div>
              </div>
              <div className="subfooter-feature">
                <Trophy size={18} />
                <div>
                  <strong>Member Perks</strong>
                  <span>VIP offers</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="subfooter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="subfooter-input"
              />
              <button type="submit" className="subfooter-submit">
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>

            <p className="subfooter-note">
              <Sparkles size={14} />
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        </div>

        <div className="subfooter-card subfooter-card--app">
          <div className="subfooter-app-mockup">
            <Image
              src="/games/app_mockup.png"
              alt="GameX mobile app"
              width={340}
              height={560}
              className="subfooter-app-image"
              priority
            />
          </div>

          <div className="subfooter-card__content">
            <div className="subfooter-app-badge">
              <Smartphone size={16} />
              MOBILE APP
            </div>

            <h2 className="subfooter-title subfooter-title--compact">
              Shop Faster on
              <br />
              <span className="subfooter-gradient-text">GameX Mobile</span>
            </h2>

            <p className="subfooter-description">
              App-exclusive deals, instant key delivery, and 15% off your first mobile purchase.
            </p>

            <div className="subfooter-store-list">
              <Link href="#" className="subfooter-store-btn">
                <span className="subfooter-store-copy">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </span>
                <ChevronRight size={18} />
              </Link>
              <Link href="#" className="subfooter-store-btn">
                <span className="subfooter-store-copy">
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </span>
                <ChevronRight size={18} />
              </Link>
            </div>

            <div className="subfooter-rating">
              <div className="subfooter-stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={14} fill="currentColor" />
                ))}
              </div>
              <strong>4.9</strong>
              <span>100K+ downloads</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
