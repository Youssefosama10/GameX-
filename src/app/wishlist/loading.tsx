import WishlistHeader from "./WishlistHeader";

export default function WishlistLoading() {
  return (
    <div className="page-wrapper wishlist-page">
      <div className="container">
        <WishlistHeader />
        <div className="wishlist-layout">
          <div className="wishlist-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="wl-card">
                <div className="skeleton skeleton-card" style={{ minHeight: 180, borderRadius: 0 }} />
                <div className="skeleton skeleton-line lg" style={{ margin: "16px 16px 8px" }} />
                <div className="skeleton skeleton-line sm" style={{ margin: "0 16px 16px" }} />
              </div>
            ))}
          </div>
          <aside className="wl-sidebar">
            <div className="wl-side-card">
              <div className="skeleton skeleton-line lg" />
              <div className="skeleton skeleton-line md" style={{ marginTop: 12 }} />
              <div className="skeleton skeleton-line lg" style={{ marginTop: 20, height: 40 }} />
            </div>
            <div className="wl-side-card">
              <div className="skeleton skeleton-line md" />
              <div className="skeleton skeleton-line lg" style={{ marginTop: 16 }} />
              <div className="skeleton skeleton-line lg" style={{ marginTop: 12 }} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
