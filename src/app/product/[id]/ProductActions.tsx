"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { CardAction } from "../../../../components/GameCard/card.Actions";
import { AddToWishlist, RemoveFromWishlist } from "../../../../components/GameCard/wishlist.Actions";
import { useAppCounts } from "@/app/_Context/AppCountsContext";

interface ProductActionsProps {
  gameId: string;
}

function Spinner() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        animation: "pa-spin 0.7s linear infinite",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    </span>
  );
}

export default function ProductActions({ gameId }: ProductActionsProps) {
  const { setCartCount, setWishlistCount } = useAppCounts();
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  async function handleAddToCart() {
    setCartLoading(true);
    try {
      const result = await CardAction(gameId);
      if (result.success) {
        if (typeof result.cartCount === "number") setCartCount(result.cartCount);
        toast.success(result.message, { position: "bottom-right", autoClose: 2500 });
      } else {
        toast.error(result.message, { position: "bottom-right", autoClose: 3500 });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", { position: "bottom-right" });
    } finally {
      setCartLoading(false);
    }
  }

  async function handleWishlistToggle() {
    setWishlistLoading(true);
    try {
      if (wishlisted) {
        const result = await RemoveFromWishlist(gameId);
        if (result.success) {
          setWishlisted(false);
          if (typeof result.wishlistCount === "number") setWishlistCount(result.wishlistCount);
          toast.info(result.message, { position: "bottom-right", autoClose: 2000 });
        } else {
          toast.error(result.message, { position: "bottom-right" });
        }
      } else {
        const result = await AddToWishlist(gameId);
        if (result.success) {
          setWishlisted(true);
          if (typeof result.wishlistCount === "number") setWishlistCount(result.wishlistCount);
          toast.success(result.message, { position: "bottom-right", autoClose: 2000 });
        } else {
          toast.error(result.message, { position: "bottom-right" });
        }
      }
    } catch {
      toast.error("Something went wrong.", { position: "bottom-right" });
    } finally {
      setWishlistLoading(false);
    }
  }

  return (
    <>
      <div className="product-actions">
        {/* Add to Cart */}
        <button
          id="btn-add-to-cart"
          className="gx-btn gx-btn--primary gx-btn--lg"
          onClick={handleAddToCart}
          disabled={cartLoading}
          style={{ flex: 1.5, opacity: cartLoading ? 0.8 : 1 }}
        >
          {cartLoading ? (
            <>
              <Spinner /> Adding…
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Add to Cart
            </>
          )}
        </button>

        {/* Wishlist */}
        <button
          id="btn-add-to-wishlist"
          className={`gx-btn gx-btn--ghost gx-btn--lg ${wishlisted ? "pa-wishlist--active" : ""}`}
          onClick={handleWishlistToggle}
          disabled={wishlistLoading}
          style={{
            flex: 1,
            color: wishlisted ? "#f472b6" : undefined,
            borderColor: wishlisted ? "rgba(244,114,182,0.5)" : undefined,
            opacity: wishlistLoading ? 0.7 : 1,
          }}
        >
          {wishlistLoading ? (
            <>
              <Spinner />
              {wishlisted ? "Removing…" : "Adding…"}
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="18" height="18"
                fill={wishlisted ? "#f472b6" : "none"}
                stroke={wishlisted ? "#f472b6" : "currentColor"}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              {wishlisted ? "Wishlisted" : "Wishlist"}
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes pa-spin { to { transform: rotate(360deg); } }
        .product-actions button:disabled { cursor: wait; }
      `}</style>
    </>
  );
}
