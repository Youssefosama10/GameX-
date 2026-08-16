import Link from "next/link";
import GameCard from "../../../../components/GameCard/GameCard";
import Pagination from "../../../../components/Pagination/Pagination";
import { GetCategory, GetCategoryGames } from "@/API/route.services";

export default async function CategoryDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page = "1" } = await searchParams;
  const currentPage = Number(page) || 1;
  const [category, result] = await Promise.all([
    GetCategory(slug),
    GetCategoryGames(slug, currentPage, 12),
  ]);

  return (
    <div className="page-wrapper">
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/categories">Categories</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-item active">{category?.name || slug}</span>
        </nav>
        <div className="gx-catalog__intro">
          <h1 className="section-title">{category?.name || "Category"}</h1>
          <p className="section-subtitle">Games in this collection.</p>
        </div>
        {result?.games.length ? (
          <GameCard gameDetails={result.games} />
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🎮</div>
            <h3>No games in this category</h3>
            <p>Check back later or browse the full catalog.</p>
            <Link href="/games" className="gx-btn gx-btn--primary">
              Browse games
            </Link>
          </div>
        )}
        <Pagination
          page={result?.pagination.page ?? currentPage}
          totalPages={result?.pagination.totalPages ?? 1}
          hrefFor={(next) => `/categories/${slug}?page=${next}`}
        />
      </div>
    </div>
  );
}
