import Link from "next/link";
import { GetCategories } from "@/API/route.services";
import { resolveCoverImage } from "@/lib/gameImages";

export default async function CategoriesPage() {
  const categories = await GetCategories();

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="gx-catalog__intro">
          <p className="gx-kicker">Explore</p>
          <h1 className="section-title">Categories</h1>
          <p className="section-subtitle">Jump into a genre and start building your collection.</p>
        </div>
        {categories.length ? (
          <div className="gx-category-grid gx-category-grid--full">
            {categories.map((category) => (
              <Link
                key={category.id || category.slug}
                href={`/categories/${category.slug}`}
                className="gx-category-card"
              >
                <img src={resolveCoverImage(null, category.id, category.name, category.name)} alt={category.name} />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📁</div>
            <h3>No categories yet</h3>
            <p>Categories will appear here once they are available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
