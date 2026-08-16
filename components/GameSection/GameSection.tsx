import Link from "next/link";
import GameCard from "../GameCard/GameCard";
import type { GamesCard } from "@/API/types";

export default function GameSection({
  title,
  subtitle,
  href,
  games,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  games: GamesCard[];
}) {
  if (!games.length) return null;

  return (
    <section className="gx-section">
      <div className="container">
        <div className="gx-section__head">
          <div>
            <h2 className="section-title">{title}</h2>
            {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
          </div>
          {href ? (
            <Link href={href} className="gx-section__link">
              View all
            </Link>
          ) : null}
        </div>
        <GameCard gameDetails={games} />
      </div>
    </section>
  );
}
