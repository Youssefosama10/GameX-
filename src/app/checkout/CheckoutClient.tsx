"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { CheckoutAction, ValidateCouponAction } from "@/API/actions";
import type { userCart } from "@/API/types";
import { useAppCounts } from "@/app/_Context/AppCountsContext";
import { formatMoney, toNumber } from "@/lib/format";

const METHODS = [
  { value: "credit_card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "wallet", label: "Wallet" },
];

export default function CheckoutClient({ cart }: { cart: userCart }) {
  const router = useRouter();
  const { setCartCount } = useAppCounts();
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [pending, setPending] = useState(false);
  const [couponPending, setCouponPending] = useState(false);

  const subtotal = cart.subtotal ?? cart.items.reduce((sum, item) => sum + toNumber(item.price) * (item.quantity ?? 1), 0);
  const discount = Math.max(cart.discount ?? 0, couponDiscount);
  const tax = cart.tax ?? 0;
  const total = Math.max(0, (cart.total ?? subtotal) - couponDiscount);

  async function applyCoupon() {
    if (couponPending || !couponCode.trim()) return;
    setCouponPending(true);
    try {
      const result = await ValidateCouponAction(couponCode.trim(), subtotal);
      if (result.success) {
        const data = result.data as { discountAmount?: number; discount?: number } | undefined;
        setCouponDiscount(data?.discountAmount ?? data?.discount ?? 0);
        toast.success(result.message ?? "Coupon applied");
      } else {
        toast.error(result.message ?? "Invalid coupon");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setCouponPending(false);
    }
  }

  async function placeOrder() {
    if (pending) return;
    setPending(true);
    try {
      const result = await CheckoutAction(paymentMethod, couponCode.trim());
      if (result.success) {
        setCartCount(0);
        toast.success(result.message ?? "Order placed");
        const data = result.data as { order?: { _id?: string; id?: string }; _id?: string; id?: string } | undefined;
        const orderId = data?.order?.id || data?.order?._id || data?.id || data?._id;
        router.push(orderId ? `/orders/${orderId}` : "/orders");
      } else {
        toast.error(result.message ?? "Checkout failed");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="container gx-commerce-grid">
        <section className="gx-panel">
          <h1 className="section-title">Checkout</h1>
          <p className="section-subtitle">Review your digital order and complete payment.</p>
          <div className="gx-form-grid" style={{ marginTop: 24 }}>
            {cart.items.map((item) => (
              <div key={item._id} className="flex items-center justify-between gap-4 border-b border-white/5 py-3">
                <div>
                  <p className="font-semibold">{item.title || item.game?.title}</p>
                  <p className="text-sm text-zinc-400">Qty {item.quantity ?? 1}</p>
                </div>
                <p>{formatMoney(toNumber(item.price) * (item.quantity ?? 1))}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="gx-panel">
          <h2 className="section-title" style={{ fontSize: 20 }}>Payment</h2>
          <div className="gx-form-grid" style={{ marginTop: 16 }}>
            <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
              {METHODS.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
            <input value={couponCode} onChange={(event) => setCouponCode(event.target.value)} placeholder="Coupon code" />
            <button type="button" className="gx-btn p-2! gx-btn--ghost" onClick={applyCoupon} disabled={couponPending || pending}>
              {couponPending ? "Applying..." : "Apply coupon"}
            </button>
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Discount</span>
              <span>-{formatMoney(discount)}</span>
            </div>
            {tax > 0 ? (
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Tax</span>
                <span>{formatMoney(tax)}</span>
              </div>
            ) : null}
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatMoney(total)}</span>
            </div>
            <button type="button" className="gx-btn gx-btn--primary gx-btn--lg" onClick={placeOrder} disabled={pending}>
              {pending ? "Processing..." : "Place order"}
            </button>
            <Link href="/cart" className="gx-btn p-2! gx-btn--ghost">
              Back to cart
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
