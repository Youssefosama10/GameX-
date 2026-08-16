import Link from "next/link";
import { GetLibrary } from "@/API/route.services";
import { resolveCoverImage } from "@/lib/gameImages";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const games = await GetLibrary();

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="gx-catalog__intro">
          <p className="gx-kicker">Owned games</p>
          <h1 className="section-title">My Library</h1>
          <p className="section-subtitle">License keys and downloads for everything you purchased.</p>
        </div>
        {games.length ? (
          <div className="gx-category-grid gx-category-grid--full">
            {games.map((item) => (
              <Link key={item.id} href={`/library/${item.id}`} className="gx-category-card">
                <img
                  src={resolveCoverImage(null, item.game.id, item.game.title, item.game.genre)}
                  alt={item.game.title}
                />
                <span>
                  {item.game.title}
                  <small className="block text-xs text-zinc-300">{formatDate(item.purchasedAt)}</small>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>Your library is empty</h3>
            <p>Buy a game to unlock license keys and downloads.</p>
            <Link href="/games" className="gx-btn gx-btn--primary">
              Browse games
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
