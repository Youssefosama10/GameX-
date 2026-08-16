"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { AddCardAction } from "../../../../components/GameCard/card.Actions";
import { AddToWishlist, RemoveFromWishlist } from "../../../../components/GameCard/wishlist.Actions";
import { useRouter } from "next/navigation";
import { useAppCounts } from "@/app/_Context/AppCountsContext";
import GameImage from "../../../../components/GameImage/GameImage";
import { resolveCoverImage } from "@/lib/gameImages";
import {
  FaHeart,
  FaStar,
  FaShoppingCart,
  FaSteam,
  FaWindows,
  FaChevronRight,
  FaPlay,
  FaImages,
  FaBolt,
  FaShieldAlt,
  FaHeadset,
  FaUser,
  FaGlobe,
  FaBookOpen,
  FaGamepad,
  FaBuilding,
  FaCalendarAlt,
  FaCheck,
  FaDesktop,
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { GameDetails, GamesCard } from "@/API/types";

interface GameDetailsClientProps {
  game: GameDetails;
  coverImage: string;
  thumbnails: string[];
  relatedGames?: GamesCard[];
}

export default function GameDetailsClient({
  game,
  coverImage,
  thumbnails,
  relatedGames = [],
}: GameDetailsClientProps) {
  const router = useRouter();
  const { setCartCount, setWishlistCount } = useAppCounts();
  const [selectedImage, setSelectedImage] = useState<string>(coverImage);
  const [activeThumbIndex, setActiveThumbIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"system" | "details" | "reviews">("system");
  const [isReadMore, setIsReadMore] = useState<boolean>(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(game?.isWishlist || false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState<boolean>(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  async function handleAddToCart() {
    if (!game?.id || cartLoading) return;

    setCartLoading(true);
    try {
      const result = await AddCardAction(game.id);
      if (result.success) {
        if (typeof result.cartCount === "number") setCartCount(result.cartCount);
        toast.success(result.message ?? "Product added to cart successfully", {
          position: "bottom-right",
          autoClose: 2500,
        });
      } else {
        toast.error(result.message ?? "Failed to add product to cart", {
          position: "bottom-right",
        });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", { position: "bottom-right" });
    } finally {
      setCartLoading(false);
    }
  }

  async function handleWishlistToggle() {
    if (!game?.id || wishlistLoading) return;

    setWishlistLoading(true);
    try {
      const result = isWishlisted
        ? await RemoveFromWishlist(game.id)
        : await AddToWishlist(game.id);

      if (result.success) {
        setIsWishlisted(!isWishlisted);
        if (typeof result.wishlistCount === "number") {
          setWishlistCount(result.wishlistCount);
        }
        toast[isWishlisted ? "info" : "success"](
          result.message ?? (isWishlisted ? "Removed from wishlist" : "Added to wishlist"),
          { position: "bottom-right", autoClose: 2500 }
        );
      } else {
        toast.error(result.message ?? "Wishlist action failed", { position: "bottom-right" });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", { position: "bottom-right" });
    } finally {
      setWishlistLoading(false);
    }
  }

  // Calculate pricing & discount
  const priceNum = typeof game?.price === "number" ? game.price : parseFloat(game?.price || "29.99");
  const discountNum = typeof game?.discount === "number" ? game.discount : parseFloat(game?.discount || "40");
  
  const originalPrice = discountNum > 0 ? (priceNum / (1 - discountNum / 100)).toFixed(2) : (priceNum * 1.4).toFixed(2);
  const savings = (parseFloat(originalPrice) - priceNum).toFixed(2);

  // Ratings & Reviews
  const ratingVal = game?.rating || 4.8;
  const reviewCountStr = game?.reviewCount ? `${game.reviewCount} reviews` : "2.5K reviews";

  // System requirements fallbacks
  const minReq = game?.systemRequirements?.minimum || {
    os: "Windows 10 64-bit",
    cpu: "Intel Core i5-3570K / AMD FX-8310",
    ram: "8 GB RAM",
    gpu: "GTX 780 3GB / Radeon RX 470",
    storage: "70 GB available space",
  };

  const recReq = game?.systemRequirements?.recommended || {
    os: "Windows 10 64-bit",
    cpu: "Intel Core i7-4790 / AMD Ryzen 3 3200G",
    ram: "12 GB RAM",
    gpu: "GTX 1060 6GB / Radeon RX 590",
    storage: "70 GB available space",
  };

  // Thumbnail click handler
  const handleThumbClick = (img: string, idx: number) => {
    setSelectedImage(img);
    setActiveThumbIndex(idx);
  };

  // Cycle thumbnails handler
  const handleNextThumb = () => {
    const nextIdx = (activeThumbIndex + 1) % thumbnails.length;
    setSelectedImage(thumbnails[nextIdx]);
    setActiveThumbIndex(nextIdx);
  };

  return (
    <div className="gd-container">
      {/* ── Breadcrumb ── */}
      <nav className="gd-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="gd-breadcrumb-sep">&gt;</span>
        <Link href="/">{game?.genre?.[0] || "Action"}</Link>
        <span className="gd-breadcrumb-sep">&gt;</span>
        <span className="gd-breadcrumb-current">{game?.title || "Cyberpunk 2077"}</span>
      </nav>

      {/* ── Main Hero Section ── */}
      <div className="gd-hero-grid">
        {/* Left Column: Cover Image & Thumbnails */}
        <div className="gd-media-wrap">
          {/* Main Large Image Card */}
          <div className="gd-main-image-card">
            <Image
              src={selectedImage}
              alt={game?.title || "Game details preview"}
              fill
              priority
              className="gd-main-img"
            />
            {discountNum > 0 && (
              <span className="gd-media-discount">-{discountNum}%</span>
            )}

            {/* Media Action Overlay Buttons */}
            <div className="gd-media-action-strip">
              <button
                className="gd-media-overlay-btn"
                onClick={() => setIsTrailerModalOpen(true)}
              >
                <FaPlay className="text-xs" />
                <span>Trailer</span>
              </button>
              <button
                className="gd-media-overlay-btn"
                onClick={() => handleThumbClick(thumbnails[1] || coverImage, 1)}
              >
                <FaImages className="text-xs" />
                <span>12 Screenshots</span>
              </button>
            </div>
          </div>

          {/* 4 Small Thumbnails Gallery Strip */}
          <div className="gd-thumbnails-row">
            {thumbnails.slice(0, 4).map((thumbImg, idx) => (
              <div
                key={idx}
                className={`gd-thumb-card ${activeThumbIndex === idx ? "active" : ""}`}
                onClick={() => handleThumbClick(thumbImg, idx)}
              >
                <Image
                  src={thumbImg}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="gd-thumb-img"
                />
                {idx === 0 && (
                  <div className="gd-thumb-play-overlay">
                    <div className="gd-thumb-play-circle">
                      <FaPlay className="ml-0.5 text-xs" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              className="gd-thumb-nav-btn"
              onClick={handleNextThumb}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Right Column: Game Details & Buy Box */}
        <div className="gd-buy-panel">
          <div className="gd-buy-header">
            <span className="gd-digital-tag">
              <FaBolt /> DIGITAL PRODUCT
            </span>
            <span className="gd-platform-tag">
              <FaSteam /> STEAM
            </span>
          </div>

          <h1 className="gd-game-title">{game?.title || "Cyberpunk 2077"}</h1>

          {/* Rating */}
          <div className="gd-rating-row">
            <div className="gd-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <span className="gd-rating-score">{ratingVal}</span>
            <span className="gd-review-count">({reviewCountStr})</span>
          </div>

          {/* Pricing Box */}
          <div className="gd-price-box">
            <div className="gd-price-old-row">
              <span className="gd-price-old">${originalPrice}</span>
              {discountNum > 0 && (
                <span className="gd-price-discount-pill">-{discountNum}%</span>
              )}
            </div>
            <div className="gd-price-current">${priceNum.toFixed(2)}</div>
            <div className="gd-price-save">
              You save ${savings}
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="gd-buy-actions">
            <button
              type="button"
              className="gd-btn-cart"
              onClick={handleAddToCart}
              disabled={cartLoading}
              style={{ opacity: cartLoading ? 0.75 : 1 }}
            >
              <FaShoppingCart />
              <span>{cartLoading ? "Adding..." : "Add to Cart"}</span>
            </button>
            <button
              type="button"
              className="gd-btn-cart"
              onClick={async () => {
                await handleAddToCart();
                router.push("/checkout");
              }}
              disabled={cartLoading}
            >
              <FaBolt />
              <span>Buy Now</span>
            </button>
            <button
              type="button"
              className="gd-btn-wishlist"
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
              style={{ color: isWishlisted ? "#ff6b9d" : undefined, opacity: wishlistLoading ? 0.75 : 1 }}
            >
              <FaHeart style={{ color: isWishlisted ? "#ff6b9d" : undefined }} />
              <span>
                {wishlistLoading
                  ? "Saving..."
                  : isWishlisted
                    ? "In Wishlist"
                    : "Add to Wishlist"}
              </span>
            </button>
          </div>

          {/* Instant Guarantee Features */}
          <div className="gd-guarantee-strip">
            <div className="gd-guarantee-item">
              <FaBolt className="gd-guarantee-icon" />
              <span>Instant Delivery</span>
            </div>
            <div className="gd-guarantee-item">
              <FaShieldAlt className="gd-guarantee-icon" />
              <span>Secure Payment</span>
            </div>
            <div className="gd-guarantee-item">
              <FaHeadset className="gd-guarantee-icon" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Middle Section: About, Specs & Requirements ── */}
      <div className="gd-middle-grid">
        {/* Left Column: About & Tabs */}
        <div>
          {/* About Game Card */}
          <div className="gd-about-card">
            <h2 className="gd-card-title">About This Game</h2>
            <p className="gd-description">
              {game?.description ||
                game?.shortDescription ||
                "Cyberpunk 2077 is an open-world, action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a unique implant that is the key to immortality."}
            </p>

            {isReadMore && (
              <p className="gd-description animate-fade-in">
                Customize your character&apos;s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you. Become a cyberpunk, an urban mercenary equipped with cybernetic enhancements and build your legend on the streets of Night City.
              </p>
            )}

            <button
              className="gd-read-more-btn"
              onClick={() => setIsReadMore(!isReadMore)}
            >
              <span>{isReadMore ? "Read Less" : "Read More"}</span>
              {isReadMore ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {/* Tag Pills */}
            <div className="gd-tags-row">
              <div className="gd-tag-badge">
                <FaGlobe className="gd-tag-icon" />
                <span>Open World</span>
              </div>
              <div className="gd-tag-badge">
                <FaUser className="gd-tag-icon" />
                <span>Single Player</span>
              </div>
              <div className="gd-tag-badge">
                <FaBookOpen className="gd-tag-icon" />
                <span>Story Rich</span>
              </div>
              <div className="gd-tag-badge">
                <FaGamepad className="gd-tag-icon" />
                <span>RPG</span>
              </div>
            </div>
          </div>

          {/* System Requirements / Tabs Card */}
          <div className="gd-tabs-card">
            <div className="gd-tabs-header">
              <button
                className={`gd-tab-btn ${activeTab === "system" ? "active" : ""}`}
                onClick={() => setActiveTab("system")}
              >
                System Requirements
              </button>
              <button
                className={`gd-tab-btn ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`gd-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews ({reviewCountStr})
              </button>
            </div>

            {activeTab === "system" && (
              <div className="gd-req-grid animate-fade-in">
                {/* Minimum Requirements */}
                <div>
                  <h3 className="gd-req-title">Minimum Requirements</h3>
                  <div className="gd-req-list">
                    <div className="gd-req-item">
                      <FaDesktop className="gd-req-icon" />
                      <span className="gd-req-label">OS</span>
                      <span className="gd-req-value">{minReq.os}</span>
                    </div>
                    <div className="gd-req-item">
                      <FaMicrochip className="gd-req-icon" />
                      <span className="gd-req-label">Processor</span>
                      <span className="gd-req-value">{minReq.cpu}</span>
                    </div>
                    <div className="gd-req-item">
                      <FaMemory className="gd-req-icon" />
                      <span className="gd-req-label">Memory</span>
                      <span className="gd-req-value">{minReq.ram}</span>
                    </div>
                    <div className="gd-req-item">
                      <FaGamepad className="gd-req-icon" />
                      <span className="gd-req-label">Graphics</span>
                      <span className="gd-req-value">{minReq.gpu}</span>
                    </div>
                    <div className="gd-req-item">
                      <FaHdd className="gd-req-icon" />
                      <span className="gd-req-label">Storage</span>
                      <span className="gd-req-value">{minReq.storage}</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Requirements */}
                <div>
                  <h3 className="gd-req-title">Recommended Requirements</h3>
                  <div className="gd-req-list">
                    <div className="gd-req-item">
                      <FaDesktop className="gd-req-icon" />
                      <span className="gd-req-label">OS</span>
                      <span className="gd-req-value">{recReq.os}</span>
                    </div>
                    <div className="gd-req-item">
                      <FaMicrochip className="gd-req-icon" />
                      <span className="gd-req-label">Processor</span>
                      <span className="gd-req-value">{recReq.cpu}</span>
                    </div>
                    <div className="gd-req-item">
                      <FaMemory className="gd-req-icon" />
                      <span className="gd-req-label">Memory</span>
                      <span className="gd-req-value">{recReq.ram}</span>
                    </div>
                    <div className="gd-req-item">
                      <FaGamepad className="gd-req-icon" />
                      <span className="gd-req-label">Graphics</span>
                      <span className="gd-req-value">{recReq.gpu}</span>
                    </div>
                    <div className="gd-req-item">
                      <FaHdd className="gd-req-icon" />
                      <span className="gd-req-label">Storage</span>
                      <span className="gd-req-value">{recReq.storage}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="animate-fade-in text-sm text-gray-300 leading-relaxed">
                <p><strong>Game Title:</strong> {game?.title || "Cyberpunk 2077"}</p>
                <p className="mt-2"><strong>Category:</strong> {typeof game?.category === "string" ? game.category : game?.category?.name || "Action RPG"}</p>
                <p className="mt-2"><strong>Publisher:</strong> {game?.publisher || "CD PROJEKT RED"}</p>
                <p className="mt-2"><strong>Developer:</strong> {game?.developer || "CD PROJEKT RED"}</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="animate-fade-in text-sm text-gray-300 leading-relaxed">
                <p>Average rating: <strong>{ratingVal} / 5</strong> based on {reviewCountStr}.</p>
                <p className="mt-2 text-gray-400">94% of gamers recommended this title for action & world design.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Stack */}
        <div className="gd-sidebar-stack">
          {/* Metadata Specs Box */}
          <div className="gd-sidebar-card">
            <div className="gd-specs-list">
              <div className="gd-spec-item">
                <div className="gd-spec-left">
                  <FaUser className="gd-spec-icon" />
                  <span>Developer</span>
                </div>
                <span className="gd-spec-val">{game?.developer || "CD PROJEKT RED"}</span>
              </div>
              <div className="gd-spec-item">
                <div className="gd-spec-left">
                  <FaBuilding className="gd-spec-icon" />
                  <span>Publisher</span>
                </div>
                <span className="gd-spec-val">{game?.publisher || "CD PROJEKT RED"}</span>
              </div>
              <div className="gd-spec-item">
                <div className="gd-spec-left">
                  <FaCalendarAlt className="gd-spec-icon" />
                  <span>Release Date</span>
                </div>
                <span className="gd-spec-val">
                  {game?.releaseDate
                    ? new Date(game.releaseDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "10 Dec, 2020"}
                </span>
              </div>
              <div className="gd-spec-item">
                <div className="gd-spec-left">
                  <FaGamepad className="gd-spec-icon" />
                  <span>Genre</span>
                </div>
                <span className="gd-spec-val">
                  {Array.isArray(game?.genre) ? game.genre.join(", ") : "Action, RPG"}
                </span>
              </div>
              <div className="gd-spec-item">
                <div className="gd-spec-left">
                  <FaSteam className="gd-spec-icon" />
                  <span>Platform</span>
                </div>
                <span className="gd-spec-val">
                  {Array.isArray(game?.platform) ? game.platform.join(", ") : "Steam, Windows"}
                </span>
              </div>
              <div className="gd-spec-item">
                <div className="gd-spec-left">
                  <FaGlobe className="gd-spec-icon" />
                  <span>Language</span>
                </div>
                <span className="gd-spec-val">English, Multi-language</span>
              </div>
            </div>
          </div>

          {/* Why You'll Love It Card */}
          <div className="gd-sidebar-card">
            <h3 className="gd-card-title text-base mb-4">Why You&apos;ll Love It</h3>
            <div className="gd-why-list">
              <div className="gd-why-item">
                <FaCheck className="gd-why-check" />
                <span>Vast open world with endless possibilities</span>
              </div>
              <div className="gd-why-item">
                <FaCheck className="gd-why-check" />
                <span>Engaging story and deep characters</span>
              </div>
              <div className="gd-why-item">
                <FaCheck className="gd-why-check" />
                <span>Stunning visuals and immersive atmosphere</span>
              </div>
              <div className="gd-why-item">
                <FaCheck className="gd-why-check" />
                <span>Choices that shape your journey</span>
              </div>
            </div>
          </div>

          {/* Players Also Rate Card */}
          <div className="gd-sidebar-card">
            <div className="gd-rate-heading">Players Also Rate</div>
            <div className="gd-rate-row">
              <span className="gd-rate-big">{ratingVal}</span>
              <div className="gd-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="gd-review-count">({reviewCountStr})</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Section: You May Also Like ── */}
      {relatedGames && relatedGames.length > 0 && (
        <div className="gd-related-section">
          <div className="gd-related-header">
            <h2 className="gd-related-title">You May Also Like</h2>
            <Link href="/" className="gd-related-viewall">
              <span>View All</span>
              <FaChevronRight className="text-xs" />
            </Link>
          </div>

          <div className="gd-related-grid">
            {relatedGames.slice(0, 5).map((relGame, idx) => {
              const relPrice = typeof relGame.price === "number" ? relGame.price : parseFloat(relGame.price || "29.99");
              return (
                <Link key={relGame.id || idx} href={`/GameDetails/${relGame.slug}`}>
                  <div className="gd-mini-card">
                    <div className="gd-mini-card-img-wrap">
                      <Image
                        src={resolveCoverImage(null, relGame.id, relGame.title, relGame.genre)}
                        alt={relGame.title}
                        fill
                        className="gd-mini-card-img"
                      />
                      {relGame.discount && (
                        <span className="gd-mini-card-badge">-{relGame.discount}%</span>
                      )}
                    </div>
                    <div className="gd-mini-card-body">
                      <h4 className="gd-mini-card-title">{relGame.title}</h4>
                      <div className="gd-mini-card-footer">
                        <span className="gd-mini-card-price">${relPrice.toFixed(2)}</span>
                        <div className="gd-mini-card-rating">
                          <FaStar className="gd-mini-card-star" />
                          <span>4.7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Trailer Modal (Optional preview) */}
      {isTrailerModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setIsTrailerModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-xl bg-black/60 w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-600 transition"
              onClick={() => setIsTrailerModalOpen(false)}
            >
              ✕
            </button>
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
              <FaPlay className="text-5xl text-purple-400 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-white mb-2">{game?.title || "Game"} Official Trailer</h3>
              <p className="text-gray-400 text-sm max-w-md">Playing high-definition trailer preview for {game?.title}.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
