import Link from 'next/link';

/* ── Icon helpers ── */
function IconGamepad() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="4" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="12" y1="6" x2="12" y2="18" />
    </svg>
  );
}
function IconDiscord() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>;
}
function IconTwitter() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}
function IconFacebook() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
}
function IconInstagram() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
}
function IconYoutube() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
}

/**
 * Shared Footer — server component.
 * Renders brand, shop links, support, company, payment methods.
 */
export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label="GameX home">
              <div className="logo-icon" aria-hidden="true"><IconGamepad /></div>
              <span className="logo-text">Game<span>X</span></span>
            </Link>
            <p>Your ultimate destination for the best games — find, compare, and play.</p>
            <div className="footer-socials" role="list" aria-label="Social media">
              <Link href="#" className="social-link" aria-label="Discord" role="listitem"><IconDiscord /></Link>
              <Link href="#" className="social-link" aria-label="Twitter" role="listitem"><IconTwitter /></Link>
              <Link href="#" className="social-link" aria-label="Facebook" role="listitem"><IconFacebook /></Link>
              <Link href="#" className="social-link" aria-label="Instagram" role="listitem"><IconInstagram /></Link>
              <Link href="#" className="social-link" aria-label="YouTube" role="listitem"><IconYoutube /></Link>
            </div>
          </div>

          {/* Shop */}
          <nav className="footer-col" aria-label="Shop links">
            <h5>Shop</h5>
            <ul>
              <li><Link href="/games">All Games</Link></li>
              <li><Link href="/deals">Deals</Link></li>
              <li><Link href="/games?newReleases=true">New Releases</Link></li>
              <li><Link href="/games?sort=best_selling">Top Sellers</Link></li>
            </ul>
          </nav>

          {/* Support */}
          <nav className="footer-col" aria-label="Support links">
            <h5>Support</h5>
            <ul>
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Refund Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
            </ul>
          </nav>

          {/* Company */}
          <nav className="footer-col" aria-label="Company links">
            <h5>Company</h5>
            <ul>
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">News</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </nav>

          {/* Payment */}
          <div className="footer-col">
            <h5>Payment Methods</h5>
            <div className="payment-methods" role="list" aria-label="Accepted payment methods">
              <div className="payment-card visa" role="listitem">VISA</div>
              <div className="payment-card" role="listitem" style={{ background: '#1a1a28', color: '#ccc' }}>
                <svg width="30" height="18" viewBox="0 0 38 24" aria-label="Mastercard">
                  <circle cx="15" cy="12" r="10" fill="#EB001B"/>
                  <circle cx="23" cy="12" r="10" fill="#F79E1B" opacity="0.9"/>
                </svg>
              </div>
              <div className="payment-card paypal" role="listitem">PayPal</div>
              <div className="payment-card" role="listitem" style={{ color: '#9999b8', fontSize: '11px' }}>AMEX</div>
              <div className="payment-card" role="listitem" style={{ color: '#f0f0f8', fontSize: '11px' }}> Pay</div>
              <div className="payment-card" role="listitem" style={{ color: '#f0f0f8', fontSize: '11px' }}>G Pay</div>
            </div>
          </div>
        </div>

        <p className="footer-bottom">
          &copy; 2024 GameX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
