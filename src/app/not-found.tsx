import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-bg" />
      <span className="notfound-pixel" style={{ top: "18%", left: "14%" }} />
      <span className="notfound-pixel" style={{ top: "28%", right: "18%" }} />
      <span className="notfound-pixel" style={{ bottom: "22%", left: "22%" }} />
      <span className="notfound-pixel" style={{ bottom: "30%", right: "12%" }} />

      <div className="notfound-content">
        <p className="notfound-gameover">Game Over</p>
        <div className="notfound-404">404</div>
        <h1 className="notfound-title">Level not found</h1>
        <p className="notfound-desc">
          This page dropped out of the map. Warp back to the store and keep playing.
        </p>
        <div className="notfound-actions">
          <Link href="/" className="gx-btn gx-btn--primary gx-btn--lg">
            Back to home
          </Link>
          <Link href="/games" className="gx-btn gx-btn--ghost gx-btn--lg">
            Browse games
          </Link>
        </div>
      </div>
    </div>
  );
}
