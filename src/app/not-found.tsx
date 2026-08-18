import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrapper">
      <div className="empty-state">
        <div className="empty-state-icon">🎮</div>
        <h3>Page not found</h3>
        <p>The page you are looking for does not exist or is no longer available.</p>
        <Link href="/" className="gx-btn gx-btn--primary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
