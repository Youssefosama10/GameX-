"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaSteam } from "react-icons/fa";
import {
  ArrowRight,
  Headphones,
  Lock,
  Shield,
  ShoppingCart,
  Tag,
  Trash2,
  Trophy,
  Zap,
} from "lucide-react";
import { ItemType, userCart } from "@/API/types";
import { resolveCoverImage } from "@/lib/gameImages";
import GameImage from "@components/GameImage/GameImage";
import QuantitySelector from "@components/QuantitySelector/QuantitySelector";
import { DeleteCartItem, UpdateCartQuantity } from "@components/GameCard/card.Actions";
import { ClearCartAction, ValidateCouponAction } from "@/API/actions";
import { useAppCounts } from "@/app/_Context/AppCountsContext";
import CartHero from "./CartHero";

interface CartClientProps {
  cart: userCart;
}

function formatPrice(value: string | number): number {
  return typeof value === "number" ? value : parseFloat(value || "0");
}

function getDisplayDiscount(cart: userCart): number {
  const extra = cart as userCart & { discount?: number; savings?: number };
  const value = extra.discount ?? extra.savings;
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export default function CartClient({ cart }: CartClientProps) {
  const router = useRouter();
  const { setCartCount } = useAppCounts();
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponPending, setCouponPending] = useState(false);
  const [clearing, setClearing] = useState(false);

  function getGameId(item: ItemType): string | undefined {
    return item.game?.id;
  }

  async function handleQuantityChange(item: ItemType, nextQuantity: number) {
    const gameId = getGameId(item);
    if (!gameId) {
      toast.error("Unable to update this item.", { position: "bottom-right" });
      return;
    }

    setPendingItemId(item._id);
    try {
      const result = await UpdateCartQuantity(gameId, nextQuantity);
      if (result.success) {
        if (typeof result.cartCount === "number") {
          setCartCount(result.cartCount);
        }
        toast.success(result.message ?? "Cart quantity updated", {
          position: "bottom-right",
          autoClose: 2000,
        });
        router.refresh();
      } else {
        toast.error(result.message ?? "Failed to update quantity", {
          position: "bottom-right",
        });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", { position: "bottom-right" });
    } finally {
      setPendingItemId(null);
    }
  }

  async function handleDelete(item: ItemType) {
    const gameId = getGameId(item);
    if (!gameId) {
      toast.error("Unable to remove this item.", { position: "bottom-right" });
      return;
    }

    setPendingItemId(item._id);
    try {
      const result = await DeleteCartItem(gameId);
      if (result.success) {
        if (typeof result.cartCount === "number") {
          setCartCount(result.cartCount);
        }
        toast.info(result.message ?? "Product removed from cart", {
          position: "bottom-right",
          autoClose: 2500,
        });
        router.refresh();
      } else {
        toast.error(result.message ?? "Failed to remove product", {
          position: "bottom-right",
        });
      }
    } catch {
      toast.error("Something went wrong. Please try again.", { position: "bottom-right" });
    } finally {
      setPendingItemId(null);
    }
  }

  const subtotal =
    typeof cart.subtotal === "number"
      ? cart.subtotal
      : cart.items.reduce((sum, item) => {
          const quantity = item.quantity ?? 1;
          return sum + formatPrice(item.price) * quantity;
        }, 0);
  const discount = Math.max(getDisplayDiscount(cart), couponDiscount);
  const tax = typeof cart.tax === "number" ? cart.tax : 0;

  async function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    setCouponPending(true);
    try {
      const result = await ValidateCouponAction(couponCode.trim(), subtotal);
      if (result.success) {
        const data = result.data as { discountAmount?: number; discount?: number } | undefined;
        setCouponDiscount(data?.discountAmount ?? data?.discount ?? 0);
        toast.success(result.message ?? "Coupon applied");
      } else {
        setCouponDiscount(0);
        toast.error(result.message ?? "Invalid coupon");
      }
    } finally {
      setCouponPending(false);
    }
  }

  async function handleClearCart() {
    setClearing(true);
    try {
      const result = await ClearCartAction();
      if (result.success) {
        if (typeof result.cartCount === "number") setCartCount(result.cartCount);
        toast.info(result.message ?? "Cart cleared");
        router.refresh();
      } else {
        toast.error(result.message ?? "Failed to clear cart");
      }
    } finally {
      setClearing(false);
    }
  }

  return (
    <div className="page-wrapper cart-page">
      <CartHero />

      <div className="container cart-page__body">
        <div className="cart-layout">
          <section className="cart-items-panel">
            <div className="cart-items-panel__header">
              <div className="cart-panel-icon" aria-hidden="true">
                <ShoppingCart size={18} />
              </div>
              <div>
                <h2 className="cart-section-title">
                  {cart.itemsCount} Items in Your Cart
                </h2>
                <p className="cart-section-subtitle">
                  Review your items and proceed to checkout
                </p>
              </div>
            </div>

            <div className="cart-items-list">
              {cart.items.map((item) => {
                const quantity = item.quantity ?? 1;
                const unitPrice = formatPrice(item.price);
                const lineTotal = unitPrice * quantity;
                const imageSrc = resolveCoverImage(
                  null,
                  item.game?.id ?? item._id,
                  item.title || item.game?.title,
                  item.game?.genre
                );
                const isPending = pendingItemId === item._id;

                return (
                  <article key={item._id} className="cart-item">
                    <div className="cart-item-image">
                      <GameImage
                        productId={item.game?.id}
                        src={imageSrc}
                        alt={item.title || item.game?.title || "Game cover"}
                        width={88}
                        height={88}
                        className="object-cover"
                      />
                    </div>

                    <div className="cart-item-info">
                      <h2 className="cart-item-name">{item.title || item.game?.title}</h2>
                      <p className="cart-item-meta">
                        <FaSteam /> Steam Key
                      </p>
                      <span className="cart-item-badge">Digital Product</span>
                    </div>

                    <p className="cart-item-unit">${unitPrice.toFixed(2)}</p>

                    <QuantitySelector
                      quantity={quantity}
                      disabled={isPending}
                      onDecrease={() => handleQuantityChange(item, quantity - 1)}
                      onIncrease={() => handleQuantityChange(item, quantity + 1)}
                    />

                    <p className="cart-item-line-total">${lineTotal.toFixed(2)}</p>

                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => handleDelete(item)}
                      disabled={isPending}
                      aria-label="Remove from cart"
                    >
                      <Trash2 size={16} />
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          <div className="cart-sidebar">
            <aside className="order-summary-panel">
              <div className="summary-title-row">
                <div className="cart-panel-icon" aria-hidden="true">
                  <Tag size={16} />
                </div>
                <h2 className="summary-title">Order Summary</h2>
              </div>

              <div className="summary-rows">
                <div className="summary-row">
                  <span className="label">Subtotal ({cart.itemsCount} items)</span>
                  <span className="value">${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row discount">
                  <span className="label">Discount</span>
                  <span className="value">
                    {discount > 0 ? `-$${discount.toFixed(2)}` : "$0.00"}
                  </span>
                </div>
                {tax > 0 ? (
                  <div className="summary-row">
                    <span className="label">Tax</span>
                    <span className="value">${tax.toFixed(2)}</span>
                  </div>
                ) : null}
              </div>
              <div className="gx-form-grid" style={{ margin: "16px 0" }}>
                <input
                  value={couponCode}
                  onChange={(event) => setCouponCode(event.target.value)}
                  placeholder="Coupon code"
                />
                <button type="button" className="gx-btn p-2! gx-btn--ghost" onClick={handleApplyCoupon} disabled={couponPending}>
                  {couponPending ? "Checking..." : "Apply coupon"}
                </button>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <span className="label">Total</span>
                <span className="value">${cart.total.toFixed(2)}</span>
              </div>
              {discount > 0 ? (
                <p className="summary-savings">You save ${discount.toFixed(2)}</p>
              ) : null}

              <Link href="/checkout" className="gx-btn gx-btn--primary gx-btn--lg cart-checkout-btn">
                <Lock size={16} />
                Proceed to Checkout
              </Link>
              <button type="button" className="gx-btn  gx-btn--ghost gx-btn--lg" onClick={handleClearCart} disabled={clearing}>
                {clearing ? "Clearing..." : "Clear cart"}
              </button>
              <Link href="/games" className="gx-btn gx-btn--ghost gx-btn--lg cart-continue-btn">
                Continue Shopping
                <ArrowRight size={16} />
              </Link>

              <div className="cart-payments">
                <p className="cart-payments__label">We accept</p>
                <div className="cart-payments__list">
                  <span className="cart-pay-badge">VISA</span>
                  <span className="cart-pay-badge">Mastercard</span>
                  <span className="cart-pay-badge">PayPal</span>
                  <span className="cart-pay-badge">Apple Pay</span>
                </div>
              </div>
            </aside>

            <ul className="cart-trust-list">
              <li>
                <Lock size={16} />
                <div>
                  <strong>Secure Payment</strong>
                  <span>Your payment is 100% secure</span>
                </div>
              </li>
              <li>
                <Zap size={16} />
                <div>
                  <strong>Instant Delivery</strong>
                  <span>Get your games instantly</span>
                </div>
              </li>
              <li>
                <Headphones size={16} />
                <div>
                  <strong>24/7 Support</strong>
                  <span>We&apos;re here to help</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="features-strip cart-features-strip">
          <div className="feature-item">
            <div className="feature-icon">
              <Shield size={18} />
            </div>
            <div className="feature-text">
              <h4>Secure Payment</h4>
              <p>100% safe &amp; secure</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <Zap size={18} />
            </div>
            <div className="feature-text">
              <h4>Instant Delivery</h4>
              <p>Get your games instantly</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <Headphones size={18} />
            </div>
            <div className="feature-text">
              <h4>24/7 Support</h4>
              <p>We&apos;re always here</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <Trophy size={18} />
            </div>
            <div className="feature-text">
              <h4>Trusted by Gamers</h4>
              <p>Join millions of players</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
