"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

interface WishlistHeaderProps {
  itemCount?: number;
  sortValue?: string;
  onSortChange?: (value: string) => void;
}

export default function WishlistHeader({
  itemCount,
  sortValue,
  onSortChange,
}: WishlistHeaderProps) {
  return (
    <header className="wl-header">
      <nav className="breadcrumb wl-breadcrumb" aria-label="Breadcrumb">
        <Link href="/" className="breadcrumb-item">
          Home
        </Link>
        <span className="breadcrumb-sep">&gt;</span>
        <span className="breadcrumb-item wl-breadcrumb__current">Wishlist</span>
      </nav>

      <div className="wl-header__row">
        <div className="wl-header__title-group">
          <Heart className="wl-header__heart" size={36} />
          <h1 className="wl-header__title">My Wishlist</h1>
          {typeof itemCount === "number" ? (
            <span className="wl-count-badge">
              {itemCount} {itemCount === 1 ? "Item" : "Items"}
            </span>
          ) : null}
        </div>

        {onSortChange ? (
          <label className="wl-sort">
            <span>Sort by:</span>
            <select
              value={sortValue}
              onChange={(event) => onSortChange(event.target.value)}
              aria-label="Sort wishlist"
            >
              <option value="recent">Recently Added</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </label>
        ) : null}
      </div>
    </header>
  );
}
