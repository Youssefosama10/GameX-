import Link from "next/link";
import { Library } from "lucide-react";
import { GetLibrary } from "@/API/route.services";
import { resolveCoverImage } from "@/lib/gameImages";
import { formatDate } from "@/lib/format";
import EmptyState from "@components/EmptyState/EmptyState";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const games = await GetLibrary();
  const isEmpty = !games.length;

  return (
    <div className={`page-wrapper${isEmpty ? " page-wrapper--empty" : ""}`}>
      <div className="container">
        <div className="gx-catalog__intro">
          <p className="gx-kicker">Owned games</p>
          <h1 className="section-title">My Library</h1>
          <p className="section-subtitle">License keys and downloads for everything you purchased.</p>
        </div>
        {isEmpty ? (
          <EmptyState
            icon={Library}
            title="Your library is empty"
            description="Buy a game to unlock license keys and downloads."
            ctaLabel="Browse games"
            ctaHref="/games"
          />
        ) : (
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
        )}
      </div>
    </div>
  );
}
