import GameCard from "../../components/GameCard/GameCard";

export default function HomeLoading() {
  return (
    <section style={{ padding: "40px 24px", display: "flex", justifyContent: "center" }}>
      <div className="game-card-grid" style={{ width: "100%", maxWidth: 1400 }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="game-card">
            <div className="skeleton skeleton-card" />
            <div className="skeleton skeleton-line lg" style={{ margin: "16px" }} />
            <div className="skeleton skeleton-line md" style={{ margin: "0 16px 16px" }} />
          </div>
        ))}
      </div>
    </section>
  );
}
