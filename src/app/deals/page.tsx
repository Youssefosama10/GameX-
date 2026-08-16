import GameCard from "../../../components/GameCard/GameCard";
import { GetActiveFlashSale, GetGames } from "@/API/route.services";

export default async function DealsPage() {
  const [flashSale, discounted] = await Promise.all([
    GetActiveFlashSale(),
    GetGames({ page: 1, limit: 12, discount: true, sort: "price_low" }),
  ]);

  const flashGames = flashSale?.games.map((item) => item.game) ?? [];

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="gx-catalog__intro">
          <p className="gx-kicker">Limited time</p>
          <h1 className="section-title">Deals & Flash Sales</h1>
          <p className="section-subtitle">Save on featured titles and discounted games.</p>
        </div>

        {flashGames.length ? (
          <section className="gx-section gx-flash">
            <h2 className="section-title">{flashSale?.title || "Flash Sale"}</h2>
            {flashSale?.endDate ? (
              <p className="section-subtitle">Ends {new Date(flashSale.endDate).toLocaleString()}</p>
            ) : null}
            <GameCard gameDetails={flashGames} />
          </section>
        ) : null}

        {discounted?.games.length ? (
          <section className="gx-section">
            <h2 className="section-title">On Sale</h2>
            <GameCard gameDetails={discounted.games} />
          </section>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">⚡</div>
            <h3>No active deals</h3>
            <p>Check back soon for flash sales and discounted titles.</p>
          </div>
        )}
      </div>
    </div>
  );
}
