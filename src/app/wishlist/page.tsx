import Link from "next/link";
import { GetAllGames, GetUserWishlist } from "@/API/route.services";
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
      <div className="page-wrapper wishlist-page">
        <div className="container">
          <WishlistHeader itemCount={0} />
          <div className="empty-state">
            <div className="empty-state-icon">💜</div>
            <h3>Your wishlist is empty</h3>
            <p>Save games you love and come back when you are ready to play.</p>
            <Link href="/" className="gx-btn gx-btn--primary gx-btn--lg">
              Explore Games
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <WishlistClient wishlist={wishlist} suggestions={games ?? []} />;
}
