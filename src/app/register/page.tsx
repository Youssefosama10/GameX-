
import Image from "next/image";
import Caption from "../../../components/Caption/Caption";
import RegisterForm from "./RegisterForm";
import game4 from "@/assets/images/game-4.png";



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

/* ─────────────── Main Page ─────────────── */

export default function RegisterPage() {
 

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

            <h1 id="register-title" className="form-title">Create Your Account</h1>
            <p className="form-subtitle">Join thousands of gamers and start your adventure</p>

            <RegisterForm />

          </section>

          {/* ── RIGHT: Hero panel ── */}
          <aside className="hero-panel" aria-label="Why join GameX">
            <Image
              src={game4}
              alt="God of War Ragnarok game artwork"
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
