"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "highest_rating", label: "Highest Rating" },
  { value: "most_popular", label: "Most Popular" },
  { value: "best_selling", label: "Best Selling" },
];

const GENRES = ["Action", "Adventure", "RPG", "Racing", "Shooter", "Strategy", "Sports", "Puzzle"];
const PLATFORMS = ["PC", "PlayStation", "Xbox", "Nintendo"];

export default function GamesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = new URLSearchParams();
    for (const [key, value] of form.entries()) {
      if (typeof value === "string" && value) next.set(key, value);
    }
    router.push(`/games?${next.toString()}`);
    setOpen(false);
  }

  return (
    <aside className="gx-filters">
      <button type="button" className="gx-filters__toggle" onClick={() => setOpen((value) => !value)}>
        {open ? "Hide filters" : "Show filters"}
      </button>
      <form className={`gx-filters__form ${open ? "is-open" : ""}`} onSubmit={apply}>
        <label>
          Search
          <input name="search" defaultValue={searchParams.get("search") ?? ""} placeholder="Search titles" />
        </label>
        <label>
          Sort
          <select name="sort" defaultValue={searchParams.get("sort") ?? "newest"}>
            {SORTS.map((sort) => (
              <option key={sort.value} value={sort.value}>
                {sort.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Genre
          <select name="genre" defaultValue={searchParams.get("genre") ?? ""}>
            <option value="">All genres</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Platform
          <select name="platform" defaultValue={searchParams.get("platform") ?? ""}>
            <option value="">All platforms</option>
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </label>
        <div className="gx-filters__row">
          <label>
            Min price
            <input name="minPrice" type="number" min="0" defaultValue={searchParams.get("minPrice") ?? ""} />
          </label>
          <label>
            Max price
            <input name="maxPrice" type="number" min="0" defaultValue={searchParams.get("maxPrice") ?? ""} />
          </label>
        </div>
        <label>
          Availability
          <select name="availability" defaultValue={searchParams.get("availability") ?? ""}>
            <option value="">Any</option>
            <option value="in_stock">In stock</option>
            <option value="out_of_stock">Out of stock</option>
          </select>
        </label>
        <label className="gx-filters__check">
          <input type="checkbox" name="discount" value="true" defaultChecked={searchParams.get("discount") === "true"} />
          On sale
        </label>
        <div className="gx-filters__actions">
          <button type="submit" className="gx-btn gx-btn--primary">
            Apply
          </button>
          <button type="button" className="gx-btn gx-btn--ghost" onClick={() => router.push("/games")}>
            Reset
          </button>
        </div>
      </form>
    </aside>
  );
}
