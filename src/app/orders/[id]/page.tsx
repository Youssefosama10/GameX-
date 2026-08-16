import Link from "next/link";
import { notFound } from "next/navigation";
import { GetOrderDetails } from "@/API/route.services";
import { formatDate, formatMoney } from "@/lib/format";
import { resolveCoverImage } from "@/lib/gameImages";

export const dynamic = "force-dynamic";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await GetOrderDetails(id);
  if (!order) notFound();
  const items = order.items ?? [];

  return (
    <div className="page-wrapper">
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/orders">Orders</Link>
          <span className="breadcrumb-sep">›</span>
          <span>{order.orderNumber || order.id}</span>
        </nav>
        <div className="gx-catalog__intro">
          <h1 className="section-title">Order details</h1>
          <p className="section-subtitle">
            Placed {formatDate(order.createdAt)} · {order.paymentMethod || "Secure checkout"}
          </p>
        </div>
        <div className="gx-commerce-grid">
          <section className="gx-panel">
            {items.map((item, index) => (
              <div key={`${item.title}-${index}`} className="flex items-center justify-between gap-4 border-b border-white/5 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={resolveCoverImage(null, item.game?.id, item.title || item.game?.title, item.game?.genre)}
                    alt={item.title || item.game?.title || "Game"}
                    width={48}
                    height={64}
                    style={{ width: 48, height: 64, objectFit: "cover", borderRadius: 8 }}
                  />
                  <div>
                    <p className="font-semibold">{item.title || item.game?.title}</p>
                    <p className="text-sm text-zinc-400">Qty {item.quantity ?? 1}</p>
                  </div>
                </div>
                <p>{formatMoney(item.price)}</p>
              </div>
            ))}
          </section>
          <aside className="gx-panel">
            <p className={`gx-status gx-status--${order.status || "pending"}`}>{order.status || "pending"}</p>
            <div className="gx-form-grid" style={{ marginTop: 16 }}>
              <div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(order.subtotal)}</span></div>
              <div className="flex justify-between"><span>Discount</span><span>-{formatMoney(order.discount)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>{formatMoney(order.tax)}</span></div>
              <div className="flex justify-between font-bold"><span>Total</span><span>{formatMoney(order.total)}</span></div>
              <Link href="/library" className="gx-btn gx-btn--primary">
                Open library
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
