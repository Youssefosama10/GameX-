"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaHeart, FaShoppingCart, FaSteam } from "react-icons/fa";
import { ArrowRight, Bell, Heart, Package, Percent, Tag } from "lucide-react";
import { GamesCard, WishlistData } from "@/API/types";
import { resolveCoverImage } from "@/lib/gameImages";
import GameImage from "@components/GameImage/GameImage";
import { AddCardAction } from "@components/GameCard/card.Actions";
import { RemoveFromWishlist } from "@components/GameCard/wishlist.Actions";
import { MoveWishlistToCart } from "@/API/actions";
import { useAppCounts } from "@/app/_Context/AppCountsContext";
import WishlistHeader from "./WishlistHeader";

interface WishlistClientProps {
  wishlist: WishlistData;
  suggestions?: GamesCard[];
}

function toNumber(value: string | number | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = parseFloat(value || "0");
  return Number.isFinite(parsed) ? parsed : 0;
}

function getDiscountPercent(game: GamesCard): number {
  return Math.max(0, toNumber(game.discount));
}

function getOriginalPrice(game: GamesCard, fallback?: string | number): number {
  return toNumber(game.price ?? fallback);
}

function getCurrentPrice(game: GamesCard, fallback?: string | number): number {
  if (typeof game.finalPrice === "number" && Number.isFinite(game.finalPrice)) {
    return game.finalPrice;
  }
  const original = getOriginalPrice(game, fallback);
  const discount = getDiscountPercent(game);
  if (discount > 0 && discount < 100) {
    return original * (1 - discount / 100);
  }
  return original;
}

