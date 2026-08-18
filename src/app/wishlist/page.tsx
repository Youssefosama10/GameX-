import { Heart } from "lucide-react";
import { GetAllGames, GetUserWishlist } from "@/API/route.services";
import EmptyState from "@components/EmptyState/EmptyState";
import WishlistClient from "./WishlistClient";
import WishlistError from "./WishlistError";
import WishlistHeader from "./WishlistHeader";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const [wishlist, games] = await Promise.all([GetUserWishlist(), GetAllGames()]);

  if (wishlist === null) {
    return <WishlistError />;
  }

  if (wishlist.items.length === 0) {
    return (
      <div className="page-wrapper wishlist-page page-wrapper--empty">
        <div className="container">
          <WishlistHeader itemCount={0} />
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save games you love and come back when you are ready to play."
            ctaLabel="Explore Games"
            ctaHref="/games"
            secondaryLabel="View Deals"
            secondaryHref="/deals"
          />
        </div>
      </div>
    );
  }

  return <WishlistClient wishlist={wishlist} suggestions={games ?? []} />;
}
