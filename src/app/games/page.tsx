import { Suspense } from "react";
import GameCard from "../../../components/GameCard/GameCard";
import Pagination from "../../../components/Pagination/Pagination";
import { GetGames } from "@/API/route.services";
import type { GamesQuery } from "@/API/types";
import GamesFilters from "./GamesFilters";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query: GamesQuery = {
    page: Number(first(params.page) || 1),
    limit: 12,
    sort: first(params.sort) || "newest",
    search: first(params.search),
    genre: first(params.genre),
    platform: first(params.platform),
    minPrice: first(params.minPrice),
    maxPrice: first(params.maxPrice),
    discount: first(params.discount),
    rating: first(params.rating),
    availability: first(params.availability),
    featured: first(params.featured),
    trending: first(params.trending),
    newReleases: first(params.newReleases),
    category: first(params.category),
  };

  const result = await GetGames(query);
  const games = result?.games ?? [];
  const pagination = result?.pagination ?? { page: 1, limit: 12, total: 0, totalPages: 1 };

  const hrefFor = (page: number) => {
    const next = new URLSearchParams();
    Object.entries({ ...params, page: String(page) }).forEach(([key, value]) => {
      const current = first(value);
      if (current) next.set(key, current);
    });
    return `/games?${next.toString()}`;
  };

  return (
    <div className="page-wrapper">
      <div className="container gx-catalog">
        <div className="gx-catalog__intro">
          <p className="gx-kicker">Digital catalog</p>
          <h1 className="section-title">Browse Games</h1>
          <p className="section-subtitle">
            Search, filter, and discover the next title for your library.
          </p>
        </div>

        <div className="gx-catalog__layout">
          <Suspense fallback={<div className="gx-filters" />}>
            <GamesFilters />
          </Suspense>
          <div>
            {games.length ? (
              <GameCard gameDetails={games} />
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🎮</div>
                <h3>No games found</h3>
                <p>Try a different search or clear your filters.</p>
              </div>
            )}
            <Pagination page={pagination.page} totalPages={pagination.totalPages} hrefFor={hrefFor} />
          </div>
        </div>
      </div>
    </div>
  );
}
