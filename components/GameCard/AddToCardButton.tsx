"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import { AddCardAction } from "./card.Actions";
import { useAppCounts } from "@/app/_Context/AppCountsContext";

interface GameIdProps {
  gameId: string;
}

export default function AddToCardButton({ gameId }: GameIdProps) {
  const [loading, setLoading] = useState(false);
  const { setCartCount } = useAppCounts();

  async function addToCart() {
    if (loading) return;

    setLoading(true);
    try {
      const result = await AddCardAction(gameId);

      if (result.success) {
        if (typeof result.cartCount === "number") {
          setCartCount(result.cartCount);
        }
        toast.success(result.message ?? "Product added to cart successfully", {
          position: "bottom-right",
          autoClose: 2500,
        });
      } else {
        toast.error(result.message ?? "Failed to add product to cart", {
          position: "bottom-right",
          autoClose: 3500,
        });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="game-card__actions">
      <button
        type="button"
        onClick={addToCart}
        className="game-card__add-to-cart"
        disabled={loading}
        style={{ opacity: loading ? 0.75 : 1 }}
      >
        <FaShoppingCart />
        <span>{loading ? "Adding..." : "Add to Cart"}</span>
      </button>
      <button
        type="button"
        onClick={addToCart}
        className="game-card__quick-buy"
        aria-label="Quick buy"
        disabled={loading}
      >
        <FaShoppingCart />
      </button>
    </div>
  );
}
