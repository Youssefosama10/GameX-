import { ShoppingCart } from "lucide-react";
import { GetUserCart } from "@/API/route.services";
import EmptyState from "@components/EmptyState/EmptyState";
import CartClient from "./CartClient";
import CartHero from "./CartHero";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await GetUserCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="page-wrapper cart-page page-wrapper--empty">
        <CartHero />
        <div className="container">
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Discover premium games and add your favorites to start building your collection."
            ctaLabel="Browse Games"
            ctaHref="/games"
            secondaryLabel="View Deals"
            secondaryHref="/deals"
          />
        </div>
      </div>
    );
  }

  return <CartClient cart={cart} />;
}