export default function WishlistClient({ wishlist, suggestions = [] }: WishlistClientProps) {
  const router = useRouter();
  const { setCartCount, setWishlistCount, refreshCounts } = useAppCounts();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [sortValue, setSortValue] = useState("recent");

  async function handleRemove(gameId: string) {
    setPendingId(gameId);
    try {
      const result = await RemoveFromWishlist(gameId);
      if (result.success) {
        if (typeof result.wishlistCount === "number") {
          setWishlistCount(result.wishlistCount);
        }
        toast.info(result.message ?? "Removed from wishlist", {
          position: "bottom-right",
          autoClose: 2500,
        });
        router.refresh();
      } else {
        toast.error(result.message ?? "Failed to remove from wishlist", {
          position: "bottom-right",
        });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", { position: "bottom-right" });
    } finally {
      setPendingId(null);
    }
  }

  async function handleMoveToCart(gameId: string) {
    setPendingId(gameId);
    try {
      const result = await MoveWishlistToCart(gameId);
      if (result.success) {
        toast.success(result.message ?? "Moved to cart");
        await refreshCounts();
        router.refresh();
      } else {
        toast.error(result.message ?? "Failed to move to cart");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPendingId(null);
    }
  }

  async function handleAddToCart(gameId: string) {
    setPendingId(gameId);
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
        toast.error(result.message ?? "Failed to add to cart", { position: "bottom-right" });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", { position: "bottom-right" });
    } finally {
      setPendingId(null);
    }
  }

  const pricedItems = useMemo(() => {
    return wishlist.items.map((item) => {
      const game = item.game;
      const original = getOriginalPrice(game, item.price);
      const current = getCurrentPrice(game, item.price);
      const discount = getDiscountPercent(game);
      return { item, original, current, discount };
    });
  }, [wishlist.items]);

  const sortedItems = useMemo(() => {
    const items = [...pricedItems];
    if (sortValue === "price-asc") {
      items.sort((a, b) => a.current - b.current);
    } else if (sortValue === "price-desc") {
      items.sort((a, b) => b.current - a.current);
    } else if (sortValue === "discount") {
      items.sort((a, b) => b.discount - a.discount);
    }
    return items;
  }, [pricedItems, sortValue]);

  const onSaleCount = pricedItems.filter((entry) => entry.discount > 0 || entry.current < entry.original).length;
  const totalValue = pricedItems.reduce((sum, entry) => sum + entry.original, 0);
  const totalSave = pricedItems.reduce((sum, entry) => sum + Math.max(0, entry.original - entry.current), 0);

  const suggestionCards = suggestions
    .filter((game) => !wishlist.items.some((item) => item.game?.id === game.id))
    .slice(0, 3);

  return (
    <div className="page-wrapper wishlist-page">
      <div className="container">
        <WishlistHeader
          itemCount={wishlist.itemsCount}
          sortValue={sortValue}
          onSortChange={setSortValue}
        />

        <div className="wishlist-layout">
          <div className="wishlist-grid">
            {sortedItems.map(({ item, original, current, discount }) => {
              const game = item.game;
              const gameId = game?.id;
              if (!gameId) return null;

              const imageSrc = resolveCoverImage(null, gameId, game.title, game.genre);
              const isPending = pendingId === gameId;
              const showOriginal = original > current;

              return (
                <article key={gameId} className="wl-card">
                  <div className="wl-card__media">
                    <Link href={`/GameDetails/${game.slug}`} className="wl-card__image-link">
                      <GameImage
                        productId={gameId}
                        src={imageSrc}
                        alt={game.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 280px"
                        className="wl-card__image"
                      />
                    </Link>
                    {discount > 0 ? (
                      <span className="wl-card__discount">-{discount}%</span>
                    ) : null}
                    <button
                      type="button"
                      className="wl-card__heart"
                      aria-label="Remove from wishlist"
                      disabled={isPending}
                      onClick={() => handleRemove(gameId)}
                    >
                      <FaHeart />
                    </button>
                  </div>

                  <div className="wl-card__body">
                    <Link href={`/GameDetails/${game.slug}`} className="wl-card__title">
                      {game.title}
                    </Link>
                    <p className="wl-card__meta">
                      <FaSteam /> Steam Key
                    </p>
                    <div className="wl-card__footer">
                      <div className="wl-card__prices">
                        <span className="wl-card__price">${current.toFixed(2)}</span>
                        {showOriginal ? (
                          <span className="wl-card__price-old">${original.toFixed(2)}</span>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="wl-card__cart"
                          aria-label="Add to cart"
                          disabled={isPending}
                          onClick={() => handleAddToCart(gameId)}
                        >
                          <FaShoppingCart />
                        </button>
                        <button
                          type="button"
                          className="gx-btn gx-btn--ghost"
                          disabled={isPending}
                          onClick={() => handleMoveToCart(gameId)}
                        >
                          Move
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="wl-sidebar">
            <section className="wl-side-card">
              <div className="wl-side-card__heading">
                <Bell size={16} />
                <h2>Price Alerts</h2>
              </div>
              <p>
                Get notified when games in your wishlist go on sale or reach your desired price.
              </p>
              <button
                type="button"
                className="gx-btn gx-btn--primary gx-btn--md wl-side-card__btn"
                onClick={() =>
                  toast.info("Price alerts will apply to the games already in your wishlist.", {
                    position: "bottom-right",
                    autoClose: 2500,
                  })
                }
              >
                Enable Price Alerts
              </button>
            </section>

            <section className="wl-side-card">
              <h2 className="wl-side-card__title">Wishlist Summary</h2>
              <ul className="wl-summary">
                <li>
                  <Package size={16} />
                  <span>Total Items</span>
                  <strong>{wishlist.itemsCount}</strong>
                </li>
                <li>
                  <Tag size={16} />
                  <span>On Sale</span>
                  <strong>{onSaleCount}</strong>
                </li>
                <li>
                  <Heart size={16} />
                  <span>Total Value</span>
                  <strong className="wl-summary__accent">${totalValue.toFixed(2)}</strong>
                </li>
                <li>
                  <Percent size={16} />
                  <span>You Save</span>
                  <strong className="wl-summary__save">${totalSave.toFixed(2)}</strong>
                </li>
              </ul>
            </section>

            {suggestionCards.length > 0 ? (
              <section className="wl-side-card">
                <div className="wl-side-card__heading wl-side-card__heading--spread">
                  <h2>You May Also Like</h2>
                  <Link href="/" className="wl-view-all">
                    View All <ArrowRight size={14} />
                  </Link>
                </div>
                <ul className="wl-suggest-list">
                  {suggestionCards.map((game) => {
                    const current = getCurrentPrice(game);
                    const discount = getDiscountPercent(game);
                    return (
                      <li key={game.id}>
                        <Link href={`/GameDetails/${game.slug}`} className="wl-suggest">
                          <div className="wl-suggest__thumb">
                            <GameImage
                              productId={game.id}
                              src={resolveCoverImage(null, game.id, game.title, game.genre)}
                              alt={game.title}
                              width={56}
                              height={56}
                              className="object-cover"
                            />
                          </div>
                          <div className="wl-suggest__info">
                            <span className="wl-suggest__title">{game.title}</span>
                            <span className="wl-suggest__price">${current.toFixed(2)}</span>
                          </div>
                          {discount > 0 ? (
                            <span className="wl-suggest__badge">-{discount}%</span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}
          </aside>
        </div>

        <section className="wl-promo">
          <div className="wl-promo__copy">
            <h2>Don&apos;t Miss Out!</h2>
            <p>Great games won&apos;t be on sale forever. Grab them while you can!</p>
          </div>
          <Link href="/" className="gx-btn gx-btn--primary gx-btn--lg">
            Browse Deals
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
}
