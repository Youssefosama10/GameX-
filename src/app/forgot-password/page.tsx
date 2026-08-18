import Image from "next/image";
import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";

function IconGamepad() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="4" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <circle cx="16" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="13" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconHelp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconDiscord() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function MailLockIllustration() {
  return (
    <svg className="fp-illustration__svg" viewBox="0 0 220 200" fill="none" aria-hidden="true">
      <defs>
        <filter id="fp-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="fp-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="38" cy="42" r="2.2" fill="#A855F7" opacity="0.7" />
      <circle cx="178" cy="28" r="1.8" fill="#C084FC" opacity="0.8" />
      <circle cx="196" cy="96" r="2" fill="#A855F7" opacity="0.55" />
      <circle cx="28" cy="128" r="1.6" fill="#C084FC" opacity="0.6" />
      <circle cx="54" cy="176" r="1.4" fill="#A855F7" opacity="0.5" />
      <circle cx="168" cy="168" r="1.7" fill="#C084FC" opacity="0.7" />

      <g filter="url(#fp-glow)">
        <path
          d="M36 36h120c14.4 0 26 11.6 26 26v58c0 14.4-11.6 26-26 26H92l-22 22v-22H36c-14.4 0-26-11.6-26-26V62c0-14.4 11.6-26 26-26z"
          stroke="#A855F7"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>

      <g filter="url(#fp-glow)" transform="translate(62 58)">
        <rect x="0" y="10" width="72" height="50" rx="8" stroke="#C084FC" strokeWidth="2.5" />
        <path d="M2 16 L36 38 L70 16" stroke="#C084FC" strokeWidth="2.5" strokeLinejoin="round" />
      </g>

      <g filter="url(#fp-glow-strong)" transform="translate(148 118)">
        <circle cx="24" cy="24" r="24" fill="#7C3AED" />
        <circle cx="24" cy="24" r="22" fill="#A855F7" />
        <rect x="14" y="22" width="20" height="16" rx="3" fill="#1A0B2E" />
        <path d="M18 22v-5a6 6 0 0 1 12 0v5" stroke="#1A0B2E" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="24" cy="29" r="2" fill="#A855F7" />
      </g>
    </svg>
  );
}

export default function ForgotPasswordPage() {
  return (
    <div className="fp-page">
      <header className="fp-header">
        <Link href="/" className="fp-logo" aria-label="GAME ZONE home">
          <span className="fp-logo__icon" aria-hidden="true">
            <IconGamepad />
          </span>
          <span className="fp-logo__text">GAME ZONE</span>
        </Link>

        <div className="fp-header__right">
          <span className="fp-header__hint">Remember your password?</span>
          <Link href="/login" className="fp-back">
            Back to Login
            <IconArrow />
          </Link>
        </div>
      </header>

      <main className="fp-main">
        <aside className="fp-hero" aria-hidden="true">
          <div className="fp-hero__image">
            <Image
              src="/games/img-X.png"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
              className="fp-hero__img"
            />
          </div>
        </aside>

        <section className="fp-card" aria-labelledby="forgot-title">
          <div className="fp-card__top">
            <div className="fp-illustration">
              <MailLockIllustration />
            </div>
            <ForgotPasswordForm />
          </div>

          <div className="fp-or" role="separator">
            <span className="fp-or__line" />
            <span className="fp-or__text">OR</span>
            <span className="fp-or__line" />
          </div>

          <Link href="#" className="fp-support">
            <span className="fp-support__icon" aria-hidden="true">
              <IconHelp />
            </span>
            <span className="fp-support__copy">Need help?</span>
            <span className="fp-support__link">
              Contact Support
              <IconArrow />
            </span>
          </Link>
        </section>
      </main>

      <footer className="fp-footer">
        <p>© 2024 Game Zone. All rights reserved.</p>
        <nav className="fp-socials" aria-label="Social media">
          <Link href="#" className="fp-social" aria-label="Discord">
            <IconDiscord />
          </Link>
          <Link href="#" className="fp-social" aria-label="Twitter">
            <IconTwitter />
          </Link>
          <Link href="#" className="fp-social" aria-label="YouTube">
            <IconYoutube />
          </Link>
          <Link href="#" className="fp-social" aria-label="Instagram">
            <IconInstagram />
          </Link>
        </nav>
      </footer>
    </div>
  );
}
