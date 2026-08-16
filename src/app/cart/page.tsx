import Link from "next/link";
import { GetUserCart } from "@/API/route.services";
import CartClient from "./CartClient";
import CartHero from "./CartHero";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await GetUserCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="page-wrapper cart-page">
        <CartHero />
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Discover premium games and add your favorites to start building your collection.</p>
            <Link href="/" className="gx-btn gx-btn--primary gx-btn--lg">
              Browse Games
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <CartClient cart={cart} />;
}
