"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  FaHeart,
  FaStar,
  FaGamepad,
  FaGlobe,
  FaBolt,
  FaShoppingCart,
  FaWindows,
  FaSteam,
  FaChevronRight,
} from "react-icons/fa";
import { GamesCard } from "@/API/types";
import { resolveCoverImage } from "@/lib/gameImages";
import { getGamePrices } from "@/lib/format";
import GameImage from "../GameImage/GameImage";
import AddToCardButton from "./AddToCardButton";
import { AddToWishlist, RemoveFromWishlist } from "./wishlist.Actions";
import { useAppCounts } from "@/app/_Context/AppCountsContext";

const evaluation = ["4.8", "4.2", "3.9", "2.4", "5.7", "2.7", "6.6", "7.9", "4.9", "5.8", "9.7", "10"];

export default function GameCard({ gameDetails }: { gameDetails: GamesCard[] }) {
  const { setWishlistCount } = useAppCounts();
  const [wishlistState, setWishlistState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(gameDetails.map((game) => [game.id, Boolean(game.isWishlist)]))
  );
  const [wishlistLoading, setWishlistLoading] = useState<string | null>(null);

  async function handleWishlistToggle(game: GamesCard) {
    if (wishlistLoading === game.id) return;

    setWishlistLoading(game.id);
    const isWishlisted = wishlistState[game.id];

    try {
      const result = isWishlisted
        ? await RemoveFromWishlist(game.id)
        : await AddToWishlist(game.id);

      if (result.success) {
        setWishlistState((current) => ({ ...current, [game.id]: !isWishlisted }));
        if (typeof result.wishlistCount === "number") {
          setWishlistCount(result.wishlistCount);
        }
        toast[isWishlisted ? "info" : "success"](
          result.message ?? (isWishlisted ? "Removed from wishlist" : "Added to wishlist"),
          { position: "bottom-right", autoClose: 2500 }
        );
      } else {
        toast.error(result.message ?? "Wishlist action failed", {
          position: "bottom-right",
          autoClose: 3500,
        });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", { position: "bottom-right" });
    } finally {
      setWishlistLoading(null);
    }
  }

  return (
    <div className="game-card-grid">
      {gameDetails.map(function (product, index) {
        const imageSrc = resolveCoverImage(null, product.id, product.title, product.genre);
        const { price, discount, finalPrice, savings } = getGamePrices(product);
        const isWishlisted = wishlistState[product.id];

        return (
          <div key={product.id} className="game-card">
            <div className="game-card__hero">
              <GameImage
                productId={product.id}
                src={imageSrc}
                alt={product.title}
                fill
                className="game-card__hero-img"
              />
              <div className="game-card__hero-overlay" />
              {discount > 0 && (
                <span className="game-card__discount-badge">-{discount}%</span>
              )}
              <button
                type="button"
                className="game-card__wishlist-btn"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => handleWishlistToggle(product)}
                disabled={wishlistLoading === product.id}
                style={{ color: isWishlisted ? "#ff6b9d" : undefined }}
              >
                <FaHeart style={{ color: isWishlisted ? "#ff6b9d" : undefined }} />
              </button>
              <div className="game-card__hero-title">
                <h2>{product.title}</h2>
              </div>
            </div>

            <div className="game-card__platforms">
              <button type="button" className="game-card__platform-tab game-card__platform-tab--active">
                <FaSteam />
                <span>STEAM</span>
              </button>
              <button type="button" className="game-card__platform-tab">
                <FaWindows />
                <span>WINDOWS</span>
              </button>
            </div>

            <div className="game-card__info">
              <div className="game-card__info-row">
                <div className="game-card__info-text">
                  <h3 className="game-card__title">{product.title}</h3>
                  <p className="game-card__description">
                    Explore {product.title} — premium digital edition with instant delivery.
                  </p>
                </div>
                <div className="game-card__rating">
                  <div className="game-card__rating-score">
                    <FaStar className="game-card__rating-star" />
                    <span>{product.rating ?? evaluation[index % evaluation.length]}</span>
                  </div>
                  <span className="game-card__rating-count">
                    ({product.reviewCount ? `${product.reviewCount}` : "2.5K"})
                  </span>
                </div>
              </div>

              <div className="game-card__meta">
                <div className="game-card__meta-item">
                  <FaGamepad className="game-card__meta-icon game-card__meta-icon--purple" />
                  <div>
                    <span className="game-card__meta-label">Type</span>
                    <span className="game-card__meta-value">Full Game</span>
                  </div>
                </div>
                <div className="game-card__meta-item">
                  <FaGlobe className="game-card__meta-icon game-card__meta-icon--cyan" />
                  <div>
                    <span className="game-card__meta-label">Region</span>
                    <span className="game-card__meta-value">Global</span>
                  </div>
                </div>
                <div className="game-card__meta-item">
                  <FaBolt className="game-card__meta-icon game-card__meta-icon--yellow" />
                  <div>
                    <span className="game-card__meta-label">Delivery</span>
                    <span className="game-card__meta-value">Instant</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="game-card__pricing">
              <div className="game-card__pricing-left">
                {discount > 0 ? (
                  <div className="game-card__pricing-original">
                    <span className="game-card__price-old">${price.toFixed(2)}</span>
                    <span className="game-card__price-badge">-{discount}%</span>
                  </div>
                ) : null}
                <span className="game-card__price-current">${finalPrice.toFixed(2)}</span>
                {savings > 0 ? (
                  <span className="game-card__price-save">
                    You save <strong>${savings.toFixed(2)}</strong>
                  </span>
                ) : null}
              </div>
              <div className="game-card__pricing-right">
                <div className="game-card__pricing-thumb">
                  <GameImage
                    productId={product.id}
                    src={imageSrc}
                    alt={product.title}
                    fill
                    className="game-card__pricing-thumb-img"
                  />
                </div>
                <Link href={`/GameDetails/${product.slug}`}>
                  <button type="button" className="game-card__view-btn" aria-label="View details">
                    <FaChevronRight />
                  </button>
                  <span className="game-card__view-label">View Details</span>
                </Link>
              </div>
            </div>

            <AddToCardButton gameId={product.id} />
          </div>
        );
      })}
    </div>
  );
}
