
import Image from "next/image";
import ImageGames from "@/assets/images/image-Games.png";
import Caption from "../../../components/Caption/Caption";
import LoginForm from "./LoginForm";




/* ─────────────── SVG Icons ─────────────── */

function IconGamepad() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="12" x2="18" y2="12" /><line x1="12" y1="6" x2="12" y2="18" />
      <rect x="2" y="6" width="20" height="12" rx="4" />
    </svg>
  );
}



/* Benefit icons */
function IconLibrary() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function IconTag() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function IconTrophy() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 17 8 21" /><polyline points="16 17 16 21" /><line x1="12" y1="17" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <path d="M5 3h14v8a7 7 0 0 1-14 0V3z" />
      <path d="M5 7H3a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h2" />
      <path d="M19 7h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/* Feature icons */


/* Social brand icons */
function IconGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function IconSteam() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#b8b8b8">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0z"/>
    </svg>
  );
}

function IconDiscord() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#5865F2">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
    </svg>
  );
}

/* Social footer icons */

/* ─────────────────────────────────────────
   Password strength logic
───────────────────────────────────────── */

/* ─────────────── Main Page ─────────────── */

export default function LoginPage() {
 

  return (
    <>
      {/* ── NAVBAR ── */}

      {/* ── MAIN ── */}
      <main className="main-content">
        {/* Registration card */}
        <div className="register-grid" role="main">

          {/* ── LEFT: Form Panel ── */}
          <section className="form-panel" aria-labelledby="register-title">
            <div className="form-badge">
              <IconGamepad />
              JOIN GAME X 
            </div>

            <h1 id="register-title" className="form-title">Login to Your Accont</h1>
            <p className="form-subtitle"> Enter your credentials to continue your gaming journey </p>

            {/* Social login */}
            <div className="social-buttons" role="group" aria-label="Sign up with social accounts">
              <button id="btn-google" className="social-btn" type="button">
                <IconGoogle />
                Continue with Google
              </button>
              <button id="btn-steam" className="social-btn" type="button">
                <IconSteam />
                Continue with Steam
              </button>
              <button id="btn-discord" className="social-btn" type="button">
                <IconDiscord />
                Continue with Discord
              </button>
            </div>

            {/* Divider */}
            <div className="divider" role="separator">
              <span className="divider-line" />
              <span className="divider-text">or</span>
              <span className="divider-line" />
            </div>

            {/* Form */}

            <LoginForm/>

          </section>

          {/* ── RIGHT: Hero panel ── */}
          <aside className="hero-panel" aria-label="Why join GameX">
            <Image
              // src="/gamer-hero.png"
              src={ImageGames}
              alt="Cyberpunk gamer with glowing purple headphones"
              fill
              className="hero-image"
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="hero-overlay" />

            <div className="hero-content">
              <h2 className="hero-title">
                Why Join <span>GameX</span>?
              </h2>

              <ul className="benefits-list">
                <li className="benefit-item">
                  <div className="benefit-icon"><IconLibrary /></div>
                  <div className="benefit-text">
                    <h4>Huge Game Library</h4>
                    <p>Access thousands of premium games</p>
                  </div>
                </li>
                <li className="benefit-item">
                  <div className="benefit-icon"><IconTag /></div>
                  <div className="benefit-text">
                    <h4>Exclusive Deals</h4>
                    <p>Get access to members-only discounts</p>
                  </div>
                </li>
                <li className="benefit-item">
                  <div className="benefit-icon"><IconTrophy /></div>
                  <div className="benefit-text">
                    <h4>Rewards &amp; Achievements</h4>
                    <p>Earn rewards and unlock achievements</p>
                  </div>
                </li>
                <li className="benefit-item">
                  <div className="benefit-icon"><IconUsers /></div>
                  <div className="benefit-text">
                    <h4>Gaming Community</h4>
                    <p>Connect with millions of gamers</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* ── FEATURES STRIP ── */}

         <Caption />
      </main>



    </>
  );
}
