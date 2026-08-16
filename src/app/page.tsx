import Link from "next/link";
import Hero from "../../components/Hero/Hero";
import GameSection from "../../components/GameSection/GameSection";
import GameCard from "../../components/GameCard/GameCard";
import SubFooter from "../../components/SubFooter/SubFooter";
import { GetHomeData, GetHeroBanners } from "@/API/route.services";
import { resolveCoverImage } from "@/lib/gameImages";

export default async function Home() {
  const home = await GetHomeData();
  const banners = home?.heroBanners?.length ? home.heroBanners : await GetHeroBanners();
  const categories = (home?.categories ?? []).slice(0, 8);
  const flashSale = home?.flashSale;

  return (
    <>
      <Hero banners={banners} />

      {flashSale && flashSale.games.length > 0 ? (
        <section className="gx-section gx-flash">
          <div className="container">
            <div className="gx-section__head">
              <div>
                <h2 className="section-title">Flash Sale</h2>
                <p className="section-subtitle">{flashSale.title}</p>
              </div>
              <Link href="/deals" className="gx-section__link">
                All deals
              </Link>
            </div>
            <GameCard gameDetails={flashSale.games.map((item) => item.game)} />
          </div>
        </section>
      ) : null}

      {categories.length > 0 ? (
        <section className="gx-section">
          <div className="container">
            <div className="gx-section__head">
              <div>
                <h2 className="section-title">Browse Categories</h2>
                <p className="section-subtitle">Find games by the worlds you love to play</p>
              </div>
              <Link href="/categories" className="gx-section__link">
                All categories
              </Link>
            </div>
            <div className="gx-category-grid">
              {categories.map((category) => (
                <Link key={category.id || category.slug} href={`/categories/${category.slug}`} className="gx-category-card">
                  <img
                    src={resolveCoverImage(null, category.id, category.name, category.name)}
                    alt={category.name}
                  />
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <GameSection
        title="Featured Games"
        subtitle="Hand-picked titles ready for instant delivery"
        href="/games?featured=true"
        games={home?.featuredGames ?? []}
      />
      <GameSection
        title="Trending Now"
        subtitle="What players are adding to their libraries"
        href="/games?trending=true"
        games={home?.trendingGames ?? []}
      />
      <GameSection
        title="New Releases"
        subtitle="Fresh drops and latest launches"
        href="/games?newReleases=true"
        games={home?.newReleases ?? []}
      />
      <GameSection
        title="Top Rated"
        subtitle="Highest rated games on GameX"
        href="/games?sort=highest_rating"
        games={home?.topRated ?? []}
      />

      <SubFooter />
    </>
  );
}
