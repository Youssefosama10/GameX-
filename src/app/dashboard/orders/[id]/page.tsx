import Link from "next/link";
import { notFound } from "next/navigation";
import { GetAdminOrder } from "@/API/route.services";
import { formatDate, formatMoney } from "@/lib/format";
import { resolveCoverImage } from "@/lib/gameImages";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await GetAdminOrder(id);
  if (!order) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/dashboard/orders" className="text-violet-400 text-sm">← All orders</Link>
        <h1 className="mt-2 text-[28px] font-extrabold text-white">{order.orderNumber || order.id}</h1>
        <p className="text-sm text-zinc-400">{formatDate(order.createdAt)} · {order.status}</p>
      </div>
      <div className="gx-commerce-grid">
        <section className="gx-panel">
          {(order.items ?? []).map((item, index) => (
            <div key={`${item.title}-${index}`} className="flex items-center justify-between gap-3 border-b border-white/5 py-3">
              <div className="flex items-center gap-3">
                <img
                  src={resolveCoverImage(null, item.game?.id, item.title || item.game?.title, item.game?.genre)}
                  alt={item.title || item.game?.title || "Game"}
                  width={40}
                  height={54}
                  style={{ width: 40, height: 54, objectFit: "cover", borderRadius: 6 }}
                />
                <span>{item.title || item.game?.title}</span>
              </div>
              <span>{formatMoney(item.price)}</span>
            </div>
          ))}
        </section>
        <aside className="gx-panel">
          <p>Customer: {order.user ? `${order.user.firstName ?? ""} ${order.user.lastName ?? ""}` : "—"}</p>
          <p>Payment: {order.paymentMethod || "—"} / {order.paymentStatus || "—"}</p>
          <p className="mt-4 font-bold">Total {formatMoney(order.total)}</p>
        </aside>
      </div>
    </div>
  );
}
