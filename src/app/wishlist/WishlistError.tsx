"use client";

import { useRouter } from "next/navigation";
import WishlistHeader from "./WishlistHeader";

export default function WishlistError() {
  const router = useRouter();

  return (
    <div className="page-wrapper wishlist-page">
      <div className="container">
        <WishlistHeader />
        <div className="empty-state">
          <div className="empty-state-icon">⚠️</div>
          <h3>Could not load your wishlist</h3>
          <p>Something went wrong while fetching your saved games. Please try again.</p>
          <button
            type="button"
            className="gx-btn gx-btn--primary gx-btn--lg"
            onClick={() => router.refresh()}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
