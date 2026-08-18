"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-wrapper">
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <h3>Something went wrong</h3>
        <p>Please try again. If the problem continues, come back later.</p>
        <button type="button" className="gx-btn gx-btn--primary" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  );
}
