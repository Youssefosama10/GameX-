export default function CartLoading() {
  return (
    <div className="page-wrapper cart-page">
      <header className="cart-hero">
        <div className="container cart-hero__inner">
          <div className="skeleton skeleton-title" style={{ width: 220, height: 44 }} />
          <div className="skeleton skeleton-line sm" style={{ marginTop: 12, width: 160 }} />
        </div>
      </header>

      <div className="container cart-page__body">
        <div className="cart-layout">
          <section className="cart-items-panel">
            <div className="cart-items-panel__header">
              <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 12 }} />
              <div style={{ flex: 1, display: "grid", gap: 8 }}>
                <div className="skeleton skeleton-line lg" />
                <div className="skeleton skeleton-line sm" />
              </div>
            </div>
            <div className="cart-items-list">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="cart-item">
                  <div className="skeleton" style={{ width: 88, height: 88, borderRadius: 12 }} />
                  <div style={{ flex: 1, display: "grid", gap: 10 }}>
                    <div className="skeleton skeleton-line lg" />
                    <div className="skeleton skeleton-line md" />
                    <div className="skeleton skeleton-line sm" />
                  </div>
                </div>
              ))}
            </div>
          </section>
          <aside className="order-summary-panel">
            <div className="skeleton skeleton-line lg" />
            <div className="skeleton skeleton-line md" style={{ marginTop: 16 }} />
            <div className="skeleton skeleton-line md" style={{ marginTop: 12 }} />
            <div className="skeleton skeleton-line lg" style={{ marginTop: 24, height: 48 }} />
          </aside>
        </div>
      </div>
    </div>
  );
}
