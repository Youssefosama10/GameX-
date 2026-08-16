import GameImage from "@components/GameImage/GameImage";
import type { TopSellingGame } from "../_data/dashboard.mock";

type TopSellingGamesProps = {
  games: TopSellingGame[];
};

export default function TopSellingGames({ games }: TopSellingGamesProps) {
  return (
    <article className="dash-card">
      <div className="dash-card__header">
        <h2 className="dash-card__title">Top Selling Games</h2>
        <a href="/dashboard/games" className="dash-view-all">
          View All
        </a>
      </div>

      <ul className="dash-rank-list">
        {games.map((game) => (
          <li key={game.rank} className="dash-rank">
            <span className="dash-rank__num">{game.rank}</span>
            <div className="dash-thumb dash-thumb--sm">
              <GameImage
                src={game.image}
                alt={game.title}
                fill
                sizes="40px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="dash-rank__info">
              <p className="dash-rank__title">{game.title}</p>
              <p className="dash-rank__sales">{game.sales}</p>
            </div>
            <p className="dash-rank__revenue">{game.revenue}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
